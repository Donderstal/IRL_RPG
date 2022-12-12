import { PLAYER_NAME } from '../../../../game-data/interactionGlobals';
import type { CinematicModel } from '../../../../models/CinematicModel';
import { getDeleteSpriteScene, getSpeakScene } from '../../../cinematicFactory';
import { getDefaultTalkInteraction } from '../../../interactionFactory';
import { getDefaultCondition } from '../../../conditionFactory';

const CINSCRIPT_LOST_KEY: CinematicModel = [
    [getSpeakScene( "Looks like someone lost their keys here...", PLAYER_NAME )],
    [getSpeakScene( "I better pick 'em just in case", PLAYER_NAME )],
    [getDeleteSpriteScene( null, true, "misc/random5.wav" )]
]
export const LOST_KEYS_INTERACTION = [
    getDefaultTalkInteraction( CINSCRIPT_LOST_KEY, getDefaultCondition() )
];