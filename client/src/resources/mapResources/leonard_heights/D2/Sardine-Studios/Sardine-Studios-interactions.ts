import { IKEY_CAR_SHACK_1, IKEY_CAR_SHACK_2, PLAYER_NAME } from "../../../../../game-data/interactionGlobals";
import { EMOTE_ANGRY } from "../../../../../game-data/textboxGlobals";
import type { CinematicModel } from "../../../../../models/CinematicModel";
import { getEmoteScene, getSpeakScene } from "../../../../../factories/cinematicFactory";
import { getDefaultCondition, getInteractionRegisteredCondition } from "../../../../../factories/conditionFactory";
import { getDefaultTalkInteraction, getRegistryTalkInteraction } from "../../../../../factories/interactionFactory";

// Communal space guy
const CINSCRIPT_COMMUNAL_SPACE_GUY_1: CinematicModel = [
    [getSpeakScene( "The rent might be sky high, but at least we have this cool communal space!" )]
];
const CINSCRIPT_COMMUNAL_SPACE_GUY_2: CinematicModel = [
    [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. Apparently he lives here?", null, PLAYER_NAME )],
    [getSpeakScene( "A thieving robot dude?", PLAYER_NAME, null )],
    [getSpeakScene( "The only robot I know here is Botterson over there, and he's more of a dandy", PLAYER_NAME, null )],
];
export const D2_INTERACTION_COMMUNAL_SPACE_GUY = [
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_SPACE_GUY_1, getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_SPACE_GUY_2, getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_SPACE_GUY_1, getDefaultCondition() )
];

// communal space woman
const CINSCRIPT_COMMUNAL_SPACE_WOMAN1: CinematicModel = [
    [getSpeakScene( "I hate living in these shitty studio appartments." )]
];
const CINSCRIPT_COMMUNAL_SPACE_WOMAN2: CinematicModel = [
    [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. I've been told he lives here?", null, PLAYER_NAME )],
    [getSpeakScene( "I'm sorry but robots are gross, I don't hang out with them.", PLAYER_NAME, null )]
];
export const D2_INTERACTION_COMMUNAL_SPACE_WOMAN = [
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_SPACE_WOMAN1, getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_SPACE_WOMAN2, getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_SPACE_WOMAN1, getDefaultCondition() )
];

// communal space robot
const CINSCRIPT_COMMUNAL_ROBOT_1: CinematicModel = [
    [getSpeakScene( "I'm the most fashionable robot around <3.", PLAYER_NAME )],
    [getSpeakScene( "Other robots like motor oil and stuff like that, but not me!", PLAYER_NAME )],
    [getSpeakScene( "Like that weird robot that lives on the first floor, he's SO unsophisticated.", PLAYER_NAME )]
];
const CINSCRIPT_COMMUNAL_ROBOT_2: CinematicModel = [
    [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. I've been told he lives here?", null, PLAYER_NAME )],
    [getSpeakScene( "Oh darling, did you specifically ask me because I'm a robot too?", PLAYER_NAME, null )],
    [getSpeakScene( "Truly a shame that you'd think that way, truly a shame.", PLAYER_NAME, null )]
];
export const D2_INTERACTION_COMMUNAL_ROBOT = [
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_ROBOT_1, getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_ROBOT_2, getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
    getDefaultTalkInteraction( CINSCRIPT_COMMUNAL_ROBOT_1, getDefaultCondition() )
];

// first floor app 1 robot
const CINSCRIPT_SARDINESTUDIOS_FLOOR1_APP1_ROBOT_1: CinematicModel = [
    [getSpeakScene( "I've got all the oil and gears a robot can wish for.", PLAYER_NAME )],
    [getSpeakScene( "How I got it is a secret, and all the other robots are jealous!", PLAYER_NAME )]
];
const CINSCRIPT_SARDINESTUDIOS_FLOOR1_APP1_ROBOT_2: CinematicModel = [
    [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. Looks like you have a lot of supplies around here?", null, PLAYER_NAME )],
    [getSpeakScene( "What are you gonna do about it, human? I can bribe any robocop I want with this amount of oil.", PLAYER_NAME, null )],
    [getSpeakScene( "I even ate Li's favorite wrench!", PLAYER_NAME, null )],
    [getSpeakScene( "You might think you're smart now, but justice finds a way...", null, PLAYER_NAME ), getEmoteScene(EMOTE_ANGRY, null, PLAYER_NAME)]
];
const CINSCRIPT_SARDINESTUDIOS_FLOOR1_APP1_ROBOT_3: CinematicModel = [
    [getSpeakScene( "You tattling meat sack... humans are all the same!", PLAYER_NAME )]
];
export const D2_INTERACTION_FLOOR1_APP1_ROBOT_1 = [
    getDefaultTalkInteraction( CINSCRIPT_SARDINESTUDIOS_FLOOR1_APP1_ROBOT_3, getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
    getRegistryTalkInteraction( CINSCRIPT_SARDINESTUDIOS_FLOOR1_APP1_ROBOT_2, getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ), IKEY_CAR_SHACK_2 ),
    getDefaultTalkInteraction( CINSCRIPT_SARDINESTUDIOS_FLOOR1_APP1_ROBOT_1, getDefaultCondition() )
];

// first floor app 1 policewoman
const CINSCRIPT_FLOOR1_APP1_POLICEWOMAN_1: CinematicModel = [
    [getSpeakScene( "A stealing robot used to live here.", PLAYER_NAME )],
    [getSpeakScene( "Apparently he stole a ton of wrenches and oil from car shops around the city.", PLAYER_NAME )],
    [getSpeakScene( "We returned all the stolen stuff, but the sadly the robot escaped. I'm here in case he comes back.", PLAYER_NAME )],
];
export const D2_INTERACTION_FLOOR1_APP1_POLICEWOMAN = [
    getDefaultTalkInteraction( CINSCRIPT_FLOOR1_APP1_POLICEWOMAN_1, getDefaultCondition() )
];