import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { SpriteStateEnum } from "../../enumerables/SpriteStateEnum";
import globals from "../../game-data/globals";
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";
import { Destination } from "../map/map-classes/Destination";
import { destroySpriteAnimation, spriteHasAnimation } from "./animationModule";

let movementDictionary: { [key in string]: Destination } = {};

export const initializeSpriteMovement = ( sprite: Sprite, destinationCell: GridCellModel, deleteAfterMovement: boolean = false ): void => {
    if ( spriteHasAnimation( sprite.spriteId ) ) {
        destroySpriteAnimation( sprite );
    }
    try {
        movementDictionary[sprite.spriteId] = new Destination( destinationCell.column, destinationCell.row, sprite, deleteAfterMovement );
        sprite.State.set( SpriteStateEnum.pathfinding );
    }
    catch ( ex ) {
        console.log( 'error generating path for destination c' + destinationCell.column + ' r' + destinationCell.row );
        console.log( ex );
        if ( deleteAfterMovement ) {
            globals.GAME.FRONT.deleteSprite( sprite.spriteId );
        } 
    }
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
const getAssociatedSpriteMovementDestination = ( spriteId: string ): Destination => {
    return movementDictionary[spriteId];
};
const checkIfSpriteCanMove = ( sprite: Sprite, destination: Destination ) => {
    const direction = destination.getNextStepDirection( sprite );
    const tile = destination.getNextStepTile();
    if ( direction !== null ) {
        moveSpriteInDirection( sprite, direction, tile );
    }
    else if ( destination.hasNextStep() ) {
        destination.setNextStep( sprite );
    }
    else {
        sprite.deactivateMovementModule();
        destroySpriteMovement( sprite );
    }
};
export const moveSpriteInDirection = ( sprite: Sprite, direction: DirectionEnum, tile: Tile ) => {
    sprite.setDirection( direction, tile );
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
    sprite.movementFrameCounter();
};
export const spriteHasMovement = ( spriteId: string ): boolean => {
    return spriteId in movementDictionary;
}