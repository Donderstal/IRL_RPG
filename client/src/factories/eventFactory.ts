import { EventType } from "../enumerables/EventType";
import type { CinematicModel } from "../models/CinematicModel";
import type { CutsceneEventDto } from "../models/events/CutsceneEventDto";
import type { DoorEventDto } from "../models/events/DoorEventDto";
import type { ElevatorEventDto } from "../models/events/ElevatorEventDto";
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