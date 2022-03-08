const { EVENT_HAS_FIRED, SPEAK, EVENT_TALK, DEFAULT } = require("../../../../../game-data/conditionGlobals");
const { UNLOCK_DOOR_TEST } = require("../../../../../game-data/interactionGlobals");

const KEY_GUY = [
    [
        [ EVENT_HAS_FIRED, UNLOCK_DOOR_TEST ],
        [ EVENT_TALK, false, "voice-1.mp3", [
            [[SPEAK, "Didn't I give you a key already"]],
            [[SPEAK, "There's still no reason to go outside."]]
        ]]
    ],
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, UNLOCK_DOOR_TEST, "voice-1.mp3", [ 
            [[SPEAK, "I guess you want to go outside, right?"]],
            [[SPEAK, "I've locked the door, just to be sure..."]],
            [[SPEAK, "But here's the key. Please lock it again when you go out!!"]]
        ]]
    ]
]

module.exports = { 
    KEY_GUY
}