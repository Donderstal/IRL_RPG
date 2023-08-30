import { State } from "../enumerables/StateEnum";
import { getDebugModeGameState, getDisableStoryGameState, getGameControlState, getInEventGameState, getListentingForKeysGameState, getPausedGameState } from "./state";

export const inPausedState = (): boolean => {
    return getPausedGameState();
}
export const inDebugState = (): boolean => {
    return getDebugModeGameState();
}
export const inDisableStoryState = (): boolean => {
    return getDisableStoryGameState();
}
export const inListeningForKeysState = (): boolean => {
    return getListentingForKeysGameState();
}
export const inInEventState = (): boolean => {
    return getInEventGameState();
}

export const inWebsiteState = (): boolean => {
    return getGameControlState() == State.website;
}
export const inOpenWorldState = (): boolean => {
    return getGameControlState() == State.open_world;
}
export const inCinematicState = (): boolean => {
    return getGameControlState() == State.cinematic;
}
export const inMenuState = (): boolean => {
    return getGameControlState() == State.menu;
}
export const getControlState = (): State => {
    return getGameControlState();
}