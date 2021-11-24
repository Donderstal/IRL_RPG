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
const NAME_BOB = "My friend, Bob";
const RANDOM_TALK_6 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Do you know my friend Bob? He works at the fish stick factory.", false, PLAYER_NAME ]],
        [[EMOTE, EMOTE_QUESTIONMARK, PLAYER_NAME],[CREATE_SPRITE, FACING_RIGHT, "fats.png", NAME_BOB, OUT_LEFT, 10]],
        [[SPEAK, "Ironically, he's a vegetarian. Never ate a fish in his life!", false, PLAYER_NAME],[MOVE, NAME_BOB, PLAYER_NAME]],
        [[SPEAK, "I'm a walking contradiction bruh!", NAME_BOB, PLAYER_NAME]],
        [[SPEAK, "See you later fellas!", NAME_BOB, PLAYER_NAME],[EMOTE, EMOTE_HEART, PLAYER_NAME],[EMOTE, EMOTE_HEART]],
        [[ANIM, "TURN_SINGLE_CIRCLE", NAME_BOB]],
        [[DELETE_SPRITE, NAME_BOB]],
    ]]
]
const LONG_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", false, PLAYER_NAME]],
    ]]
]

module.exports = { 
    RANDOM_TALK_1,
    RANDOM_TALK_2,
    RANDOM_TALK_3,
    RANDOM_TALK_4,
    RANDOM_TALK_5,
    RANDOM_TALK_6,
    LONG_TALK_4
}