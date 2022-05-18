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
    const allSprites =  globals.GAME.FRONT.allSprites.filter((e)=>{return !e.onBackground && !e.notGrounded;});
    const allSpritesCount = allSprites.length;    

    let colliding = false; 
    let collidingSpriteIndex;
    let spriteIndex = 0;

    while( colliding == false && spriteIndex < allSpritesCount ) {
        const targetSprite = allSprites[spriteIndex];
        if( targetSprite.spriteId != sprite.spriteId ) {
            if ( !targetSprite.hasOwnProperty("blockedArea") &&  !targetSprite.hasDoor && checkIfSpritesCollide( sprite, targetSprite )) {
                colliding = true;
                collidingSpriteIndex = spriteIndex;
            }
            else if ( targetSprite.hasOwnProperty("blockedArea") && targetSprite.blockedArea.checkForCollision( sprite.hitbox, sprite.direction ) ) {
                colliding = true;
                collidingSpriteIndex = spriteIndex;
            }
        }
        spriteIndex++;
    }
    
    return colliding;
}
/**
 * Check if the given sprite collides with target sprite
 * @param {Sprite} sprite 
 * @param {String} targetSpriteId 
 * @returns {Boolean} true if collison, false if not
 */
const checkIfSpritesCollide = ( sprite, targetSprite ) => {
    const direction = sprite.direction;
    if ( targetSprite.movementType == globals.NPC_MOVE_TYPE_FLYING || sprite.movementType == globals.NPC_MOVE_TYPE_FLYING ) {
        return false;
    }

    switch(direction) {
        case FACING_LEFT:
            return sprite.centerX - sprite.speed < targetSprite.right
            && ( sprite.baseY + sprite.speed > targetSprite.dynamicTop - sprite.speed && sprite.baseY < targetSprite.bottom )
            && sprite.centerX > targetSprite.centerX;
        case FACING_UP:
            return sprite.baseY < targetSprite.bottom + sprite.speed
            && ( sprite.centerX > targetSprite.left && sprite.centerX < targetSprite.right )
            && sprite.baseY > targetSprite.baseY;
        case FACING_RIGHT:
            return sprite.right + sprite.speed > targetSprite.left
            && ( sprite.baseY + sprite.speed > targetSprite.dynamicTop - sprite.speed && sprite.baseY < targetSprite.bottom )
            && sprite.centerX < targetSprite.centerX;
        case FACING_DOWN:
            return  sprite.bottom + sprite.speed  > targetSprite.dynamicTop - sprite.speed
            && ( sprite.centerX > targetSprite.left && sprite.centerX < targetSprite.right )
            && sprite.baseY < targetSprite.baseY;
        default:
            console.log( "Error! Direction " + direction + " was not recognized.");
            break;
    }
}

module.exports = {
    checkForCollision
}