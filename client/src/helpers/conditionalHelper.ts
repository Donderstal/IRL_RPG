import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { InteractionAnswer } from "../enumerables/InteractionAnswer";

import { isInRegistry, isInRegistryWithValue } from '../registries/interactionRegistry';
import globals from '../game-data/globals';

export const conditionIsTrue = ( conditionType: ConditionType, valueToCheck: string ): boolean => {
    let returnBoolean = false; 

    switch ( conditionType ) {
        case ConditionType.ownsItem:
            returnBoolean = globals.GAME.PLAYER_INVENTORY.getItemStackById( valueToCheck ) !== undefined;
            break;
        case ConditionType.doesNotOwnItem:
            returnBoolean = globals.GAME.PLAYER_INVENTORY.getItemStackById( valueToCheck ) === undefined;
            break;
        case ConditionType.interactionRegistered:
            returnBoolean = isInRegistry( valueToCheck );
            break;
        case ConditionType.interactionNotRegistered:
            returnBoolean = !isInRegistry( valueToCheck );
            break;
        case ConditionType.yesRegisteredInInteraction:
            returnBoolean = isInRegistryWithValue( valueToCheck, InteractionAnswer.yes );
            break;
        case ConditionType.noRegisteredInInteraction:
            returnBoolean = isInRegistryWithValue( valueToCheck, InteractionAnswer.no );
            break;
        case ConditionType.default:
            returnBoolean = true;
            break;
    }

    return returnBoolean;
}