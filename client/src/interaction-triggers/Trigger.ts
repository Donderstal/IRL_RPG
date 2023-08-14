import type { TriggerType } from "../enumerables/TriggerType";
import { Hitbox } from "../game/core/Hitbox";
import type { GraphicalEffect } from "../helpers/effectHelpers";
import type { FrameModel } from "../models/SpriteFrameModel";
import type { TriggerEvent } from "../models/TriggerEvent";
import { inDebugState } from "../state/stateGetter";

export class Trigger extends Hitbox {
    event: TriggerEvent;
    arcColor: string;
    graphicalEffect: GraphicalEffect;
    triggerType: TriggerType;
    id: string;
    constructor( frame: FrameModel ) {
        super( frame );
        this.arcColor = "#FF0000";
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

    setEvent( event: TriggerEvent ): void {
        this.event = { ...event };
        this.triggerType = event.trigger;
    }

    getEvent(): TriggerEvent {
        return { ...this.event };
    }

    triggerEvent( ): void {
        console.log( this.event );
    }

    setGraphicalEffect( graphicalEffect: GraphicalEffect ): void {
        this.graphicalEffect = graphicalEffect;
    }

    drawGraphicalEffect(): void {
        this.graphicalEffect.drawBack( this.effectX, this.effectY );
    }
}