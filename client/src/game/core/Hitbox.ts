import { DirectionEnum } from "../../enumerables/DirectionEnum";
import globals from '../../game-data/globals';
import { COLOR_WHITE } from '../../game-data/uiGlobals';
import { getBackSpritesGrid } from "../canvas/canvasGetter";
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
        const frontCtx: OffscreenCanvasRenderingContext2D = getBackSpritesGrid().ctx;
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.outerRadius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.innerRadius, 0, 2 * Math.PI );
        frontCtx.strokeStyle = this.arcColor;
        frontCtx.stroke( );
    }

    actionInRange( action: Hitbox, direction: DirectionEnum ): boolean {
        if ( this.actionInVerticalRange( action ) ) {
            if ( direction === DirectionEnum.up && this.actionInUpRange( action ) ) {
                return true;
            }
            if ( direction === DirectionEnum.down && this.actionInDownRange( action ) ) {
                return true;
            }
        }
        if ( this.actionInHorizontalRange( action ) ) {
            if ( direction === DirectionEnum.left && this.actionInLeftRange( action ) ) {
                return true;
            }
            if ( direction === DirectionEnum.right && this.actionInRightRange( action ) ) {
                return true;
            }
        }
        return false;
    }

    hitboxIsColliding( hitbox: Hitbox, direction: DirectionEnum ): boolean {
        if ( !hitbox ) {
            return false;
        }
        if ( this.hitboxInVerticalRange( hitbox ) ) {
            if ( direction === DirectionEnum.up && this.hitboxInUpRange( hitbox ) ) {
                return true;
            }
            if ( direction === DirectionEnum.down && this.hitboxInDownRange( hitbox ) ) {
                return true;
            }
        }
        if ( this.targetIsInHorizontalBlockedRange( hitbox ) ) {
            if ( direction === DirectionEnum.left && this.hitboxInLeftRange( hitbox ) ) {
                return true;
            }
            if ( direction === DirectionEnum.right && this.hitboxInRightRange( hitbox ) ) {
                return true;
            }
        }
        return false;
    }

    doorInRange( doorHitbox: Hitbox ): boolean {  
        if ( !doorHitbox ) {
            return false;
        }
        if ( this.hitboxInVerticalRange( doorHitbox ) ) {
            if ( this.doorIsInUpRange( doorHitbox ) ) {
                return true;
            }
            if ( this.doorIsInDownRange( doorHitbox ) ) {
                return true;
            }
        }
        if ( this.targetIsInHorizontalBlockedRange( doorHitbox ) ) {
            if ( this.doorIsInLeftRange( doorHitbox ) ) {
                return true;
            }
            if ( this.doorIsInRightRange( doorHitbox ) ) {
                return true;
            }
        }
        return false;
    }

    //BLOCKED//
    hitboxInVerticalRange( targetHitbox: Hitbox ): boolean {   
        return this.x > targetHitbox.left && this.x < targetHitbox.right;
    }
    targetIsInHorizontalBlockedRange( targetHitbox: Hitbox ): boolean {   
        return this.y > targetHitbox.top && this.y < targetHitbox.bottom;
    }

    hitboxInUpRange( hitbox: Hitbox ): boolean {
        const targetIsUp = this.top > hitbox.top;
        const inRange = this.top <= hitbox.innerBottom;

        return inRange && targetIsUp;
    }
    hitboxInDownRange( hitbox: Hitbox ): boolean {
        const targetIsDown    = this.bottom < hitbox.bottom;
        const inRange = this.bottom >= hitbox.innerTop

        return inRange && targetIsDown;
    }
    hitboxInLeftRange( hitbox: Hitbox ): boolean {
        const targetIsLeft    = this.left > hitbox.left;
        const inRange = this.left <= hitbox.innerRight;

        return inRange && targetIsLeft;
    }
    hitboxInRightRange( hitbox: Hitbox ): boolean {
        const targetIsRight  = this.right < hitbox.right;
        const inRange = this.right >= hitbox.innerLeft;

        return inRange && targetIsRight;
    }

    //DOOR
    doorIsInUpRange( doorHitbox: Hitbox ): boolean {   
        const doorIsUp = this.top > doorHitbox.top;
        const inRange = this.innerTop <= doorHitbox.y;

        return inRange && doorIsUp;
    }
    doorIsInDownRange( doorHitbox: Hitbox ): boolean {   
        const doorIsDown    = this.bottom < doorHitbox.bottom;
        const inRange = this.innerBottom >= doorHitbox.y

        return inRange && doorIsDown;
    }
    doorIsInLeftRange( doorHitbox: Hitbox ): boolean {   
        const doorIsLeft    = this.left > doorHitbox.left;
        const inRange = this.innerLeft <= doorHitbox.x;

        return inRange && doorIsLeft;
    }
    doorIsInRightRange( doorHitbox: Hitbox ): boolean {   
        const doorIsRight  = this.right < doorHitbox.right;
        const inRange = this.innerRight >= doorHitbox.x;

        return inRange && doorIsRight;
    }

    //ACTION//
    actionInVerticalRange( action: Hitbox ): boolean {        
        return action.x > this.outerLeft && action.x < this.outerRight;
    }
    actionInHorizontalRange( action: Hitbox ): boolean {       
        return action.y > this.outerTop && action.y < this.outerBottom;
    }

    actionInUpRange( action: Hitbox ): boolean {
        const actionIsUp = this.top > action.top;
        const inRange = this.outerTop <= action.bottom;

        return inRange && actionIsUp;
    }
    actionInDownRange( action: Hitbox ): boolean {
        const actionIsDown = this.bottom < action.bottom;
        const inRange = this.outerBottom >= action.top

        return inRange && actionIsDown;
    }
    actionInLeftRange( action: Hitbox ): boolean {
        const actionIsLeft = this.left > action.left;
        const inRange = this.outerLeft <= action.right;

        return inRange && actionIsLeft;
    }
    actionInRightRange( action: Hitbox ): boolean {
        const actionIsRight = this.right < action.right;
        const inRange = this.outerRight >= action.left;

        return inRange && actionIsRight;
    }
}