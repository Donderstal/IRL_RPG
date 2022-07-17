import { handleMapAnimations } from './map/mapAnimation'
import globals from '../game-data/globals'
import { FRAMES_PER_SECOND } from '../game-data/globals'
import { clearPressedKeys, listenForKeyPress} from './controls'
import { clearEntireCanvas } from './../helpers/canvasHelpers'
import { handleCinematicAnimations } from './cutscenes/cinematicAnimations'
import { hasCinematicMapLoaded } from '../helpers/loadMapHelpers'

let lastDateNow: number;
let newDateNow: number;

export const animationFrameController = ( ): void => {
    const GAME = globals.GAME;

    newDateNow = Date.now();
    if ( !document.hasFocus() ) {
        clearPressedKeys( GAME.pressedKeys );
    }
    
    if ( newDateNow - lastDateNow > 1000 / FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;
        if ( !GAME.paused ) {
            if ( !GAME.listeningForPress ) {
                listenForKeyPress();
            }            

            if ( !GAME.MENU.isActive && !GAME.inCinematic || (GAME.useCinematicMap && !hasCinematicMapLoaded())) {
                handleMapAnimations( GAME );
            }
            else if ( !GAME.MENU.isActive && GAME.inCinematic && ((!GAME.useCinematicMap) || (GAME.useCinematicMap && hasCinematicMapLoaded()))) {
                handleCinematicAnimations( GAME );
            }
            else if ( GAME.MENU.isActive ) {
                GAME.MENU.draw();
            }

            if  ( GAME.inCinematic && GAME.activeCinematic ) {
                GAME.activeCinematic.checkForScenePass();
            } 
        }
        else {
            clearEntireCanvas('FRONT')
        }       
        if ( GAME.fader.inFadingAnimation ) {
            GAME.fader.handleFade( )
        } 
    }

    requestAnimationFrame(animationFrameController)
}