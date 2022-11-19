import { Counter } from "../../../helpers/Counter";
import type { Sprite } from "../../core/Sprite";
import { addRandomCounterToRegistry, clearRandomCounterRegistry, removeRandomCounterFromRegistry } from "./randomAnimRegistry";

export const initializeRandomAnimationCounter = ( sprite: Sprite ): void => {
    const id = sprite.spriteId;
    const counter = new Counter( 7500, true );
    addRandomCounterToRegistry( id, counter );
};
export const destroyAssociatedRandomCounter = ( spriteId: string ): void => {
    removeRandomCounterFromRegistry( spriteId );
};
export const clearRandomAnimationCounters = (): void => {
    clearRandomCounterRegistry();
};