import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { addEventToRegistry } from "../../registries/interactionRegistry";
import { checkForQuestTrigger } from "../../registries/questRegistry";
import type { InteractionModel } from "../../models/InteractionModel";
import { Interaction } from "../cutscenes/Interaction";
import { dismissActiveAction } from "./actionController";
import { clearActiveBubbles } from "./bubbleController";
import type { CellPosition } from "../../models/CellPositionModel";
import type { Sprite } from "../core/Sprite";
import { InteractionType } from "../../enumerables/InteractionType";
import { getActiveMapKey } from "../neighbourhoodModule";
import { switchMap } from "../../helpers/loadMapHelpers";
import { getAllActiveSprites, getPlayer } from "../modules/sprites/spriteGetter";
import { save } from "../mainController";

let activeCinematic: Interaction = null;
let activeMapAtStartOfCinematic: string = null;
let activeSpritesAtStartOfCinematic: Sprite[] = null;
let playerLocationAtStartOfCinematic: CellPosition = null;

export const saveActiveMapLocations = (): void => {
    const player = getPlayer();
    activeMapAtStartOfCinematic = getActiveMapKey();
    activeSpritesAtStartOfCinematic = [...getAllActiveSprites()];
    playerLocationAtStartOfCinematic = { column: player.column, row: player.row, direction: player.direction }
}
export const setActiveCinematic = ( interaction: InteractionModel, trigger: CinematicTrigger, options: any[] ): void => {
    if ( activeCinematic !== null ) return;
    saveActiveMapLocations();
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

    if ( activeMapAtStartOfCinematic !== getActiveMapKey() ) {
        switchMap( activeMapAtStartOfCinematic, InteractionType.cinematic_end, playerLocationAtStartOfCinematic )
    }

    if ( activeCinematic.trigger === CinematicTrigger.leave ) {
        switchMap( activeCinematic.args[0], activeCinematic.args[1] );
    }
    else if ( activeCinematic.trigger === CinematicTrigger.interaction ) {
        dismissActiveAction();
    }
    if ( activeCinematic.model.type === InteractionType.save && activeCinematic.registeredSelection === InteractionAnswer.yes ) {
        save();
    }
    clearActiveBubbles()
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