import { ConditionType } from "../../../../../enumerables/ConditionTypeEnum";
import { InteractionType } from "../../../../../enumerables/InteractionType";
import { SceneAnimationType } from "../../../../../enumerables/SceneAnimationTypeEnum";
import { UNLOCK_DOOR_TEST, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_3, PLAYER_NAME } from "../../../../../game-data/interactionGlobals";
import { EMOTE_ANGRY } from "../../../../../game-data/textboxGlobals";

export const KEY_GUY = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.interactionRegistered, UNLOCK_DOOR_TEST],
        [
            [[SceneAnimationType.speak, true, "Didn't I give you a key already", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "There's still no reason to go outside.", null, PLAYER_NAME]]
        ]
    ],
    [
        InteractionType.talk, false, UNLOCK_DOOR_TEST, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "I guess you want to go outside, right?", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "I've locked the door, just to be sure...", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "But here's the key. Please lock it again when you go out!!", null, PLAYER_NAME]]
        ]
    ]
]

export const BODYGUARD = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "I'm just here for the safety of my tenants.", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "Some maniac left the door unlocked.", null, PLAYER_NAME]]
        ]
    ]
]

export const NEIGHBOUR = [
    [
        InteractionType.talk, true, LOGGABLE_INTERACTION_3, "medium-text-blip.ogg",
        [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_2],
        [
            [[SceneAnimationType.speak, true, "Woah dude you did it!", null]],
            [[SceneAnimationType.speak, true, "I'm the {R}Mob {R}Boss.", null]]
        ]
    ],
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "Just hanging out in my appartment...", null]]
        ]
    ]
]

export const WAITING_BUSINESSMAN = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "For some reason somebody locked the main door...", null, PLAYER_NAME]],
            [[SceneAnimationType.emote, true, EMOTE_ANGRY, null]],
            [[SceneAnimationType.speak, true, "I don't have time for this! I've got important meetings to attend!!", null, PLAYER_NAME]]
        ]
    ]
]