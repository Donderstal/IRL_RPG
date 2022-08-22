import { ConditionType } from "../../../../enumerables/ConditionTypeEnum";
import { InteractionType } from "../../../../enumerables/InteractionType";
import { SceneAnimationType } from "../../../../enumerables/SceneAnimationTypeEnum";

export const WHOLESOME_LIFTER_B4 = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "Just another day lifting and being handsome!", null]],
            [[SceneAnimationType.speak, true, "If you need some dumbbells I can't help ya though...", null]],
            [[SceneAnimationType.speak, true, "I only hand them out to my bros, or bros of my bros!", null]]
        ]
    ]
]