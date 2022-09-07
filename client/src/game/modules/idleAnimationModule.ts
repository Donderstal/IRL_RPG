import { Counter } from "../../helpers/Counter";
import type { Sprite } from "../core/Sprite";

let counterDictionary: { [key in string]: Counter } = {};

export const initializeIdleAnimationCounter = ( sprite: Sprite ): void => {
    counterDictionary[sprite.spriteId] = new Counter( 7500, true );
};
export const incrementIdleAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedCounter( spriteId );
    counter.count();
};
export const clearIdleAnimationCounters = (): void => {
    counterDictionary = {};
};
export const destroyAssociatedIdleCounter = ( spriteId: string ): void => {
    delete counterDictionary[spriteId];
};
export const idleAnimationCounterIsOverLimit = ( spriteId: string ): boolean => {
    const counter = getAssociatedCounter( spriteId );
    return counter.isCounterOverLimit();
}
export const getIdleAnimationFromList = ( sprite: Sprite ): string => {
    const animationList = sprite.model.idleAnimations;
    return animationList[Math.floor( Math.random() * animationList.length )];
}
export const resetIdleAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedCounter( spriteId );
    counter.resetCounter();
}
const getAssociatedCounter = ( spriteId: string ): Counter => {
    return counterDictionary[spriteId];
};