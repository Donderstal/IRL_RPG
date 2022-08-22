import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import type { Hitbox } from "../../core/Hitbox";

import { GRID_BLOCK_PX } from '../../../game-data/globals';
import type { Sprite } from "../../core/Sprite";

export class BlockedArea {
    blockedCoordinates: { left: number, top: number, right: number, bottom: number };
    parentX: number;
    parentY: number;

    constructor( parent: Sprite, blockedCoordinates: { left: number, top: number, right: number, bottom: number } ) {
        this.blockedCoordinates = blockedCoordinates;
        this.parentX = parent.x;
        this.parentY = parent.y;        
    }

    get leftBorderPosition( ): number { return this.parentX + ( this.blockedCoordinates.left * GRID_BLOCK_PX ) };
    get topBorderPosition(): number { return this.parentY + ( this.blockedCoordinates.top * GRID_BLOCK_PX ) };
    get rightBorderPosition(): number { return this.parentX + ( this.blockedCoordinates.right * GRID_BLOCK_PX ) };
    get bottomBorderPosition(): number { return this.parentY + ( this.blockedCoordinates.bottom * GRID_BLOCK_PX ) };

    updateParentLocation( parent: Sprite ) {
        this.parentX = parent.x;
        this.parentY = parent.y;
    }

    checkForCollision( hitbox: Hitbox, spriteDirection: DirectionEnum ): boolean {
        if (this.spriteIsLeftAndFacingRight( hitbox, spriteDirection ) && this.spriteInVerticalRange(hitbox)) {
            return hitbox.right > this.leftBorderPosition;
        }
        else if (this.spriteIsAboveAndFacingDown( hitbox, spriteDirection ) && this.spriteInHorizontalRange(hitbox)) {
            return hitbox.bottom > this.topBorderPosition;
        }
        else if (this.spriteIsRightAndFacingLeft( hitbox, spriteDirection ) && this.spriteInVerticalRange(hitbox)) {
            return hitbox.left < this.rightBorderPosition;
        }
        else if (this.spriteIsBelowAndFacingUp( hitbox, spriteDirection ) && this.spriteInHorizontalRange(hitbox)) {
            return hitbox.top < this.bottomBorderPosition;
        }
    }

    spriteIsLeftAndFacingRight( hitbox: Hitbox, direction: DirectionEnum ): boolean { return direction === DirectionEnum.right && hitbox.innerRight < this.rightBorderPosition; }
    spriteIsAboveAndFacingDown( hitbox: Hitbox, direction: DirectionEnum ): boolean { return direction === DirectionEnum.down && hitbox.innerBottom < this.bottomBorderPosition; }
    spriteIsRightAndFacingLeft( hitbox: Hitbox, direction: DirectionEnum ): boolean { return direction === DirectionEnum.left && hitbox.innerLeft > this.leftBorderPosition; }
    spriteIsBelowAndFacingUp( hitbox: Hitbox, direction: DirectionEnum ): boolean { return direction === DirectionEnum.up && hitbox.innerTop > this.topBorderPosition; }

    spriteInHorizontalRange( hitbox: Hitbox ): boolean { 
        return (hitbox.x >= this.leftBorderPosition && hitbox.x <= this.rightBorderPosition)
        || (hitbox.innerLeft > this.leftBorderPosition && hitbox.innerLeft < this.rightBorderPosition)
            || ( hitbox.innerRight > this.leftBorderPosition && hitbox.innerRight < this.rightBorderPosition );
    }

    spriteInVerticalRange( hitbox: Hitbox ): boolean  { 
        return (hitbox.y >= this.topBorderPosition && hitbox.y <= this.bottomBorderPosition)
        || (hitbox.innerBottom > this.topBorderPosition && hitbox.innerBottom < this.bottomBorderPosition)
        || (hitbox.innerTop > this.topBorderPosition && hitbox.innerTop < this.bottomBorderPosition); 
    }
}