import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import type { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import globals from "../../game-data/globals";
import { addEventToRegistry } from "../../helpers/interactionRegistry";
import { checkForQuestTrigger } from "../../helpers/questRegistry";
import type { InteractionModel } from "../../models/InteractionModel";
import { Interaction } from "../cutscenes/Interaction";
import { dismissActiveAction } from "./actionController";

let activeCinematic: Interaction = null;

export const setActiveCinematic = ( interaction: InteractionModel, trigger: CinematicTrigger, options: any[] ): void => {
    if ( activeCinematic !== null ) return;
    globals.GAME.saveActiveMap();
    activeCinematic = new Interaction( interaction, trigger, options )
};
export const cinematicIsActive = (): boolean => {
    return activeCinematic !== null;
};
export const dismissActiveCinematic = (): void => {
    if ( activeCinematic.model.shouldBeRegistered ) {
        if ( activeCinematic.registeredSelection !== null ) {
            addEventToRegistry( activeCinematic.model.registryKey, activeCinematic.registeredSelection )
            checkForQuestTrigger( activeCinematic.model.registryKey );
        }
        else {
            addEventToRegistry( activeCinematic.model.registryKey );
        }
        checkForQuestTrigger( activeCinematic.model.registryKey );
    }

    globals.GAME.handleCinematicEnd();

    if ( activeCinematic.trigger === CinematicTrigger.leave ) {
        globals.GAME.switchMap( activeCinematic.args[0], activeCinematic.args[1] );
    }
    else if ( activeCinematic.trigger === CinematicTrigger.interaction ) {
        dismissActiveAction();
    }

    activeCinematic = null;
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