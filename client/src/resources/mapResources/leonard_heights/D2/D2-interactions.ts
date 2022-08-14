import { ConditionType } from '../../../../enumerables/ConditionTypeEnum';
import { InteractionType } from '../../../../enumerables/InteractionType';
import { SceneAnimationType } from '../../../../enumerables/SceneAnimationTypeEnum';
import { EMOTE_HEART } from '../../../../game-data/textboxGlobals';

export const LOOKING_FOR_APPARTMENT_LADY = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "This is my favorite part of the city.", null]],
            [[SceneAnimationType.speak, true, "Like, there's nice cocktail bars and yoga studios.", null]],
            [[SceneAnimationType.speak, true, "But all the poor people are still here to give it a authentic vibe, you know?", null]],
            [[SceneAnimationType.speak, true, "I'd love to move into the Gemini Towers, they're so luxurious!", null]],
            [[SceneAnimationType.speak, true, "I'm wondering if there are any overpriced studio appartments for rent there!", null]]
        ]
    ]    
]

export const WHOLESOME_LIFTER_D2 = [
    [
        InteractionType.talk, false, null, "medium-text-blip.ogg",
        [ConditionType.default, false],
        [
            [[SceneAnimationType.speak, true, "You know that a lot of people think that us buff guys are assholes?", null]],
            [[SceneAnimationType.speak, true, "Just shows that they've no idea what they're talking about!", null]],
            [[SceneAnimationType.speak, true, "I always visit my grandma, you know? Never skip a week!", null]], 
            [[SceneAnimationType.emote, true, EMOTE_HEART]]
        ] 
    ]    
]