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

    const currFrontNeighbourPrev = setCurrFrontNeighbourPrev( sprite, spriteIsFacingUpOrDown );
    const currFrontNeighbourNext = setCurrFrontNeighbourNext( sprite, spriteIsFacingUpOrDown );

    const nextBackTile = sprite.nextTileBack;
    const nextFrontTile = sprite.nextTileFront;

    const nextFrontNeighbourPrev = setNextFrontNeighbourPrev( sprite, spriteIsFacingUpOrDown );
    const nextFrontNeighbourNext = setNextFrontNeighbourNext( sprite, spriteIsFacingUpOrDown );

    if ( isPlayer ) {
        if  ( currBackTile.hasEvent && currBackTile.eventType == 'DOOR' ) {
            currBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
        else if  ( nextBackTile != undefined && nextBackTile.hasEvent && nextBackTile.eventType == 'DOOR' ) {
            nextBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
    }
    
    if ( currFrontTile.hasSprite && currFrontTile.spriteId != sprite.spriteId ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[currFrontTile.spriteId];
        const spriteIsFlying = ( targetSprite.type !== undefined && targetSprite.type == 'flying' ) ;
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) && !spriteIsFlying ) {
            return true;         
        }
    }
    if ( currFrontNeighbourPrev != undefined && currFrontNeighbourPrev.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[currFrontNeighbourPrev.spriteId];
        const spriteIsFlying = ( targetSprite.type !== undefined && targetSprite.type == 'flying' ) ;
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) && !spriteIsFlying ) {
            return true;         
        }
    }
    if ( currFrontNeighbourNext != undefined && currFrontNeighbourNext.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[currFrontNeighbourNext.spriteId];
        const spriteIsFlying = ( targetSprite.type !== undefined && targetSprite.type == 'flying' ) ;
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) && !spriteIsFlying ) {
            return true;         
        }
    }
    if ( nextFrontTile != undefined && nextFrontTile.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[nextFrontTile.spriteId];
        const spriteIsFlying = ( targetSprite.type !== undefined && targetSprite.type == 'flying' ) ;
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) && !spriteIsFlying ) {
            return true;
        }
    }
    if ( nextFrontNeighbourPrev != undefined && nextFrontNeighbourPrev.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[nextFrontNeighbourPrev.spriteId];
        const spriteIsFlying = ( targetSprite.type !== undefined && targetSprite.type == 'flying' ) ;
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) && !spriteIsFlying ) {
            return true;         
        }
    }
    if ( nextFrontNeighbourNext != undefined && nextFrontNeighbourNext.hasSprite ) {
        const targetSprite = globals.GAME.front.class.spriteDictionary[nextFrontNeighbourNext.spriteId];
        const spriteIsFlying = ( targetSprite.type !== undefined && targetSprite.type == 'flying' ) ;
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) && !spriteIsFlying ) {
            return true;         
        }
    }

    return false;
}

const setCurrFrontNeighbourPrev = ( sprite, spriteIsFacingUpOrDown ) => {
    if ( sprite.currentTileFront.row == 1 && spriteIsFacingUpOrDown) {
        return { hasSprite: false};
    }
    if ( sprite.currentTileFront.col == 1 && !spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }
    return globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.activeTileIndex - 1 : sprite.activeTileIndex - globals.GAME.activeMap.columns];
}

const setCurrFrontNeighbourNext = ( sprite, spriteIsFacingUpOrDown ) => {
    if ( sprite.currentTileFront.row == globals.GAME.activeMap.rows && spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }
    if ( sprite.currentTileFront.col == globals.GAME.activeMap.columns && !spriteIsFacingUpOrDown  ) {
        return { hasSprite: false};
    }
    return globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.activeTileIndex + 1 : sprite.activeTileIndex + globals.GAME.activeMap.columns];
}

const setNextFrontNeighbourPrev = ( sprite, spriteIsFacingUpOrDown ) => {
    if ( sprite.nextTileFront == undefined ) {
        return { hasSprite: false};
    }
    if ( sprite.nextTileFront.row == 1 && spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }
    if ( sprite.nextTileFront.col == 1 && !spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }
    return globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.nextTileIndex - 1 : sprite.nextTileIndex - globals.GAME.activeMap.columns];
}

const setNextFrontNeighbourNext = ( sprite, spriteIsFacingUpOrDown ) => {
    if ( sprite.nextTileFront == undefined ) {
        return { hasSprite: false};
    }
    if ( sprite.nextTileFront.row == globals.GAME.activeMap.rows && spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }
    if ( sprite.nextTileFront.col == globals.GAME.activeMap.columns && !spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }
    return globals.GAME.front.class.grid.array[spriteIsFacingUpOrDown ? sprite.nextTileIndex + 1 : sprite.nextTileIndex + globals.GAME.activeMap.columns];
}

module.exports = {
    checkIfMovementAllowed,
    checkForCollision
}