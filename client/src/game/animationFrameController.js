const handleMapAnimations       = require('./map/mapAnimation').handleMapAnimations
const handleBattleAnimations    = require('./battle/battleAnimation').handleBattleAnimations
const state                     = require('../game-data/state')
const controls                  = require('./controls')
const controller                = require('./gameController')

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
const animationFrameController = () => {
    checkForModeChangeRequest()

    if ( state.paused ) {
        return
    }
    else if ( !state.listeningForPress ) {
        controls.listenForKeyPress()
    }
    
    if ( state.overworldMode ) {
        handleMapAnimations()
    }
    else if ( state.battleMode ) {
        handleBattleAnimations()
    }

    requestAnimationFrame(animationFrameController)
}

const checkForModeChangeRequest = ( ) => {
    if ( state.changeRequest == 'OVERWORLD' ) {
        state.changeRequest = "NO"
        controller.stopCurrentMode()
        controller.startMap()
        startOverworldAnimation()
    }
    else if ( state.changeRequest == 'BATTLE' ) {
        state.changeRequest = "NO"
        controller.stopCurrentMode()
        controller.startBattle()
        setTimeout(() => {
            startBattleAnimation()            
        }, 2100 )
    }
    else if ( state.changeRequest == 'CINEMATIC' ) {
        state.changeRequest = "NO"
        controller.stopCurrentMode()
        controller.startCinematic()
        startCinematicAnimation()
    }
}

module.exports = {
    startRequestingFrame,
    startOverworldAnimation,
    startBattleAnimation,
    startCinematicAnimation
}