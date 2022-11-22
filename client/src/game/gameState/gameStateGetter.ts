import { getDebugModeGameState, getDisableStoryGameState, getListentingForKeysGameState, getPausedGameState } from "./gameState";

export const inPausedGameState = (): boolean => {
    return getPausedGameState();
}
export const inDebugGameState = (): boolean => {
    return getDebugModeGameState();
}
export const inDisableStoryGameState = (): boolean => {
    return getDisableStoryGameState();
}
export const inListeningForKeysGameState = (): boolean => {
    return getListentingForKeysGameState();
}