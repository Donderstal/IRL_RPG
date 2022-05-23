const animationFrameController = require('./animationFrameController')
const globals  = require('../game-data/globals')
const controls      = require('./controls')
const { CANVAS_WIDTH, CANVAS_HEIGHT }  = require('../game-data/globals')
const { ON_NPC_INTERACTION }  = require('../game-data/conditionGlobals')
const { MAIN_CHARACTER } = require('../resources/classProfileResources')
const { SoundController } = require('./sound/SoundController');
const { ForegroundCanvas } = require('./ForegroundCanvas');
const { BackgroundCanvas } = require('./BackgroundCanvas');
const { Party } = require('./party/Party');
const { TypeWriter } = require('../helpers/TypeWriter')
const { setLoadingScreen, stopLoadingScreen } = require('./LoadingScreen')
const { StoryProgression } = require('../helpers/StoryProgression')
const { Fader } = require('../helpers/Fader')
const { FileLoader } = require('../helpers/Loader')
const { SpeechBubbleController } = require('./cutscenes/SpeechBubbleController')
const { SpeechBubbleCanvas } = require('./cutscenes/SpeechBubbleCanvas')
const { CollectableRegistry } = require('../helpers/collectableRegistry')
const { FrontgridCanvas } = require('./FrontgridCanvas')
const { SaveGameDto } = require('../game-data/SaveGameDto')
const { setInteractionRegistry } = require('../helpers/interactionRegistry')
const { setUnlockedDoorsRegistry } = require('../helpers/doorRegistry')
const { MenuCanvas } = require('./menuCanvas/MenuCanvas')
const { CameraFocus } = require('../helpers/cameraFocus')
const { setNeighbourhoodAndMap, loadMapToCanvases, getCinematicBack, getCinematicFront, getCinematicFrontgrid } = require('../helpers/loadMapHelpers')

const startingItemIDs = [  
    "phone_misc_1", "kitty_necklace_armor_3", "dirty_beanie_armor_3", "key_1"
]

class Game {
    constructor( ) {
        this.cinematicMode; // bool
        this.inCinematic = false;
        this.activeCinematic = false;
        this.usingCinematicMap = false;
        this.paused; // bool
        this.inMenu;
        this.listeningForPress; // bool
        this.pressedKeys = { }; //
        this.speechBubbleController = new SpeechBubbleController( );
        this.cameraFocus = new CameraFocus( );
        this.collectableRegistry = new CollectableRegistry( );
        this.sound = new SoundController( );
        this.audio = new AudioContext( );
        this.fader = new Fader( );
        this.story;

        this.activeBubble = { }
        this.activeText = "";
        this.bubbleIsActive;

        this.menu = {}
        this.utilMenu = {}
        this.frontgrid = { };
        this.utilFront  = { };
        this.front = { };
        this.back  = { };
        this.utilBack  = { };
        this.speechBubblesCanvas = { };
        this.party; // class Party

        this._activeNeighbourhood;
        this.cinematicNeighbourhood;
        this.currentChapter;

        this.initGameCanvases( );
    }

    get MENU( ) { return this.menu.class }
    get FRONTGRID( ) { return this.useCinematicMap ? getCinematicFrontgrid() : this.frontgrid.class }
    get FRONT( ) { return this.useCinematicMap ? getCinematicFront() : this.front.class }
    get BACK( ) { return this.useCinematicMap ? getCinematicBack() : this.back.class }

    get PLAYER( ) { return this.useCinematicMap ? getCinematicFront().playerSprite : this.front.class.playerSprite }
    get PARTY_MEMBERS( ) { return this.party.members }
    get PLAYER_INVENTORY( ) { return this.party.inventory }
    get PLAYER_ITEMS( ) { return this.party.inventory.ItemList }

    get activeMap( ) { return this.useCinematicMap ? this.cinematicNeighbourhood.activeMap : this.activeNeighbourhood.activeMap; }
    get activeMapName( ) { return this.useCinematicMap ? this.cinematicNeighbourhood.activeMapKey : this.activeNeighbourhood.activeMapKey; }
    get previousMapName( ) { return this.activeNeighbourhood.previousMapKey; }
    get useCinematicMap( ) { return this.usingCinematicMap && this.inCinematic; }

    get activeNeighbourhood() {
        return (this.useCinematicMap ? this.cinematicNeighbourhood : this._activeNeighbourhood);
    }

    set activeNeighbourhood( value ) {
        this._activeNeighbourhood = value;
    }

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
     * Return the Tile instance at index on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} index array index of the tile in the grid array
     */
    getTileOnCanvasAtIndex( canvasName, index) {
        const canvasClass = canvasName == 'FRONT' ? this.FRONT : this.BACK
        return canvasClass.getTileAtIndex( index ); 
    }
    /**
     * Return the Tile instance at xy position on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} x position of tile on X axis in canvas
     * @param {Number} y position of tile on Y axis in canvas
     */
    getTileOnCanvasAtXY( canvasName, x, y ) {
        const canvasClass = canvasName == 'FRONT' ? this.FRONT : this.BACK
        return canvasClass.getTileAtXY( x, y );
    }
    /**
     * Return the Tile instance at column row position on given canvas
     * @param {String} canvasName FRONT or BACK to indicate the desired canvas
     * @param {Number} column column of tile in canvas
     * @param {Number} row position of tile on Y axis in canvas
     */
    getTileOnCanvasAtCell( canvasName, column, row ) {
        const canvasClass = canvasName == 'FRONT' ? this.FRONT : this.BACK
        return canvasClass.getTileAtCell( column, row ); 
    }
    /**
     * Initialize game Canvases. FRONT, BACK and UTIL
     */
    initGameCanvases( ) {
        this.initCanvas( 'UTIL_BACK', this.utilBack );
        this.initCanvas( 'UTIL_FRONT', this.utilFront );
        this.initCanvas( 'FRONT_GRID' , this.frontgrid )
        this.initCanvas( 'FRONT', this.front );
        this.initCanvas( 'BACK', this.back );
        this.initCanvas( 'MENU' , this.menu );
        if ( globals.SCREEN.MOBILE ) {
            this.initCanvas( 'SPEECH' , this.speechBubblesCanvas );
        }
    }
    /**
     * Set canvas dimensions. Assign canvas and canvas ctx as properties. Instantiate CanvasWithGrid class extension if necessary and set as property
     * @param {String} type FRONT, UTIL or BACK. Indicates which canvas to initialize
     * @param {Object} object 'wrapper' object to add the canvas and canvas context to as properties
     */
    initCanvas( type, object ) {
        switch( type ) {
            case 'BACK':
                object.canvas = document.getElementById( 'game-background-canvas' );
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = CANVAS_WIDTH;
                object.canvas.height = CANVAS_HEIGHT;
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new BackgroundCanvas( xy.x, xy.y, object.ctx );
                break;
            case 'FRONT':
                object.canvas = document.getElementById( 'game-front-canvas' );
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = CANVAS_WIDTH;
                object.canvas.height = CANVAS_HEIGHT;
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new ForegroundCanvas( xy.x, xy.y, object.ctx );
                break;
            case 'FRONT_GRID':
                object.canvas = document.getElementById( 'game-front-grid-canvas' );
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = CANVAS_WIDTH;
                object.canvas.height = CANVAS_HEIGHT;
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new FrontgridCanvas( xy.x, xy.y, object.ctx );
                break;
            case 'MENU':
                object.canvas = document.getElementById( 'game-menu-canvas' );
                object.ctx = object.canvas.getContext( '2d' );
                if ( globals.SCREEN.MOBILE ) {
                    object.canvas.width = globals.GRID_BLOCK_PX * 8;
                    object.canvas.height = globals.GRID_BLOCK_PX * 8;
                    object.canvas.style.position = 'fixed';
                    object.canvas.style.top = 0;
                }
                else {
                    object.canvas.width = CANVAS_WIDTH;
                    object.canvas.height = CANVAS_HEIGHT;                  
                }
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new MenuCanvas( xy.x, xy.y, object.ctx, object.canvas);  
                break;
            case 'UTIL_BACK':
                object.canvas = document.getElementById( 'game-utility-canvas-back' );
                object.ctx = object.canvas.getContext( '2d' );
                break;
            case 'UTIL_FRONT':
                object.canvas = document.getElementById( 'game-utility-canvas-front' );
                object.ctx = object.canvas.getContext( '2d' );
                break;  
            case 'SPEECH':
                object.canvas = document.getElementById( 'game-bubble-canvas' );
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = globals.GRID_BLOCK_PX * 12;
                object.canvas.height = globals.GRID_BLOCK_PX * 8;
                object.class = new SpeechBubbleCanvas( 0, 0, object.ctx, object.canvas);        
                break;
            default:
                console.log('error! canvas type ' + type + ' not known')
        } 
    }

    /**
     * Wrapper method. Calls a sequentce of functions to start a new game
     * @param {String} name name that the player chose in the starting menu
     * @param {String} className name of the class that the player selected
     */
    startNewGame( name, className, startingMap, debugMode, disableStoryMode ) {
        this.initializePlayerParty( name, className )    
        setNeighbourhoodAndMap(startingMap)
        this.debugMode = debugMode;
        this.disableStoryMode = disableStoryMode;
        this.activeMap.playerStart.playerClass = className;
        this.activeMap.playerStart.name = name;
        loadMapToCanvases( );
        if ( !this.disableStoryMode ) {
            this.story = new StoryProgression( );     
        }
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    loadGame(JSON) {
        console.log(JSON)
        this.initializePlayerParty( "test", JSON.activeMap.playerStart.playerClass )
        this.collectableRegistry.setRegistry( JSON.keyLists.collectableRegistry );
        setInteractionRegistry( JSON.keyLists.interactionRegistry );
        setUnlockedDoorsRegistry( JSON.keyLists.unlockedDoors )
        setNeighbourhoodAndMap(JSON.activeMap.mapName)
        this.activeMap.playerStart = JSON.activeMap.playerStart;
        this.activeMap.playerStart.name = "test";
        loadMapToCanvases( );
        if ( !this.disableStoryMode ) {
            this.story = new StoryProgression( JSON.keyLists.storyEvents );
        }
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    initializePlayerParty( name ) {
        this.party = new Party( [ 
            { name: name, className: MAIN_CHARACTER }
        ] );
        this.party.addItemsToInventory( startingItemIDs )
    }

    initControlsAndAnimation( ) {
        stopLoadingScreen( );
        controls.listenForKeyPress();  
        animationFrameController.animationFrameController( );
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

    save( ) {
        let save = new SaveGameDto( );
        save.saveGameToDto( this )
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
    setFaderDimensions( );
    globals.GAME = new Game( );
    screen.orientation.onchange = ( ) => {
        if ( screen.orientation.type == "landscape-primary" ) {
            setTimeout(()=>{
                if ( globals.GAME.loadingScreen != null ) {
                    globals.GAME.cameraFocus.handleScreenFlip( 
                        {'x': CANVAS_WIDTH / 2, 'y': CANVAS_HEIGHT / 2 }
                    )                
                }
                else {
                    globals.GAME.cameraFocus.handleScreenFlip( 
                        {'x': globals.GAME.PLAYER.centerX, 'y': globals.GAME.PLAYER.baseY }
                    )
                }
                hideFlipScreenModal( );
                setFaderDimensions( );
            }, 100)
        }
        else {
            showFlipScreenModal( );
        }
    }
    if( globals.SCREEN.PORTRAIT ){
        document.getElementById('app-div').requestFullscreen()
        showFlipScreenModal( );
    }
    new FileLoader( [name, className, startingMap, debugMode, disableStoryMode], "NEW" );
    setLoadingScreen( );
}

const setFaderDimensions = ( ) => {
    const fader = document.getElementById('game-fader-canvas')
    fader.style.width = screen.width + "px";
    fader.style.height = screen.height + "px";
}

const showFlipScreenModal = ( ) =>{
    let el = document.getElementById('flip-screen')
    el.style.visibility = 'visible';
    el.style.display = 'block';
}

const hideFlipScreenModal = ( ) => {
    let el = document.getElementById('flip-screen')
    el.style.visibility = 'hidden';
    el.style.display = 'none';
}

const loadGame = ( JSON ) => {
    globals.GAME = new Game( );
    new FileLoader( [JSON], "LOAD" );
    setLoadingScreen( );
}

module.exports = {
    Game,
    startGame,
    loadGame
}