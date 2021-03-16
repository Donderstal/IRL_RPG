const globals = require('../game-data/globals')
const { BATTLE_MODE, MAP_MODE }     = require('../game-data/globals')
const { unsetGameMenu } = require('./Menu')
const handleMovementKeys = require('./map/mapControls').handleMovementKeys
const handleMapKeyPress = require('./map/mapControls').handleMapKeyPress
const { initGameMenu,handleMenuKeyPress }  = require('./Menu')

/**
 * Add keydown listener with addKeyPressed callback. Add keyup listener with removeKeyFromPressed callback.
 */
const listenForKeyPress = ( ) => {
    window.addEventListener('keydown', addKeyToPressed)
    window.addEventListener('keyup', removeKeyFromPressed)
    globals.GAME.listeningForPress = true;
}
/**
 * Remove keydown and keyup event listeners and stop registering pressed keys
 */
const stopListenForKeyPress = ( ) => {
    window.removeEventListener('keydown', addKeyToPressed)
    window.removeEventListener('keyup', removeKeyFromPressed)
    globals.GAME.listeningForPress = false;
}
/**
 * If pressed key is tab, open the main menu. Pass pressed key on to the correct function depending on GAME.mode.
 */
const addKeyToPressed = ( ) => {
    event.preventDefault( );
    
    if ( event.key == "Tab" ) {
        globals.GAME.inMenu ? unsetGameMenu( ) : initGameMenu( );
    }

    if ( globals.GAME.mode == MAP_MODE && !globals.GAME.inMenu ) {
        handleMapKeyPress( event )
    }
    else if ( globals.GAME.inMenu ) {
        handleMenuKeyPress( event );
    }
}
/**
 * Clear current event.key from the GAME.pressedKeys object
 */
const removeKeyFromPressed = () => {
    globals.GAME.pressedKeys[event.key] = false
}
/**
 * Clear current all keys from the GAME.pressedKeys object
 */
const clearPressedKeys = ( pressedKeys ) => {
    Object.keys( pressedKeys ).forEach( (key) => {
        pressedKeys[key] = false
    })
}
/**
 * ( INCOMPLETE )
 * Set eventlisteners for the touchstart and touchmove events
 */
const initTouchControls = ( ) => {
    const frontCanvas = document.getElementById('game-front-canvas')

    frontCanvas.addEventListener("touchstart", handleStart);
    frontCanvas.addEventListener("touchmove", handleMove);
}
/**
 * ( INCOMPLETE )
 * Call handleMovementKeys function from mapControls.js
 */
const handleStart = ( event ) => {
    handleMovementKeys(true, event)
}
/**
 * ( INCOMPLETE )
 * Call handleMovementKeys function from mapControls.js
 */
const handleMove = ( event ) => {
    handleMovementKeys(true, event)
}

module.exports = {
    listenForKeyPress,
    stopListenForKeyPress,
    clearPressedKeys,
    initTouchControls
}