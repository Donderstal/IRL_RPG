import type { Counter } from "../../../helpers/Counter";

let blockedSpriteCounterDictionary: { [key in string]: Counter } = {};

export const addBlockedCounterToRegistry = ( id: string, counter: Counter ): void => {
    blockedSpriteCounterDictionary[id] = counter;
}
export const removeBlockedCounterFromRegistry = ( id: string ): void => {
    delete blockedSpriteCounterDictionary[id];
}
export const clearBlockedCounterRegistry = (): void => {
    blockedSpriteCounterDictionary = {};
}
export const getAllBlockedCounters = (): { [key in string]: Counter } => {
    return blockedSpriteCounterDictionary;
}