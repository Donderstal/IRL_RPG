import { PLAYER_NAME } from "../../../../../../game-data/interactionGlobals";
import type { CinematicModel } from "../../../../../../models/CinematicModel";
import { getSpeakScene } from "../../../../../../factories/cinematicFactory";
import { getDefaultCondition } from "../../../../../../factories/conditionFactory";
import { getDefaultTalkInteraction } from "../../../../../../factories/interactionFactory";

const CINSCRIPT_BS_APT4_RESIDENT: CinematicModel = [
    [getSpeakScene( "Can't you see I'm trying to cook dinner?", PLAYER_NAME )],
    [getSpeakScene( "It's quite rude to just barge into people's homes without knocking.", PLAYER_NAME )],
    [getSpeakScene( "I'm just saying, this is why the old neighbours didn't like you...", PLAYER_NAME )]
];

export const C2_INTERACTION_BS_APT4_RESIDENT = [
    getDefaultTalkInteraction( CINSCRIPT_BS_APT4_RESIDENT, getDefaultCondition( ))
];

const CINSCRIPT_BS_APT2_ROBOT_1: CinematicModel = [
    [getSpeakScene( "Hello human neighbour #2. Let us bond by complaining about powerful people.", PLAYER_NAME )],
    [getSpeakScene( "Me and my robro wanted to remove the toilet, but the landlord didn't want it.", PLAYER_NAME )],
    [getSpeakScene( "Apparently a toilet is mandatory in each appartment. How crazy is that?", PLAYER_NAME )]
];

export const C2_INTERACTION_BS_APT2_ROBOT_1 = [
    getDefaultTalkInteraction( CINSCRIPT_BS_APT2_ROBOT_1, getDefaultCondition() )
];

const CINSCRIPT_BS_APT2_ROBOT_2: CinematicModel = [
    [getSpeakScene( "I used to work as a sexbot, you know?", PLAYER_NAME )],
    [getSpeakScene( "It was a rather rough trade. Turns out humans can be pretty disgusting", PLAYER_NAME )]
];

export const C2_INTERACTION_BS_APT2_ROBOT_2 = [
    getDefaultTalkInteraction( CINSCRIPT_BS_APT2_ROBOT_2, getDefaultCondition() )
];
