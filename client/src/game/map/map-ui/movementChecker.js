const globals = require('../../../game-data/globals')

const checkForCollision = ( sprite, isPlayer ) => {
    const currBackTile = sprite.currentTileBack;
    const nextBackTile = sprite.nextTileBack;
    if ( isPlayer && ( currBackTile != undefined && nextBackTile != undefined ) ) {
        const currBackTile = sprite.currentTileBack;
        const nextBackTile = sprite.nextTileBack;

        if  ( currBackTile.hasEvent && currBackTile.eventType == 'DOOR' ) {
            currBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
        else if  ( nextBackTile != undefined && nextBackTile.hasEvent && nextBackTile.eventType == 'DOOR' ) {
            nextBackTile.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
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
    }

    globals.GAME.FRONT.grid.array.forEach( ( e ) => {
        if( e.hasSprite && e.spriteId != sprite.spriteId ) {
            if ( checkIfSpritesCollide( sprite, e.spriteId ) ) {
                return true;
            }
        }
    } )
    
    return false;
}

const checkIfSpritesCollide = ( sprite, targetSpriteId ) => {
    const targetSprite = globals.GAME.front.class.spriteDictionary[targetSpriteId];
    const targetSpriteIsFlying = ( targetSprite.movementType == globals.NPC_MOVE_TYPE_FLYING )

    if ( targetSprite.deleted || targetSpriteIsFlying || targetSprite == undefined ) {
        return false;
    }

    if ( 'hitboxes' in targetSprite && targetSprite.hitboxes.length > 0 && 'hitboxes' in sprite &&  sprite.hitboxes.length > 0 ) {
        sprite.hitboxes.forEach( ( hitbox ) => {
            targetSprite.hitboxes.forEach( ( targetHitbox ) => {
                if ( hitbox.checkForActionRange( targetHitbox, sprite.direction ) ) {
                    return true;
                }
            })
        })
    }
    else if ( 'hitboxes' in targetSprite && targetSprite.hitboxes.length > 0 ) {
        targetSprite.hitboxes.forEach( ( targetHitbox ) => {
            if (  sprite.hitbox.checkForActionRange( targetHitbox, sprite.direction ) ) {
                return true;
            }
        })
    }
    else if ( 'hitboxes' in sprite && sprite.hitboxes.length > 0 ) {
        sprite.hitboxes.forEach( ( hitbox ) => {
            if ( hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
                return true;
            }
        })
    }
    else {
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;     
        }
    }
}

module.exports = {
    checkForCollision
}