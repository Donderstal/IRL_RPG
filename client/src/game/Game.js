const animationFrameController = require('./animationFrameController')
const globals  = require('../game-data/globals')
const controls      = require('./controls')
const tilesheets    = require('../resources/tilesheetResources').sheets
const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, FACING_DOWN,
    TEST_CLASSNAME_2, TEST_CLASSNAME_4, TEST_CLASSNAME_5
}  = require('../game-data/globals')
const { 
    ON_ENTER, ON_LEAVE, EVENT_BUS, EVENT_DOOR, EVENT_NEIGHBOUR, ON_NPC_INTERACTION
}  = require('../game-data/conditionGlobals')
const { SoundController } = require('./sound/SoundController');
const { ForegroundCanvas } = require('./ForegroundCanvas');
const { BackgroundCanvas } = require('./BackgroundCanvas');
const { Party } = require('./party/Party');
const canvasHelpers = require('../helpers/canvasHelpers')
const { TypeWriter } = require('../helpers/TypeWriter')
const { getOppositeDirection } = require('../helpers/utilFunctions')
const { setLoadingScreen, stopLoadingScreen } = require('./LoadingScreen')
const { StoryProgression } = require('../helpers/StoryProgression')
const { Fader } = require('../helpers/Fader')
const { Cinematic } = require('./cutscenes/Cinematic')
const { FileLoader } = require('../helpers/Loader')
const { Neighbourhood } = require('./Neighbourhood')
const { SpeechBubbleController } = require('./cutscenes/SpeechBubbleController')
const startingItemIDs = [
    "pp_consumable_1", "pp_consumable_1",
    "hp_consumable_1", "hp_consumable_1", "shirt_armor_1", "shirt_armor_2", "shirt_armor_3", "ranged_weapon_1",  
    "phone_misc_1", "old_sneakers_armor_2", "dirty_beanie_armor_3", "kitty_necklace_armor_3",
    "dirty_beanie_armor_3", "key_1", "usable_1", "usable_1", "ranged_weapon_1", "lower_body_armor_1", "lower_body_armor_1"
]

class Game {
    constructor( ) {
        this.cinematicMode; // bool
        this.inCinematic = false;
        this.paused; // bool
        this.inMenu;
        this.listeningForPress; // bool
        this.pressedKeys = { }; //
        this.speechBubbleController = new SpeechBubbleController( );
        this.sound = new SoundController( );
        this.audio = new AudioContext( );
        this.fader = new Fader( );
        this.story;

        this.activeBubble = { }
        this.activeText = "";
        this.bubbleIsActive;

        this.front = { }; // class Foreground
        this.back  = { };  // class Background
        this.util  = { };
        this.party; // class Party

        this.activeNeighbourhood;
        this.currentChapter;

        this.initGameCanvases( );
    }

    get FRONT( ) { return this.front.class }
    get BACK( ) { return this.back.class }

    get PLAYER( ) { return this.front.class.playerSprite }
    get PARTY_MEMBERS( ) { return this.party.members }
    get PLAYER_INVENTORY( ) { return this.party.inventory }
    get PLAYER_ITEMS( ) { return this.party.inventory.ItemList }

    get activeMap( ) { return this.activeNeighbourhood.activeMap; }
    get activeMapName( ) { return this.activeNeighbourhood.activeMapKey; }
    get previousMapName( ) { return this.activeNeighbourhood.previousMapKey; }

    get activeText( ) {
        return this.typeWriter.activeText;
    }

    set activeText( text ) {
        this.typeWriter = new TypeWriter( text );
    }
    /**
     * Assign given text to this.activeText
     * @param {String} text
     */
    setActiveText( text ) {
        this.activeText = text;
    }
    /**
     * Return the I_Tile instance at index on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} index array index of the tile in the grid array
     */
    getTileOnCanvasAtIndex( canvasName, index) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        return canvasClass.getTileAtIndex( index ); 
    }
    /**
     * Return the I_Tile instance at xy position on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} x position of tile on X axis in canvas
     * @param {Number} y position of tile on Y axis in canvas
     */
    getTileOnCanvasAtXY( canvasName, x, y ) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        return canvasClass.getTileAtXY( x, y );
    }
    /**
     * Return the I_Tile instance at column row position on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} column column of tile in canvas
     * @param {Number} row position of tile on Y axis in canvas
     */
    getTileOnCanvasAtCell( canvasName, column, row ) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        return canvasClass.getTileAtCell( column, row ); 
    }
    /**
     * Initialize game Canvases. FRONT, BACK and UTIL
     */
    initGameCanvases( ) {
        this.initCanvas( 'FRONT', this.front );
        this.initCanvas( 'BACK', this.back );
        this.initCanvas( 'UTIL', this.util );
    }
    /**
     * Set canvas dimensions. Assign canvas and canvas ctx as properties. Instantiate I_CanvasWithGrid class extension if necessary and set as property
     * @param {String} type FRONT, UTIL or BACK. Indicates which canvas to initialize
     * @param {Object} object 'wrapper' object to add the canvas and canvas context to as properties
     */
    initCanvas( type, object ) {
        const id = type == 'FRONT' ? 'game-front-canvas' : type == 'BACK' ? 'game-background-canvas' : 'game-utility-canvas';
        object.canvas = document.getElementById( id );
        object.ctx = object.canvas.getContext( '2d' );
        
        if ( type != 'UTIL' ) {
            object.canvas.width = CANVAS_WIDTH;
            object.canvas.height = CANVAS_HEIGHT;
            const xy = object.canvas.getBoundingClientRect( );
            object.class = type == 'FRONT' ?  new ForegroundCanvas( xy.x, xy.y, object.ctx ) : new BackgroundCanvas( xy.x, xy.y, object.ctx );
        }
    }
    /**
     * Wrapper method. Calls a sequentce of functions to start a new game
     * @param {String} name name that the player chose in the starting menu
     * @param {String} className name of the class that the player selected
     */
    startNewGame( name, className, startingMap, debugMode, disableStoryMode ) {
        this.initializePlayerParty( name, className )
        this.setNeighbourhoodAndMap(startingMap);
        this.debugMode = debugMode;
        this.disableStoryMode = disableStoryMode;
        this.activeMap.playerStart.playerClass = className;
        this.activeMap.playerStart.name = name;
        this.loadMapToCanvases( true );
        if ( !this.disableStoryMode ) {
            this.story = new StoryProgression( );     
        }
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    setNeighbourhoodAndMap(mapName) {
        if ( this.activeNeighbourhood == undefined || !mapName.includes(this.activeNeighbourhood.key) ) {
            this.activeNeighbourhood = new Neighbourhood(mapName);
        }
        else {
            this.activeNeighbourhood.activateMap(mapName);
        }
    }
    /**
     * Instantiate a Party class for the player and assign it to the this.party prop
     * @param {String} name name that the player chose in the starting menu
     * @param {String} className name of the class that the player selected
     */
    initializePlayerParty( name ) {
        this.party = new Party( 
            [ 
                { name: name, className: TEST_CLASSNAME_2, level: 5 }, 
                { name: "Roberto 'Rob' Felix", className: TEST_CLASSNAME_5, level: 5 }, 
                { name: "Your nan", className: TEST_CLASSNAME_4, level: 5 } 
            ], 
        true );
        this.party.addItemsToInventory( startingItemIDs )
        this.party.inventory.addMoney( 50 );
    }
    /**
     * Start listening for keypress in controls.js. Start requesting animationframe in animationframecontroller.js
     */
    initControlsAndAnimation( ) {
        stopLoadingScreen( );
        controls.listenForKeyPress();  
        animationFrameController.animationFrameController( );
    }
    /**
     * Initialize map grids based on map dimensions. Set mapData to the Foreground and Background classes.
     * Assign playerSprite to the Foreground spriteDictionary and play music.
     * @param {Object} mapData mapData object retrieved from mapResources.js
     */
    loadMapToCanvases( isNewGame = false ) {
        this.back.class.initGrid( this.activeMap.rows, this.activeMap.columns );
        this.front.class.initGrid( this.activeMap.rows, this.activeMap.columns );
    
        const sheetData = tilesheets[this.activeMap.tileSet];
    
        this.back.class.setBackgroundData( this.activeMap, sheetData );
        this.back.class.setEventsDoorsAndBlockedToTilesInGrid( );
        console.log('/static/tilesets/' + sheetData.src)
        console.log(globals.PNG_DICTIONARY)
        console.log('/static/tilesets/' + sheetData.src in globals.PNG_DICTIONARY)
        this.BACK.drawMapFromGridData( globals.PNG_DICTIONARY['/static/tilesets/' + sheetData.src] );
    
        this.front.class.setForegroundData( this.activeMap, isNewGame );
        //this.front.class.setSpritesToGrid( );
        
        this.front.class.spriteDictionary["PLAYER"] = this.PLAYER
        this.sound.setActiveMusic( this.activeMap.music != undefined ? this.activeMap.music : this.activeNeighbourhood.music );
        setTimeout( ( ) => {
            this.story.checkForEventTrigger(ON_ENTER)     
        }, 250 )
    }
    /**
     * Clear currentmap data from Foreground and Background. Then clear the assets from both canvas contexts
     */
    clearMapFromCanvases( ) {
        this.front.class.clearMap( );
        this.back.class.clearMap( );

        this.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
        this.back.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    }
    /**
     * Wrapper method. Pause controls and clear old map from the canvases. Then load the new map and resume controls.
     * @param {String} destination name of the map to switch to
     * @param {String} type - DOOR, BUS, NEIGHBOUR - indicates how the player is crossing to the new map
     */
    switchMap ( destination, type ) {
        this.story.checkForEventTrigger(ON_LEAVE, [ destination, type ]); 
        if ( this.inCinematic ) {
            return;
        }        
        this.sound.clearActiveSoundEffects( );
        this.paused = true;
        controls.stopListenForKeyPress( );
        controls.clearPressedKeys( this.pressedKeys );

        this.setNeighbourhoodAndMap(destination);
        this.clearMapFromCanvases( );
        this.loadMapToCanvases( );
        if ( type != EVENT_BUS ) {
            this.setPlayerInNewMap( this.activeMap, type );
        }
        else {
            this.activeMap.mapObjects.forEach( ( object ) => {
                if ( object.action != undefined && object.action[0].action.type == EVENT_BUS ) {
                    object.action[0].action.events.forEach( ( e ) => {
                        if ( e["trigger"] == ON_ENTER ) {
                            new Cinematic( e.scenes, ON_ENTER )
                        }
                    })
                }
                
            } )
        }
        setTimeout( ( ) => {
            controls.listenForKeyPress( ); 
            this.paused = false;   
        }, 100 )
    }
    /**
     * Determine the players location based on the type of arrival in the new map. Then set it to the Player sprite
     * @param {Object} mapData - mapData object retrieved from mapResources.js
     * @param {String} type - DOOR, BUS, NEIGHBOUR - indicates how the player is crossing to the new map
     */
    setPlayerInNewMap( mapData, type ) {
        const newPlayerCell = {};
        let direction;

        switch ( type ) {
            case EVENT_DOOR :
                [...mapData.doors, ...mapData.mapObjects.filter( ( e ) => { return e.hasDoor })].forEach( ( door ) => {
                    if ( this.previousMapName == door.destination ) {
                        newPlayerCell.row = door.row;
                        newPlayerCell.col = door.col;
                        direction = getOppositeDirection(door.direction);
                    }
                } )
                break;
            case EVENT_NEIGHBOUR :
                switch (this.PLAYER.direction) {
                    case globals.FACING_DOWN : 
                        newPlayerCell.row = 1;
                        newPlayerCell.col = this.PLAYER.col;
                        break;
                    case globals.FACING_LEFT :
                        newPlayerCell.row = this.PLAYER.row;
                        newPlayerCell.col = mapData.columns;
                        break;
                    case globals.FACING_UP :
                        newPlayerCell.row = mapData.rows;
                        newPlayerCell.col = this.PLAYER.col;
                        break;
                    case globals.FACING_RIGHT :
                        newPlayerCell.row = this.PLAYER.row;
                        newPlayerCell.col = 1;
                        break;
                }
                direction = this.PLAYER.direction;
                break;
            case EVENT_BUS :
                mapData.mapObjects.forEach( ( object ) => {
                    if ( object.action != undefined && object.action[0].action.type == EVENT_BUS ) {
                        newPlayerCell.row = object.row;
                        newPlayerCell.col = object.col;
                        direction   = FACING_DOWN
                    }
                } )
                break;
            default : 
                console.log( "Type " + type + " not recognized." )
                break;
        }

        this.PLAYER.setNewLocationInGrid( newPlayerCell, direction );
        this.front.class.allSprites.push( this.PLAYER );
        this.front.class.spriteDictionary["PLAYER"] = this.PLAYER
    }
    /**
     * Clear both canvases
     */
    clearCanvases( ) {
        canvasHelpers.clearEntireCanvas("FRONT")
        canvasHelpers.clearEntireCanvas("BACK")
    }

    activateCinematic( cinematic ) {
        if ( cinematic.trigger === ON_NPC_INTERACTION ) {
            const sprite = this.FRONT.spriteDictionary[cinematic.args[0]];
            sprite.State.cinematicOn( sprite );
        }
        this.activeCinematic = cinematic;
        this.inCinematic = true;
    }

    deActivateCinematic( ) {
        this.activeCinematic = false;
        this.inCinematic = false;
    }
}

/**
 * Instantiate the game class and call the startNewGame method
 * @param {String} name name that the player chose in the starting menu
 * @param {String} className name of the class that the player selected
 * @param {boolean} debugMode if true, the instance will draw the grid and sprite hitboxes
 * @param {boolean} disableStoryMode if true, no
 */
const startGame = ( name, className, startingMap, debugMode, disableStoryMode ) => {
    globals.GAME = new Game( );
    new FileLoader( [name, className, startingMap, debugMode, disableStoryMode] );
    setLoadingScreen( );
}

module.exports = {
    Game,
    startGame
}