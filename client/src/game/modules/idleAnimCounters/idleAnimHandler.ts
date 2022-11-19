import type { Sprite } from "../../core/Sprite";
import { getAssociatedIdleSpriteCounter } from "./idleAnimGetter";

export const incrementIdleAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedIdleSpriteCounter( spriteId );
    counter.count();
};
export const idleAnimationCounterIsOverLimit = ( spriteId: string ): boolean => {
    const counter = getAssociatedIdleSpriteCounter( spriteId );
    return counter.isCounterOverLimit();
}
export const getIdleAnimationFromList = ( sprite: Sprite ): string => {
    const animationList = sprite.model.idleAnimations;
    return animationList[Math.floor( Math.random() * animationList.length )];
}
export const resetIdleAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedIdleSpriteCounter( spriteId );
    counter.resetCounter();
}