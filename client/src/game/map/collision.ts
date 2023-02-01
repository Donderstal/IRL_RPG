import { DirectionEnum } from '../../enumerables/DirectionEnum';
import { GRID_BLOCK_PX } from '../../game-data/globals';
import { getAllActiveSprites } from '../modules/sprites/spriteGetter';
import { Hitbox } from '../core/Hitbox';
import type { Sprite } from '../core/Sprite';
import type { Tile } from '../core/Tile';
import { getAssociatedHitbox, idInHitboxDictionary } from '../modules/hitboxes/hitboxGetter';
import { getBackTilesGrid, getTileOnCanvasByIndex, getTileOnCanvasByXy } from '../canvas/canvasGetter';
import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { getSpriteActionById } from '../modules/actions/actionGetter';
import type { SpritePosition } from '../../helpers/SpritePosition';
import { getNonPlayerSpriteNextPosition, getPlayerNextPosition, getStaticSpritePosition } from '../../helpers/spritePositionHelper';
import type { Destination } from './map-classes/Destination';
import { isTileBlocked } from './blockedTilesRegistry';

export const spriteNextPositionIsBlocked = ( sprite: Sprite, destination: Destination = null, direction: DirectionEnum = null ): boolean => {
    const spriteNextPosition = getSpriteNextPosition( sprite, destination, direction );
    const staticCollision = checkForStaticCollision( spriteNextPosition, sprite );
    const dynamicCollision = staticCollision ? true : checkForDynamicCollision( spriteNextPosition, sprite );
    return staticCollision || dynamicCollision;
}

const checkForStaticCollision = ( spriteNextPosition: SpritePosition, sprite: Sprite ): boolean => {
    const currentTile = getTileOnCanvasByXy( { "x": sprite.centerX, "y": sprite.baseY }, CanvasTypeEnum.background );
    const backGrid = getBackTilesGrid().grid;
    const hitbox = new Hitbox( spriteNextPosition.centerX, spriteNextPosition.baseY, sprite.width / 2 );
    let nextIndex: number, nextTile: Tile, nextTileIsOffscreen: boolean;
    switch ( sprite.direction ) {
        case DirectionEnum.left:
            nextTileIsOffscreen = currentTile.column === 1;
            nextIndex = currentTile.index - 1;
            nextTile = getTileOnCanvasByIndex( nextIndex, CanvasTypeEnum.background );
            return ( nextTileIsOffscreen || isTileBlocked( nextTile ) ) && hitbox.left < currentTile.x;
        case DirectionEnum.up:
            nextTileIsOffscreen = currentTile.row === 1;
            nextIndex = currentTile.index - backGrid.columns;
            nextTile = getTileOnCanvasByIndex( nextIndex, CanvasTypeEnum.background );
            return ( nextTileIsOffscreen || isTileBlocked( nextTile ) ) && hitbox.top < currentTile.y;
        case DirectionEnum.right:
            nextTileIsOffscreen = currentTile.column === backGrid.columns;
            nextIndex = currentTile.index + 1;
            nextTile = getTileOnCanvasByIndex( nextIndex, CanvasTypeEnum.background );
            return ( nextTileIsOffscreen || isTileBlocked( nextTile ) ) && hitbox.right > currentTile.x + GRID_BLOCK_PX;
        case DirectionEnum.down:
            nextTileIsOffscreen = currentTile.row === backGrid.rows;
            nextIndex = currentTile.index + backGrid.columns;
            nextTile = getTileOnCanvasByIndex( nextIndex, CanvasTypeEnum.background );
            return ( nextTileIsOffscreen || isTileBlocked( nextTile ) ) && hitbox.outerBottom > currentTile.y + GRID_BLOCK_PX;
    }
}

const checkForDynamicCollision = ( spriteNextPosition: SpritePosition, sprite: Sprite ): boolean => {
    const allSprites = getAllActiveSprites();
    const spritesToCheck = allSprites.filter( ( e ) => { return !e.model.onBackground && !e.model.notGrounded;});
    const allSpritesCount = spritesToCheck.length;

    let colliding = false; 
    let spriteIndex = 0;

    while( colliding == false && spriteIndex < allSpritesCount ) {
        const targetSprite = spritesToCheck[spriteIndex];
        if ( targetSprite.spriteId != sprite.spriteId ) {
            const hitbox = idInHitboxDictionary( sprite.spriteId ) ? getAssociatedHitbox( sprite.spriteId ) : getSpriteActionById( sprite.spriteId );
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
    const targetNextPosition = getStaticSpritePosition( targetSprite );

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

const getSpriteNextPosition = ( sprite: Sprite, destination: Destination, direction: DirectionEnum ): SpritePosition => {
    if ( sprite.isPlayer ) return getPlayerNextPosition( sprite, direction );
    return getNonPlayerSpriteNextPosition( sprite, destination );
}