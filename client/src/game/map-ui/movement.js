const globals = require('../../game-data/globals')
const state = require('../../game-data/state')
const controls = require('./controls')
const movementChecker = require('./movementChecker')
const handleDoors = require('./handleDoors')

let frameCount = 0;
let pressedKeys = controls.pressedKeys;
let continueAnimating;


/**
 * EXPORT @function initMovement
 * Is called when player sprite is rendered
 * 
 * set continueAnimating to true
 * Passes @function playerMovementController as callback
 * to requestAnimationFrame
 */
const startPlayerMovement = ( ) => {
    continueAnimating = true
    requestAnimationFrame(playerMovementController)
}

/**
 * EXPORT @function stopPlayerMovement
 * Called when game is stopped or new map is loaded
 * 
 * set continueAnimating to false to stop movement
 */
const stopPlayerMovement = () => {
    continueAnimating = false
}


/**
 * @function playerMovementController
 * Gets called +/- 60 times per second with requestAnimationFrame
 * 
 * If the player is pressing d-pad or wasd...
 * Call @function handleMovementOfSprite
 */
const playerMovementController = ( ) => {   

    if ( continueAnimating ) {
        if ( pressedKeys.w || pressedKeys.ArrowUp ) {
            handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_UP')
        }
        if ( pressedKeys.a || pressedKeys.ArrowLeft ) {
            handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_LEFT')
        }
        if ( pressedKeys.s || pressedKeys.ArrowDown ) {
            handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_DOWN')
        }
        if ( pressedKeys.d || pressedKeys.ArrowRight ) {
            handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_RIGHT')
        }    

        requestAnimationFrame(playerMovementController)    
    }
    
}

/**
 * @function handleMovementOfSprite
 * Call functions in order to move sprite
 * @param {string} direction - string representing direction
 * 
 * Clear old sprite
 * Call @function moveInDirection to update sprite xy and direction
 * Call @function countFrame to update animationIterator and framecount
 * Draw sprite in new location and/or pose
 */
const handleMovementOfSprite = ( sprite, direction ) => {
    sprite.clearSprite()

    moveInDirection( sprite, direction )
    countFrame( sprite )

    if ( continueAnimating ) {
    sprite.drawSprite()
    }

}

/**
 * @function moveInDirection
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the gamePiece class from initGamePiece.js
 * 
 * Check map state to see if movement is allowed
 * Update sprite x or y with movement speed based on direction
 * Update sprite direction prop based on direction globals
 */
const moveInDirection = ( sprite, direction ) => {

    const movementIsAllowed = movementChecker.checkIfMovementAllowed( sprite, direction )
    
    const nextTileIsDoor = handleDoors.checkIfDoor(sprite, direction)

    if ( movementIsAllowed ) {

        if ( direction == 'FACING_RIGHT' ) {
            sprite.x += globals.MOVEMENT_SPEED        
        }

        if ( direction == 'FACING_LEFT' ) {
            sprite.x -= globals.MOVEMENT_SPEED        
        }
        
        if ( direction == 'FACING_DOWN' ) {
            sprite.y += globals.MOVEMENT_SPEED        
        }

        if ( direction == 'FACING_UP' ){
            sprite.y -= globals.MOVEMENT_SPEED        
        }        
    }

    
    if ( nextTileIsDoor ) {
        controls.stopListenForKeyPress()
        stopPlayerMovement()
        handleDoors.getNewMap()
        return
    }


    sprite.direction = globals[direction]        
}

/**
 * @function countFrame
 * Update frame count every time requestAnimationFrame fires callback
 * Update sprite's animIterator every time FRAME_LIMIT is equal to framecount 
 * Reset animIterator to zero if necessary
 * 
 * @param {object} sprite - instance of the gamePiece class from initGamePiece.js
 */
const countFrame = ( sprite ) => {
    
    frameCount++;
    
    if (frameCount >= globals.FRAME_LIMIT) {
        frameCount = 0;
        sprite.animIterator++;

        if (sprite.animIterator >= sprite.animLoop.length) {
            sprite.animIterator = 0;
        }
    }
}

/**
 * @function stopAnimationAndGetNewMap
 * 
 * Called when player is walking into door
 * Stop listening for controls, stop animations, clear sprite
 * then get a new map
 */

module.exports = {
    startPlayerMovement,
    startPlayerMovement,
    stopPlayerMovement
}