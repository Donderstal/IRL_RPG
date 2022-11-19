import type { Counter } from "../../../helpers/Counter";

let randomAnimationCounterDictionary: { [key in string]: Counter } = {};

export const addRandomCounterToRegistry = ( id: string, counter: Counter ): void => {
    randomAnimationCounterDictionary[id] = counter;
}
export const removeRandomCounterFromRegistry = ( id: string ): void => {
    delete randomAnimationCounterDictionary[id];
}
export const clearRandomCounterRegistry = (): void => {
    randomAnimationCounterDictionary = {};
}
export const getAllRandomCounters = (): { [key in string]: Counter } => {
    return randomAnimationCounterDictionary;
}