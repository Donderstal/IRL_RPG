const animationFrameController = require('./animationFrameController')
const globals  = require('../game-data/globals')
const controls      = require('./controls')
const getMapData    = require('../resources/mapResources').getMapData
const tilesheets    = require('../resources/tilesheetResources').sheets

const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, 
    TEST_CLASSNAME_1, TEST_CLASSNAME_4, TEST_CLASSNAME_5, BATTLE_MODE
}  = require('../game-data/globals')
const { SoundController } = require('./SoundController');
const { ForegroundCanvas } = require('./ForegroundCanvas');
const { BackgroundCanvas } = require('./BackgroundCanvas');
const { Party } = require('./party/Party');
const canvasHelpers = require('../helpers/canvasHelpers')
const { Battle } = require('./battle/Battle')

const firstMapUrl =  'my-neighbourhood/A1/my-house';
const startingItemIDs = [ 
    "hp_consumable_1", "hp_consumable_1", "shirt_armor_1", "ranged_weapon_1",  
    "phone_misc_1", "old_sneakers_armor_2", "dirty_beanie_armor_3", "kitty_necklace_armor_3",
    "dirty_beanie_armor_3"
]

class Game {
    constructor( ) {
        this.mode; // 'MAP' || 'BATTLE'        
        this.cinematicMode; // bool
        this.paused; // bool
        this.inMenu;
        this.listeningForPress; // bool
        this.pressedKeys = { }; //
        this.sound = new SoundController( );

        this.activeBubble = { }
        this.activeText = "";
        this.bubbleIsActive;

        this.front = { }; // class Foreground
        this.back  = { };  // class Background
        this.util  = { };
        this.battle; // class Battle
        this.party; // class Party

        this.activeMap; 
        this.activeMapName; // string

        this.initGameCanvases( );
    }

    get FRONT( ) { return this.front.class }
    get BACK( ) { return this.back.class }

    get PLAYER( ) { return this.front.class.playerSprite }
    get PARTY_MEMBERS( ) { return this.party.members }
    get PLAYER_INVENTORY( ) { return this.party.inventory }
    get PLAYER_ITEMS( ) { return this.party.inventory.ItemList }
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
        if ( this.mode == BATTLE_MODE ) {
            return canvasClass.battleGrid.array[index];  
        }
        else {
            return canvasClass.getTileAtIndex( index );            
        }
    }
    /**
     * Return the I_Tile instance at xy position on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} x position of tile on X axis in canvas
     * @param {Number} y position of tile on Y axis in canvas
     */
    getTileOnCanvasAtXY( canvasName, x, y ) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        if ( this.mode == BATTLE_MODE ) {
            return canvasClass.battleGrid.getTileAtXY( x, y );
        }
        else {
            return canvasClass.getTileAtXY( x, y );       
        }
    }
    /**
     * Return the I_Tile instance at column row position on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} column column of tile in canvas
     * @param {Number} row position of tile on Y axis in canvas
     */
    getTileOnCanvasAtCell( canvasName, column, row ) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        if ( this.mode == BATTLE_MODE ) {
            return canvasClass.battleGrid.getTileAtCell( column, row );  
        }
        else {
            return canvasClass.getTileAtCell( column, row );          
        }
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
    startNewGame( name, className ) {
        this.initializePlayerParty( name, className )
        const mapData = getMapData(firstMapUrl);
        this.storeMapData( mapData, firstMapUrl );
        mapData.playerStart.playerClass = className;
        mapData.playerStart.name = name;
        this.loadMapToCanvases( mapData )
        setTimeout( this.initControlsAndAnimation, 1000 );
    }
    /**
     * Instantiate a Party class for the player and assign it to the this.party prop
     * @param {String} name name that the player chose in the starting menu
     * @param {String} className name of the class that the player selected
     */
    initializePlayerParty( name ) {
        this.party = new Party( 
            [ 
                { name: name, className: TEST_CLASSNAME_1, level: 5 }, 
                { name: "Roberto 'Rob' Felix", className: TEST_CLASSNAME_5, level: 5 }, 
                { name: "Your nan", className: TEST_CLASSNAME_4, level: 5 } 
            ], 
        true );
        this.party.addItemsToInventory( startingItemIDs )
    }
    /**
     * Start listening for keypress in controls.js. Start requesting animationframe in animationframecontroller.js
     */
    initControlsAndAnimation( ) {
        controls.initTouchControls( );
        controls.listenForKeyPress();  
        animationFrameController.startRequestingFrame( );
    }
    /**
     * Initialize map grids based on map dimensions. Set mapData to the Foreground and Background classes.
     * Assign playerSprite to the Foreground spriteDictionary and play music.
     * @param {Object} mapData mapData object retrieved from mapResources.js
     */
    loadMapToCanvases( mapData ) {
        this.back.class.initGrid( mapData.rows, mapData.columns );
        this.front.class.initGrid( mapData.rows, mapData.columns );
    
        const sheetData = tilesheets[mapData.tileSet];
    
        this.back.class.setBackgroundData( mapData, sheetData );
        this.back.class.setEventsDoorsAndBlockedToTilesInGrid( );
        this.back.class.loadImageWithCallback( '/static/tilesets/' + sheetData.src, this.back.class.drawMapFromGridData );
    
        this.front.class.setForegroundData( mapData );
        this.front.class.setSpritesToGrid( );
        
        this.front.class.spriteDictionary["PLAYER"] = this.PLAYER
        this.sound.playMusic( mapData.music )
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
        this.paused = true;
        controls.stopListenForKeyPress( );
        controls.clearPressedKeys( this.pressedKeys );

        const newMapData = getMapData( destination );
        this.clearMapFromCanvases( );
        this.loadMapToCanvases( newMapData );
        this.setPlayerInNewMap( newMapData, type );
        this.storeMapData( newMapData, destination );

        setTimeout( ( ) => {
            controls.listenForKeyPress( ); 
            this.paused = false;   
        }, 100 )
    }
    /**
     * Store the current map data and name as properties of game class
     * @param {Object} mapData - mapData object retrieved from mapResources.js
     * @param {String} mapName - name of the current map
     */
    storeMapData( mapData, mapName ) {
        this.activeMapName = mapName;
        this.activeMap = mapData;
    };
    /**
     * Instantiate a Party class instance with partyData as argument.
     * Then assign a Battle instance to this.battle
     * @param {Object} partyData - actionData object retrieved from mapResources.js
     */
    initializeBattle( partyData ) {
        const opponentParty = new Party( partyData, false );
        this.clearCanvases( );
        this.loadBattleGraphicsToCanvases( opponentParty );
        this.battle = new Battle( opponentParty );
        animationFrameController.startBattleAnimation( );
    }
    /**
     * Initialize the Background and Foreground battlegrids to start battle animations.
     * Set the tilesheet and draw the map on the background.
     * Then, prepare battleSlots and initialize the battling sprites in then
     */
    loadBattleGraphicsToCanvases( opponentParty ) {
        const battleMapData = getMapData("battle/downtown");
        this.BACK.initBattleGrid( battleMapData.rows, battleMapData.columns );
        this.FRONT.initBattleGrid( battleMapData.rows, battleMapData.columns );
        
        const sheetData = tilesheets[battleMapData.tileSet];
        this.BACK.setBattleBackgroundData( battleMapData, sheetData );
        this.BACK.loadImageWithCallback( '/static/tilesets/' + sheetData.src, this.back.class.drawBattleMapFromBattleGridData );
        this.FRONT.prepareBattlePositions( );
        this.FRONT.setSpritesToBattleSlots( this.party, opponentParty );
    }
    /**
     * Clear battle data,  redraw the active map background.
     * Then activate overWorldAnimation.
     */
    clearBattleData( ) {
        this.battle = [];
        this.clearCanvases( );
        this.BACK.clearBattleMap( );
        this.FRONT.clearBattleMap( );
        this.BACK.loadImageWithCallback( '/static/tilesets/' + tilesheets[this.activeMap.tileSet].src, this.back.class.drawMapFromGridData );
        animationFrameController.startOverworldAnimation( );   
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
            case 'DOOR' :
                mapData.doors.forEach( ( door ) => {
                    if ( this.activeMapName == door.to ) {
                        newPlayerCell.row = door.row;
                        newPlayerCell.col = door.col;
                        direction = door.directionOut;
                    }
                } )
                break;
            case 'NEIGHBOUR' :
                Object.keys( mapData.neighbours ).forEach( ( key ) => {
                    if ( this.activeMapName == mapData.neighbours[key] ) {
                        switch ( key ) {
                            case 'up' : 
                                newPlayerCell.row = 1;
                                newPlayerCell.col = this.PLAYER.col;
                                break;
                            case 'right' :
                                newPlayerCell.row = this.PLAYER.row;
                                newPlayerCell.col = mapData.columns;
                                break;
                            case 'down' :
                                newPlayerCell.row = mapData.rows;
                                newPlayerCell.col = this.PLAYER.col;
                                break;
                            case 'left' :
                                newPlayerCell.row = this.PLAYER.row;
                                newPlayerCell.col = 1;
                                break;
                        }
                    }
                })
                break;
            case 'BUS' :
                mapData.mapObjects.forEach( ( object ) => {
                    if ( object.action != undefined && object.action.type == "BUS" ) {
                        newPlayerCell.row = object.row;
                        newPlayerCell.col = object.col;
                    }
                } )
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
}

/**
 * Instantiate the game class and call the startNewGame method
 * @param {String} name name that the player chose in the starting menu
 * @param {String} className name of the class that the player selected
 */
const startGame = ( name, className ) => {
    globals.GAME = new Game( );
    globals.GAME.startNewGame( name, className );
}

module.exports = {
    Game,
    startGame
}