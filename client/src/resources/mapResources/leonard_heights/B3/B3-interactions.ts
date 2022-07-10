import { ConditionType } from '../../../../enumerables/ConditionTypeEnum';
import { InteractionType } from '../../../../enumerables/InteractionType';
import { SceneAnimationType } from '../../../../enumerables/SceneAnimationTypeEnum';
import { KEY_STORY_2, KEY_STORY_3 } from '../../../storyChapters';

export const GUY_WHO_LOST_HIS_KEYS = [
    [
        InteractionType.talk, true, KEY_STORY_3, "medium-text-blip.ogg",
        [ConditionType.interactionRegistered, KEY_STORY_2],
        [
            [[SceneAnimationType.speak, true, "Wow, did you find my keys?"]],
            [[SceneAnimationType.speak, true, "<3 Thanks bro you're my hero <3"]]
        ] 
    ],
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.interactionRegistered, KEY_STORY_3],
        [
            [[SceneAnimationType.speak, true, "Woah, it's the key finding dude!"]],
            [[SceneAnimationType.speak, true, "You're the best bro, my whole family loves you!"]]
        ]
    ],
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "I lost my keys at the parking lot."]],
            [[SceneAnimationType.speak, true, "I hope it wasn't found by those shady guys hanging out there..."]]
        ]    
    ]
];