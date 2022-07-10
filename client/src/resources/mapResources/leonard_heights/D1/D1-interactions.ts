import { ConditionType } from "../../../../enumerables/ConditionTypeEnum"
import { InteractionType } from "../../../../enumerables/InteractionType"
import { SceneAnimationType } from "../../../../enumerables/SceneAnimationTypeEnum"

export const FRIENDLY_CHAD = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [ [
            [[SceneAnimationType.speak, true, "My bro's having some rough feels man."]],
            [[SceneAnimationType.speak, true, "We'd really appreciate you helping a bro out."]]
        ] ]
    ]
]

export const WHOLESOME_LIFTER = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [ [
            [[SceneAnimationType.speak, true, "What could be better than pumping iron with your bros?"]],
        ] ]
    ]
]