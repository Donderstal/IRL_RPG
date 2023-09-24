import { getEffect, GraphicalEffect } from "../helpers/effectHelpers";
import type { FrameModel } from "../models/SpriteFrameModel";
import type { TriggerModel } from "../models/TriggerModel";
import { inDebugState } from "../state/stateGetter";
import { Hitbox } from "../game/core/Hitbox";
import { FX_BLUE_SQUARE } from "../resources/effectResources";
import { EventChainType } from "../enumerables/EventChainType";

export class Trigger extends Hitbox {
    arcColor: string;
    graphicalEffect: GraphicalEffect;
    model: TriggerModel;
    id: string;
    constructor( frame: FrameModel, model: TriggerModel ) {
        super( frame );
        this.model = model;
        this.setForArcColor();
        this.checkForGraphicalEffect();
    }

    get effectX(): number { return this.x - ( this.graphicalEffect.effects[0].width / 2 ); }
    get effectY(): number { return this.y - ( this.graphicalEffect.effects[0].height / 2 ); }
    get hasGraphicEffect(): boolean { return this.graphicalEffect !== undefined; }

    draw(): void {
        if ( this.hasGraphicEffect ) this.drawGraphicalEffect();
        if ( inDebugState() ) super.draw();
    }

    setId( id: string ): void {
        this.id = id;
    }

    updateXy( x: number, y: number ): void {
        super.updateXy( x, y );
    }

    triggerEvent( ): void {
        console.log( this.model );
    }

    setForArcColor(): void {
        switch ( this.model.eventChainType ) {
            case EventChainType.elevator:
                this.arcColor = "#00FF00";
                break;
            case EventChainType.door:
                this.arcColor = "#FFFF00";
                break;
            default:
                this.arcColor = "#FF0000";
                break;
        }
    }

    setGraphicalEffect( graphicalEffect: GraphicalEffect ): void {
        this.graphicalEffect = graphicalEffect;
    }

    drawGraphicalEffect(): void {
        this.graphicalEffect.drawBack( this.effectX, this.effectY );
    }

    checkForGraphicalEffect(): void {
        if ( this.model.eventChainType === EventChainType.savepoint ) {
            this.setGraphicalEffect( getEffect( FX_BLUE_SQUARE, this.x, this.y ) );
        }
    }
}