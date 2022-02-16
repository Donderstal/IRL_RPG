const globals = require('../game-data/globals')
const { handleMapKeyPress } = require('./map/mapControls')
const { handleMenuKeyPress } = require('./menuCanvas/menuCanvasControls');

/**
 * Add keydown listener with addKeyPressed callback. Add keyup listener with removeKeyFromPressed callback.
 */
const listenForKeyPress = ( ) => {
    window.addEventListener('keydown', addKeyToPressed)
    window.addEventListener('keyup', removeKeyFromPressed)
    window.addEventListener('mousedown', ( event ) => {
        if ( event.which == 3 ) {
            // clear pressed keys on right click
            clearPressedKeys( globals.GAME.pressedKeys );
        }
    })
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

const addKeyToPressed = ( event ) => {
    if ( 'preventDefault' in event ) {
        event.preventDefault( );        
    }

    const GAME = globals.GAME

    if ( event.key == "m" ) {
        console.log(globals.AUDIO_DICTIONARY)
    }
    
    if ( event.key == "Tab" ) {
        GAME.MENU.isActive ? GAME.MENU.hide( ) : GAME.MENU.show( );
    }

    if ( !GAME.MENU.isActive && !GAME.inCinematic ) {
        handleMapKeyPress( event )
    }
    else if ( GAME.inCinematic ) {
        if ( event.key == " " ) {
            GAME.speechBubbleController.handleButtonPress(event.key);
        }
        else if (event.key == "a" || event.key == "ArrowLeft"||event.key == "d" || event.key == "ArrowRight") {
            GAME.speechBubbleController.handleSelectionKeys( );
        }
    }
    else if ( GAME.MENU.isActive ) {
        handleMenuKeyPress( event );
    }
}
/**
 * Clear current event.key from the GAME.pressedKeys object
 */
const removeKeyFromPressed = ( event ) => {
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

module.exports = {
    listenForKeyPress,
    stopListenForKeyPress,
    clearPressedKeys,
    addKeyToPressed,
    removeKeyFromPressed
}