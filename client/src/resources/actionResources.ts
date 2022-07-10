import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { InteractionType } from "../enumerables/InteractionType";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";

import { PLAYER_NAME } from '../game-data/interactionGlobals';
import { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY } from '../game-data/textboxGlobals';

export const RANDOM_TALK_1 = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.speak, true, "I can't believe the government took away my pet gorilla!", false, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_SAD], [SceneAnimationType.emote, false, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "Now who's gonna hold me in their big hairy arms?", false, PLAYER_NAME]]
    ]
]
export const RANDOM_TALK_2 = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.speak, true, "Another splendid day in this beautiful city", false, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_HEART], [SceneAnimationType.emote, false, EMOTE_HEART, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "This is a much longer random text my man thank you for listening!", false, PLAYER_NAME]]
    ]
]
export const RANDOM_TALK_3 = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [ 
        [[SceneAnimationType.speak, true, "I shot the sherrif!", false, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "But I didn't shoot the deputy...", false, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_HAPPY, PLAYER_NAME]]
    ]
]
export const RANDOM_TALK_4 = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.speakYesNo, true, "Do you like bothering people in the street, moron?", 
            [
                [[SceneAnimationType.emote, true, EMOTE_ANGRY]],
                [[SceneAnimationType.speak, true, "I hope your parents are proud of you."]]
            ],
            [
                [[SceneAnimationType.emote, false, EMOTE_ANGRY, PLAYER_NAME], [SceneAnimationType.speak, true, "Then why don't you piss off?", false]]
            ],
            false, PLAYER_NAME
        ]],
    ]
]

export const RANDOM_TALK_5 = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.speak, true, "Let's dance!", false, PLAYER_NAME]],
        [[SceneAnimationType.animation, true, "TURN_SINGLE_CIRCLE"],[SceneAnimationType.animation, true, "TURN_SINGLE_CIRCLE", PLAYER_NAME]],
        [[SceneAnimationType.animation, true, "POWER_UP_RIGHT"],[SceneAnimationType.animation, true, "POWER_UP_RIGHT", PLAYER_NAME]],
        [[SceneAnimationType.animation, true, "LEFT_AND_RIGHT_STEP"],[SceneAnimationType.animation, true, "LEFT_AND_RIGHT_STEP", PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "That's funky baby!!!", false, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_HEART, PLAYER_NAME]]
    ]
]

export const LONG_TALK_4 = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.speak, true, "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", false, PLAYER_NAME]],
    ]
]

export const COLLECTABLE_ACTION_COIN = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "It's a rare {R}coin!", PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "Crazy that people in the past used these things to pay for stuff...", PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "I'll add this one to my collection!", PLAYER_NAME]],
        [[SceneAnimationType.deleteSprite, true, false, "misc/random5.wav"]]
    ]
]

export const COLLECTABLE_ACTION_JUICE_CAN = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "It's a rare {R}Diet {R}Betes© can!", PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "Rumor has it that people used to drink plain water before {R}Diet {R}Betes© was invented.", PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "I'll add this one to my collection!", PLAYER_NAME]],
        [[SceneAnimationType.deleteSprite, true, false, "misc/random5.wav"]]
    ]
]