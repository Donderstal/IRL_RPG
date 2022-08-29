import globals, { FRAMES_PER_SECOND } from '../game-data/globals'
import { handleMapAnimations } from './map/mapAnimation'
import { clearPressedKeys, listenForKeyPress} from './controls'
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations'
import { cinematicIsActive, handleActiveCinematic } from './controllers/cinematicController'
import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum'
import { clearCanvasOfType } from './controllers/gridCanvasController'
import { getMenuCanvas } from './controllers/utilityCanvasController'

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
        }
        else {
            clearCanvasOfType( CanvasTypeEnum.backSprites );
        }       
        if ( GAME.fader.inFadingAnimation ) {
            GAME.fader.handleFade( )
        } 
    }

    requestAnimationFrame( animationLoop )
}