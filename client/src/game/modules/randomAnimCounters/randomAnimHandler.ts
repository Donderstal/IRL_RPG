import { getRandomDestinationInRadius } from "../../../helpers/utilFunctions";
import type { DestinationCellModel } from "../../../models/DestinationCellModel";
import type { Sprite } from "../../core/Sprite";
import { getAssociatedRandomCounter } from "./randomAnimGetter";

const cellRadius = 2;

export const incrementRandomAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedRandomCounter( spriteId );
    counter.count();
};
export const randomAnimationCounterIsOverLimit = ( spriteId: string ): boolean => {
    const counter = getAssociatedRandomCounter( spriteId );
    return counter.isCounterOverLimit();
};
export const getRandomDestination = ( sprite: Sprite ): DestinationCellModel => {
    return getRandomDestinationInRadius( sprite, cellRadius );
};
export const getRandomAnimation = ( sprite: Sprite ): string => {
    const animationList = sprite.model.idleAnimations;
    return animationList[Math.floor( Math.random() * animationList.length )];
};
export const resetRandomAnimationCounter = ( spriteId: string ): void => {
    const counter = getAssociatedRandomCounter( spriteId );
    counter.resetCounter();
};