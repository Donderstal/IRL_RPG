const movement = require('./movement')
const controls = require('./controls')
const state = require('../../game-data/state')

let pressedKeys = controls.pressedKeys;
let continueAnimating = false;

/**
 * EXPORT @function initMovement
 * Is called when player sprite is rendered
 * 
 * set continueAnimating to true
 */
const startPlayerMovement = ( ) => {
    continueAnimating = true
    controls.listenForKeyPress()
}

/**
 * EXPORT @function stopPlayerMovement
 * Called when game is stopped or new map is loaded
 * 
 * set continueAnimating to false to stop movement
 */
const stopPlayerMovement = () => {
    controls.stopListenForKeyPress()
    continueAnimating = false
}

/**
 * @function handleMovementKeys
 * Gets called +/- 60 times per second with requestAnimationFrame
 * 
 * If the player is pressing d-pad or wasd...
 * Call movement.handleMovementOfSprite
 */
const handleMovementKeys = ( ) => {   

    if ( continueAnimating ) {
        if ( pressedKeys.w || pressedKeys.ArrowUp ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, continueAnimating, 'FACING_UP')
        }
        if ( pressedKeys.a || pressedKeys.ArrowLeft ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, continueAnimating, 'FACING_LEFT')
        }
        if ( pressedKeys.s || pressedKeys.ArrowDown ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, continueAnimating, 'FACING_DOWN')
        }
        if ( pressedKeys.d || pressedKeys.ArrowRight ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, continueAnimating, 'FACING_RIGHT')
        }    
    }
}

module.exports = {
    startPlayerMovement,
    stopPlayerMovement,
    handleMovementKeys
}