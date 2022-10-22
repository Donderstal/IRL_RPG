import globals, { FRAMES_PER_SECOND } from '../game-data/globals'
import { handleMapAnimations } from './map/mapAnimation'
import { clearPressedKeys, listenForKeyPress} from './controls'
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations'
import { cinematicIsActive, handleActiveCinematic } from './controllers/cinematicController'
import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum'
import { clearGridCanvasOfType, preRenderCanvas, preRenderContext, DOMContext } from './controllers/gridCanvasController'
import { getMenuCanvas } from './controllers/utilityCanvasController'
import { cameraFocus } from './cameraFocus'

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

    let offscreenX = cameraFocus.leftBorder;
    let offscreenY = cameraFocus.topBorder;
    let width = GAME.BACK.canvas.width > preRenderCanvas.width ? preRenderCanvas.width : GAME.BACK.canvas.width;
    let height = GAME.BACK.canvas.height > preRenderCanvas.height ? preRenderCanvas.height : GAME.BACK.canvas.height;

    preRenderContext.drawImage( GAME.BACK.canvas, offscreenX, offscreenY, width, height, 0, 0, width, height );
    preRenderContext.drawImage( GAME.FRONT.canvas, offscreenX, offscreenY, width, height, 0, 0, width, height );
    preRenderContext.drawImage( GAME.FRONTGRID.canvas, offscreenX, offscreenY, width, height, 0, 0, width, height );

    const frontTilesBitmap = preRenderCanvas.transferToImageBitmap();

    DOMContext.transferFromImageBitmap( frontTilesBitmap );
}