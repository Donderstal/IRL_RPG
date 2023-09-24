import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { InteractionAnswer } from "../enumerables/InteractionAnswer";
import { isInInteractionRegistry, isInRegistryWithValue } from '../registries/interactionRegistry';
import { getInventory } from "../game/party/partyController";
import { loggedIn } from "../stores";
import { get } from "svelte/store";

export const conditionIsTrue = ( conditionType: ConditionType, valueToCheck: string = null ): boolean => {
    switch ( conditionType ) {
        case ConditionType.ownsItem:
            return getInventory().getItemStackById( valueToCheck ) !== undefined;
        case ConditionType.doesNotOwnItem:
            return getInventory().getItemStackById( valueToCheck ) === undefined;
        case ConditionType.interactionRegistered:
            return isInInteractionRegistry( valueToCheck );
        case ConditionType.interactionNotRegistered:
            return !isInInteractionRegistry( valueToCheck );
        case ConditionType.yesRegisteredInInteraction:
            return isInRegistryWithValue( valueToCheck, InteractionAnswer.yes );
        case ConditionType.noRegisteredInInteraction:
            return isInRegistryWithValue( valueToCheck, InteractionAnswer.no );
        case ConditionType.notLoggedIn:
            return !get( loggedIn );
        case ConditionType.loggedIn:
            return get( loggedIn );
        case ConditionType.default:
            return true;
    }
}