import { FRAMES_PER_SECOND } from './game-data/globals';
import { handleMapAnimations } from './game/map/mapAnimation';
import { handleCinematicAnimations } from './game/cutscenes/cinematicAnimations';
import { cameraFocus } from './game/cameraFocus';
import { getFaderCanvas, handleFadeAnimation, inFadingAnimation } from './helpers/faderModule';
import { clearRenderCanvases, clearSpriteCanvasGrids } from './game/canvas/canvasSetter';
import { getBackSpritesGrid, getBackTilesGrid, getDOMContext, getFrontTilesGrid, getPreRenderCanvas, getPreRenderContext, getSpeechBubbleGrid } from './game/canvas/canvasGetter';
import { getScreenTextCanvas, handleScreenText, screenTextIsActive } from './helpers/screenTextModule';
import { drawNewTilesInCameraFocus } from './helpers/dynamicTileDrawer';
import { handleControls } from './controls/controlHandler';
import { checkQueuedTriggers } from './event-triggers/triggerQueue';
import { handleEventChainQueue } from './eventchain-queue/eventChainQueueHandler';
import { handleActiveEventChain } from './eventchain-queue/activeEventChain';
import { getSpriteById } from './game/modules/sprites/spriteGetter';
import { publishNewContracts } from './contracts/contractPublisher';
import { alterGameState, getGameState } from './state/state';
import { loadGame } from './gameLoader';
import { getPendingContracts } from './contracts/contractRegistry';
import { registerBlockedTilesOnMap } from './map/mapLoader';
import { StateType } from './enumerables/StateType';
import { drawActiveText, textBubblesAreActive } from './text/textController';
import { setCenterBubbleForNewLocation } from './game/neighbourhoodModule';

let lastDateNow: number;
let newDateNow: number;
let animationFrameLoop = null;
let wroteScreenTextLastFrame = false;

export const animationLoop = (): void => {
    newDateNow = Date.now();
    if ( newDateNow - lastDateNow > 1000 / FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;

        const gameHasActiveEvent = getGameState( StateType.inEvent );
        if ( gameHasActiveEvent ) {
            handleActiveEventChain();
        }

        if ( getGameState( StateType.loadingGame ) ) {
            handleGameIsLoadingLoop();
        }
        else if ( getGameState( StateType.paused ) ) {
            handleGameIsPausedLoop();
        }
        else if ( getGameState( StateType.loadingMap ) ) {
            handleMapIsLoadLoop();
        }
        else if ( !getGameState( StateType.clearingMap ) ) {
            handleDefaultLoop()
        }

        publishNewContracts();

        if ( inFadingAnimation() ) handleFadeAnimation();
    }

    animationFrameLoop = requestAnimationFrame( animationLoop )
}
export const stopAnimationLoop = () => {
    cancelAnimationFrame( animationFrameLoop );
}

const handleGameIsLoadingLoop = (): void => {
    loadGame();
}
const handleGameIsPausedLoop = (): void => {
    clearSpriteCanvasGrids();
}
const handleMapIsLoadLoop = (): void => {
    const pendingContracts = getPendingContracts();
    if ( pendingContracts.length < 1 ) {
        registerBlockedTilesOnMap();
        alterGameState( StateType.loadingMap, false );
        setCenterBubbleForNewLocation();
    }
}
const handleDefaultLoop = (): void => {
    const gameHasActiveEvent = getGameState( StateType.inEvent );
    if ( !gameHasActiveEvent ) {
        checkQueuedTriggers();
        handleEventChainQueue();
        handleMapAnimations();
    }
    else {
        handleCinematicAnimations();
    }

    handleControls();
    drawNewTilesInCameraFocus( cameraFocus );
    drawActiveText();
    handleOffscreenCanvasBitmaps();

    if ( cameraFocus.movingToNewFocus ) {
        const spriteInFocus = getSpriteById( cameraFocus.focusSpriteId );
        cameraFocus.moveToNewFocus( spriteInFocus );
    }
}
const handleOffscreenCanvasBitmaps = () => {
    clearRenderCanvases();

    const preRenderCanvas = getPreRenderCanvas();
    const preRenderContext = getPreRenderContext();
    const DOMContext = getDOMContext();

    const offscreenX = cameraFocus.leftBorder;
    const offscreenY = cameraFocus.topBorder;
    const width = preRenderCanvas.width;
    const height = preRenderCanvas.height;

    preRenderContext.drawImage( getBackTilesGrid().canvas, Math.floor( offscreenX ), Math.floor( offscreenY ), width, height, 0, 0, width, height );
    preRenderContext.drawImage( getBackSpritesGrid().canvas, Math.floor( offscreenX ), Math.floor( offscreenY ), width, height, 0, 0, width, height );
    preRenderContext.drawImage( getFrontTilesGrid().canvas, Math.floor( offscreenX ), Math.floor( offscreenY ), width, height, 0, 0, width, height );

    if ( textBubblesAreActive() ) {
        const speechBubbleCanvas = getSpeechBubbleGrid();
        const bubbleX = ( preRenderCanvas.width - speechBubbleCanvas.canvas.width ) / 2;
        const bubbleY = ( preRenderCanvas.height - speechBubbleCanvas.canvas.height ) / 2;
        preRenderContext.drawImage( speechBubbleCanvas.canvas, bubbleX, bubbleY );
    }

    const faderCanvas = getFaderCanvas();
    preRenderContext.drawImage( faderCanvas, 0, 0 );

    if ( screenTextIsActive() ) {
        if ( !wroteScreenTextLastFrame ) {
            handleScreenText();
            wroteScreenTextLastFrame = true;
        }
        else {
            wroteScreenTextLastFrame = false;
        }


        const screenTextCanvas = getScreenTextCanvas();
        const screenTextX = ( preRenderCanvas.width - screenTextCanvas.width ) / 2;
        const screenTextY = ( preRenderCanvas.height - screenTextCanvas.height ) / 2;
        preRenderContext.drawImage( screenTextCanvas, screenTextX, screenTextY );
    }

    DOMContext.drawImage( preRenderCanvas, 0, 0 );
}