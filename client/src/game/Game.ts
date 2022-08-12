import { animationLoop } from './animationLoop'
import globals, { GRID_BLOCK_PX } from '../game-data/globals'
import { clearPressedKeys, listenForKeyPress } from './controls'
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
import { setNeighbourhoodAndMap, loadMapToCanvases, getCinematicBack, getCinematicFront, getCinematicFrontgrid, switchMap, loadCinematicMap, hasCinematicMapLoaded, clearCinematicGrids, clearMapFromCanvases, initCinematicGrids } from '../helpers/loadMapHelpers'
import type { CanvasContextModel } from '../models/CanvasContextModel'
import type { Neighbourhood } from './Neighbourhood'
import type { Tile } from './core/Tile'
import type { Sprite } from './core/Sprite'
import type { Character } from './party/Character'
import type { Inventory } from './party/Inventory'
import type { MapModel } from '../models/MapModel'
import type { StackedItem } from './party/StackedItem'
import type { CanvasWithGrid } from './core/CanvasWithGrid'
import { cinematicIsActive } from './controllers/cinematicController'
import { dismissActiveAction } from './controllers/actionController'
import { clearSpriteMovementDictionary } from './modules/spriteMovementModule'
import { clearIdleAnimationCounters } from './modules/idleAnimationModule'
import { clearRandomAnimationCounters } from './modules/randomAnimationModule'
import { clearActions } from './modules/actionModule'
import { clearDoors } from './modules/doorModule'
import { clearHitboxes } from './modules/hitboxModule'
import type { InteractionType } from '../enumerables/InteractionType'
import type { LoadMapScene } from '../models/SceneAnimationModel'

const startingItemIDs = ["phone_misc_1", "kitty_necklace_armor_3", "dirty_beanie_armor_3", "key_1"];

export class Game {
    cinematicMode: boolean;
    usingCinematicMap: boolean;

    debugMode: boolean;
    disableStoryMode: boolean;
    paused: boolean;
    inMenu: boolean;
    listeningForPress: boolean;

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

    party: Party;
    _activeNeighbourhood: Neighbourhood;
    cinematicNeighbourhood: Neighbourhood;
    currentChapter: string;
    constructor( ) {
        this.usingCinematicMap = false;
        this.paused; // bool
        this.inMenu;
        this.listeningForPress; // bool
        this.cameraFocus = new CameraFocus( );
        this.collectableRegistry = new CollectableRegistry( );
        this.sound = new SoundController( );
        this.audio = new AudioContext( );
        this.fader = new Fader( );
        this.story;

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
    get useCinematicMap(): boolean { return this.usingCinematicMap && cinematicIsActive(); }

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
        this.utilBack = this.initCanvas( 'UTIL_BACK' );
        this.utilFront = this.initCanvas( 'UTIL_FRONT' );
        this.frontgrid = this.initCanvas( 'FRONT_GRID')
        this.front = this.initCanvas( 'FRONT', );
        this.back = this.initCanvas( 'BACK' );
        this.menu = this.initCanvas( 'MENU' );
        if ( globals.SCREEN.MOBILE ) {
            this.speechBubblesCanvas = this.initCanvas( 'SPEECH' );
        }
    }

    initCanvas( type: string ): CanvasContextModel {
        switch( type ) {
            case 'BACK':
                return this.initializeGameCanvas( 'game-background-canvas', CANVAS_WIDTH, CANVAS_HEIGHT, true, BackgroundCanvas );
            case 'FRONT':
                return this.initializeGameCanvas( 'game-front-canvas', CANVAS_WIDTH, CANVAS_HEIGHT, true, ForegroundCanvas );
            case 'FRONT_GRID':
                return this.initializeGameCanvas( 'game-front-grid-canvas', CANVAS_WIDTH, CANVAS_HEIGHT, true, FrontgridCanvas );
            case 'MENU':
                let object = this.initializeGameCanvas(
                    'game-menu-canvas',
                    globals.SCREEN.MOBILE ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH,
                    globals.SCREEN.MOBILE ? GRID_BLOCK_PX * 8 : CANVAS_HEIGHT,
                    true, MenuCanvas
                );
                if ( globals.SCREEN.MOBILE ) {
                    object.canvas.style.position = 'fixed';
                    object.canvas.style.top = "0";
                }
                return object;
            case 'UTIL_BACK':
                return this.initializeGameCanvas( 'game-utility-canvas-back', GRID_BLOCK_PX, GRID_BLOCK_PX, false  );
            case 'UTIL_FRONT':
                return this.initializeGameCanvas( 'game-utility-canvas-front', GRID_BLOCK_PX, GRID_BLOCK_PX, false );
            case 'SPEECH':  
                return this.initializeGameCanvas( 'game-bubble-canvas', GRID_BLOCK_PX * 12, GRID_BLOCK_PX * 8, true, SpeechBubbleCanvas );
        } 
    }

    initializeGameCanvas( id: string, width: number, height: number, hasClass: boolean, ClassType: typeof CanvasWithGrid = null ): CanvasContextModel {
        const canvas = document.getElementById( id ) as HTMLCanvasElement;
        const ctx = canvas.getContext( '2d' );
        canvas.width = width;
        canvas.height = height;
        if ( hasClass ) {
            var xy = canvas.getBoundingClientRect();
            return {
                canvas: canvas,
                ctx: ctx,
                class: new ClassType( xy.x, xy.y, ctx, canvas )
            }
        }
        else {
            return {
                canvas: canvas,
                ctx: ctx
            }
        }

    }

    startNewGame( name: string, spriteKey: string, startingMapName: string, debugMode: boolean, disableStoryMode: boolean ): void {
        this.initializePlayerParty( name );
        setNeighbourhoodAndMap(startingMapName)
        this.debugMode = debugMode;
        this.disableStoryMode = disableStoryMode;
        loadMapToCanvases( this.activeMap, "NEW", true );
        this.story = new StoryProgression(); 
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
        this.story = new StoryProgression( JSON.keyLists.storyEvents );
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
        animationLoop( );
    }

    switchMap( destinationName: string, type: InteractionType ): void {
        clearHitboxes();
        clearDoors();
        clearActions();
        clearRandomAnimationCounters();
        clearIdleAnimationCounters();
        clearSpriteMovementDictionary();
        dismissActiveAction();
        clearPressedKeys();
        switchMap( destinationName, type );
    }

    loadCinematicMap( loadMapScene: LoadMapScene ) {
        loadCinematicMap( loadMapScene.mapName, loadMapScene.setPlayerSprite );   
    }

    hasCinematicMapLoaded(): boolean {
        return hasCinematicMapLoaded();
    }

    clearCinematicGrids() {
        clearCinematicGrids();
    }

    clearMapFromCanvases() {
        clearMapFromCanvases();
    }

    initCinematicGrids() {
        initCinematicGrids();
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