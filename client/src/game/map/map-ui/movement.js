const globals = require('../../../game-data/globals')
const { GRID_BLOCK_PX, MOVEMENT_SPEED, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals');
const { EVENT_NEIGHBOUR } = require('../../../game-data/conditionGlobals');

/**
 * Call moveInDirection and then call sprite.countFrame
 * @param {Sprite} sprite 
 * @param {Number} direction 
 */
const handleMovementOfSprite = ( sprite, direction ) => {
    moveInDirection( sprite, direction )
    sprite.countFrame( )
}
/**
 * If movement is allowed, increment or decrement the x or y value of given sprite appropriatly
 * @param {Sprite} sprite 
 * @param {Number} direction 
 */
const moveInDirection = ( sprite, direction ) => {
    const changedDirection = sprite.direction != direction;
    sprite.direction = direction   

    const movementIsAllowed = checkIfMovementAllowed( sprite, direction )
    const movingToNeighbour = checkForNeighbours(sprite)
    const cameraFocus = globals.GAME.cameraFocus;

    if ( movementIsAllowed && !movingToNeighbour && !changedDirection && !sprite.pathIsBlocked ) {
        sprite.playerWalking = true;
        if ( direction == FACING_RIGHT ) {
            sprite.x += MOVEMENT_SPEED
            cameraFocus.updateXValue( cameraFocus.xValue - MOVEMENT_SPEED );        
        }
        else if ( direction == FACING_LEFT ) {
            sprite.x -= MOVEMENT_SPEED    
            cameraFocus.updateXValue( cameraFocus.xValue + MOVEMENT_SPEED );   
        }
        else if ( direction == FACING_DOWN ) {
            sprite.y += MOVEMENT_SPEED        
            cameraFocus.updateYValue( cameraFocus.yValue + MOVEMENT_SPEED );  
        }
        else if ( direction == FACING_UP ){
            sprite.y -= MOVEMENT_SPEED      
            cameraFocus.updateYValue( cameraFocus.yValue - MOVEMENT_SPEED );  
        }     
    }
    else {
        sprite.playerWalking = false;
    }
}
/**
 * Check if the sprite can move in the given direction from their current position
 * @param {Sprite} sprite 
 * @param {Number} direction 
 */
const checkIfMovementAllowed = ( sprite, direction ) => {
    const activeMap = globals.GAME.activeMap;
    if ( sprite.currentTileBack == undefined ) {
        return true;
    }

    const facingUpOnTopRow = sprite.currentTileBack.row == 1 && direction == FACING_UP;
    const facingRightOnRightCol = sprite.currentTileBack.col == globals.GAME.back.class.grid.cols && direction == FACING_RIGHT;
    const facingLeftOnLeftCol = sprite.currentTileBack.col == 1 && direction == FACING_LEFT;
    const facingDownOnBottomRow = sprite.currentTileBack.row == globals.GAME.back.class.grid.rows && direction == FACING_DOWN;


    if ( facingUpOnTopRow && ( !activeMap.outdoors || !activeMap.neighbours.up ) ) {
        return !sprite.isInCenterFacingUp;
    }
    else if ( facingDownOnBottomRow && ( !activeMap.outdoors || !activeMap.neighbours.down ) ) {
        return !sprite.isInCenterFacingDown;
    }
    else if ( facingLeftOnLeftCol && ( !activeMap.outdoors || !activeMap.neighbours.left )  ) {
        return !sprite.isInCenterFacingLeft;
    }
    else if ( facingRightOnRightCol && ( !activeMap.outdoors || !activeMap.neighbours.right )  ) {
        return !sprite.isInCenterFacingRight;
    }

    if ( sprite.nextTileBack != undefined && ( sprite.nextTileBack.isBlocked || sprite.nextTileFront.isBlocked ) ) {
        switch ( direction ) {
            case FACING_RIGHT :
                return !sprite.isInCenterFacingRight;
            case FACING_LEFT :
                return !sprite.isInCenterFacingLeft;
            case FACING_UP :
                return !sprite.isInCenterFacingUp;
            case FACING_DOWN :
                return !sprite.isInCenterFacingDown;
        }
    }
    
    return true
}
/**
 * If there is a neighbouring map and the given sprite is over the map border
 * call GAME.switchMap to intialize the new map and return true.
 * @param {Sprite} sprite
 */
const checkForNeighbours = ( sprite ) => {
    const activeMap = globals.GAME.activeMap;
    const activeGrid = globals.GAME.back.class.grid

    if ( activeMap.outdoors ) {
        if ( activeGrid.x > sprite.centerX( ) && activeMap.neighbours.left ) {
            globals.GAME.switchMap( activeMap.neighbours.left, EVENT_NEIGHBOUR )
            return true;
        }
        if ( activeGrid.x + ( activeGrid.cols * GRID_BLOCK_PX ) < sprite.centerX( ) && activeMap.neighbours.right ) {
            globals.GAME.switchMap( activeMap.neighbours.right, EVENT_NEIGHBOUR )
            return true;
        }
        if ( activeGrid.y > sprite.baseY( ) && activeMap.neighbours.up ) {
            globals.GAME.switchMap( activeMap.neighbours.up, EVENT_NEIGHBOUR )
            return true;
        }
        if ( activeGrid.y + ( activeGrid.rows * GRID_BLOCK_PX ) < sprite.baseY( ) && activeMap.neighbours.down ) {
            globals.GAME.switchMap( activeMap.neighbours.down, EVENT_NEIGHBOUR )
            return true;
        }
    }

    return false;
}

module.exports = {
    handleMovementOfSprite
}