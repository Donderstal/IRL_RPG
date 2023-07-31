import { PLAYER_NAME } from '../../../../game-data/interactionGlobals';
import { EMOTE_HEART } from '../../../../game-data/textboxGlobals';
import type { CinematicModel } from '../../../../models/CinematicModel';
import { getEmoteScene, getSpeakScene } from '../../../../factories/cinematicFactory';
import { getDefaultCondition } from '../../../../factories/conditionFactory';
import { getDefaultTalkInteraction } from '../../../../factories/interactionFactory';

const CINSCRIPT_LOOKING_FOR_APPARTMENT: CinematicModel = [
    [getSpeakScene( "This is my favorite part of the city.", PLAYER_NAME )],
    [getSpeakScene( "Like, there's nice cocktail bars and yoga studios.", PLAYER_NAME )],
    [getSpeakScene( "But all the poor people are still here to give it a authentic vibe, you know?", PLAYER_NAME )]
];
export const D2_INTERACTION_LOOKING_FOR_APPARTMENT_LADY = [
    getDefaultTalkInteraction( CINSCRIPT_LOOKING_FOR_APPARTMENT, getDefaultCondition() )
];

const CINSCRIPT_WHOLESOME_LIFT: CinematicModel = [
    [getSpeakScene( "You know that a lot of people think that us buff guys are assholes?", PLAYER_NAME )],
    [getSpeakScene( "Just shows that they've no idea what they're talking about!", PLAYER_NAME )],
    [getSpeakScene( "I always visit my grandma, you know? Never skip a week!", PLAYER_NAME )],
    [getEmoteScene( EMOTE_HEART )]
];
export const D2_INTERACTION_WHOLESOME_LIFTER = [
    getDefaultTalkInteraction( CINSCRIPT_WHOLESOME_LIFT, getDefaultCondition() )
];