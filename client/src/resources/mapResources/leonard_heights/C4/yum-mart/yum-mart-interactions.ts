import { ConditionType } from "../../../../../enumerables/ConditionTypeEnum";
import { InteractionType } from "../../../../../enumerables/InteractionType";
import { SceneAnimationType } from "../../../../../enumerables/SceneAnimationTypeEnum";
import { EMOTE_HEART } from "../../../../../game-data/textboxGlobals";

export const YUM_MART_OFFICE_GUY = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "I hate my wife...", null]],
            [[SceneAnimationType.speak, true, "But I'm loving these profits!", null]],
            [[SceneAnimationType.animation, true, "TURN_SINGLE_CIRCLE", null]],
            [[SceneAnimationType.emote, true, EMOTE_HEART]]
        ]
    ]
]