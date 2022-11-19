import type { Counter } from "../../../helpers/Counter";

let idleAnimationCounterDictionary: { [key in string]: Counter } = {};

export const addIdleCounterToRegistry = ( id: string, counter: Counter ): void => {
    idleAnimationCounterDictionary[id] = counter;
}
export const removeIdleCounterFromRegistry = ( id: string ): void => {
    delete idleAnimationCounterDictionary[id];
}
export const clearIdleCounterRegistry = (): void => {
    idleAnimationCounterDictionary = {};
}
export const getAllIdleCounters = (): { [key in string]: Counter } => {
    return idleAnimationCounterDictionary;
}