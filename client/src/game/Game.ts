import { animationFrameController } from './animationFrameController'
import globals, { GRID_BLOCK_PX } from '../game-data/globals'
import { listenForKeyPress } from './controls'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../game-data/globals'
import { MAIN_CHARACTER } from '../resources/spriteTypeResources'
import { SoundController } from './sound/SoundController'
import { ForegroundCanvas } from './ForegroundCanvas'
import { BackgroundCanvas } from './BackgroundCanvas'
import { Party } from './party/Party'
import { TypeWriter } from '../helpers/TypeWriter'
import { setLoadingScreen, stopLoadingScreen, LoadingScreen } from './LoadingScreen'
import { StoryProgression } from '../helpers/StoryProgression'
import { Fader } from '../helpers/Fader'
import { FileLoader } from '../helpers/Loader'
import { SpeechBubbleCanvas } from './cutscenes/SpeechBubbleCanvas'
import { CollectableRegistry } from '../helpers/collectableRegistry'
import { FrontgridCanvas } from './FrontgridCanvas'
import { SaveDto, SaveGameDto } from '../game-data/SaveGameDto'
import { setInteractionRegistry } from '../helpers/interactionRegistry'
import { setUnlockedDoorsRegistry } from '../helpers/doorRegistry'
import { MenuCanvas } from './menuCanvas/MenuCanvas'
import { CameraFocus } from '../helpers/cameraFocus'
import { setNeighbourhoodAndMap, loadMapToCanvases, getCinematicBack, getCinematicFront, getCinematicFrontgrid } from '../helpers/loadMapHelpers'
import type { Interaction } from './cutscenes/Interaction'
import { SpeechBubbleController } from './cutscenes/SpeechBubbleController'
import type { SpeechBubble } from './cutscenes/SpeechBubble'
import type { CanvasContextModel } from '../models/CanvasContextModel'
import type { Neighbourhood } from './Neighbourhood'
import type { Tile } from './core/Tile'
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum'
import type { Sprite } from './core/Sprite'
import type { Character } from './party/Character'
import type { Inventory } from './party/Inventory'
import type { MapModel } from '../models/MapModel'
import type { StackedItem } from './party/StackedItem'
import type { ActionSelector } from './map/map-classes/ActionSelector'
import type { MapAction } from './map/map-classes/MapAction'

const startingItemIDs = ["phone_misc_1", "kitty_necklace_armor_3", "dirty_beanie_armor_3", "key_1"];

export class Game {
    cinematicMode: boolean;
    inCinematic: boolean;
    activeCinematic: Interaction;
    usingCinematicMap: boolean;

    debugMode: boolean;
    disableStoryMode: boolean;
    paused: boolean;
    inMenu: boolean;
    listeningForPress: boolean;

    pressedKeys: { [key in string]: boolean };
    speechBubbleController: SpeechBubbleController;
    activeBubble: SpeechBubble;
    bubbleIsActive: boolean;
    cameraFocus: CameraFocus;
    collectableRegistry: CollectableRegistry;

    menu: CanvasContextModel;
    frontgrid: CanvasContextModel;
    utilFront: CanvasContextModel;
    front: CanvasContextModel;
    back: CanvasContextModel;
    utilBack: CanvasContextModel;
    speechBubblesCanvas: CanvasContextModel;

    sound: SoundController;
    audio: AudioContext;
    fader: Fader;
    story: StoryProgression;
    typeWriter: TypeWriter;
    loadingScreen: LoadingScreen;
    activeAction: MapAction|ActionSelector;

    party: Party;
    _activeNeighbourhood: Neighbourhood;
    cinematicNeighbourhood: Neighbourhood;
    currentChapter: string;
    constructor( ) {
        this.inCinematic = false;
        this.activeCinematic = null;
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

        this.activeBubble = null
        this.bubbleIsActive;

        this.menu = null;
        this.frontgrid = null;
        this.utilFront = null;
        this.front = null;
        this.back = null;
        this.utilBack = null;
        this.speechBubblesCanvas = null;
        this.party; // class Party

        this._activeNeighbourhood;
        this.cinematicNeighbourhood;
        this.currentChapter;

        this.initGameCanvases( );
    }

    get MENU(): MenuCanvas { return this.menu.class as MenuCanvas }
    get FRONTGRID(): FrontgridCanvas { return ( this.useCinematicMap ? getCinematicFrontgrid() : this.frontgrid.class ) as FrontgridCanvas }
    get FRONT(): ForegroundCanvas { return ( this.useCinematicMap ? getCinematicFront() : this.front.class ) as ForegroundCanvas }
    get BACK( ): BackgroundCanvas { return (this.useCinematicMap ? getCinematicBack() : this.back.class) as BackgroundCanvas }

    get PLAYER( ): Sprite { return this.useCinematicMap ? getCinematicFront().playerSprite : this.front.class.playerSprite }
    get PARTY_MEMBERS( ): Character[] { return this.party.members }
    get PLAYER_INVENTORY( ): Inventory { return this.party.inventory }
    get PLAYER_ITEMS( ): StackedItem[] { return this.party.inventory.ItemList }

    get activeMap( ): MapModel { return this.useCinematicMap ? this.cinematicNeighbourhood.activeMap : this.activeNeighbourhood.activeMap; }
    get activeMapName( ): string { return this.useCinematicMap ? this.cinematicNeighbourhood.activeMapKey : this.activeNeighbourhood.activeMapKey; }
    get previousMapName( ): string { return this.activeNeighbourhood.previousMapKey; }
    get useCinematicMap( ): boolean { return this.usingCinematicMap && this.inCinematic; }

    get activeNeighbourhood() {
        return (this.useCinematicMap ? this.cinematicNeighbourhood : this._activeNeighbourhood);
    }

    set activeNeighbourhood( value ) {
        this._activeNeighbourhood = value;
    }

    get activeText(): string {
        return this.typeWriter.activeText.map( ( ( e ) => { return e.activeWord; } )).toString();
    }

    set activeText( text: string ) {
        this.typeWriter = new TypeWriter( text );
    }

    getTileOnCanvasAtIndex( canvasName: string, index: number ): Tile {
        const canvasClass = canvasName == 'FRONT' ? this.FRONT : this.BACK
        return canvasClass.getTileAtIndex( index ); 
    }

    getTileOnCanvasAtXY( canvasName: string, x: number, y: number ): Tile {
        const canvasClass = canvasName == 'FRONT' ? this.FRONT : this.BACK
        return canvasClass.getTileAtXY( x, y );
    }

    getTileOnCanvasAtCell( canvasName: string, column: number, row: number ): Tile {
        const canvasClass = canvasName == 'FRONT' ? this.FRONT : this.BACK
        return canvasClass.getTileAtCell( column, row ); 
    }

    initGameCanvases( ): void {
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

    initCanvas( type, object: CanvasContextModel ): void {
        switch( type ) {
            case 'BACK':
                object.canvas = document.getElementById( 'game-background-canvas' ) as HTMLCanvasElement;
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = CANVAS_WIDTH;
                object.canvas.height = CANVAS_HEIGHT;
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new BackgroundCanvas( xy.x, xy.y, object.ctx );
                break;
            case 'FRONT':
                object.canvas = document.getElementById( 'game-front-canvas' ) as HTMLCanvasElement;
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = CANVAS_WIDTH;
                object.canvas.height = CANVAS_HEIGHT;
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new ForegroundCanvas( xy.x, xy.y, object.ctx );
                break;
            case 'FRONT_GRID':
                object.canvas = document.getElementById( 'game-front-grid-canvas' ) as HTMLCanvasElement;
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = CANVAS_WIDTH;
                object.canvas.height = CANVAS_HEIGHT;
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new FrontgridCanvas( xy.x, xy.y, object.ctx );
                break;
            case 'MENU':
                object.canvas = document.getElementById( 'game-menu-canvas' ) as HTMLCanvasElement;
                object.ctx = object.canvas.getContext( '2d' );
                if ( globals.SCREEN.MOBILE ) {
                    object.canvas.width = GRID_BLOCK_PX * 8;
                    object.canvas.height = GRID_BLOCK_PX * 8;
                    object.canvas.style.position = 'fixed';
                    object.canvas.style.top = "0";
                }
                else {
                    object.canvas.width = CANVAS_WIDTH;
                    object.canvas.height = CANVAS_HEIGHT;                  
                }
                var xy = object.canvas.getBoundingClientRect( );
                object.class = new MenuCanvas( xy.x, xy.y, object.ctx, object.canvas);  
                break;
            case 'UTIL_BACK':
                object.canvas = document.getElementById( 'game-utility-canvas-back' ) as HTMLCanvasElement;;
                object.ctx = object.canvas.getContext( '2d' );
                break;
            case 'UTIL_FRONT':
                object.canvas = document.getElementById( 'game-utility-canvas-front' ) as HTMLCanvasElement;;
                object.ctx = object.canvas.getContext( '2d' );
                break;  
            case 'SPEECH':
                object.canvas = document.getElementById( 'game-bubble-canvas' ) as HTMLCanvasElement;;
                object.ctx = object.canvas.getContext( '2d' );
                object.canvas.width = GRID_BLOCK_PX * 12;
                object.canvas.height = GRID_BLOCK_PX * 8;
                object.class = new SpeechBubbleCanvas( 0, 0, object.ctx, object.canvas);        
                break;
            default:
                console.log('error! canvas type ' + type + ' not known')
        } 
    }

    startNewGame( name: string, spriteKey: string, startingMapName: string, debugMode: boolean, disableStoryMode: boolean ): void {
        this.initializePlayerParty( name )    
        setNeighbourhoodAndMap(startingMapName)
        this.debugMode = debugMode;
        this.disableStoryMode = disableStoryMode;
        this.activeMap.playerStart.playerClass = spriteKey;
        this.activeMap.playerStart.name = name;
        loadMapToCanvases( this.activeMap, "NEW", true );
        if ( !this.disableStoryMode ) {
            this.story = new StoryProgression( );     
        }
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    loadGame( JSON: SaveDto ): void {
        console.log(JSON)
        this.initializePlayerParty( "test" )
        this.collectableRegistry.setRegistry( JSON.keyLists.collectableRegistry );
        setInteractionRegistry( JSON.keyLists.interactionRegistry );
        setUnlockedDoorsRegistry( JSON.keyLists.unlockedDoors )
        setNeighbourhoodAndMap(JSON.activeMap.mapName)
        this.activeMap.playerStart = JSON.activeMap.playerStart;
        this.activeMap.playerStart.name = "test";
        loadMapToCanvases( this.activeMap, "LOAD", true );
        if ( !this.disableStoryMode ) {
            this.story = new StoryProgression( JSON.keyLists.storyEvents );
        }
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    initializePlayerParty( name: string ): void {
        this.party = new Party( [ 
            { name: name, className: MAIN_CHARACTER }
        ] );
        this.party.addItemsToInventory( startingItemIDs )
    }

    initControlsAndAnimation(): void {
        stopLoadingScreen( );
        listenForKeyPress();  
        animationFrameController( );
    }
    
    activateCinematic( interaction: Interaction ): void {
        if ( interaction.trigger === CinematicTrigger.interaction ) {
            const sprite = this.FRONT.spriteDictionary[interaction.args[0]];
            sprite.State.cinematicOn( sprite );
        }
        this.activeCinematic = interaction;
        this.inCinematic = true;
    }

    deActivateCinematic(): void {
        this.activeCinematic = null;
        this.inCinematic = false;
    }

    save(): void {
        let save = new SaveGameDto( );
        save.saveGameToDto( this )
    }
}

export const startGame = ( name: string, className: string, startingMap: string, debugMode: boolean, disableStoryMode: boolean ): void => {
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

const setFaderDimensions = (): void => {
    const fader = document.getElementById('game-fader-canvas')
    fader.style.width = screen.width + "px";
    fader.style.height = screen.height + "px";
}

const showFlipScreenModal = (): void =>{
    let el = document.getElementById('flip-screen')
    el.style.visibility = 'visible';
    el.style.display = 'block';
}

const hideFlipScreenModal = (): void => {
    let el = document.getElementById('flip-screen')
    el.style.visibility = 'hidden';
    el.style.display = 'none';
}

export const loadGame = ( JSON: any ): void => {
    globals.GAME = new Game( );
    new FileLoader( [JSON], "LOAD" );
    setLoadingScreen( );
}