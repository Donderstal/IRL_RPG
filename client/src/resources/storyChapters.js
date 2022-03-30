const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN, OUT_UP } = require("../game-data/globals")
const { 
    ON_ENTER, ON_LEAVE, ON_POSITION, EVENT_HAS_FIRED, CREATE_CAR, MOVE_CAR
}  = require('../game-data/conditionGlobals')
const { 
    EMOTE, DEFAULT, EVENT_TALK, SPEAK, CREATE_SPRITE, MOVE, CAMERA_MOVE_TO_SPRITE,
    SPEAK_YES_NO, ANIM, FADE_IN, DELETE_SPRITE
 } = require('../game-data/conditionGlobals');
const { PLAYER_NAME } = require('../game-data/interactionGlobals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_QUESTIONMARK } = require('../game-data/textboxGlobals');

const KEY_STORY_1 = "KEY_STORY_EVENT_1";
const KEY_STORY_2 = "KEY_STORY_EVENT_2";
const KEY_STORY_3 = "KEY_STORY_EVENT_3"

const STORY_EVENTS = [
    {
        mapName: "test/B4",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[SPEAK, "Another day in the big city!", PLAYER_NAME]],
                [[MOVE, PLAYER_NAME, { 'row': 5, 'col': 6}]],
                [[SPEAK, "Another day at the Yum Mart...", PLAYER_NAME]],
                [[CREATE_SPRITE, FACING_LEFT ,"fats.png", "BOB", 10, 10]],
                [[CAMERA_MOVE_TO_SPRITE, "BOB", false]],
                [[SPEAK, "I hate the Yum Mart too!", "BOB"]],
                [[MOVE, "BOB", { 'row': 6, 'col': 6}]],
                [[CAMERA_MOVE_TO_SPRITE, PLAYER_NAME, false]],
                [[EMOTE, EMOTE_HEART, PLAYER_NAME]],
                [[MOVE, PLAYER_NAME, { 'row': 2, 'col': 2}]],
                [[CREATE_CAR, "bus.png", "CIN_CAR_BUS", "CIN_ROAD_1"]],
                [[CAMERA_MOVE_TO_SPRITE, "CIN_CAR_BUS", false], [MOVE_CAR, null, OUT_UP, "CIN_CAR_BUS", FACING_UP]],
                [[CAMERA_MOVE_TO_SPRITE, PLAYER_NAME, true]],
                [[SPEAK, "That's all, folks!", PLAYER_NAME]],
            ]
        ]
    },
    ///////////////
    {
        mapName: "leonard_heights/Newtown-appartment-3",
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
        mapName: "leonard_heights/E3",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[SPEAK, "I hate the hotel on this street, it's always full of trashy tourists", PLAYER_NAME]]
            ]   
        ]
    },
    //////////////////////////
    {
        mapName: "leonard_heights/Newtown-appartment-4",
        trigger: ON_POSITION,
        position: {
            "col": 3,
            "direction": FACING_RIGHT
        },
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, KEY_STORY_1, "voice-1.mp3", [ 
            [[SPEAK, "There's just something creepy about an empty appartment...", PLAYER_NAME]]
        ]
    ]
    },
    //////////////////////////
    {
        mapName: "leonard_heights/C4",
        trigger: ON_POSITION,
        position: {
            "col": 20,
            "direction": FACING_LEFT
        },
        condition: [ EVENT_HAS_FIRED, KEY_STORY_1 ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
            [[SPEAK, "Did I see a ghost?", PLAYER_NAME]],
            [[SPEAK, "It can't be real...", PLAYER_NAME]]
        ]]
    } 
]

const assignEventIds = () => { 
    STORY_EVENTS.forEach( (event, index) => {
        event.id = "STORY_EVENT_"+index
    });
};
assignEventIds();

module.exports = {
    STORY_EVENTS
}