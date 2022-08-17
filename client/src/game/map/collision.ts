import { DirectionEnum } from '../../enumerables/DirectionEnum';
import globals, { GRID_BLOCK_PX } from '../../game-data/globals';
import { Hitbox } from '../core/Hitbox';
import type { Sprite } from '../core/Sprite';
import type { Tile } from '../core/Tile';
import { getAssociatedHitbox } from '../modules/hitboxModule';

let playerCheckingForCollision = false;

export const checkForCollision = ( sprite: Sprite, spriteIsPlayer = false ): boolean => {
    const spriteNextPosition = getSpriteNextPosition( sprite );
    playerCheckingForCollision = spriteIsPlayer;
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
            nextIndex = currentTile.index - 1;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return ( nextTileIsOffscreen || nextTile.isBlocked ) && hitbox.left < currentTile.x;
        case DirectionEnum.up:
            nextTileIsOffscreen = currentTile.row === 1;
            nextIndex = currentTile.index - globals.GAME.BACK.grid.columns;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return ( nextTileIsOffscreen || nextTile.isBlocked ) && hitbox.top < currentTile.y;
        case DirectionEnum.right:
            nextTileIsOffscreen = currentTile.column === globals.GAME.BACK.grid.columns;
            nextIndex = currentTile.index + 1;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return ( nextTileIsOffscreen || nextTile.isBlocked ) && hitbox.right > currentTile.x + GRID_BLOCK_PX;
        case DirectionEnum.down:
            nextTileIsOffscreen = currentTile.row === globals.GAME.BACK.grid.rows;
            nextIndex = currentTile.index + globals.GAME.BACK.grid.columns;
            nextTile = globals.GAME.BACK.getTileAtIndex( nextIndex )
            return ( nextTileIsOffscreen || nextTile.isBlocked) && hitbox.innerBottom > currentTile.y + GRID_BLOCK_PX;
    }
}

const checkForDynamicCollision = ( spriteNextPosition: SpritePosition, sprite: Sprite ): boolean => {
    const allSprites = globals.GAME.FRONT.allSprites.filter( ( e ) => { return !e.model.onBackground && !e.model.notGrounded;});
    const allSpritesCount = allSprites.length;

    let colliding = false; 
    let spriteIndex = 0;

    while( colliding == false && spriteIndex < allSpritesCount ) {
        const targetSprite = allSprites[spriteIndex];
        if ( targetSprite.spriteId != sprite.spriteId ) {
            const hitbox = getAssociatedHitbox( targetSprite.spriteId );
            if ( !targetSprite.hasOwnProperty( "blockedArea" ) && !( targetSprite as any ).hasDoor && checkIfSpritesCollide( spriteNextPosition, targetSprite, sprite.direction )) {
                colliding = true;
            }
            else if ( targetSprite.hasOwnProperty( "blockedArea" ) && ( targetSprite as any ).blockedArea.checkForCollision( hitbox, sprite.direction ) ) {
                colliding = true;
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

    switch ( direction ) {
    case DirectionEnum.left:
        return spriteNextPosition.left <= targetNextPosition.right
            && lessHighSprite.dynamicTop >= highestSprite.dynamicTop
            && lessHighSprite.baseY < highestSprite.bottom
            && spriteNextPosition.right > targetNextPosition.centerX;
    case DirectionEnum.up:
        return spriteNextPosition.baseY <= targetNextPosition.bottom
            && lessWideSprite.centerX > widestSprite.left
            && lessWideSprite.centerX < widestSprite.right
            && spriteNextPosition.bottom > targetNextPosition.bottom;
    case DirectionEnum.right:
        return spriteNextPosition.right >= targetNextPosition.left
            && lessHighSprite.dynamicTop >= highestSprite.dynamicTop
            && lessHighSprite.baseY < highestSprite.bottom
            && spriteNextPosition.left < targetNextPosition.centerX;
    case DirectionEnum.down:
        return spriteNextPosition.bottom >= targetNextPosition.dynamicTop
            && lessWideSprite.centerX > widestSprite.left 
            && lessWideSprite.centerX < widestSprite.right
            && spriteNextPosition.baseY < targetNextPosition.baseY;
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

        this.baseY = this.isStanding ? this.bottom - ( GRID_BLOCK_PX / 4 ) : this.bottom - ( this.height / 2 );
        this.centerX = this.x + ( this.width / 2 );
        this.dynamicTop = this.isStanding
            ? this.bottom - GRID_BLOCK_PX
            : this.top + ( this.isCar ? GRID_BLOCK_PX : GRID_BLOCK_PX / 4 );
    }
}

const getSpriteNextPosition = ( sprite: Sprite ) => {
    let spriteX = sprite.x;
    let spriteY = sprite.y;

    if ( sprite.pluginIsRunning(sprite.plugins.movement) || playerCheckingForCollision ) {
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