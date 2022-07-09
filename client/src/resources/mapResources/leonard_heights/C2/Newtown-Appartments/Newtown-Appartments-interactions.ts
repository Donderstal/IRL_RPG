import { EVENT_HAS_FIRED, SPEAK, EVENT_TALK, DEFAULT, EMOTE } from "../../../../../game-data/conditionGlobals";
import { UNLOCK_DOOR_TEST, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_3 } from "../../../../../game-data/interactionGlobals";
import { EMOTE_ANGRY } from "../../../../../game-data/textboxGlobals";

export const KEY_GUY = [
    [
        [ EVENT_HAS_FIRED, UNLOCK_DOOR_TEST ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "Didn't I give you a key already"]],
            [[SPEAK, true, "There's still no reason to go outside."]]
        ]]
    ],
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, UNLOCK_DOOR_TEST, "medium-text-blip.ogg", [ 
            [[SPEAK, true, "I guess you want to go outside, right?"]],
            [[SPEAK, true, "I've locked the door, just to be sure..."]],
            [[SPEAK, true, "But here's the key. Please lock it again when you go out!!"]]
        ]]
    ]
]

export const BODYGUARD = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "I'm just here for the safety of my tenants."]],
            [[SPEAK, true, "Some maniac left the door unlocked."]]
        ]]
    ]
]

export const NEIGHBOUR = [
    [
        [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_2 ],
        [ EVENT_TALK, LOGGABLE_INTERACTION_3, "medium-text-blip.ogg", [
            [[SPEAK, true, "Woah dude you did it!"]],
            [[SPEAK, true, "I'm the {R}Mob {R}Boss."]]
        ]]
    ],
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "Just hanging out in my appartment..."]]
        ]]
    ]
]

export const WAITING_BUSINESSMAN = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "For some reason somebody locked the main door..."]],
            [[EMOTE, true, EMOTE_ANGRY]],
            [[SPEAK, true, "I don't have time for this! I've got important meetings to attend!!"]]
        ]]
    ]
]