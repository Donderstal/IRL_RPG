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

    if ( nextBackgroundTile != undefined && ( nextBackgroundTile.blocked || ( nextForegroundTile.hasSprite && globals.GAME.front.class.spriteDictionary[nextForegroundTile.spriteId].type == 'idle') ) ) {
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
    const spriteIsFacingUpOrDown =  ( sprite.direction == globals["FACING_UP"] || sprite.direction == globals["FACING_DOWN"] )

    const currBackTile = sprite.currentTileBack;
    const currFrontTile = sprite.currentTileFront;

    const currFrontNeighbourPrev = globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.activeTileIndex - 1 : sprite.activeTileIndex - 24];
    const currFrontNeighbourNext = globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.activeTileIndex + 1 : sprite.activeTileIndex + 24];

    const nextBackTile = sprite.nextTileBack;
    const nextFrontTile = sprite.nextTileFront;

    const nextFrontNeighbourPrev = globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.nextTileIndex - 1 : sprite.nextTileIndex - 24];
    const nextFrontNeighbourNext = globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.nextTileIndex + 1 : sprite.nextTileIndex + 24];

    if ( isPlayer ) {
        if  ( currBackTile.hasEvent && currBackTile.eventType == 'DOOR' ) {
            currBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
            return true;
        }
        else if  ( nextBackTile.hasEvent && nextBackTile.eventType == 'DOOR' ) {
            nextBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
            return true;
        }
    }
    
    if ( currFrontTile.hasSprite && currFrontTile.spriteId != sprite.spriteId ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[currFrontTile.spriteId];
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;         
        }
    }
    if ( currFrontNeighbourPrev.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[currFrontNeighbourPrev.spriteId];
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;         
        }
    }
    if ( currFrontNeighbourNext.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[currFrontNeighbourNext.spriteId];
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;         
        }
    }
    if ( nextFrontTile.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[nextFrontTile.spriteId];
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;
        }
    }
    if ( nextFrontNeighbourPrev.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[nextFrontNeighbourPrev.spriteId];
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;         
        }
    }
    if ( nextFrontNeighbourNext.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[nextFrontNeighbourNext.spriteId];
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;         
        }
    }

    return false;
}

module.exports = {
    checkIfMovementAllowed,
    checkForCollision
}