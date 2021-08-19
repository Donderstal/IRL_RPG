const { DEFAULT, SPEAK, MOVE, ANIM, SPEAK_YES_NO, EVENT_HAS_FIRED, ON_BATTLE_END, EVENT_BATTLE, EVENT_TALK } = require("../../../../../game-data/conditionGlobals");
const { TEST_CLASSNAME_1 } = require("../../../../../game-data/globals");
const { LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_3, LOGGABLE_INTERACTION_4 } = require("../../../../../game-data/interactionGlobals");

const COMPUTER_1_ACTION = [ 
    { 
        "row": 2, "col": 2,
        "condition": {
        "type": DEFAULT
        },
        "action": {
        "type": EVENT_TALK,
        "scenes": [
            {
            "type": SPEAK,
            "spriteName": "Player",
            "sfx": "typing.mp3",
            "text": "There's some incredibly nasty things on this screen.",
            }
        ]
        }
    }
];
const COMPUTER_2_ACTION = [ 
    { 
        "row": 2, "col": 3,
        "condition": {
        "type": DEFAULT
        },
        "action": {
        "type": EVENT_TALK,
            "scenes": [
                {
                    "type": SPEAK,
                    "spriteName": "Player",
                    "sfx": "typing.mp3",
                    "text": "My god, this is gross!",
                },
                {
                    "type": SPEAK,
                    "spriteName": "Furious jerker",
                    "sfx": "typing.mp3",
                    "text": "Don't kinkshame me, bro!",
                }
            ],
        }
    },
];
const COMPUTER_3_ACTION = [ 
    { 
        "row": 2, "col": 4,
        "condition": {
        "type": DEFAULT
        },
        "action": {
        "type": EVENT_TALK,
        "scenes": [
            {
            "type": SPEAK,
            "spriteName": "Player",
            "sfx": "typing.mp3",
            "text": "Is that a donkey??",
            }
        ]
        }
    }
];

const BUTLER_IN_TRAINING = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "voice-1.mp3",
            "scenes": [
                { "type": SPEAK, "text": "I'm training to be a butler!" },
                { "type": SPEAK, "text": "Hello mister, would you like champagne or caviar?" }
            ]
        }   
    }
]

const SECUREBOT = [
    {
        "condition": {
            "type": EVENT_HAS_FIRED,
            "value": LOGGABLE_INTERACTION_4,
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Oh silly me, I'm in the way again!" },
                {  type: MOVE, spriteName: "Securebot Mk II", destination: { "row": 2, "col": 1 } }
            ]
        }   
    },
    {
        "condition": {
            "type": EVENT_HAS_FIRED,
            "value": LOGGABLE_INTERACTION_3
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "shouldBeRegistered": true,
            "registryKey": LOGGABLE_INTERACTION_4,
            "scenes": [
                { "type": SPEAK, "text": "Secure Bob told me I was being rude to you!" },
                { "type": SPEAK, "text": "Silly that humans worry about these things..." },
                { "type": SPEAK, "text": "Anyway, I'll move out of the way for you" },
                {  type: MOVE, spriteName: "Securebot Mk II", destination: { "row": 2, "col": 1 } }
            ]
        }   
    },
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "shouldBeRegistered": true,
            "registryKey": LOGGABLE_INTERACTION_2,
            "scenes": [
                { "type": SPEAK, "text": "You have no business beyond here." },
                { "type": SPEAK, "text": "Only another robot could convince me to move for a human..." }
            ]
        }   
    }
]

const SECUREBOT_LEFT = [
    {
        "condition": {
            "type": EVENT_HAS_FIRED,
            "value": LOGGABLE_INTERACTION_2
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "shouldBeRegistered": true,
            "registryKey": LOGGABLE_INTERACTION_3,
            "scenes": [
                { "type": SPEAK, "text": "I heard the robot in the hall being rude you..." },
                { "type": SPEAK, "text": "I'm terribly sorry, not all robots are like that!" },
                { "type": SPEAK, "text": "I'll tell him to knock it off and be nice to you." }
            ]
        }   
    },
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Me and Annie have been together for a long time." },
                { "type": SPEAK, "text": "The other robots just don't understand..." }
            ]
        }   
    }
]

const LADY_LEFT = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Secure Bob has been my boyfriend for ten years now." },
                { "type": SPEAK, "text": "Once you got bot, you never go back!" }
            ]
        }   
    }
]


const NECKBEARD_RIGHT = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": EVENT_BATTLE,
            "sfx": "typing.mp3",
            "scenes": [
                { "type": SPEAK, "text": "DUDE!!!" },
                { "type": ANIM, "text": "TURN_SINGLE_CIRCLE" },
                { "type": SPEAK, "text": "Can't you see I'm furiously jerking off to 3 computers at the same time?!?" },
                { "type": SPEAK_YES_NO, "text": "I'll kick your ass, dick in hand!" }
            ],
            "party": [
                { "name": "Furious jerker", "className": TEST_CLASSNAME_1, "level": 5 },
                { "name": "Furious jerker", "className": TEST_CLASSNAME_1, "level": 5 },
                { "name": "Furious jerker", "className": TEST_CLASSNAME_1, "level": 5 }
            ], 
            "events": [
                {
                  "trigger": ON_BATTLE_END,
                  "scenes": [
                    { "type": ANIM, "animName": "TURN_SINGLE_CIRCLE", "loop": false },
                    { "type": SPEAK, "text": "Could you just knock next time you come in?" }
                  ]
                }
              ],
        }   
    }
]

module.exports = {
    BUTLER_IN_TRAINING, SECUREBOT, SECUREBOT_LEFT, LADY_LEFT, NECKBEARD_RIGHT,
    COMPUTER_1_ACTION, COMPUTER_2_ACTION, COMPUTER_3_ACTION
}