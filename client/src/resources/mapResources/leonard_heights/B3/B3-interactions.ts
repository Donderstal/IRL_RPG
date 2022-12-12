import { PLAYER_NAME } from '../../../../game-data/interactionGlobals';
import type { CinematicModel } from '../../../../models/CinematicModel';
import { getSpeakScene } from '../../../cinematicFactory';
import { getDefaultCondition, getInteractionRegisteredCondition } from '../../../conditionFactory';
import { getDefaultTalkInteraction, getRegistryTalkInteraction } from '../../../interactionFactory';

const CINSCRIPT_KEY_GUY_1: CinematicModel = [
    [getSpeakScene( "Woah, it's the key finding dude!", PLAYER_NAME )],
    [getSpeakScene( "You're the best bro, my whole family loves you!", PLAYER_NAME )],
];
const CINSCRIPT_KEY_GUY_2: CinematicModel = [
    [getSpeakScene( "Wow, did you find my keys?", PLAYER_NAME )],
    [getSpeakScene( "<3 Thanks bro you're my hero <3", PLAYER_NAME )],
];
const CINSCRIPT_KEY_GUY_3: CinematicModel = [
    [getSpeakScene( "I lost my keys at the parking lot.", PLAYER_NAME )],
    [getSpeakScene( "I hope it wasn't found by those shady guys hanging out there...", PLAYER_NAME )],
];

export const B3_INTERACTION_GUY_WHO_LOST_HIS_KEYS = [
    getDefaultTalkInteraction( CINSCRIPT_KEY_GUY_3, getInteractionRegisteredCondition( "TEST_KEY_3" ) ),
    getRegistryTalkInteraction( CINSCRIPT_KEY_GUY_2, getInteractionRegisteredCondition( "TEST_KEY_2" ), "TEST_KEY_3" ),
    getDefaultTalkInteraction( CINSCRIPT_KEY_GUY_1, getDefaultCondition() )
];