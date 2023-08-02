import { State } from "../enumerables/StateEnum";
import { setDebugModeGameState, setDisableStoryGameState, setGameControlState, setPausedGameState } from "./state";

export const setPausedState = ( value: boolean ): void => {
    setPausedGameState( value );
}
export const setDebugModeState = ( value: boolean ): void => {
    setDebugModeGameState( value );
}
export const setDisableStoryState = ( value: boolean ): void => {
    setDisableStoryGameState( value );
}
export const setListeningForKeysState = ( value: boolean ): void => {
    setDisableStoryGameState( value );
}

export const setWebsiteState = (): void => {
    setGameControlState( State.website );
}
export const setOpenWorldState = (): void => {
    setGameControlState( State.open_world );
}
export const setCinematicState = (): void => {
    setGameControlState( State.cinematic );
}
export const setMenuState = (): void => {
    setGameControlState( State.menu );
}