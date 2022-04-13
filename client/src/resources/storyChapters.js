const globals = require("../game-data/globals")
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN, OUT_UP,OUT_DOWN } = require("../game-data/globals")
const { 
    ON_ENTER, ON_LEAVE, ON_POSITION, EVENT_HAS_FIRED, CREATE_CAR, MOVE_CAR, LOAD_MAP, FADE_OUT,
    EMOTE, DEFAULT, EVENT_TALK, SPEAK, CREATE_SPRITE, MOVE, CAMERA_MOVE_TO_SPRITE,
    SPEAK_YES_NO, ANIM, FADE_IN, DELETE_SPRITE, CREATE_OBJECT_SPRITE, FADE_OUT_IN
}  = require('../game-data/conditionGlobals')
const { PLAYER_NAME } = require('../game-data/interactionGlobals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_QUESTIONMARK } = require('../game-data/textboxGlobals');

const KEY_STORY_1 = "KEY_STORY_EVENT_1";
const KEY_STORY_2 = "KEY_STORY_EVENT_2";
const KEY_STORY_3 = "KEY_STORY_EVENT_3"

const STORY_EVENTS = [
    {
        mapName: "leonard_heights/Newtown-appartment-3",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [
                [[LOAD_MAP, "leonard_heights/Newtown-appartment-3", true]],
                [[FADE_OUT]],
                [[LOAD_MAP, "leonard_heights/B2"]],
                [[FADE_IN]],
                [[CREATE_CAR, "bus.png", "CIN_CAR_BUS", "CIN_ROAD_1"]],
                [[CAMERA_MOVE_TO_SPRITE, "CIN_CAR_BUS", true], [MOVE_CAR, null, OUT_UP, "CIN_CAR_BUS", FACING_UP]],
                [[FADE_OUT]],
                [[LOAD_MAP, "leonard_heights/B1"]],
                [[CREATE_OBJECT_SPRITE, FACING_UP, "bus", "My cool car", 13, 13]],
                [[FADE_IN]],
                [[CAMERA_MOVE_TO_SPRITE, "My cool car", true]],
                [[CREATE_SPRITE, FACING_UP, false, PLAYER_NAME, 15, 14], [CREATE_SPRITE, FACING_DOWN ,"fats.png", "BOB", 15, 13]],
                [[SPEAK, "Was good seeing you dude!!", PLAYER_NAME], [EMOTE, EMOTE_HAPPY, "BOB"]],
                [[SPEAK, "Yeah for sure, see you next week", "BOB"], [EMOTE, EMOTE_HAPPY, "BOB"]],
                [[MOVE, PLAYER_NAME, { col: 15, row: OUT_DOWN}]]
            ]
        ]
    },
    /* {
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
    }, */
    ////////////////////
    {
        mapName: "leonard_heights/C2",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[LOAD_MAP, "leonard_heights/C2", true]],
                [[SPEAK, "Man, I remember that time I was just chilling out at home...", PLAYER_NAME]],
                [[FADE_OUT, "relaxing_chord.wav"]],
                [[LOAD_MAP, "leonard_heights/Newtown-appartment-3"]],
                [[CREATE_SPRITE, FACING_DOWN, false, PLAYER_NAME, 4, 4], [CREATE_SPRITE, FACING_LEFT ,"fats.png", "BOB", 5, 5]],
                [[FADE_IN, "relaxing_chord.wav"]],
                [[SPEAK, "The Yum Mart sucks bro", PLAYER_NAME]],
                [[CAMERA_MOVE_TO_SPRITE, "BOB", false]],
                [[SPEAK, "I hate the Yum Mart too! Every last one of 'em", "BOB"], [EMOTE, EMOTE_ANGRY, PLAYER_NAME]],
                [[SPEAK, "If I had the guts, I'd take a dump in front of their stores", "BOB"]],
                [[CAMERA_MOVE_TO_SPRITE, PLAYER_NAME, false]],
                [[SPEAK, "That's all, folks!", PLAYER_NAME]],
            ]
        ]
    },
    ///////////////
    {
        mapName: "leonard_heights/E3",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[LOAD_MAP, "leonard_heights/E3", true]],
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
            [[LOAD_MAP, "leonard_heights/Newtown-appartment-4", true]],
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
            [[LOAD_MAP, "leonard_heights/C4", true]],
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