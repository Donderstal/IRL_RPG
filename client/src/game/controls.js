const globals = require('../game-data/globals')
const { BATTLE_MODE, MAP_MODE }     = require('../game-data/globals')
const { initGameMenu, unsetGameMenu } = require('./Menu')
const { handleMapKeyPress, handleMovementKeys } = require('./map/mapControls')
const { handleMenuKeyPress } = require('./menu/menuControls');
const { handleBattleKeyPress } = require('./battle/battleControls');

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

    if ( event.key == "l" ) {
        console.log(globals.GAME.PLAYER);
        console.log(globals.GAME.PLAYER.destinationIsLeft);
        console.log(globals.GAME.activeCinematic);
    }
    if ( event.key == "Tab" ) {
        globals.GAME.inMenu ? unsetGameMenu( ) : initGameMenu( );
    }

    if ( globals.GAME.mode == MAP_MODE && !globals.GAME.inMenu && !globals.GAME.inCinematic ) {
        handleMapKeyPress( event )
    }
    else if ( globals.GAME.mode == BATTLE_MODE && !globals.GAME.inMenu && !globals.GAME.inCinematic  ) {
        handleBattleKeyPress( event )
    }
    else if ( globals.GAME.inCinematic ) {
        if ( event.key == " " && globals.GAME.bubbleIsActive ) {
            globals.GAME.activeBubble = {}
            globals.GAME.bubbleIsActive = false
            globals.GAME.activeAction = null;
        }
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

module.exports = {
    listenForKeyPress,
    stopListenForKeyPress,
    clearPressedKeys
}