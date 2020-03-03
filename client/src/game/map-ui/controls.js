let pressedKeys = {};
const state = require('../../game-data/state')
const initBattle = require('../battle/initBattle')
const actionController = require('./actionController')

/**
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const listenForKeyPress = () => {
    window.addEventListener('keydown', addKeyToPressed)
    window.addEventListener('keyup', removeKeyFromPressed)
}

/**
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const stopListenForKeyPress = () => {
    window.removeEventListener('keydown', addKeyToPressed)
    window.removeEventListener('keyup', removeKeyFromPressed)
    clearPressedKeys()
}

const addKeyToPressed = () => {
    if ( event.which == 81 && !state.battleState.requestingBattle ) {
        event.preventDefault()
        actionController.handleActionButton( )        
    }

    else if ( event.which == 69 && state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
    }

    else if ( event.which == 81 && state.currentMap.bubbleIsActive && state.battleState.requestingBattle ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
        initBattle.startBattle()
    }

    else {
        pressedKeys[event.key] = true        
    }

}

const removeKeyFromPressed = () => {
    pressedKeys[event.key] = false
}

/**
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