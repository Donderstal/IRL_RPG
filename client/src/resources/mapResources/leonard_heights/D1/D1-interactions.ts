import type { CinematicModel } from "../../../../models/CinematicModel"
import { getSpeakScene } from "../../../../factories/cinematicFactory";
import { getDefaultCondition } from "../../../../factories/conditionFactory";
import { getDefaultTalkInteraction } from "../../../../factories/interactionFactory";

const CINSCRIPT_FRIENDLY_CHAD: CinematicModel = [
    [getSpeakScene( "My bro's having some rough feels man." )],
    [getSpeakScene( "We'd really appreciate you helping a bro out." )]
]; 
export const D1_INTERACTION_FRIENDLY_CHAD = [
    getDefaultTalkInteraction( CINSCRIPT_FRIENDLY_CHAD, getDefaultCondition() )
];

const CINSCRIPT_WHOLESOME_LIFTER: CinematicModel = [
    [getSpeakScene( "What could be better than pumping iron with your bros?" )]
];
export const D1_INTERACTION_WHOLESOME_LIFTER = [
    getDefaultTalkInteraction( CINSCRIPT_WHOLESOME_LIFTER, getDefaultCondition() )
]