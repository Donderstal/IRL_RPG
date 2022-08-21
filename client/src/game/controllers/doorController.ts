import { Door } from "../map/map-classes/Door";
import { getUniqueId, isHorizontal } from "../../helpers/utilFunctions";
import type { DoorModel } from "../../models/DoorModel";
import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { GRID_BLOCK_PX } from "../../game-data/globals";

let activeDoors: Door[] = [];
let activeDoorIds: string[] = [];
let pendingDoorId: string = null;
let pendingDestination: string = null;

const doorRadius = GRID_BLOCK_PX / 2;

export const initDoorWithId = ( x: number, y: number, doorData: DoorModel ): Door => {
    const id = getUniqueId( activeDoorIds );
    const correctedX = !isHorizontal( doorData.direction )
        ? x : doorData.direction === DirectionEnum.left
            ? x - doorRadius : x + doorRadius;
    const correctedY = isHorizontal( doorData.direction ) 
        ? y : doorData.direction === DirectionEnum.up
            ? y - doorRadius : y + doorRadius
    const door = new Door( correctedX, correctedY, doorData, id );
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