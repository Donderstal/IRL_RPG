const { DEFAULT } = require("../../../../../game-data/conditionGlobals");

const MONKEY = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": "SLEEP",
            "sfx": "voice-1.mp3",
            "scenes": [
                { "type": "SPEAK", "text": "I don't get humans, to be honest with you." },
                { "type": "SPEAK", "text": "Most of them just talk a lot and sit around all day." },
                { "type": "SPEAK", "text": "With monkeys it's different!" },
                { "type": "SPEAK", "text": "We're always on top of our game, never a dull moment." },
                { "type": "SPEAK", "text": "We might throw some poo here and there, but we do it with real passion." }
            ]
        }   
    }
]


const GRUMPY_MAN = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": "SLEEP",
            "sfx": "battle-baba.mp3",
            "scenes": [
                { "type": "SPEAK", "text": "Kids these days!" },
                { "type": "SPEAK", "text": "They don't make 'em tough like they used to, I tell you." },
                { "type": "SPEAK", "text": "Back in my day, we used to discuss our gender in discord voice chat!" },
                { "type": "SPEAK", "text": "Now that was some real shit!" }
            ]
        }   
    }
]

module.exports = {
    MONKEY, GRUMPY_MAN
}