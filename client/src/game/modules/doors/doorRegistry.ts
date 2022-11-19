import type { Door } from "../../map/map-classes/Door";

let doorDictionary: { [key in string]: Door } = {};

export const addDoorToRegistry = ( key: string, door: Door ): void => {
    doorDictionary[key] = door;
}
export const removeDoorFromRegistry = ( key: string ): void => {
    delete doorDictionary[key];
}
export const getAllDoors = (): { [key in string]: Door } => {
    return doorDictionary;
};
export const clearDoorRegistry = (): void => {
    doorDictionary = {};
};