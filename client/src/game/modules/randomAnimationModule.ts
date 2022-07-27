import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import { DirectionEnum } from "../../enumerables/DirectionEnum";
import globals, { FRAME_LIMIT } from "../../game-data/globals";
import { Counter } from "../../helpers/Counter";
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import { initializeSpriteMovement } from "./spriteMovementModule";

let counterDictionary: { [key in string]: Counter } = {};
const cellRadius = 2;
const animationList = [
    "BACK_AND_FORTH",
    "LEFT_AND_RIGHT",
    "BOP",
    "BLINK"
];

export const initializeRandomAnimationCounter = ( sprite: Sprite ): void => {
    counterDictionary[sprite.spriteId] = new Counter( 7500, true );
};

export const getAssociatedCounter = ( spriteId: string ): Counter => {
    return counterDictionary[spriteId];
}

export const handleRandomAnimationCounter = ( sprite: Sprite ): void => {
    const counter = getAssociatedCounter( sprite.spriteId );
    counter.count();
    if ( counter.isCounterOverLimit() ) {
        setRandomDestinationOrAnimation( sprite );
        counter.resetCounter();
    }
}

export const clearRandomAnimationCounters = (): void => {
    counterDictionary = {};
}

const setRandomDestinationInRadius = ( sprite: Sprite ) => {
    const colDistance = Math.floor( Math.random() * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
    const rowDistance = Math.floor( Math.random() * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
    const newColumn = sprite.initialColumn + colDistance;
    const newRow = sprite.initialRow + rowDistance;

    if ( newRow > 0 && newRow < globals.GAME.activeMap.rows + 1 && newColumn > 0 && newColumn < globals.GAME.activeMap.columns + 1 ) {
        initializeSpriteMovement( sprite, { "column": newColumn, "row": newRow } as GridCellModel, false );
    }
    else {
        setRandomDestinationInRadius( sprite )
    }
}

const setRandomAnimation = ( sprite: Sprite ) => {
    const animation = animationList[Math.floor( Math.random() * animationList.length )];
    const direction = sprite.direction;
    let animationName;

    switch ( animation ) {
        case "BOP":
            animationName = direction == DirectionEnum.up ? "BOP_UP" : DirectionEnum.down ? "BOP_DOWN" : direction == DirectionEnum.left ? "BOP_LEFT" : "BOP_RIGHT";
            break;
        case "BLINK":
            animationName = direction == DirectionEnum.down ? "BLINK_DOWN" : direction == DirectionEnum.left ? "BLINK_LEFT" : "BLINK_RIGHT";
            break;
        default:
            animationName = animation
    }

    sprite.setScriptedAnimation(
        { "animName": animationName, "loop": false }, FRAME_LIMIT
    )
}

const setRandomDestinationOrAnimation = ( sprite: Sprite ) => {
    switch ( sprite.animationType ) {
        case AnimationTypeEnum.idle:
            setRandomAnimation( sprite );
            break;
        case AnimationTypeEnum.semiIdle:
            Math.random() < .33 ? setRandomDestinationInRadius( sprite ) : setRandomAnimation( sprite );
            break;
        case AnimationTypeEnum.moving:
            setRandomDestinationInRadius( sprite );
            break;
    }
}