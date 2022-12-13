import { CollectableType } from "../enumerables/CollectableTypeEnum"
import { CINSCRIPT_COLLECT_CAN, CINSCRIPT_COLLECT_COIN } from "./cinematicResources";
import { getInteractionNotRegisteredCondition } from "./conditionFactory";
import { getRegistryTalkInteraction } from "./interactionFactory";

export const getCollectibleActionDefinition = ( mapKey: string, type: CollectableType ) => {
    const key = getCollectibleRegistryKey( mapKey, type );
    const cinematic = getCollectibleCinematicScript( type );
    const condition = getCollectibleCondition( mapKey, type );
    return [getRegistryTalkInteraction( cinematic, condition, key )];
}

export const getCollectibleCondition = ( mapKey: string, type: CollectableType ) => {
    return getInteractionNotRegisteredCondition( getCollectibleRegistryKey( mapKey, type ) )
}

const getCollectibleRegistryKey = ( mapKey: string, type: CollectableType ) => {
    return `${type}_${mapKey}`;
}

const getCollectibleCinematicScript = ( type: CollectableType ) => {
    if ( type === CollectableType.can ) {
        return CINSCRIPT_COLLECT_CAN
    }
    if ( type === CollectableType.coin ) {
        return CINSCRIPT_COLLECT_COIN
	}
}