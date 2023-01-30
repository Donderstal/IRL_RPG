import { DirectionEnum } from "../enumerables/DirectionEnum";
import type { Sprite } from "../game/core/Sprite";
import type { Destination } from "../game/map/map-classes/Destination";
import type { DirectionXy } from "../models/DirectionXyModel";
import { SpritePosition } from "./SpritePosition";

export const getPlayerNextPosition = ( player: Sprite, movementDirection: DirectionEnum ): SpritePosition => {
    return getNextPositionByDirection( player, movementDirection );
}

export const getNonPlayerSpriteNextPosition = ( sprite: Sprite, destination: Destination ): SpritePosition => {
    const nextStepDirection = destination.getNextStepDirection( sprite );
    if ( nextStepDirection !== null ) return getNextPositionByDirection( sprite, nextStepDirection );
    if ( !destination.hasNextStep ) return getStaticSpritePosition( sprite );

    const nextStepIndex = destination.currentPathIndex + 1;
    const nextStep = destination.getStepByIndex( nextStepIndex );
    return getNextPositionByDestinationStep( sprite, nextStep );
}

export const getStaticSpritePosition = ( sprite: Sprite ): SpritePosition => {
    return new SpritePosition( sprite.x, sprite.y, sprite.width, sprite.height, sprite.model.groundedAtBottom, sprite.isCar );
}

const getNextPositionByDirection = ( sprite: Sprite, movementDirection: DirectionEnum ): SpritePosition => {
    let x = sprite.x;
    let y = sprite.y;
    let speed = sprite.speed;

    switch ( movementDirection ) {
        case DirectionEnum.left:
            x = x - speed;
            break;
        case DirectionEnum.up:
            y = y - speed;
            break;
        case DirectionEnum.right:
            x = x + speed;
            break;
        case DirectionEnum.down:
            y = y + speed;
            break;
    }

    return new SpritePosition( sprite.x, sprite.y, sprite.width, sprite.height, sprite.model.groundedAtBottom, sprite.isCar );
}

const getNextPositionByDestinationStep = ( sprite: Sprite, nextStep: DirectionXy ): SpritePosition => {
    return new SpritePosition( nextStep.x, nextStep.y, sprite.width, sprite.height, sprite.model.groundedAtBottom, sprite.isCar );
}