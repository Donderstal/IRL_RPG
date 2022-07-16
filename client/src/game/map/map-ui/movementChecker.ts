import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import globals from '../../../game-data/globals';
import type { Sprite } from '../../core/Sprite';
import type { MapSprite } from '../map-classes/MapSprite';

export const checkForCollision = ( sprite: MapSprite ): boolean => {
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

const checkIfSpritesCollide = ( sprite: Sprite, targetSprite: Sprite ): boolean => {

    const spriteNextPosition = getSpriteNextPosition( sprite );
    const targetNextPosition = getSpriteNextPosition( targetSprite );

    const willCollide = checkIfPositionsCollide( sprite, spriteNextPosition, targetNextPosition );

    return willCollide;
}

const checkIfPositionsCollide = ( sprite: Sprite, spriteNextPosition: SpritePosition, targetNextPosition: SpritePosition ): boolean => {
    const widestSprite = spriteNextPosition.width >= targetNextPosition.width ? spriteNextPosition : targetNextPosition;
    const lessWideSprite = widestSprite == spriteNextPosition ? targetNextPosition : spriteNextPosition;
    const highestSprite = spriteNextPosition.height >= targetNextPosition.height ? spriteNextPosition : targetNextPosition;
    const lessHighSprite = highestSprite == spriteNextPosition ? targetNextPosition : spriteNextPosition;

    switch ( sprite.direction ) {
    case DirectionEnum.left:
        return spriteNextPosition.left <= targetNextPosition.right
            && lessHighSprite.baseY >= highestSprite.dynamicTop && lessHighSprite.baseY < highestSprite.bottom
            && spriteNextPosition.right > targetNextPosition.centerX;
    case DirectionEnum.up:
        return spriteNextPosition.dynamicTop <= targetNextPosition.bottom
            && lessWideSprite.centerX > widestSprite.left && lessWideSprite.centerX < widestSprite.right
            && spriteNextPosition.bottom > targetNextPosition.bottom;
    case DirectionEnum.right:
        return spriteNextPosition.right >= targetNextPosition.left
            && lessHighSprite.baseY >= highestSprite.dynamicTop && lessHighSprite.baseY < highestSprite.bottom
            && spriteNextPosition.left < targetNextPosition.centerX;
    case DirectionEnum.down:
        return spriteNextPosition.bottom >= targetNextPosition.dynamicTop
            && lessWideSprite.centerX > widestSprite.left && lessWideSprite.centerX < widestSprite.right
            && spriteNextPosition.dynamicTop < targetNextPosition.dynamicTop;
    }
}

class SpritePosition {
    x: number;
    y: number;
    width: number;
    height: number;
    isStanding: boolean;
    isCar: boolean;

    top: number;
    left: number;
    bottom: number;
    right: number;

    baseY: number;
    centerX: number;
    dynamicTop: number;
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

const getSpriteNextPosition = ( sprite: Sprite ) => {
    let spriteX = sprite.x;
    let spriteY = sprite.y;

    if ( sprite.isCar && (sprite as any).turnInNextFrame ) {
        const next = (sprite as any).turningPosition;
        return new SpritePosition( next.x, next.y, next.width, next.height, sprite.standing , true );
    }

    if ( sprite.State.is(globals.STATE_MOVING) ) {
        switch ( sprite.direction ) {
            case DirectionEnum.left:
                spriteX = spriteX - sprite.speed;
                break;
            case DirectionEnum.up:
                spriteY = spriteY - sprite.speed;
                break;
            case DirectionEnum.right:
                spriteX = spriteX + sprite.speed;
                break;
            case DirectionEnum.down:
                spriteY = spriteY + sprite.speed
                break;
        }
    }

    return new SpritePosition( spriteX, spriteY, sprite.width, sprite.height, sprite.standing, sprite.isCar );
}