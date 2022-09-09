import { DirectionEnum } from '../../enumerables/DirectionEnum';
import globals, { GRID_BLOCK_PX } from '../../game-data/globals';
import { getAllSpritesAsList } from '../controllers/spriteController';
import { Hitbox } from '../core/Hitbox';
import type { Sprite } from '../core/Sprite';
import type { Tile } from '../core/Tile';
import { getAssociatedHitbox } from '../modules/hitboxModule';

export const spriteNextPositionIsBlocked = ( sprite: Sprite ): boolean => {
    const spriteNextPosition = getSpriteNextPosition( sprite );
    const staticCollision = checkForStaticCollision( spriteNextPosition, sprite );
    const dynamicCollision = staticCollision ? true : checkForDynamicCollision( spriteNextPosition, sprite );
    return staticCollision || dynamicCollision;
}

const checkForStaticCollision = ( spriteNextPosition: SpritePosition, sprite: Sprite ): boolean => {
    const currentTile = globals.GAME.BACK.getTileAtXY( sprite.centerX, sprite.baseY );
    if ( currentTile.offScreen ) return false;
    const hitbox = new Hitbox( spriteNextPosition.centerX, spriteNextPosition.baseY, sprite.width / 2 );
    let nextIndex: number, nextTile: Tile, nextTileIsOffscreen: boolean;
    switch ( sprite.direction ) {
        case DirectionEnum.left:
            nextTileIsOffscreen = currentTile.column === 1;
            if ( nextTileIsOffscreen ) return false;
            nextIndex = currentTile.index - 1;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return nextTile.isBlocked && hitbox.left < currentTile.x;
        case DirectionEnum.up:
            nextTileIsOffscreen = currentTile.row === 1;
            if ( nextTileIsOffscreen ) return false;
            nextIndex = currentTile.index - globals.GAME.BACK.grid.columns;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return nextTile.isBlocked && hitbox.top < currentTile.y;
        case DirectionEnum.right:
            nextTileIsOffscreen = currentTile.column === globals.GAME.BACK.grid.columns;
            if ( nextTileIsOffscreen ) return false;
            nextIndex = currentTile.index + 1;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return nextTile.isBlocked && hitbox.right > currentTile.x + GRID_BLOCK_PX;
        case DirectionEnum.down:
            nextTileIsOffscreen = currentTile.row === globals.GAME.BACK.grid.rows;
            if ( nextTileIsOffscreen ) return false;
            nextIndex = currentTile.index + globals.GAME.BACK.grid.columns;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return nextTile.isBlocked && hitbox.innerBottom > currentTile.y + GRID_BLOCK_PX;
    }
}

const checkForDynamicCollision = ( spriteNextPosition: SpritePosition, sprite: Sprite ): boolean => {
    const allSprites = getAllSpritesAsList();
    const spritesToCheck = allSprites.filter( ( e ) => { return !e.model.onBackground && !e.model.notGrounded;});
    const allSpritesCount = spritesToCheck.length;

    let colliding = false; 
    let spriteIndex = 0;

    while( colliding == false && spriteIndex < allSpritesCount ) {
        const targetSprite = spritesToCheck[spriteIndex];
        if ( targetSprite.spriteId != sprite.spriteId ) {
            const hitbox = getAssociatedHitbox( sprite.spriteId );
            if ( hitbox !== undefined ) {
                if ( !targetSprite.model.hasBlockedArea && !targetSprite.hasDoor && checkIfSpritesCollide( spriteNextPosition, targetSprite, sprite.direction )) {
                    colliding = true;
                }
                else if ( targetSprite.model.hasBlockedArea && targetSprite.blockedArea.checkForCollision( hitbox, sprite.direction ) ) {
                    colliding = true;
                }
            }
        }
        spriteIndex++;
    }
    
    return colliding;
}  

const checkIfSpritesCollide = ( spriteNextPosition: SpritePosition, targetSprite: Sprite, direction: DirectionEnum ): boolean => {
    const targetNextPosition = getSpriteNextPosition( targetSprite );

    const willCollide = checkIfPositionsCollide( spriteNextPosition, targetNextPosition, direction );

    return willCollide;
}

const checkIfPositionsCollide = ( spriteNextPosition: SpritePosition, targetNextPosition: SpritePosition, direction: DirectionEnum ): boolean => {
    const widestSprite = spriteNextPosition.width >= targetNextPosition.width ? spriteNextPosition : targetNextPosition;
    const lessWideSprite = widestSprite == spriteNextPosition ? targetNextPosition : spriteNextPosition;
    const highestSprite = spriteNextPosition.height >= targetNextPosition.height ? spriteNextPosition : targetNextPosition;
    const lessHighSprite = highestSprite == spriteNextPosition ? targetNextPosition : spriteNextPosition;

    const inHorizontalRange = lessHighSprite.baseY >= highestSprite.dynamicTop && lessHighSprite.baseY <= highestSprite.bottom;
    const inVerticalRange = lessWideSprite.centerX >= widestSprite.left && lessWideSprite.centerX <= widestSprite.right;

    const targetIsLeftOfSprite = spriteNextPosition.right > targetNextPosition.centerX;
    const targetIsAboveSprite = spriteNextPosition.bottom > targetNextPosition.bottom;
    const targetIsRightOfSprite = spriteNextPosition.left < targetNextPosition.centerX;
    const targetIsBelowSprite = spriteNextPosition.baseY < targetNextPosition.baseY;

    switch ( direction ) {
        case DirectionEnum.left:
            return spriteNextPosition.left <= targetNextPosition.right
                && targetIsLeftOfSprite && inHorizontalRange;
        case DirectionEnum.up:
            return spriteNextPosition.dynamicTop <= targetNextPosition.baseY
                && targetIsAboveSprite && inVerticalRange;
        case DirectionEnum.right:
            return spriteNextPosition.right >= targetNextPosition.left
                && targetIsRightOfSprite && inHorizontalRange;
        case DirectionEnum.down:
            return spriteNextPosition.bottom >= targetNextPosition.dynamicTop
                && targetIsBelowSprite && inVerticalRange;
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

        this.baseY = this.bottom - ( GRID_BLOCK_PX / 2 );
        this.centerX = this.x + ( this.width / 2 );
        this.dynamicTop = this.isStanding
            ? this.bottom - GRID_BLOCK_PX
            : this.top + ( this.isCar ? GRID_BLOCK_PX : GRID_BLOCK_PX / 4 );
    }
}

const getSpriteNextPosition = ( sprite: Sprite ) => {
    return new SpritePosition( sprite.x, sprite.y, sprite.width, sprite.height, sprite.standing, sprite.isCar );
}