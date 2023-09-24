import type { State } from "../enumerables/StateEnum";
import { setDebugModeGameState, setDisableStoryGameState, setGameControlState, setListeningForKeysGameState, setPausedGameState, setEventChainGameState } from "./state";

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
    setListeningForKeysGameState( value );
}
export const setEventChainState = ( value: boolean ): void => {
    setEventChainGameState( value );
}

export const updateGameControlState = ( value: State ): void => {
    console.log(`updating control state to ${value}`)
    setGameControlState( value );
}