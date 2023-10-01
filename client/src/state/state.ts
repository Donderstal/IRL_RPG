import { StateType } from "../enumerables/StateType";
import type { ControlState } from "../enumerables/ControlState";

let clearingMap: boolean = false;
let debugMode: boolean = false;
let disableStory: boolean = false;
let inEvent: boolean = false;
let listeningForKeys: boolean = false;
let loadingGame: boolean = false;
let loadingMap: boolean = false;
let paused: boolean = false;

let controlState: ControlState; 

let gameIsLoadedFromSave: boolean;
let gameStartParameters: any[];

export const alterGameState = ( stateType: StateType, value: boolean ): void => {
    switch ( stateType ) {
        case StateType.clearingMap:
            clearingMap = value;
            break;
        case StateType.debugMode:
            debugMode = value;
            break;
        case StateType.disableStory:
            disableStory = value;
            break;
        case StateType.inEvent:
            inEvent = value;
            break;
        case StateType.isLoadedFromSave:
            gameIsLoadedFromSave = value;
            break;
        case StateType.listeningForKeys:
            listeningForKeys = value;
            break;
        case StateType.loadingGame:
            loadingGame = value;
            break;
        case StateType.loadingMap:
            loadingMap = value;
            break;
        case StateType.paused:
            paused = value;
            break;
    }
};
export const getGameState = ( stateType: StateType ): boolean => {
    switch ( stateType ) {
        case StateType.clearingMap:
            return clearingMap;
        case StateType.debugMode:
            return debugMode;
        case StateType.disableStory:
            return disableStory;
        case StateType.inEvent:
            return inEvent;
        case StateType.isLoadedFromSave:
            return gameIsLoadedFromSave;
        case StateType.listeningForKeys:
            return listeningForKeys;
        case StateType.loadingGame:
            return loadingGame;
        case StateType.loadingMap:
            return loadingMap;
        case StateType.paused:
            return paused;
    }
};

export const alterGameControlState = ( value: ControlState ): void => {
    controlState = value;
};
export const getGameControlState = (): ControlState => {
    return controlState;
};

export const setGameStartParameters = ( value: any[] ): void => {
    gameStartParameters = value;
}
export const setGameIsLoadedFromSave = ( value: boolean ): void => {
    gameIsLoadedFromSave = value;
}
export const getGameStartParameters = (): any[] => {
    return gameStartParameters;
}