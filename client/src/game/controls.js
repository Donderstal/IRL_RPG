const globals = require('../game-data/globals')
const { BATTLE_MODE, MAP_MODE }     = require('../game-data/globals')
const { unsetGameMenu } = require('./Menu')
const handleMovementKeys = require('./map/mapControls').handleMovementKeys
const handleMapKeyPress = require('./map/mapControls').handleMapKeyPress
const { initGameMenu }  = require('./Menu')
const { handleMenuKeyPress } = require('./menu/menuControls');

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
    let firstChar = globals.GAME.PARTY_MEMBERS[0]
    if ( event.key == "i") {
        console.log(firstChar)
        globals.GAME.PLAYER_INVENTORY.unequipItem( firstChar, "shirt_armor_1" );
    }
    if ( event.key == "p" ) {
        console.log(firstChar)
        globals.GAME.PLAYER_INVENTORY.equipItem( firstChar, "shirt_armor_1" );
    }
    if ( event.key == "l" ) {
        console.log(firstChar)
        firstChar.StatusEffects.addEffect("SPEED", "BUFF", 5, "INFINITE")
    }
    if ( event.key == "o" ) {
        console.log(firstChar)
        console.log(firstChar.activeAttributeValues)
    }
    if ( event.key == "k" ) {
        console.log(firstChar)
        firstChar.StatusEffects.removeEffect(firstChar.StatusEffects.activeIds[0])
    }

    if ( event.key == "z" ) {
        globals.GAME.clearBattleData( )
    }

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