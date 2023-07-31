import { DirectionEnum } from "../enumerables/DirectionEnum";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import { PLAYER_NAME } from "../game-data/interactionGlobals";
import type { CinematicModel } from "../models/CinematicModel";
import { getCameraMoveToSpriteScene, getFadeScene, getLoadMapScene, getScreenTextScene, getSpeakScene } from "./../factories/cinematicFactory";
import { CM_INTRO_CINEMATIC_MAP_1, CM_INTRO_CINEMATIC_MAP_2 } from "./mapResources/cinematic_maps/cinematic_maps_res";
import { LH_BAKER_STREET_12_F3_APT_KEY } from "./mapResources/leonard_heights/leonard_heights_res";

export const CINSCRIPT_INTRO_CINEMATIC: CinematicModel = [
    [getFadeScene( SceneAnimationType.fadeOut )],
    [getScreenTextScene( "-PROJECT JULIUS-", true )],
    [getScreenTextScene( "IN THE NEAR FUTURE, SOCIETY LOOKS MORE OR LESS THE SAME AS IT DOES IN THE PRESENT DAY." )],
    [getScreenTextScene( "THE SUN STILL SHINES AND PEOPLE STILL WASTE THEIR TIME WITH EXHAUSTING SOCIAL MEDIA DISCUSSIONS." )],
    [getScreenTextScene( "BUT BELOW THE SURFACE, THINGS ARE RAPIDLY CHANGING..." )],

    [getLoadMapScene( CM_INTRO_CINEMATIC_MAP_2, false, null, {column: 18, row: 7} )],
    [getFadeScene( SceneAnimationType.fadeIn, .5 )],
    [getCameraMoveToSpriteScene( false, "CASHIER_ROBOT_LEFT", false )],
    [getScreenTextScene( "BASIC INCOME IS SLOWLY BEING ROLLED OUT, CHANGING THE WAY PEOPLE LIVE AND WORK." )],
    [getScreenTextScene( "ROBOTS HAVE STARTED ENTERING THE WORKFORCE, ESPECIALLY IN INDUSTRY AND RETAIL." )],
    [getScreenTextScene( "MORE AND MORE PEOPLE ARE DROPPING OUT OF LABOUR, CHOOSING TO SPEND THEIR DAYS WITH THEIR MEAGRE BASIC INCOMES." )],
    [getFadeScene( SceneAnimationType.fadeOut )],

    [getLoadMapScene( CM_INTRO_CINEMATIC_MAP_1, false, null, { column: 22, row: 24 } )],
    [getFadeScene( SceneAnimationType.fadeIn, .5 )],
    [getCameraMoveToSpriteScene( false, "CIN-SPRITE-END-POSITION", false )],
    [getScreenTextScene( "AS INTERNATIONAL CORPORATIONS HAVE BECOME MORE POWERFUL, STATES ARE LOSING INFLUENCE AND RESPONSIBILITY." )],
    [getScreenTextScene( "SLOWLY, MORE AND MORE ESSENTIAL SERVICES LIKE EDUCATION AND POLICING ARE BEING PRIVATIZED." )],
    [getScreenTextScene( "PROFITS ARE THROUGH THE ROOF, BUT THE LESS FORTUNATE ARE SUPPRESSED OR NEGLECTED." )],
    [getFadeScene( SceneAnimationType.fadeOut )],

    [getLoadMapScene( LH_BAKER_STREET_12_F3_APT_KEY, true, { column: 2, row: 4, direction: DirectionEnum.up })],
    [getFadeScene( SceneAnimationType.fadeIn, .5 )],
    [getScreenTextScene( "BUT OUR STORY STARTS SMALL, FAR AWAY FROM ALL THESE INTRIGUING DEVELOPMENTS." )],
    [getScreenTextScene( "IT STARTS IN A TINY STUDIO APPARTMENT IN A NOT-SO-FANCY PART OF TOWN, WHERE A NOT-SO-YOUNG MAN IS PLAYING VIDEO GAMES." )],
    [getScreenTextScene( "OUR HERO HAS NO IDEA OF THE THINGS THAT ARE TO COME. IT'S JUST ANOTHER DAY, AND HE NEEDS TO GO TO WORK..." )],
    [getFadeScene( SceneAnimationType.fadeIn )],

    [getSpeakScene( "Another day stocking shelves and helping customers at the Yum Mart...", null, PLAYER_NAME )],
    [getSpeakScene( "This wasn't where I expected myself to be at 30 years, working in a supermarket.", null, PLAYER_NAME )],
    [getSpeakScene( "Oh well, it could be worse. Let's get going before I'm late!", null, PLAYER_NAME )],
]

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