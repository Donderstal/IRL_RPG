import { Counter } from "../../../helpers/Counter";
import type { Sprite } from "../../core/Sprite";
import { addIdleCounterToRegistry, clearIdleCounterRegistry, removeIdleCounterFromRegistry } from "./idleAnimRegistry";

export const initializeIdleAnimationCounter = ( sprite: Sprite ): void => {
    const counter = new Counter( 7500, true );
    addIdleCounterToRegistry( sprite.spriteId, counter );
};
export const clearIdleAnimationCounters = (): void => {
    clearIdleCounterRegistry();
};
export const destroyAssociatedIdleCounter = ( spriteId: string ): void => {
    removeIdleCounterFromRegistry( spriteId );
};