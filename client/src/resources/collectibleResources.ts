import type { CollectableType } from "../enumerables/CollectableTypeEnum";
import { getInteractionNotRegisteredCondition } from "./../factories/conditionFactory";

export const getCollectibleCondition = ( mapKey: string, type: CollectableType ) => {
    return getInteractionNotRegisteredCondition( getCollectibleRegistryKey( mapKey, type ) )
}

const getCollectibleRegistryKey = ( mapKey: string, type: CollectableType ) => {
    return `${type}_${mapKey}`;
}