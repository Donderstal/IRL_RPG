import type { State } from "../enumerables/StateEnum";

let paused: boolean;
let debugMode: boolean;
let disableStory: boolean;
let listeningForKeys: boolean;
let inEvent: boolean;
let loadingGame: boolean;
let loadingMap: boolean;
let controlState: State; 

let gameIsLoadedFromSave: boolean;
let gameStartParameters: any[];

export const setGameStartParameters = ( value: any[] ): void => {
    gameStartParameters = value;
}
export const setGameIsLoadedFromSave = ( value: boolean ): void => {
    gameIsLoadedFromSave = value;
}
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
export const setEventChainGameState = ( value: boolean ): void => {
    inEvent = value;
}
export const setGameControlState = ( value: State ): void => {
    controlState = value;
}
export const setLoadingGameGameState = ( value: boolean ): void => {
    loadingGame = value;
}
export const setLoadingMapGameState = ( value: boolean ): void => {
    loadingMap = value;
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
export const getEventChainState = (): boolean => {
    return inEvent;
}
export const getGameControlState = (): State => {
    return controlState;
}
export const getLoadingGameGameState = (): boolean => {
    return loadingGame;
}
export const getLoadingMapGameState = (): boolean => {
    return loadingMap;
}
export const getGameIsLoadedFromSave = (): boolean => {
    return gameIsLoadedFromSave;
}
export const getGameStartParameters = (): any[] => {
    return gameStartParameters;
}