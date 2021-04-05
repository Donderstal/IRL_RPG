const handleMapAnimations       = require('./map/mapAnimation').handleMapAnimations
const globals     = require('../game-data/globals')
const { FRAMES_PER_SECOND, BATTLE_MODE, MAP_MODE }     = require('../game-data/globals')
const controls                  = require('./controls')
const canvasHelpers             = require('./../helpers/canvasHelpers')

let lastDateNow, newDateNow;

/**
 * Call startOverworldAnimation() and animationFrameController() to intialize the canvas animations
 */
const startRequestingFrame = () => {
    startOverworldAnimation()
    animationFrameController()
}
/**
 * Set GAME.mode to BATTLE_MODE
 */
const startBattleAnimation = ( ) => {
    globals.GAME.mode = BATTLE_MODE;
}
/**
 * Set GAME.mode to MAP_MODE
 */
const startOverworldAnimation = ( ) => {
    globals.GAME.mode = MAP_MODE;
}

/**
 * Main channel for all interactivity in the game.
 * Recursive function using the in-browser requestAnimationFrame function.
 * Check if a new frame should be requested per FRAMES_PER_SECOND global.
 * If so, register the players key presses. 
 * Run animations for Map, Battle or Menu depending on GAME.mode and GAME.inMenu.
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

            if ( GAME.mode == MAP_MODE && !GAME.inMenu ) {
                handleMapAnimations(  GAME )
            }
            else if ( GAME.mode == BATTLE_MODE && !GAME.inMenu ) {
                console.log('Battle!')
            }
            else if ( GAME.inMenu ) {
                GAME.MENU.draw( );
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