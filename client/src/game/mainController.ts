import { GameType } from "../enumerables/GameType";
import type { InteractionType } from "../enumerables/InteractionType";
import { SaveGameDto } from "../game-data/SaveGameDto";
import { openGameCanvas, showGameCanvas } from "../helpers/DOMEventHelpers";
import { loadMapToCanvases, setNeighbourhoodAndMap } from "../helpers/loadMapHelpers";
import { mobileAgent } from "../helpers/screenOrientation";
import { initializeBubbleCanvases } from "../helpers/speechBubbleHelpers";
import type { CellPosition } from "../models/CellPositionModel";
import { setCollectableRegistry } from "../registries/collectableRegistry";
import { setUnlockedDoorsRegistry } from "../registries/doorRegistry";
import { setInteractionRegistry } from "../registries/interactionRegistry";
import { initTilesheetModels } from "../resources/tilesheetResources";
import { animationLoop } from "./animationLoop";
import { cameraFocus, initializeCameraFocus } from "./cameraFocus";
import { prepareCanvasElementsForGame } from "./canvas/canvasSetter";
import { listenForKeyPress } from "./controls";
import { filesAreLoaded, startFileLoader } from "../assets/fileLoader";
import { setDebugModeState, setDisableStoryState } from "./gameState/gameStateSetter";
import { setLoadingScreen, stopLoadingScreen } from "./loadingScreen";
import { getActiveMap } from "./neighbourhoodModule";
import { setNewParty } from "./party/partyController";
import { setStoryEvents } from "./storyEvents/storyEventSetter";
import { initializeDataModels } from "../resources/spriteDataResources";


let params: any[] = null;
let gameType: GameType = null;
let checkForLoadedFilesInterval: NodeJS.Timer = null;

export const loadFilesAndStartGame = ( startType: GameType, parameters: any[] ): void => {
    gameType = startType;
    params = parameters;

    showGameCanvas();
    setTimeout( () => {
        initializeCameraFocus();
        prepareCanvasElementsForGame( cameraFocus.screenWidth, cameraFocus.screenHeight, mobileAgent );
        openGameCanvas();
        setLoadingScreen();
        startFileLoader();
    } ,10 )

    checkForLoadedFilesInterval = setInterval( checkIfFilesAreLoaded, 100 );
}

const checkIfFilesAreLoaded = () => {
    if ( filesAreLoaded() ) {
        clearInterval( checkForLoadedFilesInterval );
        gameType === GameType.newGame ? startNewGame() : loadGameFromSave();
    }
}

const startNewGame = ( ): void => {
    initTilesheetModels();
    initializeDataModels();
    setNewParty( params[0] );
    setNeighbourhoodAndMap( params[2] );
    setDebugModeState( params[3] );
    setDisableStoryState( params[4] );
    setStoryEvents();

    loadMapToCanvases( getActiveMap(), "NEW" );
    setTimeout( initControlsAndAnimation, 1000 );
}

const loadGameFromSave = (): void => {
    const json = params[0];

    initTilesheetModels();
    initializeDataModels();
    setNewParty( "test" )
    setNeighbourhoodAndMap( json.activeMap.mapName );
    setStoryEvents( json.keyLists.storyEvents );

    setDebugModeState( false );
    setDisableStoryState( false );
    setCollectableRegistry( json.keyLists.collectableRegistry );
    setInteractionRegistry( json.keyLists.interactionRegistry );
    setUnlockedDoorsRegistry( json.keyLists.unlockedDoors );

    const map = getActiveMap();
    map.playerStart = json.activeMap.playerStart;
    map.playerStart.name = "test";

    loadMapToCanvases( map, "LOAD" );
    setTimeout( initControlsAndAnimation, 1000 );
}

const initControlsAndAnimation = (): void => {
    stopLoadingScreen();
    initializeBubbleCanvases();
    listenForKeyPress();
    animationLoop();
}

export const switchMap = ( destinationName: string, type: InteractionType, playerStart: CellPosition = null ): void => {
    switchMap( destinationName, type, playerStart );
}

export const save = (): void => {
    let save = new SaveGameDto();
    save.saveGameToDto()
}