import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import { InteractionType } from '../../../enumerables/InteractionType';
import globals from '../../../game-data/globals';
import { GRID_BLOCK_PX, MOVEMENT_SPEED } from '../../../game-data/globals';
import { switchMap } from '../../../helpers/loadMapHelpers';
import type { Sprite } from '../../core/Sprite';
import { moveSpriteInDirection } from '../../modules/spriteMovementModule';

export const handleMovementOfSprite = ( sprite: Sprite, direction: DirectionEnum ): void => {
    moveInDirection( sprite, direction )
    sprite.countFrame();
}

const moveInDirection = ( sprite: Sprite, direction: DirectionEnum ): void => {
    sprite.setDirection( direction );

    const movementIsAllowed = checkIfMovementAllowed( sprite, direction )
    const movingToNeighbour = checkForNeighbours(sprite)

    if ( movementIsAllowed && !movingToNeighbour && !sprite.checkForCollision() ) {
        moveSpriteInDirection( sprite, direction );          
    }
}

const checkIfMovementAllowed = ( sprite: Sprite, direction: DirectionEnum ): boolean => {
    const activeMap = globals.GAME.activeMap;
    if ( sprite.currentTileBack == undefined ) {
        return true;
    }

    const facingUpOnTopRow = sprite.currentTileBack.row == 1 && direction == DirectionEnum.up;
    const facingRightOnRightCol = sprite.currentTileBack.column == globals.GAME.back.class.grid.columns && direction == DirectionEnum.right;
    const facingLeftOnLeftCol = sprite.currentTileBack.column == 1 && direction == DirectionEnum.left;
    const facingDownOnBottomRow = sprite.currentTileBack.row == globals.GAME.back.class.grid.rows && direction == DirectionEnum.down;


    if ( facingUpOnTopRow && ( !activeMap.outdoors || !activeMap.neighbours.up ) ) {
        return !sprite.isInCenterFacingUp;
    }
    else if ( facingDownOnBottomRow && ( !activeMap.outdoors || !activeMap.neighbours.down ) ) {
        return !sprite.isInCenterFacingDown;
    }
    else if ( facingLeftOnLeftCol && ( !activeMap.outdoors || !activeMap.neighbours.left )  ) {
        return !sprite.isInCenterFacingLeft;
    }
    else if ( facingRightOnRightCol && ( !activeMap.outdoors || !activeMap.neighbours.right )  ) {
        return !sprite.isInCenterFacingRight;
    }

    if ( sprite.nextTileBack != undefined && ( sprite.nextTileBack.isBlocked || sprite.nextTileFront.isBlocked ) ) {
        switch ( direction ) {
            case DirectionEnum.right:
                return !sprite.isInCenterFacingRight;
            case DirectionEnum.left:
                return !sprite.isInCenterFacingLeft;
            case DirectionEnum.up:
                return !sprite.isInCenterFacingUp;
            case DirectionEnum.down:
                return !sprite.isInCenterFacingDown;
        }
    }
    
    return true
}

const checkForNeighbours = ( sprite: Sprite ): boolean => {
    const activeMap = globals.GAME.activeMap;
    const activeGrid = globals.GAME.back.class.grid

    if ( activeMap.outdoors ) {
        if ( activeGrid.x > sprite.centerX && activeMap.neighbours.left ) {
            switchMap( activeMap.neighbours.left, InteractionType.neighbour )
            return true;
        }
        if ( activeGrid.x + ( activeGrid.columns * GRID_BLOCK_PX ) < sprite.centerX && activeMap.neighbours.right ) {
            switchMap( activeMap.neighbours.right, InteractionType.neighbour )
            return true;
        }
        if ( activeGrid.y > sprite.baseY && activeMap.neighbours.up ) {
            switchMap( activeMap.neighbours.up, InteractionType.neighbour )
            return true;
        }
        if ( activeGrid.y + ( activeGrid.rows * GRID_BLOCK_PX ) < sprite.baseY && activeMap.neighbours.down ) {
            switchMap( activeMap.neighbours.down, InteractionType.neighbour )
            return true;
        }
    }

    return false;
}