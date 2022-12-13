import { PLAYER_NAME } from "../game-data/interactionGlobals";
import type { CinematicModel } from "../models/CinematicModel";
import { getSpeakScene } from "./cinematicFactory";

export const CINSCRIPT_STORY_1: CinematicModel = [
    [getSpeakScene( "There's just something creepy about an empty appartment...", null, PLAYER_NAME )]
];
export const CINSCRIPT_STORY_2: CinematicModel = [
    [getSpeakScene( "And who the hell are you?", PLAYER_NAME )]
];
export const CINSCRIPT_STORY_3: CinematicModel = [
    [getSpeakScene( "What was that?", null, PLAYER_NAME )],
    [getSpeakScene( "I could swear I heard someone speak.", null, PLAYER_NAME )],
];
export const CINSCRIPT_STORY_4: CinematicModel = [
    [getSpeakScene( "What's that guy in the suit doing here?", null, PLAYER_NAME )],
];