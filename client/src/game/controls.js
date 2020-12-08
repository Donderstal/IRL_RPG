const state = require('../game-data/state')
const globals = require('../game-data/globals')
const handleMovementKeys = require('./map/mapControls').handleMovementKeys
const handleMapKeyPress = require('./map/mapControls').handleMapKeyPress
const handleBattleKeyPress = require('./battle/battleControls').handleBattleKeyPress

/**
 * Listen for keypresses
 * and pass them to state.pressedKeys variable
 */
const listenForKeyPress = () => {
    window.addEventListener('keydown', addKeyToPressed)
    window.addEventListener('keyup', removeKeyFromPressed)
    state.listeningForPress = true;
}

/**
 * Listen for keypresses
 * and pass them to state.pressedKeys variable
 */
const stopListenForKeyPress = () => {
    window.removeEventListener('keydown', addKeyToPressed)
    window.removeEventListener('keyup', removeKeyFromPressed)
    state.listeningForPress = false;
    clearstate.PressedKeys()
}

const addKeyToPressed = ( ) => {
    if ( event.key == "l" ) {
        console.log( globals.GAME.front.class )
        console.log( globals.GAME.back.class )
    }
    if ( state.overworldMode ) {
        handleMapKeyPress( event )
    }
    else if ( state.battleMode ) { 
        handleBattleKeyPress( event )
    }
}

const removeKeyFromPressed = () => {
    state.pressedKeys[event.key] = false
}

/**
 * set all state.pressedKeys to false
 * Use when loading a new map or in cinematic
 */ 
const clearPressedKeys = () => {
    Object.keys(state.pressedKeys).forEach( (key) => {
        state.pressedKeys[key] = false
    })
}

const initTouchControls = ( ) => {
    const frontCanvas = document.getElementById('game-front-canvas')

    frontCanvas.addEventListener("touchstart", handleStart);
    frontCanvas.addEventListener("touchmove", handleMove);
}

const handleStart = ( event ) => {
    handleMovementKeys(true, event)
}

const handleMove = ( event ) => {
    handleMovementKeys(true, event)
}

module.exports = {
    listenForKeyPress,
    stopListenForKeyPress,
    clearPressedKeys,
    initTouchControls
}