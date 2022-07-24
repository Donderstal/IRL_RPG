import { Door } from "../game/map/map-classes/Door";
import { getUniqueId } from "./utilFunctions";
import type { DoorModel } from "../models/DoorModel";

let activeDoors: Door[] = [];
let activeDoorIds: string[] = [];
let pendingDoorId: string = null;
let pendingDestination: string = null;

export const initDoorWithId = ( x: number, y: number, doorData: DoorModel ): Door => {
    const id = getUniqueId( activeDoorIds );
    const door = new Door( x, y, doorData, id );
    activeDoorIds.push( id );
    activeDoors.push( door );
    return door;
}

export const resetDoors = (): void => {
    activeDoors = [];
    activeDoorIds = [];
}

export const getDoorById = ( id: string ): Door => {
    return activeDoors.filter( e => e.id = id )[0];
}

export const setDoorAsPending = ( id: string, destination: string ) => {
    pendingDoorId = id;
    pendingDestination = destination
}

export const unsetPendingDoor = ( ): void => {
    pendingDoorId = null;
    pendingDestination = null;
}

export const getPendingDoor = (): { id: string; destination: string } => {
    return {
        'id': pendingDoorId,
        'destination': pendingDestination
    };
}