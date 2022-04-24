const globals = require("../game-data/globals")
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN, OUT_UP, OUT_DOWN, OUT_RIGHT } = require("../game-data/globals")
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
                [[LOAD_MAP, true, "leonard_heights/Newtown-appartment-3", true]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/B2"]],
                [[CREATE_CAR, true, "bus.png", "CIN_CAR_BUS", "CIN_ROAD_1"]],
                [[CREATE_SPRITE, true, FACING_RIGHT, "characterx3.png", "Dancing granny", 15, 11]],
                [[ANIM, false, "LEFT_AND_RIGHT_STEP", "Dancing granny", true]],
                [[CAMERA_MOVE_TO_SPRITE, true, "CIN_CAR_BUS", true]],
                [[FADE_IN, true]],
                [[MOVE_CAR, true, null, OUT_UP, "CIN_CAR_BUS", FACING_UP]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/B1"]],
                [[CREATE_OBJECT_SPRITE, true, FACING_UP, "bus", "My cool car", 13, 13]],
                [[CAMERA_MOVE_TO_SPRITE, true, "My cool car", true], [CREATE_SPRITE, true, FACING_RIGHT, false, PLAYER_NAME, 15, 14], [CREATE_SPRITE, true, FACING_LEFT,"fats.png", "BOB", 16, 14]],
                [[FADE_IN, true]],
                [[SPEAK, true, "Was good hanging out with you!", PLAYER_NAME], [EMOTE, false, EMOTE_HAPPY, "BOB"]],
                [[SPEAK, true, "Yeah for sure. See you at work at the {G}Yum {G}Mart later!", "BOB"], [EMOTE, false, EMOTE_HAPPY, PLAYER_NAME]],
                [[MOVE, true, PLAYER_NAME, { col: 15, row: OUT_DOWN }]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/B2"]],
                [[CREATE_SPRITE, true, FACING_DOWN, false, PLAYER_NAME, 15, 1]],
                [[CREATE_SPRITE, true, FACING_RIGHT, "characterx3.png", "Dancing granny", 15, 11]],
                [[ANIM, false, "LEFT_AND_RIGHT_STEP", "Dancing granny", true]],
                [[CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, true]],
                [[FADE_IN, false], [MOVE, true, PLAYER_NAME, { col: OUT_RIGHT, row: 10 }]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/C2"]],
                [[CREATE_SPRITE, true, FACING_RIGHT, false, PLAYER_NAME, 1, 10]],
                [[CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, true]],
                [[FADE_IN, true]],
                [[SPEAK, true, "I'm almost back home, can't wait to get some cold Diet Betes before my shift begins!", PLAYER_NAME]],
                [[MOVE, true, PLAYER_NAME, { col: 12, row: 9 }]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/Newtown-appartment-3", true]],
                [[FADE_IN, true]],
                [[SPEAK, true, "Let's get to work now!", PLAYER_NAME]]
            ]
        ]
    },
    ////////////////////
    {
        mapName: "leonard_heights/C2",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[LOAD_MAP, true, "leonard_heights/C2", true]],
                [[CREATE_SPRITE, true, FACING_LEFT, "fats.png", "BOB", 24, 10]],
                [[CAMERA_MOVE_TO_SPRITE, true, "BOB", false], [MOVE, true, "BOB", PLAYER_NAME]],
                [[SPEAK, true, "I heard there was some trouble at the {G}Yum {G}Mart down {R}south...", "BOB"], [EMOTE, true, EMOTE_SURPRISED, PLAYER_NAME]],
                [[CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false], [SPEAK, true, "Oh no, I better get down there fast!", PLAYER_NAME], [MOVE, false, "BOB", { col: globals.OUT_LEFT, row: 10 }]]
            ]
        ]
    },
    ///////////////
    {
        mapName: "leonard_heights/E3",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
                [[LOAD_MAP, true, "leonard_heights/E3", true]],
                [[SPEAK, true, "I hate the hotel on this street, it's always full of trashy tourists", PLAYER_NAME]]
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
            [[LOAD_MAP, true, "leonard_heights/Newtown-appartment-4", true]],
            [[SPEAK, true, "There's just something creepy about an empty appartment...", PLAYER_NAME]]
        ]
    ]
    },
    //////////////////////////
    {
        mapName: "leonard_heights/C4",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "voice-1.mp3", [ 
            [[LOAD_MAP, true, "leonard_heights/C4", true]],
            [[SPEAK, true, "There's something wrong here, I can feel it...", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false], 
                [CREATE_SPRITE, true, FACING_DOWN, "fats.png", "Bob A", 20, 8], [CREATE_SPRITE, true, FACING_DOWN, "fats.png", "Bob B", 19, 8]],
            [[SPEAK, true, "I love being a thug, it's my dream job", "Bob A"], [CAMERA_MOVE_TO_SPRITE, true, "Bob A", false], [MOVE, true, PLAYER_NAME, { col: 19, row: 9 }]],
            [[SPEAK, true, "Yeah, my liberal arts degree is really paying off..", "Bob B"]],
            [[SPEAK, true, "Who are you guys and what the hell are you doing here??", PLAYER_NAME]],
            [[SPEAK, true, "We're here to keep nosy morons like you out.", "Bob A"]],
            [[SPEAK, true, "Yeah, piss off you wanker!", "Bob B"]],
            [[SPEAK, true, "You guys have got to be kidding me...", PLAYER_NAME]],
            [[SPEAK, true, "You wanker, why don't you piss off!!", "Bob B"]],
            [[SPEAK, true, "You're repeating yourself, Bob...", "Bob A"]],
            [[SPEAK, true, "This has to be a joke right?", PLAYER_NAME]],
            [[SPEAK, true, "You think we're taking a piss, wanker?", "Bob B"]],
            [[SPEAK, true, "...", "Bob A"], [EMOTE, true, EMOTE_QUESTIONMARK, "Bob B"]],
            [[SPEAK, true, "If you want in kid, you gotta speak to our {R}boss {R}Big {R}Bubba", "Bob A"]],
            [[SPEAK, true, "Where can I find him?", PLAYER_NAME]],
            [[SPEAK, true, "He's a mob boss kid. You can't just walk into his office.", "Bob A"]],
            [[SPEAK, true, "Ask around or something. If you're a smart boy you'll find him!", "Bob B"]]
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
    STORY_EVENTS,
    KEY_STORY_2,
    KEY_STORY_3
}