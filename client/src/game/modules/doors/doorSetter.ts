import { GRID_BLOCK_PX } from "../../../game-data/globals";
import type { DoorModel } from "../../../models/DoorModel";
import { initDoorWithId } from "../../controllers/doorController";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import { addDoorToRegistry, clearDoorRegistry, removeDoorFromRegistry } from "./doorRegistry";

export const initializeDoorForSprite = ( sprite: Sprite, doorModel: DoorModel ): void => {
    const door = initDoorWithId( sprite.centerX, sprite.baseY, doorModel );
    addDoorToRegistry( sprite.spriteId, door );
};
export const initializeDoorForTile = ( tile: Tile, doorModel: DoorModel ): void => {
    const door = initDoorWithId( tile.x + ( GRID_BLOCK_PX / 2 ), tile.y + ( GRID_BLOCK_PX / 2 ), doorModel );
    addDoorToRegistry( tile.index.toString(), door );
};
export const destroySpriteAssociatedDoor = ( id: string ): void => {
    removeDoorFromRegistry( id );
};
export const destroyTileAssociatedDoor = ( tile: Tile ): void => {
    removeDoorFromRegistry( tile.index.toString() );
};
export const clearDoors = (): void => {
    clearDoorRegistry();
};