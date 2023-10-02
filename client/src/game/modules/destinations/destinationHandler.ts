import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { cameraFocus } from "../../cameraFocus";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import type { Destination } from "../../map/map-classes/Destination";

export const checkIfSpriteCanMove = ( sprite: Sprite, destination: Destination ): boolean => {
    const direction = destination.getNextStepDirection( sprite );
    const tile = destination.getNextStepTile();
    if ( direction !== null ) {
        moveSpriteInDirection( sprite, direction, tile );
        return true;
    }
    else if ( destination.hasNextStep ) {
        destination.setNextStep( sprite );
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