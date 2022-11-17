import { animationLoop } from './animationLoop'
import globals from '../game-data/globals'
import { clearPressedKeys, listenForKeyPress } from './controls'
import { MAIN_CHARACTER } from '../resources/spriteTypeResources'
import { SoundController } from './sound/SoundController'
import { Party } from './party/Party'
import { TypeWriter } from '../helpers/TypeWriter'
import { setLoadingScreen, stopLoadingScreen, LoadingScreen } from './LoadingScreen'
import { Fader, setFaderCanvas } from '../helpers/Fader'
import { FileLoader } from '../helpers/Loader'
import { CollectableRegistry, setCollectableRegistry } from '../registries/collectableRegistry'
import { SaveDto, SaveGameDto } from '../game-data/SaveGameDto'
import { setInteractionRegistry } from '../registries/interactionRegistry'
import { setUnlockedDoorsRegistry } from '../registries/doorRegistry'
import { setNeighbourhoodAndMap, loadMapToCanvases, switchMap } from '../helpers/loadMapHelpers'
import type { Neighbourhood } from './Neighbourhood'
import type { Tile } from './core/Tile'
import type { Sprite } from './core/Sprite'
import type { Character } from './party/Character'
import type { Inventory } from './party/Inventory'
import type { MapModel } from '../models/MapModel'
import type { StackedItem } from './party/StackedItem'
import { setActiveCinematic } from './controllers/cinematicController'
import { dismissActiveAction } from './controllers/actionController'
import { clearSpriteMovementDictionary } from './modules/spriteMovementModule'
import { clearIdleAnimationCounters } from './modules/idleAnimationModule'
import { clearRandomAnimationCounters } from './modules/randomAnimationModule'
import { clearActions } from './modules/actionModule'
import { clearDoors } from './modules/doorModule'
import { clearHitboxes } from './modules/hitboxModule'
import { InteractionType } from '../enumerables/InteractionType'
import type { LoadMapScene } from '../models/SceneAnimationModel'
import { clearSpriteAnimations } from './modules/animationModule'
import { initializeCameraFocus } from './cameraFocus'
import { getCanvasWithType, instantiateGridCanvases } from './controllers/gridCanvasController'
import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum'
import { instantiateUICanvases } from './controllers/utilityCanvasController'
import type { FrontTileGrid } from './canvas/FrontTileGrid'
import type { BackSpriteGrid } from './canvas/BackSpriteGrid'
import type { BackTileGrid } from './canvas/BackTileGrid'
import type { CinematicTrigger } from '../enumerables/CinematicTriggerEnum'
import type { InteractionModel } from '../models/InteractionModel'
import type { CellPosition } from '../models/CellPositionModel'
import { getBackSprites, getPlayer } from './controllers/spriteController'
import { initTilesheetModels } from '../resources/tilesheetResources'
import { openGameCanvas, showGameCanvas } from '../helpers/DOMEventHelpers'
import { setStoryRegistry } from '../registries/storyEventsRegistry'

const startingItemIDs = ["phone_misc_1", "kitty_necklace_armor_3", "dirty_beanie_armor_3", "key_1"];

export class Game {
    cinematicMode: boolean;
    usingCinematicMap: boolean;

    debugMode: boolean;
    paused: boolean;
    inMenu: boolean;
    listeningForPress: boolean;

    collectableRegistry: CollectableRegistry;

    sound: SoundController;
    audio: AudioContext;
    fader: Fader;
    typeWriter: TypeWriter;
    loadingScreen: LoadingScreen;

    party: Party;
    activeNeighbourhood: Neighbourhood;
    currentChapter: string;

    activeMapAtStartOfCinematic: string;
    activeSpritesAtStartOfCinematic: Sprite[];
    playerLocationAtStartOfCinematic: CellPosition;
    constructor( ) {
        this.usingCinematicMap = false;
        this.paused; // bool
        this.inMenu;
        this.listeningForPress; // bool
        this.sound = new SoundController( );
        this.audio = new AudioContext( );
        this.fader = new Fader( );

        this.party; // class Party

        this.activeNeighbourhood;
        this.currentChapter;

        this.initGameCanvases( );
    }

    get FRONTGRID(): FrontTileGrid { return getCanvasWithType( CanvasTypeEnum.foreground ) as FrontTileGrid; }
    get FRONT(): BackSpriteGrid { return getCanvasWithType( CanvasTypeEnum.backSprites ) as BackSpriteGrid; }
    get BACK(): BackTileGrid { return getCanvasWithType( CanvasTypeEnum.background ) as BackTileGrid; }

    get PARTY_MEMBERS( ): Character[] { return this.party.members }
    get PLAYER_INVENTORY( ): Inventory { return this.party.inventory }
    get PLAYER_ITEMS( ): StackedItem[] { return this.party.inventory.ItemList }

    get activeMap( ): MapModel { return this.activeNeighbourhood.activeMap; }
    get activeMapKey( ): string { return this.activeNeighbourhood.activeMapKey; }
    get previousMapKey( ): string { return this.activeNeighbourhood.previousMapKey; }

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

    initGameCanvases(): void {
        instantiateGridCanvases();
        instantiateUICanvases();
    }

    startNewGame( name: string, spriteKey: string, startingMapName: string, debugMode: boolean, disableStoryMode: boolean ): void {
        initTilesheetModels();
        this.initializePlayerParty( name );
        setNeighbourhoodAndMap(startingMapName)
        this.debugMode = debugMode;
        setStoryRegistry( disableStoryMode )
        loadMapToCanvases( this.activeMap, "NEW" );
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    loadGame( JSON: SaveDto ): void {
        console.log(JSON)
        this.initializePlayerParty( "test" )
        setCollectableRegistry( JSON.keyLists.collectableRegistry );
        setInteractionRegistry( JSON.keyLists.interactionRegistry );
        setUnlockedDoorsRegistry( JSON.keyLists.unlockedDoors );
        setNeighbourhoodAndMap( JSON.activeMap.mapName );
        setStoryRegistry( false, JSON.keyLists.storyEvents );
        this.activeMap.playerStart = JSON.activeMap.playerStart;
        this.activeMap.playerStart.name = "test";
        loadMapToCanvases( this.activeMap, "LOAD" );
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

    clearActiveMap() {
        clearHitboxes();
        clearDoors();
        clearActions();
        clearRandomAnimationCounters();
        clearIdleAnimationCounters();
        clearSpriteMovementDictionary();
        clearSpriteAnimations();
        dismissActiveAction();
        clearPressedKeys();
        this.FRONT.resetTilesBlockedBySprites();
    }

    switchMap( destinationName: string, type: InteractionType, playerStart: CellPosition = null ): void {
        this.clearActiveMap()
        switchMap( destinationName, type, playerStart );
    }

    loadCinematicMap( loadMapScene: LoadMapScene ) {
        this.switchMap( loadMapScene.mapName, InteractionType.cinematic );
    }

    handleCinematicEnd() {
        if ( this.activeMapAtStartOfCinematic !== this.activeMapKey ) {
            this.switchMap( this.activeMapAtStartOfCinematic, InteractionType.cinematic_end, this.playerLocationAtStartOfCinematic )
        }
    }

    saveActiveMap() {
        const player = getPlayer();
        this.activeMapAtStartOfCinematic = this.activeMapKey;
        this.activeSpritesAtStartOfCinematic = [...getBackSprites()];
        this.playerLocationAtStartOfCinematic = { column: player.column, row: player.row, direction: player.direction }
    }

    setActiveCinematic( action: InteractionModel, trigger: CinematicTrigger, options: any[] ): void {
        setActiveCinematic( action, trigger, options );
    }

    save(): void {
        let save = new SaveGameDto( );
        save.saveGameToDto( this )
    }
}

export const startGame = ( name: string, className: string, startingMap: string, debugMode: boolean, disableStoryMode: boolean ): void => {
    showGameCanvas();

    setTimeout( () => {
        initializeCameraFocus();
        setFaderCanvas();
        globals.GAME = new Game();

        openGameCanvas();
        new FileLoader( [name, className, startingMap, debugMode, disableStoryMode], "NEW" );
        setLoadingScreen();
    }, 100 )
}

export const loadGame = ( JSON: any ): void => {
    globals.GAME = new Game( );
    new FileLoader( [JSON], "LOAD" );
    setLoadingScreen( );
}