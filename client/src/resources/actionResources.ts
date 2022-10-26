import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { InteractionType } from "../enumerables/InteractionType";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import { ANIM_BACK_AND_FORTH_POSITIONAL, ANIM_POWER_UP, ANIM_TURN_CIRCLE_POSITIONAL } from "../game-data/animationGlobals";

import { PLAYER_NAME } from '../game-data/interactionGlobals';
import { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY } from '../game-data/textboxGlobals';

export const DEFAULT_TALKING_INTERACTION = [
    InteractionType.talk, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
]

export const RANDOM_TALK_1 = [[
    ...DEFAULT_TALKING_INTERACTION,
    [
        [[SceneAnimationType.speak, true, "I can't believe the government took away my pet gorilla!", null, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_SAD], [SceneAnimationType.emote, false, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "Now who's gonna hold me in their big hairy arms?", null, PLAYER_NAME]]
    ]
]]
export const RANDOM_TALK_2 = [[
    ...DEFAULT_TALKING_INTERACTION,
    [
        [[SceneAnimationType.speak, true, "Another splendid day in this beautiful city", null, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_HEART], [SceneAnimationType.emote, false, EMOTE_HEART, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "This is a much longer random text my man thank you for listening!", null, PLAYER_NAME]]
    ]
]]
export const RANDOM_TALK_3 = [[
    ...DEFAULT_TALKING_INTERACTION,
    [ 
        [[SceneAnimationType.speak, true, "I shot the sherrif!", null, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "But I didn't shoot the deputy...", null, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_HAPPY, PLAYER_NAME]]
    ]
]]
export const RANDOM_TALK_4 = [[
    ...DEFAULT_TALKING_INTERACTION,
    [
        [[SceneAnimationType.speakYesNo, true, "Do you like bothering people in the street, moron?", 
            [
                [[SceneAnimationType.emote, true, EMOTE_ANGRY]],
                [[SceneAnimationType.speak, true, "I hope your parents are proud of you.", null]]
            ],
            [
                [[SceneAnimationType.emote, false, EMOTE_ANGRY, PLAYER_NAME], [SceneAnimationType.speak, true, "Then why don't you piss off?", null]]
            ],
            null, PLAYER_NAME
        ]],
    ]
]]

export const RANDOM_TALK_5 = [[
    ...DEFAULT_TALKING_INTERACTION,
    [
        [[SceneAnimationType.speak, true, "Let's dance!", null, PLAYER_NAME]],
        [[SceneAnimationType.animation, true, ANIM_TURN_CIRCLE_POSITIONAL, null], [SceneAnimationType.animation, true, ANIM_TURN_CIRCLE_POSITIONAL, PLAYER_NAME]],
        [[SceneAnimationType.animation, true, ANIM_POWER_UP, null],[SceneAnimationType.animation, true, ANIM_POWER_UP, PLAYER_NAME]],
        [[SceneAnimationType.animation, true, ANIM_BACK_AND_FORTH_POSITIONAL, null], [SceneAnimationType.animation, true, ANIM_BACK_AND_FORTH_POSITIONAL, PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "That's funky baby!!!", null, PLAYER_NAME]],
        [[SceneAnimationType.emote, true, EMOTE_HEART, PLAYER_NAME]]
    ]
]]

export const LONG_TALK_4 = [[
    ...DEFAULT_TALKING_INTERACTION,
    [
        [[SceneAnimationType.speak, true, "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", null, PLAYER_NAME]],
    ]
]]

export const lockedDoorEvent = [[
    ...DEFAULT_TALKING_INTERACTION,
    [
        [[SceneAnimationType.speak, true, "This door is locked!", PLAYER_NAME]],
        [[SceneAnimationType.speak, true, "I need to find some way to open it...", PLAYER_NAME]]
    ]
]]

export const unlockDoorEvent = [[
    ...DEFAULT_TALKING_INTERACTION,
    [
        [[SceneAnimationType.speak, true, "Let's unlock this door now...", PLAYER_NAME, false, "misc/Heavy-Door-Lock--Unlocking.mp3"]]
    ]
]]

console.log( RANDOM_TALK_5 );