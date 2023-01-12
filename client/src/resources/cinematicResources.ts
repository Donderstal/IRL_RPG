import { ANIM_BACK_AND_FORTH_POSITIONAL, ANIM_POWER_UP, ANIM_TURN_CIRCLE_POSITIONAL } from "../game-data/animationGlobals";
import { PLAYER_NAME } from "../game-data/interactionGlobals";
import { EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED } from "../game-data/textboxGlobals";
import type { CinematicModel } from "../models/CinematicModel";
import { getAnimateSpriteScene, getDeleteSpriteScene, getEmoteScene, getSpeakScene, getSpeakYesNoScene, getWaitScene } from "./cinematicFactory";

// Random encounters
export const CINSCRIPT_RANDOM_ENCOUNTER_1: CinematicModel = [
    [getSpeakScene( "I can't believe the government took away my pet gorilla!", PLAYER_NAME )],
    [getEmoteScene( EMOTE_SAD ), getEmoteScene( EMOTE_SURPRISED, PLAYER_NAME )],
    [getSpeakScene( "Now who's gonna hold me in their big hairy arms?", PLAYER_NAME )]
];
export const CINSCRIPT_RANDOM_ENCOUNTER_2: CinematicModel = [
    [getSpeakScene( "Another splendid day in this beautiful city!", PLAYER_NAME )],
    [getEmoteScene( EMOTE_HEART ), getEmoteScene( EMOTE_HEART, PLAYER_NAME )],
    [getSpeakScene( "We are truly blessed to be here <3", PLAYER_NAME )]
];
export const CINSCRIPT_RANDOM_ENCOUNTER_3: CinematicModel = [
    [getSpeakScene( "I shot the sherrif!", PLAYER_NAME )],
    [getEmoteScene( EMOTE_SURPRISED, PLAYER_NAME )],
    [getSpeakScene( "But I didn't shoot the deputy...", PLAYER_NAME )],
    [getEmoteScene( EMOTE_HAPPY, PLAYER_NAME )]
];
export const CINSCRIPT_RANDOM_ENCOUNTER_4: CinematicModel = [
    [getSpeakYesNoScene( "Do you like bothering people in the street, moron?",
        // YES
        [[getEmoteScene( EMOTE_ANGRY )], [getSpeakScene( "I hope your parents are proud of you." )]],
        // NO
        [[getEmoteScene( EMOTE_ANGRY, null, PLAYER_NAME, false ), getSpeakScene( "Then why don't you piss off?" )]],
        PLAYER_NAME
    )]
];
export const CINSCRIPT_RANDOM_ENCOUNTER_5: CinematicModel = [
    [getSpeakScene( "Let's dance!", PLAYER_NAME )],
    [getAnimateSpriteScene( ANIM_TURN_CIRCLE_POSITIONAL ), getAnimateSpriteScene( ANIM_TURN_CIRCLE_POSITIONAL, false, false, PLAYER_NAME )],
    [getAnimateSpriteScene( ANIM_POWER_UP ), getAnimateSpriteScene( ANIM_POWER_UP, false, false, PLAYER_NAME )],
    [getAnimateSpriteScene( ANIM_BACK_AND_FORTH_POSITIONAL ), getAnimateSpriteScene( ANIM_BACK_AND_FORTH_POSITIONAL, false, false, PLAYER_NAME )],
    [getSpeakScene( "That's funky baby!!!", PLAYER_NAME )],
    [getEmoteScene( EMOTE_HEART, PLAYER_NAME )]
];
export const CINSCRIPT_RANDOM_ENCOUNTER_6: CinematicModel = [
    [getSpeakScene( "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", PLAYER_NAME )]
];

// Standard event cinematics
export const CINSCRIPT_LOCKED_DOOR: CinematicModel = [
    [getSpeakScene( "This door is locked.", null, PLAYER_NAME )],
    [getSpeakScene( "I need to find some way to open it..." )]
];
export const CINSCRIPT_UNLOCK_DOOR: CinematicModel = [
    [getSpeakScene( "Let's unlock this door now...", null, PLAYER_NAME, true, "misc/Heavy-Door-Lock--Unlocking.mp3" )]
];
export const CINSCRIPT_SAVE_GAME: CinematicModel = [
    [getSpeakYesNoScene( "Save the game?" ,
        // YES
        null,
        // NO
        [[getSpeakScene( "Why did you press the button then?", null, PLAYER_NAME )]],
        null,
        PLAYER_NAME
    )]
];
export const CINSCRIPT_SAVE_NOT_LOGGED_IN: CinematicModel = [
    [getSpeakScene( "You're not logged in, so you can't save the game.", null, PLAYER_NAME )],
    [getSpeakYesNoScene( "Log in now?" , null, null, null, PLAYER_NAME ) ]
];
export const CINSCRIPT_COLLECT_COIN: CinematicModel = [
    [getEmoteScene( EMOTE_SURPRISED, null, PLAYER_NAME )],
    [getSpeakScene( "It's a rare {R}coin!", null, PLAYER_NAME )],
    [getSpeakScene( "Crazy that people in the past used these things to pay for stuff...", null, PLAYER_NAME )],
    [getSpeakScene( "I'll add this one to my collection!", null, PLAYER_NAME )],
    [getDeleteSpriteScene( null, true, "misc/random5.wav" )]
];
export const CINSCRIPT_COLLECT_CAN: CinematicModel = [
    [getEmoteScene( EMOTE_SURPRISED, null, PLAYER_NAME )],
    [getSpeakScene( "It's a rare {R}Diet {R}Betes© can!", null, PLAYER_NAME )],
    [getSpeakScene( "Rumor has it that people used to drink plain water before {R}Diet {R}Betes© was invented.", null, PLAYER_NAME )],
    [getSpeakScene( "I'll add this one to my collection!", null, PLAYER_NAME )],
    [getDeleteSpriteScene( null, true, "misc/random5.wav" )]
];
export const CINSCRIPT_ELEVATOR: CinematicModel = [
    [getWaitScene(1)]
];