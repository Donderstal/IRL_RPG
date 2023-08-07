import type { State } from "../enumerables/StateEnum";
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

export const updateGameControlState = ( value: State ): void => {
    console.log(`updatign control state to ${value}`)
    setGameControlState( value );
}