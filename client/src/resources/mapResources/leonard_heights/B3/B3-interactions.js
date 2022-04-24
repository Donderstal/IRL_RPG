const { DEFAULT, EVENT_TALK, SPEAK, EVENT_HAS_FIRED } = require('../../../../game-data/conditionGlobals');
const { KEY_STORY_2, KEY_STORY_3 } = require('../../../storyChapters');

const GUY_WHO_LOST_HIS_KEYS = [
    [
        [ EVENT_HAS_FIRED, KEY_STORY_2 ],
        [ EVENT_TALK, KEY_STORY_3, "voice-1.mp3", [
            [[SPEAK, true, "Wow, did you find my keys?"]],
            [[SPEAK, true, "<3 Thanks bro you're my hero <3"]]
        ]]  
    ],
    [
        [ EVENT_HAS_FIRED, KEY_STORY_3 ],
        [ EVENT_TALK, false, "voice-1.mp3", [
            [[SPEAK, true, "Woah, it's the key finding dude!"]],
            [[SPEAK, true, "You're the best bro, my whole family loves you!"]]
        ]]  
    ],
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "voice-1.mp3", [
            [[SPEAK, true, "I lost my keys at the parking lot."]],
            [[SPEAK, true, "I hope it wasn't found by those shady guys hanging out there..."]]
        ]]      
    ]
];

module.exports = {
    GUY_WHO_LOST_HIS_KEYS
}