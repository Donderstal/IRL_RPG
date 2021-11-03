const globals = require('../game-data/globals')
const { MAP_MODE }     = require('../game-data/globals')
const { initGameMenu, unsetGameMenu } = require('./MainMenu')
const { handleMapKeyPress } = require('./map/mapControls')
const { handleMenuKeyPress } = require('./menu/menuControls');
const { INTERACTION_YES, INTERACTION_NO } = require('../game-data/interactionGlobals');
const { SPEAK_YES_NO } = require('../game-data/conditionGlobals');

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
/**
 * If pressed key is tab, open the main menu. Pass pressed key on to the correct function depending on GAME.mode.
 */
const addKeyToPressed = ( ) => {
    event.preventDefault( );
    const GAME = globals.GAME

    if ( event.key == "m" ) {
        console.log(globals.AUDIO_DICTIONARY)
    }
    
    if ( event.key == "Tab" ) {
        GAME.inMenu ? unsetGameMenu( ) : initGameMenu( );
    }

    if ( GAME.mode == MAP_MODE && !GAME.inMenu && !GAME.inCinematic ) {
        handleMapKeyPress( event )
    }
    else if ( GAME.inCinematic ) {
        if ( event.key == " " && GAME.bubbleIsActive && !GAME.activeBubble.typeWriter.isWriting ) {
            if ( GAME.activeCinematic.activeScene.is( SPEAK_YES_NO ) ) {
                GAME.activeAction.registerSelection( INTERACTION_YES );
                GAME.activeCinematic.activeScene.setSelection( "YES" )  ;              
            }
            GAME.activeBubble = {}
            GAME.bubbleIsActive = false
        }
        else if ( event.key == " " && GAME.bubbleIsActive && GAME.activeBubble.typeWriter.isWriting ) {
            GAME.activeBubble.typeWriter.displayFullText( )
        }
        else if ( event.key == "z" && GAME.bubbleIsActive && GAME.activeCinematic.activeScene.is( SPEAK_YES_NO ) ) {
            GAME.activeAction.registerSelection( INTERACTION_NO );
            GAME.activeCinematic.activeScene.setSelection( "NO" )
            GAME.activeBubble = {}
            GAME.bubbleIsActive = false
        }


    }
    else if ( GAME.inMenu ) {
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

module.exports = {
    listenForKeyPress,
    stopListenForKeyPress,
    clearPressedKeys
}