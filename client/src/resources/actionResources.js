const { DEFAULT, EVENT_TALK, SPEAK, EMOTE, SPEAK_YES_NO, ANIM, CREATE_SPRITE, MOVE, DELETE_SPRITE } = require('../game-data/conditionGlobals');
const { OUT_LEFT, FACING_RIGHT } = require('../game-data/globals');
const { PLAYER_NAME } = require('../game-data/interactionGlobals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_QUESTIONMARK } = require('../game-data/textboxGlobals');

const RANDOM_TALK_1 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[SPEAK, true, "I can't believe the government took away my pet gorilla!", false, PLAYER_NAME]],
        [[EMOTE, true, EMOTE_SAD], [EMOTE, false, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, true, "Now who's gonna hold me in their big hairy arms?", false, PLAYER_NAME]]
    ]]
]
const RANDOM_TALK_2 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[SPEAK, true, "Another splendid day in this beautiful city", false, PLAYER_NAME]],
        [[EMOTE, true, EMOTE_HEART], [EMOTE, false, EMOTE_HEART, PLAYER_NAME]],
        [[SPEAK, true, "This is a much longer random text my man thank you for listening!", false, PLAYER_NAME]]
    ]]
]
const RANDOM_TALK_3 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[SPEAK, true, "I shot the sherrif!", false, PLAYER_NAME]],
        [[EMOTE, true, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, true, "But I didn't shoot the deputy...", false, PLAYER_NAME]],
        [[EMOTE, true, EMOTE_HAPPY, PLAYER_NAME]]
    ]]
]
const RANDOM_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[SPEAK_YES_NO, true, "Do you like bothering people in the street, moron?", 
            [
                [[EMOTE, true, EMOTE_ANGRY]],
                [[SPEAK, true, "I hope your parents are proud of you."]]
            ],
            [
                [[EMOTE, false, EMOTE_ANGRY, PLAYER_NAME], [SPEAK, true, "Then why don't you piss off?", false]]
            ],
            false, PLAYER_NAME
        ]],
    ]]
]
const RANDOM_TALK_5 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[SPEAK, true, "Let's dance!", false, PLAYER_NAME]],
        [[ANIM, true, "TURN_SINGLE_CIRCLE"],[ANIM, true, "TURN_SINGLE_CIRCLE", PLAYER_NAME]],
        [[ANIM, true, "POWER_UP_RIGHT"],[ANIM, true, "POWER_UP_RIGHT", PLAYER_NAME]],
        [[ANIM, true, "LEFT_AND_RIGHT_STEP"],[ANIM, true, "LEFT_AND_RIGHT_STEP", PLAYER_NAME]],
        [[SPEAK, true, "That's funky baby!!!", false, PLAYER_NAME]],
        [[EMOTE, true, EMOTE_HEART, PLAYER_NAME]]
    ]]
]

const LONG_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[SPEAK, true, "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", false, PLAYER_NAME]],
    ]]
]

const COLLECTABLE_ACTION_COIN = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[EMOTE, true, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, true, "It's a rare {R}coin!", PLAYER_NAME]],
        [[SPEAK, true, "Crazy that people in the past used these things to pay for stuff...", PLAYER_NAME]],
        [[SPEAK, true, "I'll add this one to my collection!", PLAYER_NAME]],
        [[DELETE_SPRITE, true, false, "misc/random5.wav"]]
    ]]
]

const COLLECTABLE_ACTION_JUICE_CAN = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
        [[EMOTE, true, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, true, "It's a rare {R}Diet {R}Betes© can!", PLAYER_NAME]],
        [[SPEAK, true, "Rumor has it that people used to drink plain water before {R}Diet {R}Betes© was invented.", PLAYER_NAME]],
        [[SPEAK, true, "I'll add this one to my collection!", PLAYER_NAME]],
        [[DELETE_SPRITE, true, false, "misc/random5.wav"]]
    ]]
]

module.exports = { 
    RANDOM_TALK_1,
    RANDOM_TALK_2,
    RANDOM_TALK_3,
    RANDOM_TALK_4,
    RANDOM_TALK_5,
    LONG_TALK_4,
    LONG_TALK_4,
    COLLECTABLE_ACTION_COIN,
    COLLECTABLE_ACTION_JUICE_CAN
}