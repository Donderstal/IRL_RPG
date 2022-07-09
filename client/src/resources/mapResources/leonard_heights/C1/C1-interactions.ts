import { KEY_STORY_2 } from '../../../storyChapters';
import { DEFAULT, EVENT_TALK, SPEAK, DELETE_SPRITE } from '../../../../game-data/conditionGlobals';
import { PLAYER_NAME } from '../../../../game-data/interactionGlobals';

export const LOST_KEYS_INTERACTION = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, KEY_STORY_2, "medium-text-blip.ogg", [
            [[SPEAK, true, "Looks like someone lost their keys here...", PLAYER_NAME]],
            [[SPEAK, true, "I better pick 'em just in case", PLAYER_NAME]],
            [[DELETE_SPRITE, true, false, "misc/random5.wav"]]
        ]]        
    ]
]