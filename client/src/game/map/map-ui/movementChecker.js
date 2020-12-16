const state = require('../../../game-data/state')

const globals = require('../../../game-data/globals')

const checkIfMovementAllowed = ( sprite, direction ) => {
    const activeMap = globals.GAME.activeMap;
    const activeBackgroundTile = globals.GAME.back.class.grid.array[sprite.activeTileIndex];
    const nextBackgroundTile = globals.GAME.back.class.grid.array[sprite.nextTileIndex];
    const nextForegroundTile = globals.GAME.front.class.grid.array[sprite.nextTileIndex];

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

    if ( nextBackgroundTile != undefined && ( nextBackgroundTile.blocked || nextForegroundTile.hasSprite ) ) {
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

const checkForCollision = ( sprite, isPlayer ) => {
    const currBackTile = sprite.currentTileBack;
    const currFrontTile = sprite.currentTileFront;

    const nextBackTile = sprite.nextTileBack;
    const nextFrontTile = sprite.nextTileFront;

    if ( isPlayer ) {
        if  ( currBackTile.hasEvent && currBackTile.eventType == 'DOOR' ) {
            currBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
        else if  ( nextBackTile.hasEvent && nextBackTile.eventType == 'DOOR' ) {
            nextBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
    }

    if ( currFrontTile.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[currFrontTile.spriteId];
        if ( targetSprite.hitbox.checkForActionRange( sprite.hitbox, sprite.direction ) ) {
            console.log(currFrontTile.spriteId + ' in blocked range!')            
        }
    }
    else if ( nextFrontTile.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[nextFrontTile.spriteId];
        if ( targetSprite.hitbox.checkForActionRange( sprite.hitbox, sprite.direction ) ) {
            console.log(nextFrontTile.spriteId + ' in blocked range!')
        }
    }
}

module.exports = {
    checkIfMovementAllowed,
    checkForCollision
}