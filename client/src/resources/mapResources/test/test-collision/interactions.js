const { ITEM_OWNED, DEFAULT, SPEAK, SPEAK_YES_NO, EVENT_TALK } = require("../../../../game-data/conditionGlobals");
const { LOGGABLE_INTERACTION_1 } = require("../../../../game-data/interactionGlobals");
const CONDITION_TEST_1_ITEM = [ 
    {
        "condition": {
            "type": ITEM_OWNED,
            "value": "hp_consumable_1"
        },
        "action": {
            "type": EVENT_TALK,
            "sfx": "voice-3.mp3",
            "shouldBeRegistered": true,
            "registryKey": LOGGABLE_INTERACTION_1,
            "scenes": [
                { "type": SPEAK, "text": "You seem to have a nice Bread Inc. Sandwich. Impressive!" },
                { 
                    "type": SPEAK_YES_NO, "text": "Will you give me a sandwich?",
                    "pathYes": [ { "type": SPEAK, "text": "Wow, thanks so much!" } ],
                    "pathNo": [ { "type": SPEAK, "text": "You damned cheapskate!" } ]
                }
            ]
        }
    },
    {
        "condition": {
            "type": DEFAULT
        },
        "action": {
            "type": EVENT_TALK,
            "sfx": "voice-3.mp3",
            "scenes": [
            { "type": SPEAK, "text": "I'm looking for someone to hook me up with some good bread" }
            ]
        }
    }
];

module.exports = {
    CONDITION_TEST_1_ITEM
}