const { DEFAULT, EVENT_TALK, SPEAK, EMOTE, SPEAK_YES_NO, ANIM, CREATE_SPRITE, MOVE, DELETE_SPRITE } = require('../game-data/conditionGlobals');
const { OUT_LEFT, FACING_DOWN, FACING_RIGHT } = require('../game-data/globals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_QUESTIONMARK } = require('../game-data/textboxGlobals');
const { getAction } = require('../helpers/actionDtoFactory');

const RANDOM_TALK_1 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "I can't believe the government took away my pet gorilla!", false]],
        [[EMOTE, EMOTE_SAD], [EMOTE, EMOTE_SURPRISED, "Player"]],
        [[SPEAK, "Now who's gonna hold me in their big hairy arms?", false]]
    ]]
]
const RANDOM_TALK_2 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Another splendid day in this beautiful city", false]],
        [[EMOTE, EMOTE_HEART], [EMOTE, EMOTE_HEART, "Player"]],
        [[SPEAK, "This is a much longer random text my man thank you for listening!", false]]
    ]]
]
const RANDOM_TALK_3 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "I shot the sherrif!", false]],
        [[EMOTE, EMOTE_SURPRISED, "Player"]],
        [[SPEAK, "But I didn't shoot the deputy...", false]],
        [[EMOTE, EMOTE_HAPPY, "Player"]]
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
                [[EMOTE, EMOTE_ANGRY, "Player"], [SPEAK, "Then why don't you piss off?", false]]
            ]
        ]],
    ]]
]
const RANDOM_TALK_5 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Let's dance!", false ]],
        [[ANIM, "TURN_SINGLE_CIRCLE"],[ANIM, "TURN_SINGLE_CIRCLE", "Player"]],
        [[SPEAK, "That's funky baby!!!", false ]],
        [[EMOTE, EMOTE_HEART, "Player"]]
    ]]
]
const RANDOM_TALK_6 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Do you know my friend Bob? He works at the fish stick factory.", false ]],
        [[EMOTE, EMOTE_QUESTIONMARK, "Player"],[CREATE_SPRITE, FACING_RIGHT, "fats.png", "My friend, Bob", OUT_LEFT, 10]],
        [[SPEAK, "Ironically, he's a vegetarian. Never ate a fish in his life!", false],[MOVE, "My friend, Bob", "Player"]],
        [[SPEAK, "I'm a walking contradiction bruh!", "My friend, Bob"]],
        [[SPEAK, "See you later fellas!", "My friend, Bob"],[EMOTE, EMOTE_HEART, "Player"],[EMOTE, EMOTE_HEART]],
        [[ANIM, "TURN_SINGLE_CIRCLE", "My friend, Bob"]],
        [[DELETE_SPRITE, "My friend, Bob"]],
    ]]
]
const LONG_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", false ]],
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