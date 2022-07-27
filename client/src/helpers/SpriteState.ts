import { SpriteStateEnum } from "../enumerables/SpriteStateEnum";
import type { Sprite } from "../game/core/Sprite";
import { initializeCarMovement } from "../game/modules/carMovementModule";
import { initializeSpriteMovement } from "../game/modules/spriteMovementModule";
import type { GridCellModel } from "../models/GridCellModel";

export class SpriteState {
    innerValue: SpriteStateEnum;
    inAnimation: boolean;
    inCinematic: boolean;
    storedState: SpriteStateEnum;
    storedDestination: GridCellModel;
    storedAnimationPosition: { position: number; direction: number };
    pendingStateChanges: SpriteStateEnum[]
    constructor( value = SpriteStateEnum.idle ) {
        this.innerValue = value;
        this.inAnimation = false;
        this.storedState = null;
        this.storedDestination = null;
        this.storedAnimationPosition = null;
        this.pendingStateChanges = [];
    }

    is( value: SpriteStateEnum ): boolean {
        return this.innerValue === value;
    }

    set( newValue: SpriteStateEnum ): void {
        this.innerValue = newValue
    }

    animationOn( sheetDirection: number, sheetPosition: number ): void {
        this.storedAnimationPosition = { 
            'position': sheetPosition,
            'direction': sheetDirection
        }
        this.inAnimation = true;
    }

    animationOff( sprite: Sprite ): void {
        this.inAnimation = false;
        sprite.sheetPosition = this.storedAnimationPosition['position'] ?? sprite.sheetPosition;
        sprite.direction = this.storedAnimationPosition['direction'] ?? sprite.direction;
        this.storedAnimationPosition = null;
    }

    cinematicOn( sprite: Sprite ): void {
        this.inCinematic = true;
        this.storeState( );
        if ( sprite.destination !== null ) {
            this.storedDestination = { 
                'column': sprite.destination.column, 
                'row': sprite.destination.row
            }
        }
        this.set( SpriteStateEnum.idle );        
    }

    cinematicOff( sprite: Sprite ): void {
        this.inCinematic = false;
        this.restoreState( );
        if ( this.storedDestination !== null ) {
            sprite.isCar ? initializeCarMovement( sprite, this.storedDestination ) : initializeSpriteMovement( sprite, this.storedDestination )
            this.storedDestination = null;
        } 
    }

    storeState(): void {
        this.storedState = this.innerValue;
    }

    restoreState(): void {
        this.innerValue = this.storedState;
        this.storedState = null;
    }

    clearPendingStateChanges(): void {
        this.pendingStateChanges = [];
    }

    addToPendingStateChanges( state: SpriteStateEnum ): void {
        this.pendingStateChanges.push( state );
    }

    decideStateFromPendingStateChanges(): void {
        if ( this.pendingStateChanges.indexOf(SpriteStateEnum.blocked) > -1 ) {
            this.set( SpriteStateEnum.blocked );
        }
        else if ( this.pendingStateChanges.indexOf( SpriteStateEnum.waiting ) > -1 ) {
            this.set( SpriteStateEnum.waiting );
        }
        else if ( this.pendingStateChanges.indexOf( SpriteStateEnum.waiting ) > -1 ) {
            this.set( SpriteStateEnum.moving );
        }
        else if ( this.pendingStateChanges.indexOf( SpriteStateEnum.idle ) > -1 ) {
            this.set( SpriteStateEnum.idle );
        }
        this.clearPendingStateChanges( );
    }
}