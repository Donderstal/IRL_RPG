const globals = require('../game-data/globals')
const { BATTLE_MODE, MAP_MODE }     = require('../game-data/globals')
const handleMovementKeys = require('./map/mapControls').handleMovementKeys
const handleMapKeyPress = require('./map/mapControls').handleMapKeyPress
const handleBattleKeyPress = require('./battle/battleControls').handleBattleKeyPress

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
    if ( event.key == "l" ) {
        console.log("___active tile front___")
        console.log( globals.GAME.front.class.grid.array[globals.GAME.PLAYER.activeTileIndex] )
        console.log("___next tile front___")
        console.log( globals.GAME.front.class.grid.array[globals.GAME.PLAYER.nextTileIndex] )
    }
    if ( globals.GAME.mode == MAP_MODE ) {
        handleMapKeyPress( event )
    }
    else if ( globals.GAME.mode == BATTLE_MODE ) { 
        handleBattleKeyPress( event )
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