import type { Door } from "../../map/map-classes/Door";
import { getAllDoors } from "./doorRegistry";

export const getSpriteAssociatedDoor = ( spriteId: string ): Door => {
    const doors = getAllDoors();
    return doors[spriteId];
};

export const getTileAssociatedDoor = ( tileIndex: number ): Door => {
    const doors = getAllDoors();
    return doors[tileIndex.toString()];
};

export const getActiveDoors = (): { [key in string]: Door } => {
    return getAllDoors();
}