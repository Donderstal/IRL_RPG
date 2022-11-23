import { FRAMES_PER_SECOND } from '../game-data/globals';
import { handleMapAnimations } from './map/mapAnimation';
import { clearPressedKeys, listenForKeyPress, stopListenForKeyPress } from './controls';
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations';
import { cinematicIsActive, handleActiveCinematic } from './controllers/cinematicController';

import { cameraFocus } from './cameraFocus';
import { getFaderCanvas, handleFadeAnimation, inFadingAnimation } from '../helpers/faderModule';
import { clearRenderCanvases, clearSpriteCanvasGrids } from './canvas/canvasSetter';
import { getBackSpritesGrid, getBackTilesGrid, getDOMContext, getFrontTilesGrid, getMenuGrid, getPreRenderCanvas, getPreRenderContext, getSpeechBubbleGrid } from './canvas/canvasGetter';
import { inListeningForKeysGameState, inPausedGameState } from './gameState/gameStateGetter';

let lastDateNow: number;
let newDateNow: number;

export const animationLoop = ( ): void => {
    const menuCanvas = getMenuGrid();

    newDateNow = Date.now();
    if ( !document.hasFocus() ) {
        clearPressedKeys( );
    }
    
    if ( newDateNow - lastDateNow > 1000 / FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;
        if ( !inPausedGameState() ) {
            if ( !inListeningForKeysGameState() ) {
                listenForKeyPress();
            }            

            if ( !menuCanvas.isActive && !cinematicIsActive() ) {
                handleMapAnimations( );
            }
            else if ( !menuCanvas.isActive && cinematicIsActive() ) {
                handleCinematicAnimations( );
            }
            else if ( menuCanvas.isActive ) {
                menuCanvas.draw();
            }

            if  ( cinematicIsActive( ) ) {
                handleActiveCinematic();
            } 
            handleOffscreenCanvasBitmaps();
        }
        else {
            stopListenForKeyPress();
            clearPressedKeys();
            clearSpriteCanvasGrids()
        }       
        if ( inFadingAnimation() ) {
            handleFadeAnimation()
        } 
    }

    requestAnimationFrame( animationLoop )
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

    const speechBubbleCanvas = getSpeechBubbleGrid();
    const bubbleX = ( preRenderCanvas.width - speechBubbleCanvas.canvas.width ) / 2;
    const bubbleY = ( preRenderCanvas.height - speechBubbleCanvas.canvas.height ) / 2;
    preRenderContext.drawImage( speechBubbleCanvas.canvas, bubbleX, bubbleY );

    const faderCanvas = getFaderCanvas();
    if ( inFadingAnimation() ) {
        preRenderContext.drawImage( faderCanvas, 0, 0 );
    }

    DOMContext.drawImage( preRenderCanvas, 0, 0 );
}