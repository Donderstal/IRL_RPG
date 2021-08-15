const { DEFAULT, SPEAK } = require("../../../../../game-data/conditionGlobals");

const BUTLER_1 = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": "SLEEP",
            "sfx": "voice-1.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Welcome to our fine establishment." }
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
                { "type": SPEAK, "text": "We're happy to have you.'" }
            ]
        }   
    }
]

module.exports = {
    BUTLER_1, BUTLER_2
}