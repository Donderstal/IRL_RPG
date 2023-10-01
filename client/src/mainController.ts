import { StateType } from "./enumerables/StateType";
import { animationLoop, stopAnimationLoop } from "./frameLoop";
import { closeGameCanvas } from "./helpers/DOMEventHelpers";
import { alterGameState, setGameStartParameters } from "./state/state";

export const loadFilesAndStartGame = ( loadingFromSave: boolean, parameters: any[] ): void => {
    alterGameState( StateType.isLoadedFromSave, loadingFromSave );
    alterGameState( StateType.loadingGame, true );
    setGameStartParameters( parameters );

    animationLoop();
}
export const stopGameAndClearGameData = (): void => {
    stopAnimationLoop();
    closeGameCanvas();
}