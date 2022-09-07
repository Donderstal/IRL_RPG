import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { Counter } from "../../helpers/Counter";
import { getRandomDestinationInRadius } from "../../helpers/utilFunctions";
import type { DestinationCellModel } from "../../models/DestinationCellModel";
import type { Sprite } from "../core/Sprite";

let counterDictionary: { [key in string]: Counter } = {};
const cellRadius = 2;

export const initializeRandomAnimationCounter = ( sprite: Sprite ): void => {
    counterDictionary[sprite.spriteId] = new Counter( 7500, true );
};
export const incrementRandomAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedCounter( spriteId );
    counter.count();
};
export const randomAnimationCounterIsOverLimit = ( spriteId: string ): boolean => {
    const counter = getAssociatedCounter( spriteId );
    return counter.isCounterOverLimit();
}
export const clearRandomAnimationCounters = (): void => {
    counterDictionary = {};
};
export const resetRandomAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedCounter( spriteId );
    counter.resetCounter();
};
export const destroyAssociatedRandomCounter = ( spriteId: string ): void => {
    delete counterDictionary[spriteId];
};
const getAssociatedCounter = ( spriteId: string ): Counter => {
    return counterDictionary[spriteId];
};
export const getRandomDestination = ( sprite: Sprite ): DestinationCellModel => {
    return getRandomDestinationInRadius( sprite, cellRadius );
};
export const getRandomAnimation = ( sprite: Sprite ): string => {
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

    return animationName;
};