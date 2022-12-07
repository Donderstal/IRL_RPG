import { GameType } from "../enumerables/GameType";
import { openGameCanvas, showGameCanvas } from "../helpers/DOMEventHelpers";
import { clearActiveMap, loadMapToCanvases, setNeighbourhoodAndMap } from "../helpers/loadMapHelpers";
import { mobileAgent } from "../helpers/screenOrientation";
import { initializeBubbleCanvases } from "../helpers/speechBubbleHelpers";
import { setCollectableRegistry } from "../registries/collectableRegistry";
import { setUnlockedDoorsRegistry } from "../registries/doorRegistry";
import { setInteractionRegistry } from "../registries/interactionRegistry";
import { initTilesheetModels } from "../resources/tilesheetResources";
import { animationLoop, stopAnimationLoop } from "./animationLoop";
import { cameraFocus, initializeCameraFocus } from "./cameraFocus";
import { prepareCanvasElementsForGame } from "./canvas/canvasSetter";
import { listenForKeyPress, stopListenForKeyPress } from "./controls";
import { filesAreLoaded, startFileLoader } from "../assets/fileLoader";
import { setDebugModeState, setDisableStoryState } from "./gameState/gameStateSetter";
import { setLoadingScreen, stopLoadingScreen } from "./loadingScreen";
import { getActiveMap } from "./neighbourhoodModule";
import { setNewParty } from "./party/partyController";
import { setStoryEvents } from "./storyEvents/storyEventSetter";
import { initializeDataModels } from "../resources/spriteDataResources";
import { PlayerMapEntry } from "../enumerables/PlayerMapEntryEnum";


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

export const stopGameAndClearGameData = (): void => {
    stopControlsAndAnimation();
    clearActiveMap();
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

    loadMapToCanvases( getActiveMap(), PlayerMapEntry.newGame );
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

    loadMapToCanvases( getActiveMap(), PlayerMapEntry.loadGame );
    setTimeout( initControlsAndAnimation, 1000 );
}

const initControlsAndAnimation = (): void => {
    stopLoadingScreen();
    initializeBubbleCanvases();
    listenForKeyPress();
    animationLoop();
}

const stopControlsAndAnimation = (): void => {
    stopListenForKeyPress();
    stopAnimationLoop();
}