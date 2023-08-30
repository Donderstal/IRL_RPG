import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { addEventToRegistry } from "../../registries/interactionRegistry";
import { checkForQuestTrigger } from "../../registries/questRegistry";
import type { InteractionModel } from "../../models/InteractionModel";
import { Interaction } from "../cutscenes/Interaction";
import { clearActiveBubbles } from "./bubbleController";
import type { CellPosition } from "../../models/CellPositionModel";
import { InteractionType } from "../../enumerables/InteractionType";
import { getActiveMapKey } from "../neighbourhoodModule";
import { switchMap } from "../../helpers/loadMapHelpers";
import { getPlayer } from "../modules/sprites/spriteGetter";
import { openInGameMenu } from "../../stores";
import { GameMenuType } from "../../enumerables/GameMenuType";
import { PlayerMapEntry } from "../../enumerables/PlayerMapEntryEnum";
import { setPlayerStartForCinematicEnd } from "../map/playerLocationOnMapLoad";
import { updateGameControlState } from "../../state/stateSetter";
import { State } from "../../enumerables/StateEnum";

let activeCinematic: Interaction = null;
let activeMapAtStartOfCinematic: string = null;
let playerLocationAtStartOfCinematic: CellPosition = null;

export const saveActiveMapLocations = (): void => {
    const player = getPlayer();
    activeMapAtStartOfCinematic = getActiveMapKey();
    playerLocationAtStartOfCinematic = { column: player.column, row: player.row, direction: player.direction }
}
export const setActiveCinematic = ( interaction: InteractionModel, trigger: CinematicTrigger, options: any[] ): void => {
    if ( activeCinematic !== null ) return;
    saveActiveMapLocations();
    activeCinematic = new Interaction( interaction, trigger, options )
    updateGameControlState( State.cinematic );
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
        setPlayerStartForCinematicEnd( activeMapAtStartOfCinematic, playerLocationAtStartOfCinematic );
        switchMap( activeMapAtStartOfCinematic, PlayerMapEntry.cinematic_end )
    }

    if ( activeCinematic.trigger === CinematicTrigger.leave ) {
        switchMap( activeCinematic.args[0], activeCinematic.args[1], activeCinematic.args[2] );
    }
    if ( activeCinematic.model.type === InteractionType.save && activeCinematic.registeredSelection === InteractionAnswer.yes ) {
        openInGameMenu( GameMenuType.save );
    }
    if ( activeCinematic.model.type === InteractionType.prompt_log_in && activeCinematic.registeredSelection === InteractionAnswer.yes ) {
        openInGameMenu( GameMenuType.log_in );
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
        updateGameControlState( State.open_world );
    }
    else {
        activeCinematic.checkForScenePass();
    }
};
export const registerPlayerAnswer = ( answer: InteractionAnswer ): void => {
    const animation = activeCinematic.activeScene.getAnimationByType( SceneAnimationType.speakYesNo );
    animation.setSelection( answer );
};