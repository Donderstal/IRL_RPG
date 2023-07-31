import { PLAYER_NAME } from "../../../../game-data/interactionGlobals";
import type { CinematicModel } from "../../../../models/CinematicModel";
import { getSpeakScene } from "../../../../factories/cinematicFactory";
import { getDefaultCondition } from "../../../../factories/conditionFactory";
import { getDefaultTalkInteraction } from "../../../../factories/interactionFactory";

const CINSCRIPT_WHOLESOME_LIFTER: CinematicModel = [
    [getSpeakScene( "Lifting is the best bro!", PLAYER_NAME )],
    [getSpeakScene( "Really increases your self - esteem too, you should try it.", PLAYER_NAME )]
];
export const E4_INTERACTION_WHOLESOME_LIFTER = [
    getDefaultTalkInteraction( CINSCRIPT_WHOLESOME_LIFTER, getDefaultCondition() )
];