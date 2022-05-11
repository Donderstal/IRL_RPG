const globals = require('../../../game-data/globals')
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals')
const { EVENT_DOOR } = require('../../../game-data/conditionGlobals')
/**
 * Check if the given sprite collides with another sprite on the map
 * @param {Sprite} sprite 
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
        if ( sprite.nextTileBack != undefined && sprite.nextTileBack.isBlocked ) {
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

    globals.GAME.FRONT.allSprites.forEach( ( e ) => {
        if( e.spriteId != sprite.spriteId ) {
            if ( !e.hasOwnProperty("blockedArea") &&  !e.hasDoor && checkIfSpritesCollide( sprite, e )) {
                colliding = true;
            }
            else if ( e.hasOwnProperty("blockedArea") && e.blockedArea.checkForCollision( sprite.hitbox, sprite.direction ) ) {
                colliding = true;
            }
        }
    })
    
    return colliding;
}
/**
 * Check if the given sprite collides with target sprite
 * @param {Sprite} sprite 
 * @param {String} targetSpriteId 
 * @returns {Boolean} true if collison, false if not
 */
const checkIfSpritesCollide = ( sprite, targetSprite ) => {
    let colliding = false;
    if ( targetSprite.movementType == globals.NPC_MOVE_TYPE_FLYING ) {
        return colliding;
    }

    if ( sprite.hitbox.checkForBlockedRange( targetSprite.hitbox.activeAction != undefined ? targetSprite.hitbox.activeAction : targetSprite.hitbox, sprite.direction ) ) {
        return true;     
    }
    
    return colliding
}

module.exports = {
    checkForCollision
}