import { ConditionType } from "../../../../../enumerables/ConditionTypeEnum"
import { InteractionType } from "../../../../../enumerables/InteractionType"
import { SceneAnimationType } from "../../../../../enumerables/SceneAnimationTypeEnum"
import { PLAYER_NAME } from "../../../../../game-data/interactionGlobals"

export const ROBOT_RECEPTIONIST = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "Greetings sir, welcome to the Two Towers Hotel!.", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "I regret to tell you we are fully booked today.", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "We're hosting many prominent international businessmen.", null, PLAYER_NAME]]
        ]
    ]
]

export const ROBOT_COOK = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "What am I supposed to cook? I don't even eat.", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "I was thinking cupcakes in sweet sour sauce.", null, PLAYER_NAME]]
        ]
    ]
]

export const MONKEY_COOK = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "Tonight the chefs special is baked banana with banana bread.", null, PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "For dessert we've got a lovely fresh banana split!", null, PLAYER_NAME]]
        ]
    ]
]