const { LOGGABLE_INTERACTION_1 } = require("../../../../../game-data/interactionGlobals");
const { DEFAULT, EVENT_HAS_FIRED, SPEAK, EVENT_TALK } = require("../../../../../game-data/conditionGlobals");

const STANDARD_ROBOT =  [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "scenes": [
                { "type": SPEAK, "text": "For your safety, good citizen!" },
                { "type": SPEAK, "text": "There's no reason to go beyond here." },
                { "type": SPEAK, "text": "We advise you to go inside!" }
            ]
        } 
    }
]
const KEY_ROBOT = [
    {
        "condition": {
            "type": EVENT_HAS_FIRED,
            "value": LOGGABLE_INTERACTION_1
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "typing.mp3",
            "shouldBeRegistered": true,
            "registryKey": LOGGABLE_INTERACTION_1,
            "scenes": [
                { "type": SPEAK, "text": "Didn't I give you a key already" },
                { "type": SPEAK, "text": "There's still no reason to go beyond here." }
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
            "registryKey": LOGGABLE_INTERACTION_1,
            "scenes": [
                { "type": SPEAK, "text": "For your safety, good citizen!" },
                { "type": SPEAK, "text": "There's no reason to go beyond here." },
                { "type": SPEAK, "text": "We advise you to go inside!" },
                { "type": SPEAK, "text": "..." },
                { "type": SPEAK, "text": "Oh, the door's still locked?" },
                { "type": SPEAK, "text": "Here's the key, human!" }
            ]
        } 
    }
]
const BUTLER = [
    {
        "condition": {
            "type": DEFAULT
        },
        "action": { 
            "type": EVENT_TALK,
            "sfx": "voice-1.mp3",
            "scenes": [
                { "type": SPEAK, "text": "Want to go in, sir?" },
                { "type": SPEAK, "text": "I'm afraid you'll have ask the robots..." }
            ]
        }   
    }
]

module.exports = {
    STANDARD_ROBOT, KEY_ROBOT, BUTLER
}