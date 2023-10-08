import { handleFileLoadQueues, startFileLoader } from "./assets/fileLoader";
import { ControlState } from "./enumerables/ControlState";
import { StateType } from "./enumerables/StateType";
import { TriggerType } from "./enumerables/TriggerType";
import { addToEventChainQueue } from "./eventchain-queue/eventChainQueue";
import { handleEventChainQueue } from "./eventchain-queue/eventChainQueueHandler";
import { createLoadMapOnGameStartEventChain } from "./factories/eventFactory";
import { cameraFocus, initializeCameraFocus } from "./game/cameraFocus";
import { prepareCanvasElementsForGame } from "./game/canvas/canvasSetter";
import { setLoadingScreen, stopLoadingScreen } from "./game/loadingScreen";
import { setNewParty } from "./game/party/partyController";
import { openGameCanvas, showGameCanvas } from "./helpers/DOMEventHelpers";
import { mobileAgent } from "./helpers/screenOrientation";
import { setScreenTextCanvas } from "./helpers/screenTextModule";
import { initializeBubbleCanvases } from "./text/textController";
import type { GridCellModel } from "./models/GridCellModel";
import type { SaveGame } from "./models/SaveGameModel";
import { setCollectableRegistry } from "./registries/collectableRegistry";
import { setUnlockedDoorsRegistry } from "./registries/doorRegistry";
import { setInteractionRegistry } from "./registries/interactionRegistry";
import { initializeDataModels } from "./resources/spriteDataResources";
import { initTilesheetModels } from "./resources/tilesheetResources";
import { alterGameControlState, alterGameState, getGameStartParameters, getGameState } from "./state/state";

let loadingFrameCount = 0;
let loadedFilesAtFrame = null;
let loadingGameFromSave;
let params;
let saveGame: SaveGame;

export const loadGame = () => {
    loadingGameFromSave = getGameState(StateType.isLoadedFromSave);
    params = getGameStartParameters();
    loadingFrameCount++;

    if ( loadingFrameCount === 1 ) {
        showGameCanvas();
    }
    else if ( loadingFrameCount === 2 ) {
        initializeCameraFocus();
        prepareCanvasElementsForGame( cameraFocus.screenWidth, cameraFocus.screenHeight, mobileAgent );
        setScreenTextCanvas( cameraFocus.screenWidth, cameraFocus.screenHeight )
    }
    else if ( loadingFrameCount === 3 ) {
        openGameCanvas();
        setLoadingScreen();
    }
    else if ( loadingFrameCount === 4 ) {
        startFileLoader();
    }
    else if ( loadedFilesAtFrame == null && handleFileLoadQueues() ) {
        loadedFilesAtFrame = loadingFrameCount;
        console.log( `Loaded files at frame ${loadedFilesAtFrame}` );

        initTilesheetModels();
        initializeDataModels();
        initializeBubbleCanvases( cameraFocus.screenWidth, cameraFocus.screenHeight );
    }
    else if ( loadingFrameCount == loadedFilesAtFrame + 1 ) {
        loadingGameFromSave ? startLoadGame() : startNewGame();
    }
    else if ( loadingFrameCount == loadedFilesAtFrame + 2 ) {
        stopLoadingScreen();
        alterGameControlState( ControlState.open_world );
        alterGameState( StateType.loadingGame, false );

        if ( !loadingGameFromSave ) {
            const startingMapName = params[2];
            publishEnterMapContract( startingMapName, { row: 4, column: 3 } );
        }
        else if ( loadingGameFromSave ) {
            saveGame = params[0];
            const startingMapName = saveGame.activeMap.mapName;
            publishEnterMapContract( startingMapName, saveGame.playerData.position );
        }
    }
}

const startNewGame = (): void => {
    setNewParty( params[0] );
    alterGameState( StateType.debugMode, params[3] );
    alterGameState( StateType.disableStory, params[4] );
};
const startLoadGame = (): void => {
    setNewParty( saveGame.playerData.name );
    alterGameState( StateType.debugMode, false );
    alterGameState( StateType.disableStory, false );

    setCollectableRegistry( saveGame.keyLists.collectableRegistry );
    setInteractionRegistry( saveGame.keyLists.interactionRegistry );
    setUnlockedDoorsRegistry( saveGame.keyLists.unlockedDoors );
};
const publishEnterMapContract = ( mapName: string, playerStart: GridCellModel ): void => {
    const eventChain = createLoadMapOnGameStartEventChain( mapName, playerStart );
    addToEventChainQueue( eventChain, TriggerType.game_start );
    handleEventChainQueue( TriggerType.game_start );
}