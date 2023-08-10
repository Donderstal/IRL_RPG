import { PLAYER_ID } from "../game-data/interactionGlobals";
import type { ElevatorModel } from "../models/ElevatorModel";
import type { FrameModel } from "../models/SpriteFrameModel";
import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import type { TriggerEvent } from "../models/TriggerEvent";
import { Trigger } from "./Trigger";

export class Elevator extends Trigger {
    mapName: string;
    elevatorModel: ElevatorModel;
    constructor( frame: FrameModel, elevator: ElevatorModel ) {
        super( frame );
        const event: TriggerEvent = {
            type: EventType.elevator,
            trigger: TriggerType.interaction,
            model: elevator,
            id: PLAYER_ID
        };

        this.setEvent( event );
        this.arcColor = "#00FF00";
    }
}