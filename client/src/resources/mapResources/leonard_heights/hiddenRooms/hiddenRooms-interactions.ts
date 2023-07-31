import { PLAYER_NAME } from "../../../../game-data/interactionGlobals";
import type { CinematicModel } from "../../../../models/CinematicModel";
import { getSpeakScene } from "../../../../factories/cinematicFactory";
import { getDefaultCondition } from "../../../../factories/conditionFactory";
import { getDefaultTalkInteraction } from "../../../../factories/interactionFactory";

const CINSCRIPT_HELLO: CinematicModel = [
    [getSpeakScene( "Hello", PLAYER_NAME )],
    [getSpeakScene( "Hi", null, PLAYER_NAME )],
    [getSpeakScene( "Nice to meet you, I like turtles and sour candy.", PLAYER_NAME )],
]

export const INTERACTION_HELLO = () => { return getDefaultTalkInteraction( CINSCRIPT_HELLO, getDefaultCondition() ) };