const globals = require('../../../game-data/globals')
const state = require('../../../game-data/state')
const movementChecker = require('./movementChecker');
const { GRID_BLOCK_PX } = require('../../../game-data/globals');

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
    const changedDirection = sprite.direction != globals[direction] ;
    sprite.direction = globals[direction]   

    const movementIsAllowed = movementChecker.checkIfMovementAllowed( sprite, direction )
    const movingToNeighbour = checkForNeighbours(sprite)

    if ( movementIsAllowed && !movingToNeighbour && !changedDirection ) {
        sprite.hasMoved = true;

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
    }
}

const checkForNeighbours = ( sprite ) => {
    const activeMap = globals.GAME.activeMap;
    const activeGrid = globals.GAME.back.class.grid

    if ( activeMap.outdoors ) {
        if ( activeGrid.x > sprite.centerX( ) && activeMap.neighbours.left ) {
            console.log('neighbour!')
            console.log(activeMap.neighbours.left)
            globals.GAME.switchMap( activeMap.neighbours.left, 'NEIGHBOUR' )
            return true
        }

        if ( activeGrid.x + ( activeGrid.cols * GRID_BLOCK_PX ) < sprite.centerX( ) && activeMap.neighbours.right ) {
            console.log('neighbour!')
            console.log(activeMap.neighbours.right)
            globals.GAME.switchMap( activeMap.neighbours.right, 'NEIGHBOUR' )
            return true
        }

        /* if ( activeMap.borders.top > ( sprite.y + sprite.height ) && activeMap.neighbours.top ) {
            return activeMap.neighbours.top
        }

        if ( activeMap.borders.bottom < ( sprite.y ) && activeMap.neighbours.bottom ) {
            return activeMap.neighbours.bottom
        } */
    }

    return false;
}

/**
 * Update frame count every time requestAnimationFrame fires callback
 * Update sprite's sheetPosition every time FRAME_LIMIT is equal to framecount 
 * Reset sheetPosition to zero if necessary
 * 
 * @param {object} sprite - instance of the MapSprite class from initMapSprite.js
 */
const countFrame = ( sprite ) => {
    
    frameCount++;
    
    if (frameCount >= globals.FRAME_LIMIT) {
        frameCount = 0;
        sprite.sheetPosition++;

        if (sprite.sheetPosition >= 4) {
            sprite.sheetPosition = 0;
        }
    }
}

module.exports = {
    handleMovementOfSprite
}