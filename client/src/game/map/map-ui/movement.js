const globals = require('../../../game-data/globals')
const state = require('../../../game-data/state')
const movementChecker = require('./movementChecker')

let frameCount = 0;
let doorFrameCount = 0; 

/**
 * Call functions in order to move sprite
 * @param {string} direction - string representing direction
 * 
 * Clear old sprite
 * Call @function moveInDirection to update sprite xy and direction
 * Call @function countFrame to update animationIterator and framecount
 * Draw sprite in new location and/or pose
 */
const handleMovementOfSprite = ( sprite, direction ) => {
    moveInDirection( sprite, direction )
    countFrame( sprite )
}

/**
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the MapSprite class from initMapSprite.js
 * 
 * Check map state to see if movement is allowed
 * Update sprite x or y with movement speed based on direction
 * Update sprite direction prop based on direction globals
 */
const moveInDirection = ( sprite, direction ) => {
    const movementIsAllowed = movementChecker.checkIfMovementAllowed( sprite, direction )
    let urlToNewMap = checkForNeighbours(sprite)

    if ( movementIsAllowed && !urlToNewMap ) {

        if ( direction == 'FACING_RIGHT' ) {
            sprite.x += globals.MOVEMENT_SPEED        
        }
        else if ( direction == 'FACING_LEFT' ) {
            sprite.x -= globals.MOVEMENT_SPEED    
        }
        else if ( direction == 'FACING_DOWN' ) {
            sprite.y += globals.MOVEMENT_SPEED        
        }
        else if ( direction == 'FACING_UP' ){
            sprite.y -= globals.MOVEMENT_SPEED        
        }     
        
        state.playerCharacter.sprite.calcCellFromXy( );
    }

    if ( urlToNewMap && !state.transitioning ) {
        state.mapTransition = {
            urlToNewMap: urlToNewMap, 
            oldMapName: state.currentMap.mapData.mapName
        }
        return
    }

    sprite.direction = globals[direction]        
}

const checkForNeighbours = ( sprite ) => {
    if (state.currentMap.mapData.outdoors ) {
        if ( state.currentMap.borders.right < ( sprite.x - sprite.width ) && state.currentMap.mapData.neighbours.right ) {
            return state.currentMap.mapData.neighbours.right
        }

        if ( state.currentMap.borders.left > ( sprite.x + sprite.width ) && state.currentMap.mapData.neighbours.left ) {
            return state.currentMap.mapData.neighbours.left
        }

    }
}

/**
 * Update frame count every time requestAnimationFrame fires callback
 * Update sprite's animIterator every time FRAME_LIMIT is equal to framecount 
 * Reset animIterator to zero if necessary
 * 
 * @param {object} sprite - instance of the MapSprite class from initMapSprite.js
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
    handleMovementOfSprite
}