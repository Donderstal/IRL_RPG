const state = require('../game-data/state')
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

const addKeyToPressed = () => {
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

module.exports = {
    listenForKeyPress,
    stopListenForKeyPress,
    clearPressedKeys
}