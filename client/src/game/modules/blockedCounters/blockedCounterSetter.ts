import { Counter } from "../../../helpers/Counter";
import { addBlockedCounterToRegistry, clearBlockedCounterRegistry, removeBlockedCounterFromRegistry } from "./blockedCounterRegistry"
export const initializeBlockedSpriteCounter = ( spriteId: string ): void => {
    const counter = new Counter( 1000 );
    addBlockedCounterToRegistry( spriteId, counter );
}
export const destroyBlockedSpriteCounter = ( spriteId: string ): void => {
    removeBlockedCounterFromRegistry( spriteId );
}
export const clearBlockedSpriteCounters = () => {
    clearBlockedCounterRegistry();
}
