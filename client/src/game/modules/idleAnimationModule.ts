import { Counter } from "../../helpers/Counter";
import type { Sprite } from "../core/Sprite";
import { initializeSpriteAnimation } from "./animationModule";

let counterDictionary: { [key in string]: Counter } = {};

export const initializeIdleAnimationCounter = ( sprite: Sprite ): void => {
    counterDictionary[sprite.spriteId] = new Counter( 7500, true );
};
export const handleIdleAnimationCounter = ( sprite: Sprite ): void => {
    const counter = getAssociatedCounter( sprite.spriteId );
    counter.count();
    doAnimationIfCounterOverLimit( sprite, counter );
};
export const clearIdleAnimationCounters = (): void => {
    counterDictionary = {};
};
export const resetIdleAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedCounter( spriteId );
    counter.resetCounter();
};
const getAssociatedCounter = ( spriteId: string ): Counter => {
    return counterDictionary[spriteId];
};
const doAnimationIfCounterOverLimit = ( sprite: Sprite, counter: Counter ): void => {
    if ( counter.isCounterOverLimit() ) {
        const animationList = sprite.model.idleAnimations;
        const animationName = animationList[Math.floor( Math.random() * animationList.length )];
        initializeSpriteAnimation( sprite, animationName, { looped: false, loops: 0 } );
        counter.resetCounter();
    }
};