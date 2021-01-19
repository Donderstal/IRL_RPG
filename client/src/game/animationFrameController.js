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
    const GAME = globals.GAME;

    newDateNow = Date.now();
    if ( !document.hasFocus() ) {
        controls.clearPressedKeys( GAME.pressedKeys );
    }
    
    if ( newDateNow - lastDateNow > 1000 / FRAMES_PER_SECOND || lastDateNow == undefined ) {
        lastDateNow = newDateNow;
        if ( !GAME.paused ) {
            if ( !GAME.listeningForPress ) {
                controls.listenForKeyPress()
            }            
            if ( GAME.mode == MAP_MODE ) {
                handleMapAnimations( )
            }
            else if ( GAME.mode == BATTLE_MODE ) {
                handleBattleAnimations( )
            }
            if  ( GAME.cinematicMode && GAME.activeCinematic ) {
                GAME.activeCinematic.checkForScenePass( )
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