import { initSpriteFrameModel, initTileFrameModel } from "../../../helpers/modelFactory";
import type { ElevatorModel } from "../../../models/ElevatorModel";
import type { InteractionModel } from "../../../models/InteractionModel";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import { ActionSelector } from "../../map/map-classes/ActionSelector";
import { Elevator } from "../../map/map-classes/Elevator";
import { SavePoint } from "../../map/map-classes/SavePoint";
import { addSavePoint, addSpriteAction, addTileAction, clearActionRegistry, removeSpriteAction, removeTileAction } from "./actionRegistry";

export const initializeActionForSprite = ( sprite: Sprite, interactionList: InteractionModel[] ): void => {
    const frame = initSpriteFrameModel( sprite );
    const action = new ActionSelector( frame, interactionList, sprite.spriteId );
    addSpriteAction( sprite.spriteId, action );
};

export const initializeActionForTile = ( tile: Tile, interactionList: InteractionModel[] ): void => {
    const frame = initTileFrameModel( tile );
    const action = new ActionSelector( frame, interactionList );
    addTileAction( tile.index.toString(), action );
};

export const initializeSavePoint = ( tile: Tile ): void => {
    const frame = initTileFrameModel( tile );
    const savePoint = new SavePoint( frame );
    addSavePoint( savePoint );
}
export const initializeElevator = ( tile: Tile, elevatorModel: ElevatorModel ): void => {
    const frame = initTileFrameModel( tile );
    const elevator = new Elevator( frame, elevatorModel );
    addTileAction( tile.index.toString(), elevator );
}
export const destroySpriteAssociatedAction = ( spriteId: string ): void => {
    removeSpriteAction( spriteId );
};

export const destroyTileAssociatedAction = ( tile: Tile ): void => {
    removeTileAction( tile.index.toString() );
};

export const clearActions = () => {
    clearActionRegistry();
}