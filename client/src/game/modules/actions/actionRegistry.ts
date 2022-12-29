import type { ActionSelector } from "../../map/map-classes/ActionSelector";
import type { SavePoint } from "../../map/map-classes/SavePoint";

let spriteActionDictionary: { [key in string]: ActionSelector } = {};
let tileActionDictionary: { [key in string]: ActionSelector } = {};
let savePoint: SavePoint = null;

export const addSpriteAction = ( id: string, action: ActionSelector ): void => {
    spriteActionDictionary[id] = action;
}
export const addTileAction = ( id: string, action: ActionSelector ): void => {
    tileActionDictionary[id] = action;
}
export const addSavePoint = ( newSavePoint: SavePoint ): void => {
    savePoint = newSavePoint;
}

export const getSpriteAction = ( id: string ): ActionSelector => {
    return spriteActionDictionary[id];
}
export const getTileAction = ( id: string ): ActionSelector => {
    return tileActionDictionary[id];
}
export const getSavePoint = (): SavePoint => {
    return savePoint;
}

export const removeSpriteAction = ( id: string ): void => {
    delete spriteActionDictionary[id];
}

export const removeTileAction = ( id: string ): void => {
    delete tileActionDictionary[id];
}

export const getAllActions = (): ActionSelector[] => {
    const spriteActions = Object.values( spriteActionDictionary );
    const tileActions = Object.values( tileActionDictionary );
    const actions = [...spriteActions, ...tileActions];
    if ( savePoint !== null ) {
        actions.push( savePoint );
    }
    return actions;
};

export const clearActionRegistry = (): void => {
    spriteActionDictionary = {};
    tileActionDictionary = {};
    savePoint = null;
}