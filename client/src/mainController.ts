import { clearActiveMap } from "./helpers/loadMapHelpers";
import { animationLoop, stopAnimationLoop } from "./frameLoop";
import { setGameIsLoadedFromSave, setGameStartParameters, setLoadingGameGameState } from "./state/state";

export const loadFilesAndStartGame = ( loadingFromSave: boolean, parameters: any[] ): void => {
    setGameIsLoadedFromSave( loadingFromSave );
    setGameStartParameters( parameters );
    setLoadingGameGameState( true );
    animationLoop();
}
export const stopGameAndClearGameData = (): void => {
    stopControlsAndAnimation();
    clearActiveMap();
}
const stopControlsAndAnimation = (): void => {
    stopAnimationLoop();
}