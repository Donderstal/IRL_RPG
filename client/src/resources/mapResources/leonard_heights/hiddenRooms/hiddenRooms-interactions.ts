import { PLAYER_NAME } from "../../../../game-data/interactionGlobals";
import type { CinematicModel } from "../../../../models/CinematicModel";
import { getSpeakScene } from "../../../cinematicFactory";
import { getDefaultCondition } from "../../../conditionFactory";
import { getDefaultTalkInteraction } from "../../../interactionFactory";

const CINSCRIPT_HELLO: CinematicModel = [
    [getSpeakScene( "Hello", PLAYER_NAME )],
    [getSpeakScene( "Hi", null, PLAYER_NAME )],
    [getSpeakScene( "Nice to meet you, I like turtles and sour candy.", PLAYER_NAME )],
]

export const INTERACTION_HELLO = () => { return getDefaultTalkInteraction( CINSCRIPT_HELLO, getDefaultCondition() ) };