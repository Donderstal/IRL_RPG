const { DEFAULT, EVENT_TALK, SPEAK, EMOTE, SPEAK_YES_NO, ANIM, CREATE_SPRITE, MOVE, DELETE_SPRITE } = require('../game-data/conditionGlobals');
const { OUT_LEFT, FACING_RIGHT } = require('../game-data/globals');
const { PLAYER_NAME } = require('../game-data/interactionGlobals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_QUESTIONMARK } = require('../game-data/textboxGlobals');

const RANDOM_TALK_1 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "I can't believe the government took away my pet gorilla!", false, PLAYER_NAME]],
        [[EMOTE, EMOTE_SAD], [EMOTE, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, "Now who's gonna hold me in their big hairy arms?", false, PLAYER_NAME]]
    ]]
]
const RANDOM_TALK_2 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Another splendid day in this beautiful city", false, PLAYER_NAME]],
        [[EMOTE, EMOTE_HEART], [EMOTE, EMOTE_HEART, PLAYER_NAME]],
        [[SPEAK, "This is a much longer random text my man thank you for listening!", false, PLAYER_NAME]]
    ]]
]
const RANDOM_TALK_3 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "I shot the sherrif!", false, PLAYER_NAME]],
        [[EMOTE, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, "But I didn't shoot the deputy...", false, PLAYER_NAME]],
        [[EMOTE, EMOTE_HAPPY, PLAYER_NAME]]
    ]]
]
const RANDOM_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK_YES_NO, "Do you like bothering people in the street, moron?", 
            [
                [[EMOTE, EMOTE_ANGRY]],
                [[SPEAK, "I hope your parents are proud of you."]]
            ],
            [
                [[EMOTE, EMOTE_ANGRY, PLAYER_NAME], [SPEAK, "Then why don't you piss off?", false]]
            ],
            false, PLAYER_NAME
        ]],
    ]]
]
const RANDOM_TALK_5 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Let's dance!", false, PLAYER_NAME]],
        [[ANIM, "TURN_SINGLE_CIRCLE"],[ANIM, "TURN_SINGLE_CIRCLE", PLAYER_NAME]],
        [[ANIM, "POWER_UP_RIGHT"],[ANIM, "POWER_UP_RIGHT", PLAYER_NAME]],
        [[ANIM, "LEFT_AND_RIGHT_STEP"],[ANIM, "LEFT_AND_RIGHT_STEP", PLAYER_NAME]],
        [[SPEAK, "That's funky baby!!!", false, PLAYER_NAME]],
        [[EMOTE, EMOTE_HEART, PLAYER_NAME]]
    ]]
]

const LONG_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", false, PLAYER_NAME]],
    ]]
]

const COLLECTABLE_ACTION_COIN = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[EMOTE, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, "It's a rare coin!", PLAYER_NAME]],
        [[SPEAK, "Crazy that people in the past used these things to pay for stuff...", PLAYER_NAME]],
        [[SPEAK, "I'll add this one to my collection!", PLAYER_NAME]],
        [[DELETE_SPRITE, false, "misc/random5.wav"]]
    ]]
]

const COLLECTABLE_ACTION_JUICE_CAN = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[EMOTE, EMOTE_SURPRISED, PLAYER_NAME]],
        [[SPEAK, "It's a rare Diet Betes© can!", PLAYER_NAME]],
        [[SPEAK, "Rumor has it that people used to drink plain water before Diet Betes© was invented.", PLAYER_NAME]],
        [[SPEAK, "I'll add this one to my collection!", PLAYER_NAME]],
        [[DELETE_SPRITE, false, "misc/random5.wav"]]
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