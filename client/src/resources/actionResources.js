const { DEFAULT, EVENT_TALK, SPEAK, EMOTE, SPEAK_YES_NO } = require('../game-data/conditionGlobals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY } = require('../game-data/textboxGlobals');
const { getAction } = require('../helpers/actionDtoFactory');

const RANDOM_TALK_1 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [SPEAK, "I can't believe the government took away my pet gorilla!", false],
        [EMOTE, EMOTE_SAD],
        [SPEAK, "Now who's gonna hold me in their big hairy arms?", false]
    ]]
]
const RANDOM_TALK_2 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [SPEAK, "Another splendid day in this beautiful city", false],
        [EMOTE, EMOTE_HEART],
        [SPEAK, "This is a much longer random text my man thank you for listening!", false]
    ]]
]
const RANDOM_TALK_3 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [SPEAK, "I shot the sherrif!", false],
        [EMOTE, EMOTE_SURPRISED, "Player"],
        [SPEAK, "But I didn't shoot the deputy...", false],
        [EMOTE, EMOTE_HAPPY, "Player"]
    ]]
]
const RANDOM_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [SPEAK_YES_NO, "Do you like bothering people in the street, moron?", 
            [
                [EMOTE, EMOTE_ANGRY],
                [SPEAK, "I hope your parents are proud of you."]
            ],
            [
                [SPEAK, "Then why don't you piss off?", false]
            ]
        ],
    ]]
]
const LONG_TALK_4 = [
    [ DEFAULT, false ],
    [ EVENT_TALK, false, "voice-1.mp3", [ 
        [SPEAK, "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", false ],
    ]]
]

module.exports = { 
    RANDOM_TALK_1,
    RANDOM_TALK_2,
    RANDOM_TALK_3,
    RANDOM_TALK_4,
    LONG_TALK_4
}