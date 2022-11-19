import { GRID_BLOCK_PX } from "../../../game-data/globals";
import type { InteractionModel } from "../../../models/InteractionModel";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import { ActionSelector } from "../../map/map-classes/ActionSelector";
import { addSpriteAction, addTileAction, clearActionRegistry, removeSpriteAction, removeTileAction } from "./actionRegistry";

export const initializeActionForSprite = ( sprite: Sprite, interactionList: InteractionModel[] ): void => {
    const action = new ActionSelector(
        sprite.centerX, sprite.baseY, interactionList, sprite.spriteId
    );
    addSpriteAction( sprite.spriteId, action );
};

export const initializeActionForTile = ( tile: Tile, interactionList: InteractionModel[] ): void => {
    const action  = new ActionSelector(
        tile.x + ( GRID_BLOCK_PX / 2 ), tile.y + ( GRID_BLOCK_PX / 2 ), interactionList
    );
    addTileAction( tile.index.toString(), action );
};

export const destroySpriteAssociatedAction = ( spriteId: string ): void => {
    removeSpriteAction( spriteId );
};

export const destroyTileAssociatedAction = ( tile: Tile ): void => {
    removeTileAction( tile.index.toString() );
};

export const clearActions = () => {
    clearActionRegistry();
}