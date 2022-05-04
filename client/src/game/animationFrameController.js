const { handleMapAnimations }      = require('./map/mapAnimation')
const globals     = require('../game-data/globals')
const { FRAMES_PER_SECOND }     = require('../game-data/globals')
const controls                  = require('./controls')
const canvasHelpers             = require('./../helpers/canvasHelpers')
const { tryCatch } = require('../helpers/errorHelpers')
const { handleCinematicAnimations } = require('./cutscenes/cinematicAnimations')
const { hasCinematicMapLoaded } = require('../helpers/loadMapHelpers')

let lastDateNow, newDateNow;

const animationFrameController = ( arg ) => {
    const GAME = globals.GAME;

    newDateNow = arg;
    if ( !document.hasFocus() ) {
        controls.clearPressedKeys( GAME.pressedKeys );
    }
    
    if ( newDateNow - lastDateNow > 1000 / FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;
        if ( !GAME.paused ) {
            if ( !GAME.listeningForPress ) {
                tryCatch(controls.listenForKeyPress);
            }            

            if ( !GAME.MENU.isActive && !GAME.inCinematic || (GAME.useCinematicMap && !hasCinematicMapLoaded())) {
                tryCatch(handleMapAnimations, [GAME]);
            }
            else if ( !GAME.MENU.isActive && GAME.inCinematic && ((!GAME.useCinematicMap) || (GAME.useCinematicMap && hasCinematicMapLoaded()))) {
                tryCatch(handleCinematicAnimations, [GAME]);
            }
            else if ( GAME.MENU.isActive ) {
                tryCatch(GAME.MENU.draw.bind(GAME.MENU))
            }

            if  ( GAME.inCinematic && GAME.activeCinematic ) {
                GAME.activeCinematic.checkForScenePass()
                //tryCatch(GAME.activeCinematic.checkForScenePass.bind(GAME.activeCinematic));
            } 
        }
        else {
            canvasHelpers.clearEntireCanvas('FRONT')
        }       
        if ( GAME.fader.inFadingAnimation ) {
            GAME.fader.handleFade( )
        } 
    }

    requestAnimationFrame(animationFrameController)
}

module.exports = {
    animationFrameController
}