import type { Hitbox } from "../../core/Hitbox";
import { getActiveHitboxes } from "./hitboxRegistry";

export const getAssociatedHitbox = ( id: string ): Hitbox => {
    const hitboxes = getActiveHitboxes();
    if ( hitboxes[id] === undefined ) {
        console.error(`Id ${id} is not present in the hitboxDictionary`)
    }
    return hitboxes[id];
}

export const idInHitboxDictionary = ( id: string ): boolean => {
    const hitboxes = getActiveHitboxes();
    return hitboxes[id] !== undefined;
}