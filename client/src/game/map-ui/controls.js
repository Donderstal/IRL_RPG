let pressedKeys = {};
const state = require('../../game-data/state')
const initBattle = require('../battle/initBattle')
const actionController = require('./actionController')
const animation = require('../animationFrameController')

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
    if ( state.animation.overworldMode ) {
        handleOverworldKeyPress( event )
    }
    else if ( state.animation.battleMode ) { 
        handleBattleKeyPress( event )
    }
}

const handleOverworldKeyPress = ( event ) => {
    if ( event.key == "q" && !state.battleState.requestingBattle ) {
        event.preventDefault()
        actionController.handleActionButton( )        
    }

    else if ( event.key == "e" && state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
        state.battleState.requestingBattle = false
    }

    else if ( event.key == "q" && state.currentMap.bubbleIsActive && state.battleState.requestingBattle ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
        initBattle.startBattle()
    }
    else {
        pressedKeys[event.key] = true        
    }
}

const handleBattleKeyPress = ( event ) => {
    if ( event.key == "Escape" || event.key == "Esc" ) {
        console.log('eyy')
        initBattle.stopBattle()
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