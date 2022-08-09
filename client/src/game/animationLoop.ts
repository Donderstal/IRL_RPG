import globals, { FRAMES_PER_SECOND } from '../game-data/globals'
import { handleMapAnimations } from './map/mapAnimation'
import { clearPressedKeys, listenForKeyPress} from './controls'
import { clearEntireCanvas } from '../helpers/canvasHelpers'
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations'
import { hasCinematicMapLoaded } from '../helpers/loadMapHelpers'
import { cinematicIsActive, handleActiveCinematic } from './controllers/cinematicController'

let lastDateNow: number;
let newDateNow: number;

export const animationLoop = ( ): void => {
    const GAME = globals.GAME;

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

            if ( !GAME.MENU.isActive && !cinematicIsActive() || (GAME.useCinematicMap && !hasCinematicMapLoaded())) {
                handleMapAnimations( GAME );
            }
            else if ( !GAME.MENU.isActive && cinematicIsActive() && ((!GAME.useCinematicMap) || (GAME.useCinematicMap && hasCinematicMapLoaded()))) {
                handleCinematicAnimations( GAME );
            }
            else if ( GAME.MENU.isActive ) {
                GAME.MENU.draw();
            }

            if  ( cinematicIsActive( ) ) {
                handleActiveCinematic();
            } 
        }
        else {
            clearEntireCanvas('FRONT')
        }       
        if ( GAME.fader.inFadingAnimation ) {
            GAME.fader.handleFade( )
        } 
    }

    requestAnimationFrame( animationLoop )
}