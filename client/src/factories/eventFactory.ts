import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import type { CinematicModel } from "../models/CinematicModel";
import type { ConditionModel } from "../models/ConditionModel";
import type { CutsceneEventDto } from "../models/events/CutsceneEventDto";
import type { EnterMapEventDto } from "../models/events/EnterMapEventDto";
import type { EventConditionPair } from "../models/eventChains/EventConditionPair";
import type { IEventDto } from "../models/events/IEventDto";
import type { LeaveMapEventDto } from "../models/events/LeaveMapEventDto";
import type { CutsceneEventChain } from "../models/eventChains/CutsceneEventChain";
import { EventChainType } from "../enumerables/EventChainType";
import type { DoorEventChain } from "../models/eventChains/DoorEventChain";
import type { ElevatorEventChain } from "../models/eventChains/ElevatorEventChain";
import type { SavePointEventChain } from "../models/eventChains/SavePointEventChain";

// EvenScripts
export const createCutsceneEventDto = ( cutsceneModel: CinematicModel, registryKey: string = null, sfx: string = null ): CutsceneEventDto => {
    return {
        eventType: EventType.cutscene,
        cutscene: cutsceneModel,
        shouldBeRegistered: registryKey != null,
        registryKey: registryKey,
        sfx: sfx
    };
}
export const createLeaveMapEventDto = ( nextMapName: string, doorId: string = null ): LeaveMapEventDto => {
    return {
        eventType: EventType.leave_map,
        nextMapName: nextMapName,
        doorId: doorId
    };
}
export const createEnterMapEventDto = ( mapName: string, doorId: string = null ): EnterMapEventDto => {
    return {
        eventType: EventType.enter_map,
        mapName: mapName,
        doorId: doorId
    };
}

// Event Chains
export const createCutsceneEventChain = ( triggerableCutscenes: EventConditionPair[] ): CutsceneEventChain => {
    return {
        eventChainType: EventChainType.cutscene,
        triggerableCutscenes: triggerableCutscenes
    };
}
export const createDoorEventChain = ( mapA: string, mapB: string, doorId: string, lockedBy: string = null ): DoorEventChain => {
    return {
        eventChainType: EventChainType.door,
        mapA: mapA,
        mapB: mapB,
        doorId: doorId,
        lockedBy: lockedBy
    };
}
export const createElevatorEventChain = ( floors: { [key in string]: string } ): ElevatorEventChain => {
    return {
        eventChainType: EventChainType.elevator,
        floors: floors
    };
}
export const createSavePointEventChain = (): SavePointEventChain => {
    return {
        eventChainType: EventChainType.savepoint
    };
}

// Helper structures
export const createEventConditionPair = ( event: IEventDto, condition: ConditionModel, triggerType: TriggerType = TriggerType.interaction ): EventConditionPair => {
    return {
        event: event,
        condition: condition,
        triggerType: triggerType
    };
}