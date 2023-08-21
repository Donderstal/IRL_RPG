import type { DoorModel } from "../models/DoorModel";
import type { TriggerEvent } from '../models/TriggerEvent';
import { EventType } from '../enumerables/EventType';
import { TriggerType } from '../enumerables/TriggerType';
import { Trigger } from './Trigger';
import type { FrameModel } from "../models/SpriteFrameModel";

export class DoorTrigger extends Trigger {
    mapName: string;
    model: DoorModel;
    arcColor: string;
    id: string;
    metConditionAtLastCheck: boolean;
    isUnlocked: boolean;
    constructor( frame: FrameModel, door: DoorModel, id: string ) {
        super( frame );
        const event: TriggerEvent = {
            type: EventType.door,
            trigger: TriggerType.collision,
            model: door,
            id: id
        };
        this.setEvent( event );

        this.arcColor       = "#FFFF00";
    }
}