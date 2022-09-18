import { KEY_STORY_2 } from '../../../storyChapters';
import { PLAYER_NAME } from '../../../../game-data/interactionGlobals';
import { InteractionType } from '../../../../enumerables/InteractionType';
import { ConditionType } from '../../../../enumerables/ConditionTypeEnum';
import { SceneAnimationType } from '../../../../enumerables/SceneAnimationTypeEnum';

export const LOST_KEYS_INTERACTION = [
    [
        InteractionType.talk, true, KEY_STORY_2, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "Looks like someone lost their keys here...", PLAYER_NAME]],
            [[SceneAnimationType.speak, true, "I better pick 'em just in case", PLAYER_NAME]],
            [[SceneAnimationType.deleteSprite, true, null, "misc/random5.wav"]]
        ] 
    ]
]