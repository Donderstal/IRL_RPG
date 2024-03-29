import { GRID_BLOCK_PX, MOVEMENT_SPEED } from "../../game-data/globals";
import { COLOR_WHITE } from '../../game-data/uiGlobals';
import type { FrameModel } from "../../models/SpriteFrameModel";
import { getBackSpritesGrid } from "../canvas/canvasGetter";
import { getGameState } from "../../state/state";
import { StateType } from "../../enumerables/StateType";
/**
 * Hitbox provides collision detection functionalities. It consists out of a inner, middle and outer rectangle. 
 * Two Hitbox instances can be compared to see if they collide. 
 */
export class Hitbox {
    x: number;
    y: number;
    width: number;
    height: number;

    outerRadius: number;
    radius: number;
    innerRadius: number;
    arcColor: string;

    constructor( frame: FrameModel ) {
        this.x = frame.x;
        this.y = frame.y;
        this.width = frame.width;
        this.height = frame.height

        this.radius = MOVEMENT_SPEED;
        this.arcColor = COLOR_WHITE;
    }

    get outerWidth(): number { return this.width + ( this.radius * 2 ); }
    get outerHeight(): number { return this.height + ( this.radius * 2 ) }

    get innerWidth(): number { return this.width - ( this.radius * 2 ); }
    get innerHeight(): number { return this.height - ( this.radius * 2 ) }

    get outerTop(): number { return ( this.y - this.radius ); }
    get outerLeft(): number { return ( this.x - this.radius ); }
    get outerRight(): number { return this.outerLeft + this.outerWidth; }
    get outerBottom(): number { return this.outerTop + this.outerHeight; }

    get top(): number { return this.y; }
    get left(): number { return this.x; }
    get right(): number { return this.x + this.width; }
    get bottom(): number { return this.y + this.height; }

    get innerTop(): number { return ( this.y + this.radius ); }
    get innerLeft(): number { return ( this.x + this.radius ); }
    get innerRight(): number { return this.innerLeft + this.innerWidth; }
    get innerBottom(): number { return this.innerTop + this.innerHeight; }

    updateXy( newX: number, newY: number ): void {
        if ( this.x !== newX || this.y !== newY  ) {
            this.x = newX;
            this.y = newY;            
        }
        if ( getGameState( StateType.debugMode ) ) {
            this.draw( );
        }
    }

    updateDimensions( width: number, height: number ) {
        this.width = width;
        this.height = height;
    }

    draw( ): void {
        const frontCtx: OffscreenCanvasRenderingContext2D = getBackSpritesGrid().ctx;
        frontCtx.strokeStyle = this.arcColor;
        frontCtx.strokeRect( this.outerLeft, this.outerTop, this.outerWidth, this.outerHeight );
        frontCtx.strokeRect( this.left, this.top, this.width, this.height );
        frontCtx.strokeRect( this.innerLeft, this.innerTop, this.innerWidth, this.innerHeight );
    }

    isInActionRange( target: Hitbox ): boolean {
        const inVerticalRange = this.width >= target.width ? target.isInVerticalActionRange( this ) : this.isInVerticalActionRange( target );
        const inHorizontalRange = this.height >= target.height ? target.isInHorizontalActionRange( this ) : this.isInHorizontalActionRange( target ) ;
        return target != null && inVerticalRange && inHorizontalRange;
    }
    isInVerticalActionRange( targetHitbox: Hitbox ): boolean {   
        return ( this.outerLeft <= targetHitbox.outerRight && this.outerLeft >= targetHitbox.outerLeft )
            || ( this.outerRight <= targetHitbox.outerRight && this.outerRight >= targetHitbox.outerLeft )
    }
    isInHorizontalActionRange( targetHitbox: Hitbox ): boolean {   
        return ( this.outerTop <= targetHitbox.outerBottom && this.outerTop >= targetHitbox.outerTop )
            || ( this.outerBottom <= targetHitbox.outerBottom && this.outerBottom >= targetHitbox.outerTop )
    }

    isInDoorRange( door: Hitbox ): boolean {
        return this.isInVerticalDoorRange( door ) && this.isInHorizontalDoorRange( door );
    }
    isInVerticalDoorRange( door: Hitbox ): boolean {
        return ( this.innerLeft <= door.right && this.innerLeft >= door.left )
            || ( this.innerRight <= door.right && this.innerRight >= door.left )
    }
    isInHorizontalDoorRange( door: Hitbox ): boolean {
        const dynamicInnerTop = this.innerBottom - ( GRID_BLOCK_PX - this.radius );
        return ( dynamicInnerTop <= door.bottom && dynamicInnerTop >= door.top )
            || ( this.innerBottom <= door.bottom && this.innerBottom >= door.top )
    }
}