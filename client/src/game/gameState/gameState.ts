let paused: boolean;
let debugMode: boolean;
let disableStory: boolean;
let listeningForKeys: boolean;

export const setPausedGameState = ( value: boolean ): void => {
    paused = value;
}
export const setDebugModeGameState = (value: boolean): void => {
    debugMode = value;
}
export const setDisableStoryGameState = ( value: boolean ): void => {
    disableStory = value;
}
export const setListeningForKeysGameState = ( value: boolean ): void => {
    listeningForKeys = value;
}

export const getPausedGameState = (): boolean => {
    return paused;
}
export const getDebugModeGameState = (): boolean => {
    return debugMode;
}
export const getDisableStoryGameState = (): boolean => {
    return disableStory;
}
export const getListentingForKeysGameState = (): boolean => {
    return listeningForKeys;
}