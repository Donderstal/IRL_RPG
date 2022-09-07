import { DirectionEnum } from "../../enumerables/DirectionEnum";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";
import { Destination } from "../map/map-classes/Destination";
import { getRandomDestinationInRadius } from "../../helpers/utilFunctions";
import { cameraFocus } from "../cameraFocus";
import type { DestinationCellModel } from "../../models/DestinationCellModel";

let movementDictionary: { [key in string]: Destination } = {};

export const initializeSpriteMovement = ( sprite: Sprite, destinationCell: DestinationCellModel ): void => {
    movementDictionary[sprite.spriteId] = new Destination( destinationCell, sprite );
};
export const destroySpriteMovement = ( spriteId: string ): void => {
    const destination = movementDictionary[spriteId];
    destination.snapSpriteToCurrentStepTile( )
    delete movementDictionary[spriteId];
};
export const clearSpriteMovementDictionary = (): void => {
    movementDictionary = {}
};
export const getSpriteDestination = ( spriteId: string ): Destination => {
    return movementDictionary[spriteId];
};
export const checkIfSpriteCanMove = ( sprite: Sprite, destination: Destination ): boolean => {
    const direction = destination.getNextStepDirection( sprite );
    const tile = destination.getNextStepTile();
    if ( direction !== null && (tile !== null || !sprite.isCar) ) {
        moveSpriteInDirection( sprite, direction, tile );
        return true;
    }
    else if ( destination.hasNextStep ) { 
        destination.setNextStep( sprite );
        if ( sprite.isCar ) return true;
        destination.setPath( sprite );
        return true;
    }
    else if ( destination.inSideStep ) {
        destination.resetOriginalDestination( sprite );
        return true;
    }
    return false;
};
export const moveSpriteInDirection = ( sprite: Sprite, direction: DirectionEnum, tile: Tile = null ) => {
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
    if ( cameraFocus.focusSpriteId == sprite.spriteId && !cameraFocus.movingToNewFocus ) {
        cameraFocus.centerOnXY( sprite.centerX, sprite.baseY );
    }
    sprite.movementFrameCounter();
};
export const setSideStepDestination = ( sprite: Sprite ): void => {
    if ( !sprite.isCar ) {
        const destination = getSpriteDestination( sprite.spriteId );
        const sideStepDestination = getRandomDestinationInRadius( sprite, 2 );
        if ( sideStepDestination === null ) return;
        destination.setSideStep( sideStepDestination, sprite );
    }
}
export const spriteHasMovement = ( spriteId: string ): boolean => {
    return spriteId in movementDictionary;
}

export const spriteFailedToFindPath = ( spriteId: string ): boolean => {
    const destination = getSpriteDestination( spriteId );
    return destination.failedToFindPath;
}