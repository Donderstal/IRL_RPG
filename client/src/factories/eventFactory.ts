import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import type { CinematicModel } from "../models/CinematicModel";
import type { ConditionModel } from "../models/ConditionModel";
import type { CutsceneEventDto } from "../models/events/CutsceneEventDto";
import type { DoorEventDto } from "../models/events/DoorEventDto";
import type { ElevatorEventDto } from "../models/events/ElevatorEventDto";
import type { EventConditionPair } from "../models/events/EventConditionPair";
import type { IEventDto } from "../models/events/IEventDto";
import type { SavePointEventDto } from "../models/events/SavePointEventDto";

export const createCutsceneEventDto = ( cutsceneModel: CinematicModel, registryKey: string = null, sfx: string = null ): CutsceneEventDto => {
    return {
        eventType: EventType.cutscene,
        cutscene: cutsceneModel,
        shouldBeRegistered: registryKey != null,
        registryKey: registryKey,
        sfx: sfx
    };
};

export const createSavePointEventDto = (): SavePointEventDto => {
    return {
        eventType: EventType.save_point
    };
};

export const createDoorEventDto = ( mapA: string, mapB: string, doorId: string ): DoorEventDto => {
    return {
        eventType: EventType.door,
        mapA: mapA,
        mapB: mapB,
        doorId: doorId
    };
};

export const createElevatorEventDto = ( floors: { [key in string]: string } ): ElevatorEventDto => {
    return {
        eventType: EventType.elevator,
        floors: floors
    };
};

export const createEventConditionPair = ( event: IEventDto, condition: ConditionModel ): EventConditionPair => {
    return {
        event: event,
        condition: condition,
        triggerType: ( event.eventType == EventType.door && condition.type == ConditionType.default ) ? TriggerType.collision : TriggerType.interaction
    }
}