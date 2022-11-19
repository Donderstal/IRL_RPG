import type { ActionSelector } from "../../map/map-classes/ActionSelector";
import { getSpriteAction, getTileAction } from "./actionRegistry";

export const getSpriteActionById = ( spriteId: string ): ActionSelector => {
    return getSpriteAction( spriteId );
}

export const spriteHasAssociatedAction = ( spriteId: string ): boolean => {
    const action = getSpriteAction( spriteId );
    return action !== undefined && action !== null;
}

export const getTileActionById = ( tileId: number ): ActionSelector => {
    return getTileAction( tileId.toString() );
}

export const tileHasAssociatedAction = ( tileId: number): boolean => {
    const action = getTileAction( tileId.toString() );
    return action !== undefined && action !== null;
}
