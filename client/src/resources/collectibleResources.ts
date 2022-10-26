import { CollectableType } from "../enumerables/CollectableTypeEnum"
import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { InteractionType } from "../enumerables/InteractionType";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import { PLAYER_NAME } from "../game-data/interactionGlobals";
import { EMOTE_SURPRISED } from "../game-data/textboxGlobals";

export const getCollectibleActionDefinition = ( mapKey: string, type: CollectableType ) => {
    const key = getCollectibleRegistryKey( mapKey, type );
    return [[
        InteractionType.talk, true, key, "medium-text-blip.ogg",
        getCollectibleCondition( mapKey, type ),
        getCollectibleInteractionScript( type )
    ]]
}

export const getCollectibleCondition = ( mapKey: string, type: CollectableType ) => {
    return [ConditionType.interactionNotRegistered, getCollectibleRegistryKey( mapKey, type )]
}

const getCollectibleRegistryKey = ( mapKey: string, type: CollectableType ) => {
    return `${type}_${mapKey}`;
}

const getCollectibleInteractionScript = ( type: CollectableType ) => {
    if ( type === CollectableType.can ) {
        return COLLECTABLE_ACTION_JUICE_CAN;
    }
    if ( type === CollectableType.coin ) {
        return COLLECTABLE_ACTION_COIN;
	}
}

const COLLECTABLE_ACTION_COIN = [
    [[SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
    [[SceneAnimationType.speak, true, "It's a rare {R}coin!", PLAYER_NAME]],
    [[SceneAnimationType.speak, true, "Crazy that people in the past used these things to pay for stuff...", PLAYER_NAME]],
    [[SceneAnimationType.speak, true, "I'll add this one to my collection!", PLAYER_NAME]],
    [[SceneAnimationType.deleteSprite, true, null, "misc/random5.wav"]]
]

const COLLECTABLE_ACTION_JUICE_CAN = [
    [[SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
    [[SceneAnimationType.speak, true, "It's a rare {R}Diet {R}Betes© can!", PLAYER_NAME]],
    [[SceneAnimationType.speak, true, "Rumor has it that people used to drink plain water before {R}Diet {R}Betes© was invented.", PLAYER_NAME]],
    [[SceneAnimationType.speak, true, "I'll add this one to my collection!", PLAYER_NAME]],
    [[SceneAnimationType.deleteSprite, true, null, "misc/random5.wav"]]
]

console.log( getCollectibleActionDefinition("yo", CollectableType.coin))