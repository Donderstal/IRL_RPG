import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import type { CutsceneModel } from "../models/cutscenes/CutsceneModel";
import type { ConditionModel } from "../models/ConditionModel";
import type { CutsceneEventScript } from "../models/eventScripts/CutsceneEventScript";
import type { EnterMapEventScript } from "../models/eventScripts/EnterMapEventScript";
import type { EventConditionPair } from "../models/eventChains/EventConditionPair";
import type { IEventScript } from "../models/eventScripts/IEventScript";
import type { LeaveMapEventScript } from "../models/eventScripts/LeaveMapEventScript";
import type { CutsceneEventChain } from "../models/eventChains/CutsceneEventChain";
import { EventChainType } from "../enumerables/EventChainType";
import type { DoorEventChain } from "../models/eventChains/DoorEventChain";
import type { ElevatorEventChain } from "../models/eventChains/ElevatorEventChain";
import type { SavePointEventChain } from "../models/eventChains/SavePointEventChain";
import type { GridCellModel } from "../models/GridCellModel";
import type { LoadMapOnStartEventChain } from "../models/eventChains/LoadMapOnStartEventChain";

// EvenScripts
export const createCutsceneEventScript = ( cutsceneModel: CutsceneModel, registryKey: string = null, sfx: string = null ): CutsceneEventScript => {
    return {
        eventType: EventType.cutscene,
        cutscene: cutsceneModel,
        shouldBeRegistered: registryKey != null,
        registryKey: registryKey,
        sfx: sfx
    };
}
export const createLeaveMapEventScript = ( nextMapName: string, doorId: string = null ): LeaveMapEventScript => {
    return {
        eventType: EventType.leave_map,
        nextMapName: nextMapName,
        doorId: doorId
    };
}
export const createEnterMapEventScript = ( mapName: string, doorId: string = null, playerStart: GridCellModel = null ): EnterMapEventScript => {
    return {
        eventType: EventType.enter_map,
        mapName: mapName,
        doorId: doorId,
        playerStart: playerStart
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
export const createLoadMapOnGameStartEventChain = ( startingMap: string, playerStart: GridCellModel ): LoadMapOnStartEventChain => {
    return {
        eventChainType: EventChainType.loadMapOnStart,
        startingMap: startingMap,
        playerStart: playerStart
    }
}

// Helper structures
export const createEventConditionPair = ( event: IEventScript, condition: ConditionModel, triggerType: TriggerType = TriggerType.interaction ): EventConditionPair => {
    return {
        event: event,
        condition: condition,
        triggerType: triggerType
    };
}