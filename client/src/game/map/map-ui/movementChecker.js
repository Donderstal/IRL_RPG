const globals = require('../../../game-data/globals')
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals')

const checkForCollision = ( sprite ) => {
    const allSprites =  globals.GAME.FRONT.allSprites.filter((e)=>{return !e.onBackground && !e.notGrounded;});
    const allSpritesCount = allSprites.length;    

    let colliding = false; 
    let spriteIndex = 0;

    while( colliding == false && spriteIndex < allSpritesCount ) {
        const targetSprite = allSprites[spriteIndex];
        if( targetSprite.spriteId != sprite.spriteId ) {
            if ( !targetSprite.hasOwnProperty("blockedArea") &&  !targetSprite.hasDoor && checkIfSpritesCollide( sprite, targetSprite )) {
                colliding = true;
            }
            else if ( targetSprite.hasOwnProperty("blockedArea") && targetSprite.blockedArea.checkForCollision( sprite.hitbox, sprite.direction ) ) {
                colliding = true;
            }
        }
        spriteIndex++;
    }
    
    return colliding;
}

const checkIfSpritesCollide = ( sprite, targetSprite ) => {
    let colliding = false;
    const spriteNextPosition = getSpriteNextPosition( sprite );
    const targetNextPosition = getSpriteNextPosition( targetSprite );

    const widestSprite = spriteNextPosition.width >= targetNextPosition.width ? spriteNextPosition : targetNextPosition;
    const lessWideSprite = widestSprite == spriteNextPosition ? targetNextPosition : spriteNextPosition;
    const highestSprite = spriteNextPosition.height >= targetNextPosition.height ? spriteNextPosition : targetNextPosition;
    const lessHighSprite = highestSprite == spriteNextPosition ? targetNextPosition : spriteNextPosition;

    switch ( sprite.direction ) {
        case FACING_LEFT:
            return spriteNextPosition.left <= targetNextPosition.right
                && lessHighSprite.baseY > highestSprite.dynamicTop && lessHighSprite.baseY < highestSprite.bottom
                && spriteNextPosition.centerX > targetNextPosition.centerX;
        case FACING_UP:
            return spriteNextPosition.dynamicTop <= targetNextPosition.bottom
                && lessWideSprite.centerX > widestSprite.left && lessWideSprite.centerX < widestSprite.right
                && spriteNextPosition.baseY > targetSprite.baseY;
        case FACING_RIGHT:
            return spriteNextPosition.right >= targetNextPosition.left
                && lessHighSprite.baseY > highestSprite.dynamicTop && lessHighSprite.baseY < highestSprite.bottom
                && spriteNextPosition.centerX < targetNextPosition.centerX;
        case FACING_DOWN:
            return spriteNextPosition.bottom >= targetNextPosition.dynamicTop
                && lessWideSprite.centerX > widestSprite.left && lessWideSprite.centerX < widestSprite.right
                && spriteNextPosition.baseY < targetSprite.baseY;
        default:
            console.log( "Error! Direction " + direction + " was not recognized." );
            break;
    }

    return colliding;
}

class SpritePosition {
    constructor( x, y, width, height, standing, isCar ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isStanding = standing;
        this.isCar = isCar

        this.top = this.y;
        this.left = this.x;
        this.bottom = this.y + this.height;
        this.right = this.x + this.width;

        this.baseY = this.isStanding ? this.bottom - ( globals.GRID_BLOCK_PX / 4 ) : this.bottom - ( this.height / 2 );
        this.centerX = this.x + ( this.width / 2 );
        this.dynamicTop = this.isStanding
            ? this.bottom - globals.GRID_BLOCK_PX
            : this.top + ( this.isCar ? globals.GRID_BLOCK_PX : globals.GRID_BLOCK_PX / 4 );
    }
}

const getSpriteNextPosition = ( sprite ) => {
    let spriteX = sprite.x;
    let spriteY = sprite.y;

    if ( sprite.State.is(globals.STATE_MOVING) ) {
        switch ( sprite.direction ) {
            case FACING_LEFT:
                spriteX = spriteX - sprite.speed;
                break;
            case FACING_UP:
                spriteY = spriteY - sprite.speed;
                break;
            case FACING_RIGHT:
                spriteX = spriteX + sprite.speed;
                break;
            case FACING_DOWN:
                spriteY = spriteY + sprite.speed
                break;
            default:
                console.log("Error! Direction " + direction + " was not recognized.");
                break;
        }
    }

    return new SpritePosition( spriteX, spriteY, sprite.width, sprite.height, sprite.standing, sprite.isCar );
}

module.exports = {
    checkForCollision
}