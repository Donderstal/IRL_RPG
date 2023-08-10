import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import type { InteractionModel } from "../models/InteractionModel";
import type { FrameModel } from "../models/SpriteFrameModel";
import type { TriggerEvent } from "../models/TriggerEvent";
import { Trigger } from "./Trigger";

export class CutsceneTrigger extends Trigger {
    constructor( frame: FrameModel, actionList: InteractionModel[], spriteId = null ) {
        super( frame );

        const event: TriggerEvent = {
            type: EventType.cutscene,
            trigger: TriggerType.interaction,
            model: actionList,
            id: spriteId
        };
        this.setEvent( event );
    }
}