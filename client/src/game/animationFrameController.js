const handleMapAnimations       = require('./map/mapAnimation').handleMapAnimations
const handleBattleAnimations    = require('./battle/battleAnimation').handleBattleAnimations
const state                     = require('../game-data/state')
const { FRAMES_PER_SECOND }     = require('../game-data/globals')
const controls                  = require('./controls')
const canvasHelpers             = require('./../helpers/canvasHelpers')

let lastDateNow, newDateNow;

const startRequestingFrame = () => {
    startOverworldAnimation()
    animationFrameController()
}

const startBattleAnimation = ( ) => {
    state.battleMode = true;
    state.overworldMode = false;
}

const startOverworldAnimation = ( ) => {
    state.overworldMode = true
    state.battleMode = false;
}

/**
 * Controller for all animation duties in front-context
 */
const animationFrameController = ( ) => {
    newDateNow = Date.now();
    if ( !document.hasFocus() ) {
        controls.clearPressedKeys( );
    }
    
    if ( newDateNow - lastDateNow > 1000 / FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;
        if ( !state.paused ) {
            if ( !state.listeningForPress ) {
                controls.listenForKeyPress()
            }            
            if ( state.overworldMode ) {
                handleMapAnimations( )
            }
            else if ( state.battleMode ) {
                handleBattleAnimations( )
            }
            if  ( state.cinematicMode && state.activeCinematic ) {
                state.activeCinematic.checkForScenePass( )
            }
        }
        else {
            canvasHelpers.clearEntireCanvas('FRONT')
        }        
    }

    requestAnimationFrame(animationFrameController)
}

module.exports = {
    startRequestingFrame,
    startOverworldAnimation,
    startBattleAnimation,
}