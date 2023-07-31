import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { GRID_BLOCK_PX, MOVEMENT_SPEED } from "../../../game-data/globals";
import { isHorizontal } from "../../../helpers/utilFunctions";
import type { DoorModel } from "../../../models/DoorModel";
import type { FrameModel } from "../../../models/SpriteFrameModel";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import { Door } from "../../map/map-classes/Door";
import { addDoorToRegistry, clearDoorRegistry, removeDoorFromRegistry } from "./doorRegistry";

const getDoorFrame = ( x: number, y: number, direction: DirectionEnum ) => {
    const frameModel: FrameModel = {
        x: 0, y: 0,
        width: 0, height: 0
    }
    const horizontal = isHorizontal( direction );
    if ( horizontal ) {
        frameModel.height = GRID_BLOCK_PX;
        frameModel.width = MOVEMENT_SPEED;
    }
    else {
        frameModel.height = MOVEMENT_SPEED;
        frameModel.width = GRID_BLOCK_PX;
    }
    switch ( direction ) {
        case DirectionEnum.left:
            frameModel.y = y;
            frameModel.x = x - MOVEMENT_SPEED * .5;
            break;
        case DirectionEnum.up:
            frameModel.y = y - MOVEMENT_SPEED * .5;
            frameModel.x = x;
            break;
        case DirectionEnum.right:
            frameModel.y = y;
            frameModel.x = ( x + GRID_BLOCK_PX ) - MOVEMENT_SPEED * .5;
            break;
        case DirectionEnum.down:
            frameModel.y = ( y + GRID_BLOCK_PX ) - MOVEMENT_SPEED * .5;
            frameModel.x = x;
            break;
    }
    return frameModel;
}

export const initializeDoorForSprite = ( sprite: Sprite, doorModel: DoorModel ): void => {
    const frame = getDoorFrame(sprite.x, sprite.y, doorModel.direction);
    const id = sprite.spriteId;
    const door = new Door( frame, doorModel, id );
    addDoorToRegistry( id, door );
};
export const initializeDoorForTile = ( tile: Tile, doorModel: DoorModel ): void => {
    const frame = getDoorFrame( tile.x, tile.y, doorModel.direction );
    const id = tile.index.toString();
    const door = new Door( frame, doorModel, id );
    addDoorToRegistry( id, door );
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