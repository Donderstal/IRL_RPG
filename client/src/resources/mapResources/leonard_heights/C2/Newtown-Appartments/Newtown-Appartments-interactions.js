const { EVENT_HAS_FIRED, SPEAK, EVENT_TALK, DEFAULT, EMOTE } = require("../../../../../game-data/conditionGlobals");
const { UNLOCK_DOOR_TEST, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_3 } = require("../../../../../game-data/interactionGlobals");
const { EMOTE_ANGRY } = require("../../../../../game-data/textboxGlobals");

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

const BODYGUARD = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "voice-1.mp3", [
            [[SPEAK, true, "I'm just here for the safety of my tenants."]],
            [[SPEAK, true, "Some maniac left the door unlocked."]]
        ]]
    ]
]

const NEIGHBOUR = [
    [
        [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_2 ],
        [ EVENT_TALK, LOGGABLE_INTERACTION_3, "voice-1.mp3", [
            [[SPEAK, true, "Woah dude you did it!"]],
            [[SPEAK, true, "I'm the {R}Mob {R}Boss."]]
        ]]
    ],
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "voice-1.mp3", [
            [[SPEAK, true, "Just hanging out in my appartment..."]]
        ]]
    ]
]

const WAITING_BUSINESSMAN = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "voice-1.mp3", [
            [[SPEAK, true, "For some reason somebody locked the main door..."]],
            [[EMOTE, true, EMOTE_ANGRY]],
            [[SPEAK, true, "I don't have time for this! I've got important meetings to attend!!"]]
        ]]
    ]
]

module.exports = { 
    KEY_GUY,
    BODYGUARD,
    WAITING_BUSINESSMAN,
    NEIGHBOUR
}