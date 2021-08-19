const globals = require('../../../game-data/globals')
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals')
const { EVENT_DOOR } = require('../../../game-data/conditionGlobals')
/**
 * Check if the given sprite collides with another sprite on the map
 * @param {I_Sprite} sprite 
 * @param {Boolean} isPlayer
 * @returns {Boolean} true if collison, false if not
 */
const checkForCollision = ( sprite, isPlayer ) => {
    let colliding = false; 

    if ( isPlayer && ( sprite.currentTileBack != undefined && sprite.nextTileBack != undefined ) ) {
        if  ( sprite.currentTileBack.hasEvent && sprite.currentTileBack.eventType == EVENT_DOOR ) {
            sprite.currentTileBack.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
        else if  ( sprite.nextTileBack.hasEvent && sprite.nextTileBack.eventType == EVENT_DOOR ) {
            sprite.nextTileBack.event.checkForBlockedRange( sprite.hitbox, sprite.direction );
        }
        if ( sprite.nextTileBack != undefined && sprite.nextTileBack.blocked ) {
            switch ( sprite.direction ) {
                case FACING_RIGHT :
                    return sprite.isInCenterFacingRight;
                case FACING_LEFT :
                    return sprite.isInCenterFacingLeft;
                case FACING_UP :
                    return sprite.isInCenterFacingUp;
                case FACING_DOWN :
                    return sprite.isInCenterFacingDown;
            }
        }
    }

    globals.GAME.FRONT.grid.array.forEach( ( e ) => {
        if( e.hasSprite && e.spriteId != sprite.spriteId ) {
            if ( checkIfSpritesCollide( sprite, e.spriteId ) ) {
                colliding = true;
            }
        }
    } )
    
    return colliding;
}
/**
 * Check if the given sprite collides with target sprite
 * @param {I_Sprite} sprite 
 * @param {String} targetSpriteId 
 * @returns {Boolean} true if collison, false if not
 */
const checkIfSpritesCollide = ( sprite, targetSpriteId ) => {
    let colliding = false;
    const targetSprite = globals.GAME.front.class.spriteDictionary[targetSpriteId];
    const targetSpriteIsFlying = ( targetSprite.movementType == globals.NPC_MOVE_TYPE_FLYING )

    if ( targetSprite.deleted || targetSpriteIsFlying || targetSprite == undefined ) {
        return false;
    }

    if ( 'hitboxes' in targetSprite && 'hitboxes' in sprite ) {
        sprite.hitboxes.forEach( ( hitbox ) => {
            targetSprite.hitboxes.forEach( ( targetHitbox ) => {
                if ( hitbox.checkForActionRange( targetHitbox, sprite.direction ) ) {
                    colliding = true;
                }
            })
        })
    }
    else if ( 'hitboxes' in targetSprite ) {
        targetSprite.hitboxes.forEach( ( targetHitbox ) => {
            if (  sprite.hitbox.checkForActionRange( targetHitbox, sprite.direction ) ) {
                colliding = true;
            }
        })
    }
    else if ( 'hitboxes' in sprite ) {
        sprite.hitboxes.forEach( ( hitbox ) => {
            if ( hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
                colliding = true;
            }
        })
    }
    else {
        if ( sprite.hitbox.checkForActionRange( targetSprite.hitbox, sprite.direction ) ) {
            return true;     
        }
    }

    return colliding
}

module.exports = {
    checkForCollision
}