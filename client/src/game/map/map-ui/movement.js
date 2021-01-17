const globals = require('../../../game-data/globals')
const state = require('../../../game-data/state')
const movementChecker = require('./movementChecker');
const { GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT } = require('../../../game-data/globals');

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

    const movementIsAllowed = checkIfMovementAllowed( sprite, direction )
    const movingToNeighbour = checkForNeighbours(sprite)

    if ( movementIsAllowed && !movingToNeighbour && !changedDirection && !sprite.pathIsBlocked ) {
        sprite.hasMoved = true;

        if ( direction == 'FACING_RIGHT' ) {
            sprite.x += MOVEMENT_SPEED        
        }
        else if ( direction == 'FACING_LEFT' ) {
            sprite.x -= MOVEMENT_SPEED    
        }
        else if ( direction == 'FACING_DOWN' ) {
            sprite.y += MOVEMENT_SPEED        
        }
        else if ( direction == 'FACING_UP' ){
            sprite.y -= MOVEMENT_SPEED        
        }     
    }
}

const checkIfMovementAllowed = ( sprite, direction ) => {
    const activeMap = globals.GAME.activeMap;
    const activeBackgroundTile = globals.GAME.getTileOnCanvasAtIndex( "BACK", sprite.activeTileIndex);
    const nextBackgroundTile = globals.GAME.getTileOnCanvasAtIndex( "BACK", sprite.nextTileIndex);
    const nextForegroundTile = globals.GAME.getTileOnCanvasAtIndex( "FRONT", sprite.nextTileIndex);

    if ( activeBackgroundTile == undefined ) {
        return true;
    }

    if ( activeBackgroundTile.row == 1 && direction == 'FACING_UP' 
    && ( !activeMap.outdoors || !activeMap.neighbours.up ) ) {
        return !sprite.isInCenterFacingUp;
    }
    else if ( activeBackgroundTile.row == globals.GAME.back.class.grid.rows && direction == 'FACING_DOWN' 
    && ( !activeMap.outdoors || !activeMap.neighbours.down ) ) {
        return !sprite.isInCenterFacingDown;
    }
    else if ( activeBackgroundTile.col == 1 && direction == 'FACING_LEFT' 
    && ( !activeMap.outdoors || !activeMap.neighbours.left )  ) {
        return !sprite.isInCenterFacingLeft;
    }
    else if ( activeBackgroundTile.col == globals.GAME.back.class.grid.cols && direction == 'FACING_RIGHT' 
    && ( !activeMap.outdoors || !activeMap.neighbours.right )  ) {
        return !sprite.isInCenterFacingRight;
    }

    if ( nextBackgroundTile != undefined && ( nextBackgroundTile.blocked  || ( nextForegroundTile.hasSprite && globals.GAME.front.class.spriteDictionary[nextForegroundTile.spriteId].type == "idle" ) ) ) {
        switch ( direction ) {
            case 'FACING_RIGHT' :
                return !sprite.isInCenterFacingRight;
            case 'FACING_LEFT' :
                return !sprite.isInCenterFacingLeft;
            case 'FACING_UP' :
                return !sprite.isInCenterFacingUp;
            case 'FACING_DOWN' :
                return !sprite.isInCenterFacingDown;
        }
    }
    
    return true
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

        if ( activeGrid.y > sprite.baseY( ) && activeMap.neighbours.up ) {
            console.log('neighbour!')
            console.log(activeMap.neighbours.up)
            globals.GAME.switchMap( activeMap.neighbours.up, 'NEIGHBOUR' )
            return activeMap.neighbours.up
        }

        if ( activeGrid.y + ( activeGrid.rows * GRID_BLOCK_PX ) < sprite.baseY( ) && activeMap.neighbours.down ) {
            console.log('neighbour!')
            console.log(activeMap.neighbours.down)
            globals.GAME.switchMap( activeMap.neighbours.down, 'NEIGHBOUR' )
            return activeMap.neighbours.down
        }
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
    
    if (frameCount >= FRAME_LIMIT) {
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