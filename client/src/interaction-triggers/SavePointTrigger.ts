import { getEffect, GraphicalEffect } from "../helpers/effectHelpers";
import { PLAYER_ID } from "../game-data/interactionGlobals";
import { FX_BLUE_SQUARE } from "../resources/effectResources";
import type { FrameModel } from "../models/SpriteFrameModel";
import { Trigger } from "./Trigger";
import { TriggerType } from "../enumerables/TriggerType";
import { EventType } from "../enumerables/EventType";
import type { TriggerEvent } from "../models/TriggerEvent";

export class SavePointTrigger extends Trigger { 
    spriteId: string;
    effect: GraphicalEffect;
    constructor( frame: FrameModel ) {
        super( frame )
        const event: TriggerEvent = {
            type: EventType.cutscene,
            trigger: TriggerType.interaction,
            model: null,
            id: PLAYER_ID
        };
        this.setEvent( event )
        this.spriteId  = PLAYER_ID;
        this.setGraphicalEffect( getEffect( FX_BLUE_SQUARE, this.x, this.y ) );
    }
}