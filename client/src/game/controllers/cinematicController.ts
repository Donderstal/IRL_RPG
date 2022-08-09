import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import type { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import globals from "../../game-data/globals";
import { addEventToRegistry } from "../../helpers/interactionRegistry";
import { clearCinematicGrids, clearMapFromCanvases, initCinematicGrids } from "../../helpers/loadMapHelpers";
import type { InteractionModel } from "../../models/InteractionModel";
import { Interaction } from "../cutscenes/Interaction";
import { dismissActiveAction } from "./actionController";

let activeCinematic: Interaction = null;
let activeCinematicIsScripted: boolean = null;

export const setActiveCinematic = ( interaction: InteractionModel, trigger: CinematicTrigger, options: any[], isScripted = false ): void => {
    if ( activeCinematic === null ) {
        activeCinematicIsScripted = isScripted
        if ( activeCinematicIsScripted ) {
            initCinematicGrids();
            activeCinematic = new Interaction( interaction, trigger, options )
        }
        else {
            activeCinematic = new Interaction( interaction, trigger, options );
        }
    }
};
export const cinematicIsActive = (): boolean => {
    return activeCinematic !== null;
};
export const cinematicMapIsActive = (): boolean => {
    return activeCinematicIsScripted === false;
}
export const dismissActiveCinematic = (): void => {
    if ( activeCinematicIsScripted ) {
        clearMapFromCanvases( );
        if ( activeCinematic.model.shouldBeRegistered ) {
            if ( activeCinematic.registeredSelection !== null ) {
                addEventToRegistry( activeCinematic.model.registryKey, activeCinematic.registeredSelection )
            }
            else {
                addEventToRegistry( activeCinematic.model.registryKey )
            }
        }

        clearCinematicGrids();
    }
    if ( activeCinematic.trigger === CinematicTrigger.leave ) {
        globals.GAME.switchMap( activeCinematic.args[0], activeCinematic.args[1] );
    }
    else if ( activeCinematic.trigger === CinematicTrigger.interaction ) {
        let sprite = globals.GAME.FRONT.spriteDictionary[activeCinematic.args[0]];
        if ( sprite != undefined ) {
            sprite.State.cinematicOff( sprite );
        }
        dismissActiveAction();
    }

    activeCinematic = null;
    activeCinematicIsScripted = null;
};
export const getActiveCinematic = (): Interaction => {
    return activeCinematic;
};
export const handleActiveCinematic = (): void => {
    if ( activeCinematic.ended ) {
        dismissActiveCinematic();
    }
    else {
        activeCinematic.checkForScenePass();
    }
};
export const registerPlayerAnswer = ( answer: InteractionAnswer ): void => {
    const animation = activeCinematic.activeScene.getAnimationByType( SceneAnimationType.speakYesNo );
    animation.setSelection( answer );
};