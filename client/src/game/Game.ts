import { animationLoop } from './animationLoop'
import globals from '../game-data/globals'
import { clearPressedKeys, listenForKeyPress } from './controls'
import { MAIN_CHARACTER } from '../resources/spriteTypeResources'
import { Party } from './party/Party'
import { setLoadingScreen, stopLoadingScreen } from './loadingScreen'
import { FileLoader } from '../helpers/Loader'
import { setCollectableRegistry } from '../registries/collectableRegistry'
import { SaveDto, SaveGameDto } from '../game-data/SaveGameDto'
import { setInteractionRegistry } from '../registries/interactionRegistry'
import { setUnlockedDoorsRegistry } from '../registries/doorRegistry'
import { setNeighbourhoodAndMap, loadMapToCanvases, switchMap } from '../helpers/loadMapHelpers'
import type { Sprite } from './core/Sprite'
import type { Character } from './party/Character'
import type { Inventory } from './party/Inventory'
import type { StackedItem } from './party/StackedItem'
import { setActiveCinematic } from './controllers/cinematicController'
import { dismissActiveAction } from './controllers/actionController'
import { clearSpriteDestinations } from './modules/destinations/destinationSetter'
import { clearIdleAnimationCounters } from './modules/idleAnimCounters/idleAnimSetter';
import { clearRandomAnimationCounters } from './modules/randomAnimCounters/randomAnimSetter'
import { clearDoors } from './modules/doors/doorSetter'
import { clearHitboxes } from './modules/hitboxes/hitboxSetter';
import { InteractionType } from '../enumerables/InteractionType'
import type { LoadMapScene } from '../models/SceneAnimationModel'
import { clearSpriteAnimations } from './modules/animations/animationSetter'
import { cameraFocus, initializeCameraFocus } from './cameraFocus'
import type { CinematicTrigger } from '../enumerables/CinematicTriggerEnum'
import type { InteractionModel } from '../models/InteractionModel'
import type { CellPosition } from '../models/CellPositionModel'
import {  getPlayer } from "./modules/sprites/spriteGetter";
import { initTilesheetModels } from '../resources/tilesheetResources'
import { openGameCanvas, showGameCanvas } from '../helpers/DOMEventHelpers'
import { clearActions } from './modules/actions/actionSetter'
import { getAllActiveSprites } from './modules/sprites/spriteGetter'
import { initializeBubbleCanvases } from '../helpers/speechBubbleHelpers'
import { getActiveMap, getActiveMapKey } from './neighbourhoodModule'
import { prepareCanvasElementsForGame } from './canvas/canvasSetter'
import { mobileAgent } from '../helpers/screenOrientation'
import { getBackSpritesGrid } from './canvas/canvasGetter'
import { setStoryEvents } from './storyEvents/storyEventSetter'

const startingItemIDs = ["phone_misc_1", "kitty_necklace_armor_3", "dirty_beanie_armor_3", "key_1"];

export class Game {
    cinematicMode: boolean;
    usingCinematicMap: boolean;

    debugMode: boolean;
    paused: boolean;
    inMenu: boolean;
    listeningForPress: boolean;

    party: Party;
    currentChapter: string;

    activeMapAtStartOfCinematic: string;
    activeSpritesAtStartOfCinematic: Sprite[];
    playerLocationAtStartOfCinematic: CellPosition;
    constructor( ) {
        this.usingCinematicMap = false;
        this.paused; // bool
        this.inMenu;
        this.listeningForPress; // bool

        this.party; // class Party
        this.currentChapter;

        prepareCanvasElementsForGame( cameraFocus.screenWidth, cameraFocus.screenHeight, mobileAgent );
    }

    get PARTY_MEMBERS( ): Character[] { return this.party.members }
    get PLAYER_INVENTORY( ): Inventory { return this.party.inventory }
    get PLAYER_ITEMS( ): StackedItem[] { return this.party.inventory.ItemList }

    startNewGame( name: string, spriteKey: string, startingMapName: string, debugMode: boolean, disableStoryMode: boolean ): void {
        initTilesheetModels();
        this.initializePlayerParty( name );
        setNeighbourhoodAndMap(startingMapName)
        this.debugMode = debugMode;
        setStoryEvents( disableStoryMode )
        loadMapToCanvases( getActiveMap(), "NEW" );
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    loadGame( JSON: SaveDto ): void {
        console.log(JSON)
        this.initializePlayerParty( "test" )
        setCollectableRegistry( JSON.keyLists.collectableRegistry );
        setInteractionRegistry( JSON.keyLists.interactionRegistry );
        setUnlockedDoorsRegistry( JSON.keyLists.unlockedDoors );
        setNeighbourhoodAndMap( JSON.activeMap.mapName );
        setStoryEvents( false, JSON.keyLists.storyEvents );
        const map = getActiveMap();
        map.playerStart = JSON.activeMap.playerStart;
        map.playerStart.name = "test";
        loadMapToCanvases( map, "LOAD" );
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    initializePlayerParty( name: string ): void {
        this.party = new Party( [ 
            { name: name, className: MAIN_CHARACTER }
        ] );
        this.party.addItemsToInventory( startingItemIDs )
    }

    initControlsAndAnimation(): void {
        stopLoadingScreen();
        initializeBubbleCanvases();
        listenForKeyPress();  
        animationLoop( );
    }

    clearActiveMap() {
        clearHitboxes();
        clearDoors();
        clearActions();
        clearRandomAnimationCounters();
        clearIdleAnimationCounters();
        clearSpriteDestinations();
        clearSpriteAnimations();
        dismissActiveAction();
        clearPressedKeys();
        getBackSpritesGrid().resetTilesBlockedBySprites();
    }

    switchMap( destinationName: string, type: InteractionType, playerStart: CellPosition = null ): void {
        this.clearActiveMap()
        switchMap( destinationName, type, playerStart );
    }

    loadCinematicMap( loadMapScene: LoadMapScene ) {
        this.switchMap( loadMapScene.mapName, InteractionType.cinematic );
    }

    handleCinematicEnd() {
        if ( this.activeMapAtStartOfCinematic !== getActiveMapKey() ) {
            this.switchMap( this.activeMapAtStartOfCinematic, InteractionType.cinematic_end, this.playerLocationAtStartOfCinematic )
        }
    }

    saveActiveMap() {
        const player = getPlayer();
        this.activeMapAtStartOfCinematic = getActiveMapKey();
        this.activeSpritesAtStartOfCinematic = [...getAllActiveSprites()];
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