import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { GRID_BLOCK_PX } from "../../../game-data/globals";
import { isHorizontal } from "../../../helpers/utilFunctions";
import type { DoorModel } from "../../../models/DoorModel";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import { Door } from "../../map/map-classes/Door";
import { addDoorToRegistry, clearDoorRegistry, removeDoorFromRegistry } from "./doorRegistry";

const doorRadius = GRID_BLOCK_PX / 2;
const getCorrectedX = ( x: number, radius: number, direction: DirectionEnum ): number => {
    return !isHorizontal( direction )
        ? x : direction === DirectionEnum.left
            ? x - radius : x + radius;
}
const getCorrectedY = ( y: number, radius: number, direction: DirectionEnum ): number => {
    return isHorizontal( direction )
        ? y : direction === DirectionEnum.up
            ? y - radius : y + radius;
}
const initDoorWithId = ( x: number, y: number, doorData: DoorModel, id: string ): Door => {
    const correctedX = getCorrectedX( x, doorRadius, doorData.direction );
    const correctedY = getCorrectedY( y, doorRadius, doorData.direction );
    const door = new Door( correctedX, correctedY, doorData, id );
    return door;
}

export const initializeDoorForSprite = ( sprite: Sprite, doorModel: DoorModel ): void => {
    const door = initDoorWithId( sprite.centerX, sprite.baseY, doorModel, sprite.spriteId );
    addDoorToRegistry( sprite.spriteId, door );
};
export const initializeDoorForTile = ( tile: Tile, doorModel: DoorModel ): void => {
    const door = initDoorWithId( tile.x + ( GRID_BLOCK_PX / 2 ), tile.y + ( GRID_BLOCK_PX / 2 ), doorModel, tile.index.toString() );
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