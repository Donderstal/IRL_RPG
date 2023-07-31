import { PLAYER_NAME } from "../../../../game-data/interactionGlobals";
import type { CinematicModel } from "../../../../models/CinematicModel";
import { getSpeakScene } from "../../../../factories/cinematicFactory";
import { getDefaultCondition } from "../../../../factories/conditionFactory";
import { getDefaultTalkInteraction } from "../../../../factories/interactionFactory";

const CINSCRIPT_WHOLESOME_LIFT: CinematicModel = [
    [getSpeakScene( "Just another day lifting and being handsome!", PLAYER_NAME )],
    [getSpeakScene( "If you need some dumbbells I can't help ya though...", PLAYER_NAME )],
    [getSpeakScene( "I only hand them out to my bros, or bros of my bros!", PLAYER_NAME )]
];

export const B4_INTERACTION_WHOLESOME_LIFTER = [
    getDefaultTalkInteraction( CINSCRIPT_WHOLESOME_LIFT, getDefaultCondition() )
];