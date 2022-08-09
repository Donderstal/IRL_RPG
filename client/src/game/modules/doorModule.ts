import type { Door } from "../map/map-classes/Door";
import { GRID_BLOCK_PX } from "../../game-data/globals";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";
import type { DoorModel } from "../../models/DoorModel";
import { initDoorWithId } from "../controllers/doorController";

let spriteDoorDictionary: { [key in string]: Door } = {};
let tileDoorDictionary: { [key in string]: Door } = {};

export const initializeDoorForSprite = ( sprite: Sprite, doorModel: DoorModel ): void => {
    spriteDoorDictionary[sprite.spriteId] = initDoorWithId( sprite.centerX, sprite.baseY, doorModel );
    sprite.plugins.door.active = true;
};

export const initializeDoorForTile = ( tile: Tile, doorModel: DoorModel ): void => {
    tileDoorDictionary[tile.index] = initDoorWithId( tile.x + ( GRID_BLOCK_PX / 2 ), tile.y + ( GRID_BLOCK_PX / 2 ), doorModel );
};

export const getSpriteAssociatedDoor = ( spriteId: string ): Door => {
    return spriteDoorDictionary[spriteId];
};

export const getTileAssociatedDoor = ( tileIndex: number ): Door => {
    return tileDoorDictionary[tileIndex];
};

export const updateSpriteAssociatedDoor = ( sprite: Sprite ): void => {
    const door = spriteDoorDictionary[sprite.spriteId];
    door.updateXy( sprite.centerX, sprite.baseY );
};

export const destroySpriteAssociatedDoor = ( sprite: Sprite ): void => {
    delete spriteDoorDictionary[sprite.spriteId];
};

export const destroyTileAssociatedDoor = ( tile: Tile ): void => {
    delete tileDoorDictionary[tile.index];
};

export const getAllDoors = (): Door[] => {
    return [...Object.values( spriteDoorDictionary ), ...Object.values( tileDoorDictionary )];
};

export const clearDoors = (): void => {
    spriteDoorDictionary = {};
    tileDoorDictionary = {};
};