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
    return animationList[Math.floor( Math.random() * animationList.length )];
};