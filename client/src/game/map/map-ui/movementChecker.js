const globals = require('../../../game-data/globals')

const checkForCollision = ( sprite, isPlayer ) => {
    const spriteIsFacingUpOrDown =  ( sprite.direction == globals["FACING_UP"] || sprite.direction == globals["FACING_DOWN"] )

    const currFrontTile = sprite.currentTileFront;
    if ( currFrontTile == undefined ) {
        return false;
    }
    const currFrontNeighbourPrev = setCurrFrontNeighbourPrev( sprite, spriteIsFacingUpOrDown );
    const currFrontNeighbourNext = setCurrFrontNeighbourNext( sprite, spriteIsFacingUpOrDown );

    const nextFrontTile = sprite.nextTileFront;
    const nextFrontNeighbourPrev = setNextFrontNeighbourPrev( sprite, spriteIsFacingUpOrDown );
    const nextFrontNeighbourNext = setNextFrontNeighbourNext( sprite, spriteIsFacingUpOrDown );

    if ( isPlayer ) {
        const currBackTile = sprite.currentTileBack;
        const nextBackTile = sprite.nextTileBack;

        if  ( currBackTile.hasEvent && currBackTile.eventType == 'DOOR' ) {
            currBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
        else if  ( nextBackTile != undefined && nextBackTile.hasEvent && nextBackTile.eventType == 'DOOR' ) {
            nextBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
    }
    
    if ( currFrontTile.hasSprite && currFrontTile.spriteId != sprite.spriteId ) {
        if ( checkIfSpritesCollide( sprite, currFrontTile.spriteId) ) {
            return true;
        }
    }
    if ( currFrontNeighbourPrev != undefined && currFrontNeighbourPrev.hasSprite ) {
        if ( checkIfSpritesCollide( sprite, currFrontNeighbourPrev.spriteId) ) {
            return true;
        }
    }
    if ( currFrontNeighbourNext != undefined && currFrontNeighbourNext.hasSprite ) {
        if ( checkIfSpritesCollide( sprite, currFrontNeighbourNext.spriteId) ) {
            return true;
        }
    }
    if ( nextFrontTile != undefined && nextFrontTile.hasSprite ) {
        if ( checkIfSpritesCollide( sprite, nextFrontTile.spriteId) ) {
            return true;
        }
    }
    if ( nextFrontNeighbourPrev != undefined && nextFrontNeighbourPrev.hasSprite ) {
        if ( checkIfSpritesCollide( sprite, nextFrontNeighbourPrev.spriteId) ) {
            return true;
        }
    }
    if ( nextFrontNeighbourNext != undefined && nextFrontNeighbourNext.hasSprite ) {
        if ( checkIfSpritesCollide( sprite, nextFrontNeighbourNext.spriteId ) ) {
            return true;
        }
    }

    const nextBackgroundTile = globals.GAME.getTileOnCanvasAtIndex( "BACK", sprite.nextTileIndex);
    if ( nextBackgroundTile != undefined && nextBackgroundTile.blocked ) {
        switch ( sprite.direction ) {
            case globals['FACING_RIGHT'] :
                return sprite.isInCenterFacingRight;
            case globals['FACING_LEFT'] :
                return sprite.isInCenterFacingLeft;
            case globals['FACING_UP'] :
                return sprite.isInCenterFacingUp;
            case globals['FACING_DOWN'] :
                return sprite.isInCenterFacingDown;
        }
    }
    
    return false;
}

const checkIfSpritesCollide = ( sprite, targetSpriteId ) => {
    let colliding = false;
    const targetSprite = globals.GAME.front.class.spriteDictionary[targetSpriteId];
    if ( targetSprite == undefined ) {
        return colliding;
    }

    const targetSpriteIsFlying = ( targetSprite.type !== undefined && targetSprite.type == 'flying' )

    if ( targetSprite.deleted || targetSpriteIsFlying ) {
        return colliding;
    }

    if ( 'hitboxes' in targetSprite && targetSprite.hitboxes.length > 0 && 'hitboxes' in sprite &&  sprite.hitboxes.length > 0 ) {
        sprite.hitboxes.forEach( ( hitbox ) => {
            targetSprite.hitboxes.forEach( ( targetHitbox ) => {
                if ( hitbox.checkForActionRange( targetHitbox, sprite.direction ) ) {
                    colliding = true;
                }
            })
        })
    }
    else if ( 'hitboxes' in targetSprite && targetSprite.hitboxes.length > 0 ) {
        targetSprite.hitboxes.forEach( ( targetHitbox ) => {
            if (  sprite.hitbox.checkForActionRange( targetHitbox, sprite.direction ) ) {
                colliding = true;
            }
        })
    }
    else if ( 'hitboxes' in sprite && sprite.hitboxes.length > 0 ) {
        sprite.hitboxes.forEach( ( hitbox ) => {
            if ( hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
                colliding = true;
            }
        })
    }
    else {
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            colliding = true;         
        }
    }

    return colliding ;
}

const setCurrFrontNeighbourPrev = ( sprite, spriteIsFacingUpOrDown ) => {
    if ( sprite.currentTileFront.row == 1 && spriteIsFacingUpOrDown) {
        return { hasSprite: false};
    }
    if ( sprite.currentTileFront.col == 1 && !spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }

    let index = spriteIsFacingUpOrDown ? sprite.activeTileIndex - 1 : sprite.activeTileIndex - globals.GAME.activeMap.columns;
    return globals.GAME.getTileOnCanvasAtIndex( "FRONT", index );
}

const setCurrFrontNeighbourNext = ( sprite, spriteIsFacingUpOrDown ) => {
    if ( sprite.currentTileFront.row == globals.GAME.activeMap.rows && spriteIsFacingUpOrDown ) {
        return { hasSprite: false};
    }
    if ( sprite.currentTileFront.col == globals.GAME.activeMap.columns && !spriteIsFacingUpOrDown  ) {
        return { hasSprite: false};
    }

    let index = spriteIsFacingUpOrDown ? sprite.activeTileIndex + 1 : sprite.activeTileIndex + globals.GAME.activeMap.columns;
    return globals.GAME.getTileOnCanvasAtIndex( "FRONT", index );
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

    let index = spriteIsFacingUpOrDown ? sprite.nextTileIndex - 1 : sprite.nextTileIndex - globals.GAME.activeMap.columns;
    return globals.GAME.getTileOnCanvasAtIndex( "FRONT", index );
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

    let index = spriteIsFacingUpOrDown ? sprite.nextTileIndex + 1 : sprite.nextTileIndex + globals.GAME.activeMap.columns
    return globals.GAME.getTileOnCanvasAtIndex( "FRONT", index );
}

module.exports = {
    checkForCollision
}