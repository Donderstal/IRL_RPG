import { setDebugModeGameState, setDisableStoryGameState, setPausedGameState } from "./gameState";

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