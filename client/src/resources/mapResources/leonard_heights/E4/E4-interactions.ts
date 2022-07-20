import { ConditionType } from "../../../../enumerables/ConditionTypeEnum";
import { InteractionType } from "../../../../enumerables/InteractionType";
import { SceneAnimationType } from "../../../../enumerables/SceneAnimationTypeEnum";

export const WHOLESOME_LIFTER_E4 = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "Lifting is the best bro!"]],
            [[SceneAnimationType.speak, true, "Really increases your self-esteem too, you should try it."]]
        ]
    ]
]