import globals, { FRAMES_PER_SECOND } from '../game-data/globals';
import { handleMapAnimations } from './map/mapAnimation';
import { clearPressedKeys, listenForKeyPress } from './controls';
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations';
import { cinematicIsActive, handleActiveCinematic } from './controllers/cinematicController';

import { cameraFocus } from './cameraFocus';
import { getFaderCanvas, handleFadeAnimation, inFadingAnimation } from '../helpers/faderModule';
import { clearRenderCanvases, clearSpriteCanvasGrids } from './canvas/canvasSetter';
import { getBackSpritesGrid, getBackTilesGrid, getDOMContext, getFrontTilesGrid, getMenuGrid, getPreRenderCanvas, getPreRenderContext, getSpeechBubbleGrid } from './canvas/canvasGetter';

let lastDateNow: number;
let newDateNow: number;

export const animationLoop = ( ): void => {
    const GAME = globals.GAME;
    const menuCanvas = getMenuGrid();

    newDateNow = Date.now();
    if ( !document.hasFocus() ) {
        clearPressedKeys( );
    }
    
    if ( newDateNow - lastDateNow > 1000 / FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;
        if ( !GAME.paused ) {
            if ( !GAME.listeningForPress ) {
                listenForKeyPress();
            }            

            if ( !menuCanvas.isActive && !cinematicIsActive() ) {
                handleMapAnimations( GAME );
            }
            else if ( !menuCanvas.isActive && cinematicIsActive() ) {
                handleCinematicAnimations( GAME );
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