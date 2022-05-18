const { KEY_STORY_2 } = require('../../../storyChapters');
const { DEFAULT, EVENT_TALK, SPEAK, DELETE_SPRITE } = require('../../../../game-data/conditionGlobals');
const { PLAYER_NAME } = require('../../../../game-data/interactionGlobals');

const LOST_KEYS_INTERACTION = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, KEY_STORY_2, "medium-text-blip.ogg", [
            [[SPEAK, true, "Looks like someone lost their keys here...", PLAYER_NAME]],
            [[SPEAK, true, "I better pick 'em just in case", PLAYER_NAME]],
            [[DELETE_SPRITE, true, false, "misc/random5.wav"]]
        ]]        
    ]
]

module.exports = {
    LOST_KEYS_INTERACTION
}