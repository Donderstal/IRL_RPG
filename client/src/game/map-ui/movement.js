const globals = require('../../game-data/globals')
const state = require('../../game-data/state')
const mapHelpers = require('../../helpers/mapHelpers')
const initMap = require('../map-init/initMap')
const canvasHelpers = require('../../helpers/canvasHelpers')

let frameCount = 0;
let pressedKeys = {};
let animationRequest;

/**
 * EXPORT @function initMovement
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const listenForKeyPress = () => {
    window.addEventListener('keydown', () => {
        pressedKeys[event.key] = true
    })
    window.addEventListener('keyup', () => {
        pressedKeys[event.key] = false
    })
}


/**
 * EXPORT @function initMovement
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const stopListenForKeyPress = () => {
    window.removeEventListener('keydown', () => {
        pressedKeys[event.key] = true
    })
    window.removeEventListener('keyup', () => {
        pressedKeys[event.key] = false
    })
}

/**
 * EXPORT @function initMovement
 * Is called when player sprite is rendered
 * 
 * Passes @function playerMovementController as callback
 * to requestAnimationFrame
 */
const initPlayerMovement = ( ) => {
    requestAnimationFrame(playerMovementController)
}

/**
 * EXPORT @function stopMovement
 * Called when game is stopped
 * 
 * Stop @function playerMovementController callback
 */
const stopPlayerMovement = () => {
    cancelAnimationFrame(animationRequest)
}


/**
 * @function playerMovementController
 * Gets called +/- 60 times per second with requestAnimationFrame
 * 
 * If the player is pressing d-pad or wasd...
 * Call @function handleMovementOfSprite
 */
const playerMovementController = ( ) => {   

    const playerSprite = state.playerCharacter.sprite

    if ( pressedKeys.w || pressedKeys.ArrowUp ) {
        handleMovementOfSprite(playerSprite, 'FACING_UP')
    }
    if ( pressedKeys.a || pressedKeys.ArrowLeft ) {
        handleMovementOfSprite(playerSprite, 'FACING_LEFT')
    }
    if ( pressedKeys.s || pressedKeys.ArrowDown ) {
        handleMovementOfSprite(playerSprite, 'FACING_DOWN')
    }
    if ( pressedKeys.d || pressedKeys.ArrowRight ) {
        handleMovementOfSprite(playerSprite, 'FACING_RIGHT')
    }    

    animationRequest = requestAnimationFrame(playerMovementController)
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

    sprite.drawSprite()

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

    const movementIsAllowed = checkIfMovementAllowed( sprite, direction )
    
    checkIfDoor(sprite, direction)

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

    sprite.direction = globals[direction]        
}

/**
 * @function checkIfDoor
 * 
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the GamePiece class from initGamePiece.js
 * 
 * Render new map if player is passing through
 */

const checkIfDoor = (sprite, direction) => {
    const doors = state.currentMap.doors

    const spriteGridLocation = mapHelpers.getCellOfXY( ( sprite.x + ( sprite.width / 2 ) ), ( sprite.y + ( sprite.height / 3 ) ) )
    for( var i = 0; i < doors.length; i++ ) {
        const currentDoor = doors[i]
        if ( currentDoor.row === spriteGridLocation.row && currentDoor.col === spriteGridLocation.col 
            && !currentDoor.locked && direction === currentDoor.direction) {

            stopPlayerMovement()
            stopListenForKeyPress()

            canvasHelpers.clearBothCanvases()

            initMap.fetchMapJsonWithCallback( currentDoor.to, state.currentMap.mapData.mapName )

            return true
        }
    }
}

/**
 * @function checkIfMovementAllowed
 * 
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the gamePiece class from initGamePiece.js
 * 
 * Take the blockedXyValues prop from the current map, generated in initMap.js
 * Dependending on the direction the sprite is facing...
 * Check if x or y of sprite is equal to map border
 * Check if x or y of sprite is equal to a forbidden x or y
 * And check if the location of sprite relative to blocked tile
 * 
 * I know this function is a ugly mess of ifs and forsw
 * But I had difficulty thinking of a different way to do this
 * Let met know what you think
 * 
 * @return {boolean} - expressing wether movement is allowed
 */

const checkIfMovementAllowed = ( sprite, direction ) => {

    const blockedXyValues = state.currentMap.blockedXyValues

    if ( blockedXyValues === undefined ) {
        return true
    }

    const spriteLeft = sprite.x + ( globals.GRID_BLOCK_PX * .25 )
    const spriteRight = sprite.x + ( sprite.width - ( globals.GRID_BLOCK_PX * .25 ) )

    // a sprite is higher than a grid block
    // this needs to be corrected when calculating position
    const spriteTop = sprite.y + ( sprite.height / 3 ) 
    const spriteBottom = sprite.y + sprite.height

    const spriteVerticalMiddle = spriteBottom - ( globals.GRID_BLOCK_PX * .5 )

    if ( direction == 'FACING_LEFT' ) {
        if (state.currentMap.borders.left >= sprite.x ) {
            return false
        }
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteLeft < blockedTile['RIGHT'] + 2
                 && spriteRight > blockedTile['RIGHT']
                 && spriteBottom >= blockedTile['TOP'] + 1
                 && spriteVerticalMiddle <= blockedTile['BOTTOM']
                ) {
                return false
            }
        }
    }    

    if ( direction == 'FACING_RIGHT' ) {
        if (state.currentMap.borders.right <= sprite.x ) {
            return false
        }
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteRight > blockedTile['LEFT'] - 2
                && spriteLeft < blockedTile['LEFT']
                && spriteBottom >= blockedTile['TOP'] + 1
                && spriteVerticalMiddle <= blockedTile['BOTTOM']
                ) {
                return false
            }
        }
    }

    if ( direction == 'FACING_UP' ){
        if ( state.currentMap.borders.top >= sprite.y ) {
            return false
        }
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteTop <= blockedTile['BOTTOM'] + 2
                && spriteBottom > blockedTile['BOTTOM'] 
                && spriteLeft <= blockedTile['RIGHT']
                && spriteRight >= blockedTile['LEFT']
            ) {
                return false
            }
        }
    }   

    if ( direction == 'FACING_DOWN' ) {
        if ( state.currentMap.borders.bottom <= sprite.y ) {
            return false
        }
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteBottom >= blockedTile['TOP'] - 2 
                && spriteTop < blockedTile['TOP']
                && spriteLeft <= blockedTile['RIGHT']
                && spriteRight >= blockedTile['LEFT']
                ) {
                return false
            }
        }
    }
    
    return true
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

module.exports = {
    listenForKeyPress,
    initPlayerMovement,
    stopPlayerMovement
}