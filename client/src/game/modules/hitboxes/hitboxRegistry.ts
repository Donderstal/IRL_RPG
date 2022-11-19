import type { Hitbox } from "../../core/Hitbox";

let hitboxDictionary: { [key in string]: Hitbox } = {};

export const addHitboxToRegistry = ( id: string, hitbox: Hitbox ): void => {
    hitboxDictionary[id] = hitbox
}
export const removeHitboxFromRegistry = ( id: string ): void => {
    delete hitboxDictionary[id];
}
export const getActiveHitboxes = (): { [key in string]: Hitbox } => {
    return hitboxDictionary;
}
export const clearHitboxRegistry = (): void => {
    hitboxDictionary = {};
}