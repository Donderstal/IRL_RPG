import { GameType } from "./enumerables/GameType";
import { openGameCanvas, showGameCanvas } from "./helpers/DOMEventHelpers";
import { clearActiveMap, loadMapToCanvases, setNeighbourhoodAndMap } from "./helpers/loadMapHelpers";
import { mobileAgent } from "./helpers/screenOrientation";
import { initializeBubbleCanvases } from "./helpers/speechBubbleHelpers";
import { setCollectableRegistry } from "./registries/collectableRegistry";
import { setUnlockedDoorsRegistry } from "./registries/doorRegistry";
import { setInteractionRegistry } from "./registries/interactionRegistry";
import { initTilesheetModels } from "./resources/tilesheetResources";
import { animationLoop, stopAnimationLoop } from "./frameLoop";
import { cameraFocus, initializeCameraFocus } from "./game/cameraFocus";
import { prepareCanvasElementsForGame } from ".//game/canvas/canvasSetter";
import { handleFileLoadQueues, startFileLoader } from "./assets/fileLoader";
import { setDebugModeState, setDisableStoryState, updateGameControlState } from "./state/stateSetter";
import { setLoadingScreen, stopLoadingScreen } from "./game/loadingScreen";
import { getActiveMap } from "./game/neighbourhoodModule";
import { setNewParty } from "./game/party/partyController";
import { initializeDataModels } from "./resources/spriteDataResources";
import { PlayerMapEntry } from "./enumerables/PlayerMapEntryEnum";
import type { SaveGame } from "./models/SaveGameModel";
import { setScreenTextCanvas } from "./helpers/screenTextModule";
import { State } from "./enumerables/StateEnum";


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
        setScreenTextCanvas( cameraFocus.screenWidth, cameraFocus.screenHeight )
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
    if ( handleFileLoadQueues() ) {
        clearInterval( checkForLoadedFilesInterval );
        gameType === GameType.newGame ? startNewGame() : loadGameFromSave();
    }
}

const startNewGame = ( ): void => {
    initTilesheetModels();
    initializeDataModels();
    setNewParty( params[0] );
    setNeighbourhoodAndMap( params[2], PlayerMapEntry.newGame );
    setDebugModeState( params[3] );
    setDisableStoryState( params[4] );

    loadMapToCanvases( getActiveMap(), PlayerMapEntry.newGame );
    setTimeout( initControlsAndAnimation, 1000 );
}

const loadGameFromSave = (): void => {
    const saveGame: SaveGame = params[0];
    console.log( saveGame );
    initTilesheetModels();
    initializeDataModels();
    setNewParty( saveGame.playerData.name );
    setNeighbourhoodAndMap( saveGame.activeMap.mapName, PlayerMapEntry.loadGame );

    setDebugModeState( false );
    setDisableStoryState( true );
    setCollectableRegistry( saveGame.keyLists.collectableRegistry );
    setInteractionRegistry( saveGame.keyLists.interactionRegistry );
    setUnlockedDoorsRegistry( saveGame.keyLists.unlockedDoors );

    loadMapToCanvases( getActiveMap(), PlayerMapEntry.loadGame );
    setTimeout( initControlsAndAnimation, 1000 );
}

const initControlsAndAnimation = (): void => {
    updateGameControlState(State.open_world);
    stopLoadingScreen();
    initializeBubbleCanvases();
    animationLoop();
}

const stopControlsAndAnimation = (): void => {
    stopAnimationLoop();
}