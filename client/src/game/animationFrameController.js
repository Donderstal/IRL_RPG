const handleMapAnimations       = require('./map/mapAnimation').handleMapAnimations
const handleBattleAnimations    = require('./battle/battleAnimation').handleBattleAnimations
const state                     = require('../game-data/state')
const globals                   = require('../game-data/globals')
const controls                  = require('./controls')
const controller                = require('./gameController')
const canvasHelpers             = require('./../helpers/canvasHelpers')

let lastDateNow, newDateNow;

const startRequestingFrame = () => {
    startOverworldAnimation()
    animationFrameController()
}

const startBattleAnimation = ( ) => {
    state.battleMode = true;
    state.overworldMode = false;
    state.cinematicMode = false;
}

const startOverworldAnimation = ( ) => {
    state.overworldMode = true
    state.battleMode = false;
    state.cinematicMode = false;
}

const startCinematicAnimation = ( ) =>{
    state.overworldMode = false
    state.battleMode = false;
    state.cinematicMode = true;
}

/**
 * Controller for all animation duties in front-context
 */
const animationFrameController = ( ) => {
    newDateNow = Date.now();
    if ( !document.hasFocus() ) {
        controls.clearPressedKeys( );
    }
    
    if ( newDateNow - lastDateNow > 1000 / globals.FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;
        if ( !state.paused ) {
            checkForModeChangeRequest()

            if ( !state.listeningForPress ) {
                controls.listenForKeyPress()
            }
            
            if ( state.overworldMode ) {
                handleMapAnimations()
            }
            else if ( state.battleMode ) {
                handleBattleAnimations()
            }
        }
        else {
            canvasHelpers.clearEntireCanvas('FRONT')
            canvasHelpers.drawRect('FRONT', 0, 0, globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT, "#800020");
        }        
    }

    requestAnimationFrame(animationFrameController)
}

const checkForModeChangeRequest = ( ) => {
    if ( state.changeRequest != "NO" ) {
        controller.switchMode()

        if ( state.changeRequest == 'OVERWORLD' ) {
            setTimeout(() => {
                startOverworldAnimation()         
            }, globals.BATTLE_INTRO_ANIM_MS )
        }
        else if ( state.changeRequest == 'BATTLE' ) {
            setTimeout(() => {
                startBattleAnimation()            
            }, globals.BATTLE_INTRO_ANIM_MS )
        }
        else if ( state.changeRequest == 'CINEMATIC' ) {
            startCinematicAnimation()
        }        
    }

    state.changeRequest = "NO"
}

module.exports = {
    startRequestingFrame,
    startOverworldAnimation,
    startBattleAnimation,
    startCinematicAnimation
}