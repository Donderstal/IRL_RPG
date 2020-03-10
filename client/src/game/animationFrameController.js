const handleMapAnimations       = require('./map/mapAnimation').handleMapAnimations
const handleBattleAnimations    = require('./battle/battleAnimation').handleBattleAnimations
const gameController            = require('./gameController')
const state                     = require('../game-data/state')
const controls                  = require('./controls')

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

module.exports = {
    startRequestingFrame,
    startOverworldAnimation,
    startBattleAnimation,
    startCinematicAnimation
}