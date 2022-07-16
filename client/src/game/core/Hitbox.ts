import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { getFrontCanvasContext }  from '../../helpers/canvasHelpers';
import globals from '../../game-data/globals';
import { COLOR_WHITE } from '../../game-data/uiGlobals';
/**
 * The Hitbox interface is the base class of all in-game elements that should have collision detection.
 * It consists out of three circles, the inner, middle and outer.
 * Collision is detected by comparing the xy circle values of two hitboxes.
 */
export class Hitbox {
    x: number;
    y: number;
    outerRadius: number;
    radius: number;
    innerRadius: number;
    collision: boolean;
    arcColor: string
    constructor( x, y, radius ) {
        this.x              = x;
        this.y              = y;
        this.outerRadius    = radius * 1.5;
        this.radius         = radius;
        this.innerRadius    = radius / 2 
        this.collision      = false;
        this.arcColor       = COLOR_WHITE;
    }

    get outerTop(): number { return this.y - this.outerRadius }
    get outerLeft(): number { return this.x - this.outerRadius }
    get outerRight(): number { return this.x + this.outerRadius }
    get outerBottom(): number{ return this.y + this.outerRadius }
    get top(): number { return this.y - this.radius }
    get left(): number { return this.x - this.radius }
    get right(): number { return this.x + this.radius }
    get bottom(): number { return this.y + this.radius }
    get innerTop(): number { return this.y - this.innerRadius }
    get innerLeft(): number { return this.x - this.innerRadius }
    get innerRight(): number { return this.x + this.innerRadius }
    get innerBottom(): number { return this.y + this.innerRadius }

    updateXy( newX: number, newY: number ): void {
        if ( this.x !== newX || this.y !== newY  ) {
            this.x = newX;
            this.y = newY;            
        }
        if ( globals.GAME.debugMode ) {
            this.draw( );
        }
    }

    draw( ): void {
        const frontCtx: CanvasRenderingContext2D = getFrontCanvasContext( );
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.outerRadius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.innerRadius, 0, 2 * Math.PI );
        frontCtx.strokeStyle = this.arcColor;
        frontCtx.stroke( );
    }

    checkForActionRange( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        if ( !targetHitbox ) {
            return false;
        }
        if ( this.targetIsInVerticalActionRange( targetHitbox ) ) {
            if ( this.upFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
            if ( this.downFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
        }
        if ( this.targetIsInHorizontalActionRange( targetHitbox ) ) {
            if ( this.leftFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
            if ( this.rightFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
        }
        return false;
    }

    checkForBlockedRange( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        if ( !targetHitbox ) {
            return false;
        }
        if ( this.targetIsInVerticalBlockedRange( targetHitbox ) ) {
            if ( this.targetIsInUpBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
            if ( this.targetIsInDownBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
        }
        if ( this.targetIsInHorizontalBlockedRange( targetHitbox ) ) {
            if ( this.targetIsInLeftBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
            if ( this.targetIsInRightBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
        }
        return false;
    }

    checkForDoorRange( doorHitbox: Hitbox ): boolean {  
        if ( !doorHitbox ) {
            return false;
        }
        if ( this.targetIsInVerticalActionRange( doorHitbox ) ) {
            if ( this.targetIsInUpDoorRange( doorHitbox ) ) {
                return true;
            }
            if ( this.targetIsInDownDoorRange( doorHitbox ) ) {
                return true;
            }
        }
        if ( this.targetIsInHorizontalActionRange( doorHitbox ) ) {
            if ( this.targetIsInLeftDoorRange( doorHitbox ) ) {
                return true;
            }
            if ( this.targetIsInRightDoorRange( doorHitbox ) ) {
                return true;
            }
        }
        return false;
    }

    //BLOCKED//
    targetIsInVerticalBlockedRange( targetHitbox: Hitbox ): boolean {   
        return this.x > targetHitbox.left && this.x < targetHitbox.right;
    }
    targetIsInHorizontalBlockedRange( targetHitbox: Hitbox ): boolean {   
        return this.y > targetHitbox.top && this.y < targetHitbox.bottom;
    }

    targetIsInUpBlockedRange( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsUp = this.top > targetHitbox.top;
        const topCollidesWithTargetBottom = this.top <= targetHitbox.innerBottom;

        return direction === DirectionEnum.up && topCollidesWithTargetBottom && targetIsUp;
    }

    targetIsInDownBlockedRange( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsBelow    = this.bottom < targetHitbox.bottom;
        const bottomCollidesWithTargetTop = this.bottom >= targetHitbox.innerTop

        return direction === DirectionEnum.down && bottomCollidesWithTargetTop && targetIsBelow;
    }

    targetIsInLeftBlockedRange( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsToTheLeft    = this.left > targetHitbox.left;
        const leftCollidesWithTargetRight = this.left <= targetHitbox.innerRight;

        return direction === DirectionEnum.left && leftCollidesWithTargetRight && targetIsToTheLeft;
    }

    targetIsInRightBlockedRange( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsToTheRight  = this.right < targetHitbox.right;
        const rightCollidesWithTargetLeft = this.right >= targetHitbox.innerLeft;

        return direction === DirectionEnum.right && rightCollidesWithTargetLeft && targetIsToTheRight;
    }

    //DOOR
    targetIsInUpDoorRange( targetHitbox: Hitbox ): boolean {   
        const targetIsUp = this.top > targetHitbox.top;
        const topCollidesWithTargetBottom = this.innerTop <= targetHitbox.innerBottom;

        return topCollidesWithTargetBottom && targetIsUp;
    }

    targetIsInDownDoorRange( targetHitbox: Hitbox ): boolean {   
        const targetIsBelow    = this.bottom < targetHitbox.bottom;
        const bottomCollidesWithTargetTop = this.innerBottom >= targetHitbox.innerTop

        return bottomCollidesWithTargetTop && targetIsBelow;
    }

    targetIsInLeftDoorRange( targetHitbox: Hitbox ): boolean {   
        const targetIsToTheLeft    = this.left > targetHitbox.left;
        const leftCollidesWithTargetRight = this.innerLeft <= targetHitbox.innerRight;

        return leftCollidesWithTargetRight && targetIsToTheLeft;
    }

    targetIsInRightDoorRange( targetHitbox: Hitbox ): boolean {   
        const targetIsToTheRight  = this.right < targetHitbox.right;
        const rightCollidesWithTargetLeft = this.innerRight >= targetHitbox.innerLeft;

        return rightCollidesWithTargetLeft && targetIsToTheRight;
    }

    //ACTION//
    targetIsInVerticalActionRange( targetHitbox: Hitbox ): boolean {        
        return targetHitbox.x > this.outerLeft && targetHitbox.x < this.outerRight;
    }
    targetIsInHorizontalActionRange( targetHitbox: Hitbox ): boolean {       
        return targetHitbox.y > this.outerTop && targetHitbox.y < this.outerBottom;
    }

    upFacingTargetIsInActionRadius( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsFacingUp          = direction === DirectionEnum.up;
        const thisIsAboveTarget         = targetHitbox.top > this.innerTop;
        const topIsInTargetOuterBottom  = targetHitbox.top <= this.outerBottom;

        return targetIsFacingUp && topIsInTargetOuterBottom && thisIsAboveTarget;
    }

    downFacingTargetIsInActionRadius( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsFacingDown        = direction === DirectionEnum.down;
        const thisIsBelowTarget         = targetHitbox.bottom < this.innerBottom;
        const bottomIsInTargetOuterTop  = targetHitbox.bottom > this.outerTop;

        return targetIsFacingDown && bottomIsInTargetOuterTop && thisIsBelowTarget;
    }

    leftFacingTargetIsInActionRadius( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsFacingLeft        = direction === DirectionEnum.left;
        const thisIsLeftOfTarget        = targetHitbox.left > this.innerLeft;
        const leftIsInTargetOuterRight  = targetHitbox.left < this.outerRight;

        return targetIsFacingLeft && leftIsInTargetOuterRight  && thisIsLeftOfTarget;
    }

    rightFacingTargetIsInActionRadius( targetHitbox: Hitbox, direction: DirectionEnum ): boolean {
        const targetIsFacingRight       = direction === DirectionEnum.right;
        const thisIsRightOfTarget       = targetHitbox.right < this.innerRight;
        const rightIsInTargetOuterLeft  = targetHitbox.right > this.outerLeft;

        return targetIsFacingRight && rightIsInTargetOuterLeft && thisIsRightOfTarget;
    }
}