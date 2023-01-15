import { SceneAnimationType } from "../../../../../enumerables/SceneAnimationTypeEnum";
import { UNLOCK_DOOR_TEST, LOGGABLE_INTERACTION_3, PLAYER_NAME } from "../../../../../game-data/interactionGlobals";
import { EMOTE_ANGRY } from "../../../../../game-data/textboxGlobals";
import type { CinematicModel } from "../../../../../models/CinematicModel";
import { getEmoteScene, getFadeScene, getScreenTextScene, getSpeakScene } from "../../../../cinematicFactory";
import { getDefaultCondition, getInteractionRegisteredCondition } from "../../../../conditionFactory";
import { getDefaultTalkInteraction, getRegistryTalkInteraction } from "../../../../interactionFactory";

const CINSCRIPT_KEY_GUY_1: CinematicModel = [
    [getSpeakScene( "Didn't I give you a key already", PLAYER_NAME )],
    [getSpeakScene( "There's still no reason to go outside.", PLAYER_NAME )]
];
const CINSCRIPT_KEY_GUY_2: CinematicModel = [
    [getSpeakScene( "I guess you want to go outside, right?", PLAYER_NAME )],
    [getSpeakScene( "I've locked the door, just to be sure...", PLAYER_NAME )],
    [getSpeakScene( "But here's the key. Please lock it again when you go out!!", PLAYER_NAME )]
];
export const C1_INTERACTION_KEY_GUY = [
    getDefaultTalkInteraction( CINSCRIPT_KEY_GUY_1, getInteractionRegisteredCondition( UNLOCK_DOOR_TEST ) ),
    getRegistryTalkInteraction( CINSCRIPT_KEY_GUY_2, getDefaultCondition(), UNLOCK_DOOR_TEST )
];

const CINSCRIPT_BODYGUARD: CinematicModel = [
    [getSpeakScene( "I'm just here for the safety of my tenants.", PLAYER_NAME )],
    [getSpeakScene( "Some maniac left the door unlocked.", PLAYER_NAME )]
];

export const C1_INTERACTION_BODYGUARD = [
    getRegistryTalkInteraction( CINSCRIPT_BODYGUARD, getDefaultCondition(), "BRO" )
];

const CINSCRIPT_NEIGHBOUR_1: CinematicModel = [
    [getSpeakScene( "Woah dude you did it!", PLAYER_NAME )],
    [getSpeakScene( "I'm the {R}Mob {R}Boss.", PLAYER_NAME )]
];
const CINSCRIPT_NEIGHBOUR_2: CinematicModel = [
    [getSpeakScene( "Just hanging out in my appartment...", PLAYER_NAME )]
];
export const C1_INTERACTION_NEIGHBOUR = [
    getDefaultTalkInteraction( CINSCRIPT_NEIGHBOUR_1, getInteractionRegisteredCondition( LOGGABLE_INTERACTION_3 ) ),
    getDefaultTalkInteraction( CINSCRIPT_NEIGHBOUR_2, getDefaultCondition() )
]

const CINSCRIPT_WAITING_BUSINESSMAN: CinematicModel = [
    [getSpeakScene( "For some reason somebody locked the main door...", PLAYER_NAME )],
    [getFadeScene( SceneAnimationType.fadeOut )],
    [getScreenTextScene( "THIS IS A SCREENTEXT. IN THE NEAR FUTURE, THIS IS AN INTRODUCTORY TEXT TO A YET TO BE RELEASED VIDEO GAME. THE SINGLE DEVELOPER WORKING ON THIS GAME SWEARS IT WILL NOT GO DOWN IN HISTORY AS VAPORWARE. SO HELP ME BABY JEEBUS." )],
    [getFadeScene( SceneAnimationType.fadeIn )],
    [getEmoteScene( EMOTE_ANGRY )],
    [getSpeakScene( "I don't have time for this! I've got important meetings to attend!!", PLAYER_NAME )]
];
export const C1_INTERACTION_WAITING_BUSINESSMAN = [
    getDefaultTalkInteraction( CINSCRIPT_WAITING_BUSINESSMAN, getDefaultCondition() )
]