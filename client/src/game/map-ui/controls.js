let pressedKeys = {};
const state = require('../../game-data/state')

const actionController = require('./actionController')

/**
 * EXPORT @function listenForKeyPress
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const listenForKeyPress = () => {
    window.addEventListener('keydown', addKeyToPressed)
    window.addEventListener('keyup', removeKeyFromPressed)
}

/**
 * EXPORT @function stopListenForKeyPress
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const stopListenForKeyPress = () => {
    window.removeEventListener('keydown', addKeyToPressed)
    window.removeEventListener('keyup', removeKeyFromPressed)
    clearPressedKeys()
}

const addKeyToPressed = () => {
    if ( event.which == 81 ) {
        event.preventDefault()
        actionController.handleActionButton( )        
    }

    if ( event.which == 69 && state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
    }
    pressedKeys[event.key] = true
}

const removeKeyFromPressed = () => {
    pressedKeys[event.key] = false
}

/**
 * EXPORT @function clearPressedKeys
 * set all pressedKeys to false
 * Use when loading a new map or in cinematic
 */ 
const clearPressedKeys = () => {
    Object.keys(pressedKeys).forEach( (key) => {
        pressedKeys[key] = false
    })
}

module.exports = {
    pressedKeys,
    listenForKeyPress,
    stopListenForKeyPress,
    clearPressedKeys
}