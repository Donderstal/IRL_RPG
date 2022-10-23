import globals, { FRAMES_PER_SECOND } from '../game-data/globals';
import { handleMapAnimations } from './map/mapAnimation';
import { clearPressedKeys, listenForKeyPress } from './controls';
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations';
import { cinematicIsActive, handleActiveCinematic } from './controllers/cinematicController';
import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum';
import { clearGridCanvasOfType, preRenderCanvas, preRenderContext, DOMContext } from './controllers/gridCanvasController';
import { getMenuCanvas, getSpeechBubbleCanvas } from './controllers/utilityCanvasController';
import { cameraFocus } from './cameraFocus';
import { getFaderCanvas } from '../helpers/Fader';

let lastDateNow: number;
let newDateNow: number;

export const animationLoop = ( ): void => {
    const GAME = globals.GAME;
    const menuCanvas = getMenuCanvas();

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
            clearGridCanvasOfType( CanvasTypeEnum.backSprites );
        }       
        if ( GAME.fader.inFadingAnimation ) {
            GAME.fader.handleFade( )
        } 
    }

    requestAnimationFrame( animationLoop )
}

const handleOffscreenCanvasBitmaps = () => {
    const GAME = globals.GAME;

    const offscreenX = cameraFocus.leftBorder;
    const offscreenY = cameraFocus.topBorder;
    const width = preRenderCanvas.width//GAME.BACK.canvas.width > preRenderCanvas.width ? preRenderCanvas.width : GAME.BACK.canvas.width;
    const height = preRenderCanvas.height//GAME.BACK.canvas.height > preRenderCanvas.height ? preRenderCanvas.height : GAME.BACK.canvas.height;

    preRenderContext.drawImage( GAME.BACK.canvas, offscreenX, offscreenY, width, height, 0, 0, width, height );
    preRenderContext.drawImage( GAME.FRONT.canvas, offscreenX, offscreenY, width, height, 0, 0, width, height );
    preRenderContext.drawImage( GAME.FRONTGRID.canvas, offscreenX, offscreenY, width, height, 0, 0, width, height );

    const speechBubbleCanvas = getSpeechBubbleCanvas();
    const bubbleX = ( preRenderCanvas.width - speechBubbleCanvas.canvas.width ) / 2;
    const bubbleY = ( preRenderCanvas.height - speechBubbleCanvas.canvas.height ) / 2;
    preRenderContext.drawImage( speechBubbleCanvas.canvas, bubbleX, bubbleY );

    const faderCanvas = getFaderCanvas();
    preRenderContext.drawImage( faderCanvas, 0, 0 );

    const frontTilesBitmap = preRenderCanvas.transferToImageBitmap();

    DOMContext.transferFromImageBitmap( frontTilesBitmap );
    preRenderContext.clearRect( 0, 0, preRenderCanvas.width, preRenderCanvas.height );
}