const { DEFAULT, SPEAK, SPEAK_YES_NO, FADE_IN_OUT, EVENT_HAS_FIRED } = require("../../../../../game-data/conditionGlobals");
const { LOGGABLE_INTERACTION_4 } = require("../../../../../game-data/interactionGlobals");

const BUTLER_1 = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": "SLEEP",
            "sfx": "voice-1.mp3",
            "scenes": [
                { "type": SPEAK, "text": "I'm terribly sorry sir!" },
                { "type": SPEAK, "text": "You have no business beyond here." }
            ]
        }   
    }
]

const BUTLER_2 = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": "SLEEP",
            "sfx": "voice-1.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Glad to meet you lord!" },
                { "type": SPEAK, "text": "I regret to inform you that the grand hall is closed." }
            ]
        }   
    }
]

const JONA = [
    {
        "condition": {
            "type": EVENT_HAS_FIRED,
            "value": LOGGABLE_INTERACTION_4,
        },
        "action": { 
            "type": "TEXT",
            "sfx": "typing.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Wow, you got the robot to move?" },
                { "type": SPEAK, "text": "Brilliant man, that's amazing!" }
            ]
        }   
    },
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": "SLEEP",
            "sfx": "voice-1.mp3",
            "scenes": [
                { "type": SPEAK, "text": "These annoying butlers won't let me into the grand hall!" },
                { "type": SPEAK, "text": "I traveled for days to get here and now this dumb shit." },
                { "type": SPEAK, "text": "I tried going trough the left door here, but there's a weird robot who won't let me pass..." },
            ]
        }   
    }
]

const SHOP = [
    {
        "condition": {
            "type": DEFAULT
         },
        "action": { 
            "type": "SHOP",
            "sfx": "voice-2.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Hello individual! Are you looking for the new products marketed to your demographic?" },
                {
                    "type": SPEAK_YES_NO,
                    "text": "They will make you very special and unique! Want to buy them here?",
                    "pathYes": [
                        { "type": SPEAK, "text": "Wonderful, my CEO will be pleased! Let me show you my wares..." }
                    ],
                    "pathNo": [
                        { "type": SPEAK, "text": "Then stop wasting my time, low-income non-customer human!" }
                    ]
                }
            ],
            "money" : 100,
            "available_items": [
                { "id": "melee_weapon_1", "amount": 1 },
                { "id": "hp_consumable_1", "amount": 3 },
                { "id": "pp_consumable_1", "amount": 3 },
                { "id": "usable_1", "amount": 2 },
            ]
        }
    }
];

const REST = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": "SLEEP",
            "sfx": "typing.mp3",
            "scenes": [
                {
                    "type": SPEAK_YES_NO,
                    "text": "You must be exhausted from your travels, dear! Do you wish to rest?",
                    "pathYes": [
                        { "type": SPEAK, "text": "Lovely, darling. Have some snacks and I'll tell you about the past..." },
                        { "type": FADE_IN_OUT, "sfx": "misc/random6.wav" },
                        { "type": SPEAK, "text": "...and that's how I defeated Robot Emperor Trump in a game of cricket!" },
                        { "type": SPEAK, "text": "True story dear! Now off you go and take care! <3" }
                    ],
                    "pathNo": [
                        { "type": SPEAK, "text": "Well why don't you fuck off then?" }
                    ]
                }
            ]
        } 
    }
]

module.exports = {
    BUTLER_1, BUTLER_2, JONA, REST, SHOP
}