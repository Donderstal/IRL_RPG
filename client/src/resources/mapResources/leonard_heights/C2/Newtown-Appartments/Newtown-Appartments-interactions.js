const { EVENT_HAS_FIRED, SPEAK, EVENT_TALK, DEFAULT } = require("../../../../../game-data/conditionGlobals");
const { UNLOCK_DOOR_TEST } = require("../../../../../game-data/interactionGlobals");

const KEY_GUY = [
    [
        [ EVENT_HAS_FIRED, UNLOCK_DOOR_TEST ],
        [ EVENT_TALK, false, "voice-1.mp3", [
            [[SPEAK, true, "Didn't I give you a key already"]],
            [[SPEAK, true, "There's still no reason to go outside."]]
        ]]
    ],
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, UNLOCK_DOOR_TEST, "voice-1.mp3", [ 
            [[SPEAK, true, "I guess you want to go outside, right?"]],
            [[SPEAK, true, "I've locked the door, just to be sure..."]],
            [[SPEAK, true, "But here's the key. Please lock it again when you go out!!"]]
        ]]
    ]
]

module.exports = { 
    KEY_GUY
}