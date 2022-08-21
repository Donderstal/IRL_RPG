import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { SpriteStateEnum } from "../../enumerables/SpriteStateEnum";
import globals from "../../game-data/globals";
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";
import { Destination } from "../map/map-classes/Destination";
import { checkForCollision } from "../map/collision";
import { destroySpriteAnimation, spriteHasAnimation } from "./animationModule";
import { blockedSpriteCounterIsOverLimit, destroyBlockedSpriteCounter, handleBlockedSpriteCounter } from "./blockedSpritesModule";
import { getRandomDestinationInRadius } from "../../helpers/utilFunctions";

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
    if ( spriteHasAnimation( sprite.spriteId ) ) {
        destroySpriteAnimation( sprite );
    }
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
        if ( sprite.isCar ) return;
        destination.setPath( sprite );
    }
    else if ( destination.inSideStep ) {
        destination.resetOriginalDestination( sprite );
    }
    else {
        sprite.deactivateMovementModule();
        destroySpriteMovement( sprite );
    }
};
export const moveSpriteInDirection = ( sprite: Sprite, direction: DirectionEnum, tile: Tile = null ) => {
    sprite.setDirection( direction, tile );
    if ( checkForCollision( sprite ) ) {
        if ( sprite.isPlayer || sprite.isCar ) return;
        handleBlockedSpriteCounter( sprite );
        if ( blockedSpriteCounterIsOverLimit( sprite.spriteId ) ) {
            destroyBlockedSpriteCounter( sprite.spriteId );
            if ( !sprite.isCar ) {
                const destination = getAssociatedSpriteMovementDestination( sprite.spriteId );
                const sideStepDestination = getRandomDestinationInRadius( sprite, 2 );
                if ( sideStepDestination === null ) return;
                destination.setSideStep( sideStepDestination, sprite );
            }
        }
    }
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