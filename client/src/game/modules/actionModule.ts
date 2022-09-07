import { GRID_BLOCK_PX } from "../../game-data/globals";
import type { InteractionModel } from "../../models/InteractionModel";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";
import { ActionSelector } from "../map/map-classes/ActionSelector";

let spriteActionDictionary: { [key in string]: ActionSelector } = {};
let tileActionDictionary: { [key in string]: ActionSelector } = {};

export const initializeActionForSprite = ( sprite: Sprite, interactionList: InteractionModel[] ): void => {
    spriteActionDictionary[sprite.spriteId] = new ActionSelector(
        sprite.centerX, sprite.baseY, interactionList, sprite.spriteId
    );
    sprite.plugins.mapAction.active = true;
};

export const initializeActionForTile = ( tile: Tile, interactionList: InteractionModel[] ): void => {
    tileActionDictionary[tile.index] = new ActionSelector(
        tile.x + ( GRID_BLOCK_PX / 2 ), tile.y + ( GRID_BLOCK_PX / 2 ), interactionList
    );
};

export const getSpriteAssociatedAction = ( spriteId: string ): ActionSelector => {
    return spriteActionDictionary[spriteId];
};

export const getTileAssociatedAction = ( tileIndex: number ): ActionSelector => {
    return tileActionDictionary[tileIndex];
};

export const getAllActions = (): ActionSelector[] => {
    return [...Object.values( spriteActionDictionary ), ...Object.values( tileActionDictionary )];
};

export const updateSpriteAssociatedAction = ( sprite: Sprite ): void => {
    const action = spriteActionDictionary[sprite.spriteId];
    action.updateXy( sprite.centerX, sprite.baseY );
};

export const destroySpriteAssociatedAction = ( spriteId: string ): void => {
    delete spriteActionDictionary[spriteId];
};

export const destroyTileAssociatedAction = ( tile: Tile ): void => {
    delete tileActionDictionary[tile.index];
};

export const clearActions = (): void => {
    spriteActionDictionary = {};
    tileActionDictionary = {};
};