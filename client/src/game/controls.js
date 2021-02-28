const globals = require('../game-data/globals')
const { BATTLE_MODE, MAP_MODE }     = require('../game-data/globals')
const { unsetGameMenu } = require('./Menu')
const handleMovementKeys = require('./map/mapControls').handleMovementKeys
const handleMapKeyPress = require('./map/mapControls').handleMapKeyPress
const handleBattleKeyPress = require('./battle/battleControls').handleBattleKeyPress
const { initGameMenu,handleMenuKeyPress }  = require('./Menu')

const listenForKeyPress = ( ) => {
    window.addEventListener('keydown', addKeyToPressed)
    window.addEventListener('keyup', removeKeyFromPressed)
    globals.GAME.listeningForPress = true;
}

const stopListenForKeyPress = ( ) => {
    window.removeEventListener('keydown', addKeyToPressed)
    window.removeEventListener('keyup', removeKeyFromPressed)
    globals.GAME.listeningForPress = false;
}

const addKeyToPressed = ( ) => {
    event.preventDefault( );
    
    if ( event.key == "Tab" ) {
        globals.GAME.inMenu ? unsetGameMenu( ) : initGameMenu( );
    }

    if ( globals.GAME.mode == MAP_MODE && !globals.GAME.inMenu ) {
        handleMapKeyPress( event )
    }
    else if ( globals.GAME.mode == BATTLE_MODE && !globals.GAME.inMenu ) { 
        handleBattleKeyPress( event )
    }
    else if ( globals.GAME.inMenu ) {
        handleMenuKeyPress( event );
    }
}

const removeKeyFromPressed = () => {
    globals.GAME.pressedKeys[event.key] = false
}

const clearPressedKeys = ( pressedKeys ) => {
    Object.keys( pressedKeys ).forEach( (key) => {
        pressedKeys[key] = false
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