import globals, { CANVAS_HEIGHT, CANVAS_WIDTH, FRAMES_PER_SECOND } from '../game-data/globals'
import { handleMapAnimations } from './map/mapAnimation'
import { clearPressedKeys, listenForKeyPress} from './controls'
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations'
import { cinematicIsActive, handleActiveCinematic } from './controllers/cinematicController'
import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum'
import { backSpritesDOMContext, backTilesDOMContext, clearGridCanvasOfType, frontTilesDOMContext } from './controllers/gridCanvasController'
import { getMenuCanvas } from './controllers/utilityCanvasController'

let lastDateNow: number;
let newDateNow: number;

const utilityOffscreenCanvas = new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT )

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

    if ( utilityOffscreenCanvas.width !== GAME.BACK.canvas.width ) {
        utilityOffscreenCanvas.width = GAME.BACK.canvas.width
    }
    if ( utilityOffscreenCanvas.height !== GAME.BACK.canvas.height ) {
        utilityOffscreenCanvas.height = GAME.BACK.canvas.height
    }

    const utilCtx = utilityOffscreenCanvas.getContext( "2d" );
    utilCtx.drawImage( GAME.BACK.canvas, 0, 0 );
    utilCtx.drawImage( GAME.FRONT.canvas, 0, 0 );
    utilCtx.drawImage( GAME.FRONTGRID.canvas, 0, 0 );

    const frontTilesBitmap = utilityOffscreenCanvas.transferToImageBitmap();

    frontTilesDOMContext.transferFromImageBitmap( frontTilesBitmap );
}