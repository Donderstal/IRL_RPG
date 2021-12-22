const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../game-data/globals")
const { 
    ON_ENTER, ON_LEAVE, ON_POSITION, EVENT_HAS_FIRED
}  = require('../game-data/conditionGlobals')
const { DEFAULT, EVENT_TALK, SPEAK, EMOTE, SPEAK_YES_NO, ANIM, CREATE_SPRITE, FADE_IN, MOVE, DELETE_SPRITE } = require('../game-data/conditionGlobals');
const { PLAYER_NAME } = require('../game-data/interactionGlobals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_QUESTIONMARK } = require('../game-data/textboxGlobals');

const KEY_STORY_1 = "KEY_STORY_EVENT_1";
const KEY_STORY_2 = "KEY_STORY_EVENT_2";
const KEY_STORY_3 = "KEY_STORY_EVENT_3"

const STORY_EVENTS = [
    {
        mapName: "lennart-neighbourhood/D2",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[FADE_IN]],
                [[SPEAK, "Another day in the big city!", PLAYER_NAME]],
                [[EMOTE, EMOTE_HAPPY, PLAYER_NAME]],
                [[SPEAK, "Another day at the Yum Mart...", PLAYER_NAME]],
                [[EMOTE, EMOTE_SAD, PLAYER_NAME]],
                [[SPEAK, "I better get to work!", PLAYER_NAME]]
            ]
        ]
    },
    ////////////////////
    {
        mapName: "lennart-neighbourhood/D4",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[SPEAK, "There's just something off about this hotel...", PLAYER_NAME]]
            ]   
        ]
    },
    //////////////////////////
    {
        mapName: "lennart-neighbourhood/D4",
        trigger: ON_LEAVE,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, KEY_STORY_1, "voice-1.mp3", [ 
            [[SPEAK, "Did I just see a ghost?", PLAYER_NAME]]
        ]
    ]
    },
    //////////////////////////
    {
        mapName: "lennart-neighbourhood/C4",
        trigger: ON_POSITION,
        position: {
            "col": 20,
            "direction": FACING_LEFT
        },
        condition: [ EVENT_HAS_FIRED, KEY_STORY_1 ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
            [[SPEAK, "Did I really see a ghost?", PLAYER_NAME]],
            [[SPEAK, "It can't be real...", PLAYER_NAME]]
        ]]
    } 
]

module.exports = {
    STORY_EVENTS
}