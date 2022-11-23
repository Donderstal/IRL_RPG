import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { getRandomDestinationInRadius } from "../../../helpers/utilFunctions";
import { cameraFocus } from "../../cameraFocus";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import type { Destination } from "../../map/map-classes/Destination";
import { getSpriteDestination } from "./destinationGetter";

export const checkIfSpriteCanMove = ( sprite: Sprite, destination: Destination ): boolean => {
    const direction = destination.getNextStepDirection( sprite );
    const tile = destination.getNextStepTile();
    if ( direction !== null && ( tile !== null || !sprite.isCar ) ) {
        moveSpriteInDirection( sprite, direction, tile );
        return true;
    }
    else if ( destination.hasNextStep ) {
        destination.setNextStep( sprite );
        if ( sprite.isCar ) return true;
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
export const spriteFailedToFindPath = ( spriteId: string ): boolean => {
    const destination = getSpriteDestination( spriteId );
    return destination.failedToFindPath;
};
export const spriteIsAtDestination = ( sprite: Sprite ): boolean => {
    const destination = getSpriteDestination( sprite.spriteId );
    return destination.column === sprite.column && destination.row === sprite.row;
}