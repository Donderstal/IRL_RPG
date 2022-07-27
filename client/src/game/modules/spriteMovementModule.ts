import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { SpriteStateEnum } from "../../enumerables/SpriteStateEnum";
import globals from "../../game-data/globals";
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import { Destination } from "../map/map-classes/Destination";

let movementDictionary: { [key in string]: Destination } = {};

export const initializeSpriteMovement = ( sprite: Sprite, destinationCell: GridCellModel, deleteAfterMovement: boolean ): void => {
    movementDictionary[sprite.spriteId] = new Destination( destinationCell.column, destinationCell.row, sprite, deleteAfterMovement );
    sprite.State.set( SpriteStateEnum.pathfinding );
};
export const getAssociatedSpriteMovementDestination = ( spriteId: string ): Destination => {
    return movementDictionary[spriteId];
};
export const handleSpriteMovement = ( sprite: Sprite ): void => {
    const destination = getAssociatedSpriteMovementDestination( sprite.spriteId );
    checkIfSpriteCanMove( sprite, destination );
};
export const destroySpriteMovement = ( sprite: Sprite ): void => {
    const id = sprite.spriteId;
    const destination = movementDictionary[id];
    destination.snapSpriteToCurrentStepTile( sprite )
    if ( movementDictionary[id].deleteSprite ) {
        globals.GAME.FRONT.deleteSprite( id );
    } 
    delete movementDictionary[id];
};
export const clearSpriteMovementDictionary = (): void => {
    movementDictionary = {}
};
const checkIfSpriteCanMove = ( sprite: Sprite, destination: Destination ) => {
    const direction = destination.getNextStepDirection( sprite );
    if ( direction !== null ) {
        moveSpriteInDirection( sprite, direction );
    }
    else if ( destination.hasNextStep() ) {
        destination.setNextStep( sprite );
    }
    else {
        sprite.deactivateMovementModule();
        destroySpriteMovement( sprite );
    }
};
export const moveSpriteInDirection = ( sprite: Sprite, direction: DirectionEnum ) => {
    sprite.changeDirection( direction );
    switch ( direction ) {
        case DirectionEnum.left:
            sprite.x -= sprite.speed;
            break;
        case DirectionEnum.up:
            sprite.y -= sprite.speed;
            break;
        case DirectionEnum.right:
            sprite.x += sprite.speed;
            break;
        case DirectionEnum.down:
            sprite.y += sprite.speed;
            break;
    }
    if ( sprite.isInCameraFocus && !globals.GAME.cameraFocus.movingToNewFocus ) {
        globals.GAME.cameraFocus.centerOnXY( sprite.centerX, sprite.baseY );
    }
    sprite.countFrame();
};