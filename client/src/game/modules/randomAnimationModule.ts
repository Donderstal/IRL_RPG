import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import { DirectionEnum } from "../../enumerables/DirectionEnum";
import globals from "../../game-data/globals";
import { Counter } from "../../helpers/Counter";
import { getRandomDestinationInRadius } from "../../helpers/utilFunctions";
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import { initializeSpriteAnimation } from "./animationModule";
import { initializeSpriteMovement } from "./spriteMovementModule";

let counterDictionary: { [key in string]: Counter } = {};
const cellRadius = 2;

export const initializeRandomAnimationCounter = ( sprite: Sprite ): void => {
    counterDictionary[sprite.spriteId] = new Counter( 7500, true );
};
export const handleRandomAnimationCounter = ( sprite: Sprite ): void => {
    const counter = getAssociatedCounter( sprite.spriteId );
    counter.count();
    if ( counter.isCounterOverLimit() ) {
        setRandomDestinationOrAnimation( sprite );
        counter.resetCounter();
    }
};
export const clearRandomAnimationCounters = (): void => {
    counterDictionary = {};
};
export const resetRandomAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedCounter( spriteId );
    counter.resetCounter();
};
const getAssociatedCounter = ( spriteId: string ): Counter => {
    return counterDictionary[spriteId];
};
const setRandomDestinationInRadius = ( sprite: Sprite ) => {
    const randomDestinationCell = getRandomDestinationInRadius( sprite, cellRadius );
    if ( randomDestinationCell === null ) return;

    initializeSpriteMovement( sprite, randomDestinationCell, false );
};
const setRandomAnimation = ( sprite: Sprite ) => {
    const animationList = sprite.model.idleAnimations;
    let animationName = animationList[Math.floor( Math.random() * animationList.length )];
    const direction = sprite.direction;

    switch ( animationName ) {
        case "BOP":
            animationName = direction == DirectionEnum.up ? "BOP_UP" : DirectionEnum.down ? "BOP_DOWN" : direction == DirectionEnum.left ? "BOP_LEFT" : "BOP_RIGHT";
            break;
        case "BLINK":
            animationName = direction == DirectionEnum.down ? "BLINK_DOWN" : direction == DirectionEnum.left ? "BLINK_LEFT" : "BLINK_RIGHT";
            break;
        default:
            animationName = animationName
    }

    initializeSpriteAnimation( sprite, animationName, { looped: false, loops: 0 } );
};
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
};