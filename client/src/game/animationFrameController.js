const handleMapAnimations       = require('./map/mapAnimation').handleMapAnimations
const handleBattleAnimations    = require('./battle/battleAnimation').handleBattleAnimations
const globals     = require('../game-data/globals')
const { FRAMES_PER_SECOND, BATTLE_MODE, MAP_MODE }     = require('../game-data/globals')
const controls                  = require('./controls')
const canvasHelpers             = require('./../helpers/canvasHelpers')

let lastDateNow, newDateNow;

const startRequestingFrame = () => {
    startOverworldAnimation()
    animationFrameController()
}

const startBattleAnimation = ( ) => {
    globals.GAME.mode = BATTLE_MODE;
}

const startOverworldAnimation = ( ) => {
    globals.GAME.mode = MAP_MODE;
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
        if ( !globals.GAME.paused ) {
            if ( !globals.GAME.listeningForPress ) {
                controls.listenForKeyPress()
            }            
            if ( globals.GAME.mode == MAP_MODE ) {
                handleMapAnimations( )
            }
            else if ( globals.GAME.mode == BATTLE_MODE ) {
                handleBattleAnimations( )
            }
            if  ( globals.GAME.cinematicMode && globals.GAME.activeCinematic ) {
                globals.GAME.activeCinematic.checkForScenePass( )
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