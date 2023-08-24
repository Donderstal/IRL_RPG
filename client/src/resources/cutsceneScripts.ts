import { DirectionEnum } from "../enumerables/DirectionEnum";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import { ANIM_BACK_AND_FORTH_POSITIONAL, ANIM_POWER_UP, ANIM_TURN_CIRCLE_POSITIONAL } from "../game-data/animationGlobals";
import { CHARNAME_CAR_SHACK_BOSS, CHARNAME_CAR_SHACK_MECHANIC, PLAYER_NAME } from "../game-data/interactionGlobals";
import { EMOTE_ANGRY, EMOTE_EXCLAMATIONMARK, EMOTE_HAPPY, EMOTE_HEART, EMOTE_QUESTIONMARK, EMOTE_SAD, EMOTE_SURPRISED } from "../game-data/textboxGlobals";
import type { CinematicModel } from "../models/CinematicModel";
import { getAnimateSpriteScene, getCameraMoveToSpriteScene, getDeleteSpriteScene, getEmoteScene, getFadeScene, getLoadMapScene, getScreenTextScene, getSpeakScene, getSpeakYesNoScene } from "./../factories/cinematicFactory";
import { MAP_IDS } from "./mapResources/mapIds";

type CutsceneScripts = {
    INTRO_CINEMATIC: CinematicModel;

    RANDOM_ENCOUNTER_1: CinematicModel;
    RANDOM_ENCOUNTER_2: CinematicModel;
    RANDOM_ENCOUNTER_3: CinematicModel;
    RANDOM_ENCOUNTER_4: CinematicModel;
    RANDOM_ENCOUNTER_5: CinematicModel;
    RANDOM_ENCOUNTER_6: CinematicModel;

    LOCKED_DOOR: CinematicModel;
    UNLOCK_DOOR: CinematicModel;
    SAVE_GAME: CinematicModel;
    SAVE_NOT_LOGGED_IN: CinematicModel;
    COLLECT_COIN: CinematicModel;
    COLLECT_CAN: CinematicModel;

    LH_A3_ROBOT_RECEPTIONIST: CinematicModel;
    LH_A3_ROBOT_COOK: CinematicModel;
    LH_A3_MONKEY_COOK: CinematicModel;

    LH_B3_KEY_GUY_1: CinematicModel;
    LH_B3_KEY_GUY_2: CinematicModel;
    LH_B3_KEY_GUY_3: CinematicModel;

    LH_B4_WHOLESOME_LIFTER: CinematicModel;

    LH_C1_FINDING_LOST_KEY: CinematicModel;

    LH_C2_BS12_APT4_RESIDENT: CinematicModel;
    LH_C2_BS12_APT2_ROBOT_1: CinematicModel;
    LH_C2_BS12_APT2_ROBOT_2: CinematicModel;

    LH_C3_CAR_SHACK_BOSS_1: CinematicModel;
    LH_C3_CAR_SHACK_BOSS_2: CinematicModel;
    LH_C3_CAR_SHACK_BOSS_3: CinematicModel;
    LH_C3_CAR_MECHANIC_1: CinematicModel;

    LH_C4_YUM_MART_OFFICE_GUY: CinematicModel;

    LH_D1_FRIENDLY_CHAD: CinematicModel;
    LH_D1_WHOLESOME_LIFTER: CinematicModel;

    LH_D2_LOOKING_FOR_APPARTMENT: CinematicModel;
    LH_D2_WHOLESOME_LIFTER: CinematicModel;
    LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_1: CinematicModel;
    LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_2: CinematicModel;
    LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_1: CinematicModel;
    LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_2: CinematicModel;
    LH_D2_SARSTUD_COMMUNAL_ROBOT1_1: CinematicModel;
    LH_D2_SARSTUD_COMMUNAL_ROBOT1_2: CinematicModel;
    LH_D2_SARSTUD_F1_A1_ROBOT1_1: CinematicModel;
    LH_D2_SARSTUD_F1_A1_ROBOT1_2: CinematicModel;
    LH_D2_SARSTUD_F1_A1_ROBOT1_3: CinematicModel;
    LH_D2_SARSTUD_F1_A1_POLICEWOMAN1: CinematicModel;

    LH_E4_WHOLESOME_LIFTER: CinematicModel;
}

export const CUTSCENE_SCRIPTS: CutsceneScripts = {
    //#region Storyline cinscripts
    INTRO_CINEMATIC: [
        [getFadeScene( SceneAnimationType.fadeOut )],
        [getScreenTextScene( "-PROJECT JULIUS-", true )],
        [getScreenTextScene( "IN THE NEAR FUTURE, SOCIETY LOOKS MORE OR LESS THE SAME AS IT DOES IN THE PRESENT DAY." )],
        [getScreenTextScene( "THE SUN STILL SHINES AND PEOPLE STILL WASTE THEIR TIME WITH EXHAUSTING SOCIAL MEDIA DISCUSSIONS." )],
        [getScreenTextScene( "BUT BELOW THE SURFACE, THINGS ARE RAPIDLY CHANGING..." )],

        [getLoadMapScene( MAP_IDS.CINEMATIC_MAPS.CINEMATIC_INTRO_MAP_1, false, null, { column: 18, row: 7 } )],
        [getFadeScene( SceneAnimationType.fadeIn, .5 )],
        [getCameraMoveToSpriteScene( false, "CASHIER_ROBOT_LEFT", false )],
        [getScreenTextScene( "BASIC INCOME IS SLOWLY BEING ROLLED OUT, CHANGING THE WAY PEOPLE LIVE AND WORK." )],
        [getScreenTextScene( "ROBOTS HAVE STARTED ENTERING THE WORKFORCE, ESPECIALLY IN INDUSTRY AND RETAIL." )],
        [getScreenTextScene( "MORE AND MORE PEOPLE ARE DROPPING OUT OF LABOUR, CHOOSING TO SPEND THEIR DAYS WITH THEIR MEAGRE BASIC INCOMES." )],
        [getFadeScene( SceneAnimationType.fadeOut )],

        [getLoadMapScene( MAP_IDS.CINEMATIC_MAPS.CINEMATIC_INTRO_MAP_2, false, null, { column: 22, row: 24 } )],
        [getFadeScene( SceneAnimationType.fadeIn, .5 )],
        [getCameraMoveToSpriteScene( false, "CIN-SPRITE-END-POSITION", false )],
        [getScreenTextScene( "AS INTERNATIONAL CORPORATIONS HAVE BECOME MORE POWERFUL, STATES ARE LOSING INFLUENCE AND RESPONSIBILITY." )],
        [getScreenTextScene( "SLOWLY, MORE AND MORE ESSENTIAL SERVICES LIKE EDUCATION AND POLICING ARE BEING PRIVATIZED." )],
        [getScreenTextScene( "PROFITS ARE THROUGH THE ROOF, BUT THE LESS FORTUNATE ARE SUPPRESSED OR NEGLECTED." )],
        [getFadeScene( SceneAnimationType.fadeOut )],

        [getLoadMapScene( MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F3_APT, true, { column: 2, row: 4, direction: DirectionEnum.up } )],
        [getFadeScene( SceneAnimationType.fadeIn, .5 )],
        [getScreenTextScene( "BUT OUR STORY STARTS SMALL, FAR AWAY FROM ALL THESE INTRIGUING DEVELOPMENTS." )],
        [getScreenTextScene( "IT STARTS IN A TINY STUDIO APPARTMENT IN A NOT-SO-FANCY PART OF TOWN, WHERE A NOT-SO-YOUNG MAN IS PLAYING VIDEO GAMES." )],
        [getScreenTextScene( "OUR HERO HAS NO IDEA OF THE THINGS THAT ARE TO COME. IT'S JUST ANOTHER DAY, AND HE NEEDS TO GO TO WORK..." )],
        [getFadeScene( SceneAnimationType.fadeIn )],

        [getSpeakScene( "Another day stocking shelves and helping customers at the Yum Mart...", null, PLAYER_NAME )],
        [getSpeakScene( "This wasn't where I expected myself to be at 30 years, working in a supermarket.", null, PLAYER_NAME )],
        [getSpeakScene( "Oh well, it could be worse. Let's get going before I'm late!", null, PLAYER_NAME )],
    ],
    //#endregion
    //#region Random encounter cinscripts
    RANDOM_ENCOUNTER_1: [
        [getSpeakScene( "I can't believe the government took away my pet gorilla!", PLAYER_NAME )],
        [getEmoteScene( EMOTE_SAD ), getEmoteScene( EMOTE_SURPRISED, PLAYER_NAME )],
        [getSpeakScene( "Now who's gonna hold me in their big hairy arms?", PLAYER_NAME )]
    ],
    RANDOM_ENCOUNTER_2: [
        [getSpeakScene( "Another splendid day in this beautiful city!", PLAYER_NAME )],
        [getEmoteScene( EMOTE_HEART ), getEmoteScene( EMOTE_HEART, PLAYER_NAME )],
        [getSpeakScene( "We are truly blessed to be here <3", PLAYER_NAME )]
    ],
    RANDOM_ENCOUNTER_3: [
        [getSpeakScene( "I shot the sherrif!", PLAYER_NAME )],
        [getEmoteScene( EMOTE_SURPRISED, PLAYER_NAME )],
        [getSpeakScene( "But I didn't shoot the deputy...", PLAYER_NAME )],
        [getEmoteScene( EMOTE_HAPPY, PLAYER_NAME )]
    ],
    RANDOM_ENCOUNTER_4: [
        [getSpeakYesNoScene( "Do you like bothering people in the street, moron?",
            // YES
            [[getEmoteScene( EMOTE_ANGRY )], [getSpeakScene( "I hope your parents are proud of you." )]],
            // NO
            [[getEmoteScene( EMOTE_ANGRY, null, PLAYER_NAME, false ), getSpeakScene( "Then why don't you piss off?" )]],
            PLAYER_NAME
        )]
    ],
    RANDOM_ENCOUNTER_5: [
        [getSpeakScene( "Let's dance!", PLAYER_NAME )],
        [getAnimateSpriteScene( ANIM_TURN_CIRCLE_POSITIONAL ), getAnimateSpriteScene( ANIM_TURN_CIRCLE_POSITIONAL, false, false, PLAYER_NAME )],
        [getAnimateSpriteScene( ANIM_POWER_UP ), getAnimateSpriteScene( ANIM_POWER_UP, false, false, PLAYER_NAME )],
        [getAnimateSpriteScene( ANIM_BACK_AND_FORTH_POSITIONAL ), getAnimateSpriteScene( ANIM_BACK_AND_FORTH_POSITIONAL, false, false, PLAYER_NAME )],
        [getSpeakScene( "That's funky baby!!!", PLAYER_NAME )],
        [getEmoteScene( EMOTE_HEART, PLAYER_NAME )]
    ],
    RANDOM_ENCOUNTER_6: [
        [getSpeakScene( "Is it just me or do you also enjoy speaking in crazy long sentences that have little meaning to complete strangers??", PLAYER_NAME )]
    ],
    //#endregion
    //#region Standard event cinscripts
    LOCKED_DOOR: [
        [getSpeakScene( "This door is locked.", null, PLAYER_NAME )],
        [getSpeakScene( "I need to find some way to open it..." )]
    ],
    UNLOCK_DOOR: [
        [getSpeakScene( "Let's unlock this door now...", null, PLAYER_NAME, true, "misc/Heavy-Door-Lock--Unlocking.mp3" )]
    ],
    SAVE_GAME: [
        [getSpeakYesNoScene( "Save the game?",
            // YES
            null,
            // NO
            [[getSpeakScene( "Why did you press the button then?", null, PLAYER_NAME )]],
            null,
            PLAYER_NAME
        )]
    ],
    SAVE_NOT_LOGGED_IN: [
        [getSpeakScene( "You're not logged in, so you can't save the game.", null, PLAYER_NAME )],
        [getSpeakYesNoScene( "Log in now?", null, null, null, PLAYER_NAME )]
    ],
    COLLECT_COIN: [
        [getEmoteScene( EMOTE_SURPRISED, null, PLAYER_NAME )],
        [getSpeakScene( "It's a rare {R}coin!", null, PLAYER_NAME )],
        [getSpeakScene( "Crazy that people in the past used these things to pay for stuff...", null, PLAYER_NAME )],
        [getSpeakScene( "I'll add this one to my collection!", null, PLAYER_NAME )],
        [getDeleteSpriteScene( null, true, "misc/random5.wav" )]
    ],
    COLLECT_CAN: [
        [getEmoteScene( EMOTE_SURPRISED, null, PLAYER_NAME )],
        [getSpeakScene( "It's a rare {R}Diet {R}Betes© can!", null, PLAYER_NAME )],
        [getSpeakScene( "Rumor has it that people used to drink plain water before {R}Diet {R}Betes© was invented.", null, PLAYER_NAME )],
        [getSpeakScene( "I'll add this one to my collection!", null, PLAYER_NAME )],
        [getDeleteSpriteScene( null, true, "misc/random5.wav" )]
    ],
    //#endregion
    //#region LH A3 cinscripts
    LH_A3_ROBOT_RECEPTIONIST: [
        [getSpeakScene( "Greetings sir, welcome to the Two Towers Hotel!", PLAYER_NAME )],
        [getSpeakScene( "I regret to tell you we are fully booked today.", PLAYER_NAME )],
        [getSpeakScene( "We're hosting many prominent international businessmen.", PLAYER_NAME )]
    ],
    LH_A3_ROBOT_COOK: [
        [getSpeakScene( "What am I supposed to cook? I don't even eat.", PLAYER_NAME )],
        [getSpeakScene( "I was thinking ice cream with sweet sour sauce?", PLAYER_NAME )]
    ],
    LH_A3_MONKEY_COOK: [
        [getSpeakScene( "Tonight the chefs special is baked banana with banana bread.", PLAYER_NAME )],
        [getSpeakScene( "For dessert we've got a lovely fresh banana split!", PLAYER_NAME )]
    ],
    //#endregion
    //#region LH B3 cinscripts
    LH_B3_KEY_GUY_1: [
        [getSpeakScene( "Woah, it's the key finding dude!", PLAYER_NAME )],
        [getSpeakScene( "You're the best bro, my whole family loves you!", PLAYER_NAME )],
    ],
    LH_B3_KEY_GUY_2: [
        [getSpeakScene( "Wow, did you find my keys?", PLAYER_NAME )],
        [getSpeakScene( "<3 Thanks bro you're my hero <3", PLAYER_NAME )],
    ],
    LH_B3_KEY_GUY_3: [
        [getSpeakScene( "I lost my keys at the parking lot.", PLAYER_NAME )],
        [getSpeakScene( "I hope it wasn't found by those shady guys hanging out there...", PLAYER_NAME )],
    ],
    //#endregion
    //#region LH B4 cinscripts
    LH_B4_WHOLESOME_LIFTER: [
        [getSpeakScene( "Just another day lifting and being handsome!", PLAYER_NAME )],
        [getSpeakScene( "If you need some dumbbells I can't help ya though...", PLAYER_NAME )],
        [getSpeakScene( "I only hand them out to my bros, or bros of my bros!", PLAYER_NAME )]
    ],
    //#endregion
    //#region LH C1 cinscripts
    LH_C1_FINDING_LOST_KEY: [
        [getSpeakScene( "Looks like someone lost their keys here...", PLAYER_NAME )],
        [getSpeakScene( "I better pick 'em just in case", PLAYER_NAME )],
        [getDeleteSpriteScene( null, true, "misc/random5.wav" )]
    ],
    //#endregion
    //#region LH C2 cinscripts
        //#region Baker Street 12
        LH_C2_BS12_APT4_RESIDENT: [
            [getSpeakScene( "Can't you see I'm trying to cook dinner?", PLAYER_NAME )],
            [getSpeakScene( "It's quite rude to just barge into people's homes without knocking.", PLAYER_NAME )],
            [getSpeakScene( "I'm just saying, this is why the old neighbours didn't like you...", PLAYER_NAME )]
        ],
        LH_C2_BS12_APT2_ROBOT_1: [
            [getSpeakScene( "Hello human neighbour #2. Let us bond by complaining about powerful people.", PLAYER_NAME )],
            [getSpeakScene( "Me and my robro wanted to remove the toilet, but the landlord didn't want it.", PLAYER_NAME )],
            [getSpeakScene( "Apparently a toilet is mandatory in each appartment. How crazy is that?", PLAYER_NAME )]
        ],
        LH_C2_BS12_APT2_ROBOT_2: [
            [getSpeakScene( "I used to work as a sexbot, you know?", PLAYER_NAME )],
            [getSpeakScene( "It was a rather rough trade. Turns out humans can be pretty disgusting", PLAYER_NAME )]
        ],
        //#endregion
    //#endregion
    //#region LH C3 cinscripts
        //#region Car shack
        LH_C3_CAR_SHACK_BOSS_1: [
            [
                getSpeakYesNoScene( "You here to apply as our new car mechanic?",
                    [
                        [getSpeakScene( "Well you look like you've never held a wrench before.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )]
                    ],
                    [
                        [getSpeakScene( "You don't look like much of a mechanic anyway.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )]
                    ],
                    PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )
            ],
            [getSpeakScene( "I never said I held a wrench before.", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME )],
            [getSpeakScene( "I might be able to use your help anyway though.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "Last week we had this robot applying to work here.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS ), getEmoteScene( EMOTE_QUESTIONMARK, CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME )],
            [getSpeakScene( "Normally I don't trust robots, but this time I thought I'd try my luck.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "So this robot's coming to work here right? And he's a pretty decent mechanic too.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "So me and old man Li there decided to hit the pub for some daydrinking, right?", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "When we came back, half our supplies are gone. He even stole Li's favorite wrench!", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "I knew I shouldn't have trusted a darned robot with my tools!", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS ), getEmoteScene( EMOTE_SAD, null, CHARNAME_CAR_SHACK_MECHANIC )],
            [getSpeakScene( "Anyway, I need you to find this robot for me. I heard he lives in Sardine Studios. That's the orange building across the street", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "If you find this robot we'll fix you car for free!", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "I don't have a car though...", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME ), getEmoteScene( EMOTE_HEART, null, CHARNAME_CAR_SHACK_MECHANIC )],
            [getSpeakScene( "Well if you ever get one, you know where to find us. Now go and find this robot!", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
        ],
        LH_C3_CAR_SHACK_BOSS_2: [
            [getSpeakScene( "So how's it going kid?", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "You manage to find that thievin' robot yet?", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
        ],
        LH_C3_CAR_SHACK_BOSS_3: [
            [getSpeakScene( "I hope you're bringing good news, kid?", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "I've found the robot!", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME )],
            [getSpeakScene( "He lives on the first floor of Sardine Studios, first appartment on the right!", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME ), getEmoteScene( EMOTE_EXCLAMATIONMARK, null, CHARNAME_CAR_SHACK_MECHANIC ), getEmoteScene( EMOTE_EXCLAMATIONMARK, null, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "He ate Li's wrench too, he's an extremely unpleasant person...", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME )],
            [getSpeakScene( "Ah dammit, that's the best wrench we ever had in this company.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS ), getEmoteScene( EMOTE_SAD, null, CHARNAME_CAR_SHACK_MECHANIC )],
            [getSpeakScene( "Thanks a lot kid! We'll contact the police and hopefully we'll get back our stuff soon.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
            [getSpeakScene( "I'd rather go there and kick his ass myself, but robots are pretty strong.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
        ],
        LH_C3_CAR_MECHANIC_1: [
            [getSpeakScene( "I'm not much of a talker, kid.", CHARNAME_CAR_SHACK_MECHANIC )],
            [getSpeakScene( "Talk to Clint if you need something.", CHARNAME_CAR_SHACK_MECHANIC )]
        ],
        //#endregion
    //#endregion
    //#region LH C4 cinscripts
    LH_C4_YUM_MART_OFFICE_GUY: [
        [getSpeakScene( "I hate my wife..." )],
        [getSpeakScene( "But I'm loving these profits!" )],
        [getAnimateSpriteScene( ANIM_TURN_CIRCLE_POSITIONAL )],
        [getEmoteScene( EMOTE_HEART )]
    ],
    //#endregion
    //#region LH D1 cinscripts
    LH_D1_FRIENDLY_CHAD: [
        [getSpeakScene( "My bro's having some rough feels man." )],
        [getSpeakScene( "We'd really appreciate you helping a bro out." )]
    ],
    LH_D1_WHOLESOME_LIFTER: [
        [getSpeakScene( "What could be better than pumping iron with your bros?" )]
    ],
    //#endregion
    //#region LH D2 cinscripts
    LH_D2_LOOKING_FOR_APPARTMENT: [
        [getSpeakScene( "This is my favorite part of the city.", PLAYER_NAME )],
        [getSpeakScene( "Like, there's nice cocktail bars and yoga studios.", PLAYER_NAME )],
        [getSpeakScene( "But all the poor people are still here to give it a authentic vibe, you know?", PLAYER_NAME )]
    ],
    LH_D2_WHOLESOME_LIFTER: [
        [getSpeakScene( "You know that a lot of people think that us buff guys are assholes?", PLAYER_NAME )],
        [getSpeakScene( "Just shows that they've no idea what they're talking about!", PLAYER_NAME )],
        [getSpeakScene( "I always visit my grandma, you know? Never skip a week!", PLAYER_NAME )],
        [getEmoteScene( EMOTE_HEART )]
    ],
        //#region Sardine Studios cinscript
        LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_1: [
            [getSpeakScene( "The rent might be sky high, but at least we have this cool communal space!" )]
        ],
        LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_2: [
            [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. Apparently he lives here?", null, PLAYER_NAME )],
            [getSpeakScene( "A thieving robot dude?", PLAYER_NAME, null )],
            [getSpeakScene( "The only robot I know here is Botterson over there, and he's more of a dandy", PLAYER_NAME, null )],
        ],
        LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_1: [
            [getSpeakScene( "I hate living in these shitty studio appartments." )]
        ],
        LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_2: [
            [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. I've been told he lives here?", null, PLAYER_NAME )],
            [getSpeakScene( "I'm sorry but robots are gross, I don't hang out with them.", PLAYER_NAME, null )]
        ],
        LH_D2_SARSTUD_COMMUNAL_ROBOT1_1: [
            [getSpeakScene( "I'm the most fashionable robot around <3.", PLAYER_NAME )],
            [getSpeakScene( "Other robots like motor oil and stuff like that, but not me!", PLAYER_NAME )],
            [getSpeakScene( "Like that weird robot that lives on the first floor, he's SO unsophisticated.", PLAYER_NAME )]
        ],
        LH_D2_SARSTUD_COMMUNAL_ROBOT1_2: [
            [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. I've been told he lives here?", null, PLAYER_NAME )],
            [getSpeakScene( "Oh darling, did you specifically ask me because I'm a robot too?", PLAYER_NAME, null )],
            [getSpeakScene( "Truly a shame that you'd think that way, truly a shame.", PLAYER_NAME, null )]
        ],
        LH_D2_SARSTUD_F1_A1_ROBOT1_1:  [
            [getSpeakScene( "I've got all the oil and gears a robot can wish for.", PLAYER_NAME )],
            [getSpeakScene( "How I got it is a secret, and all the other robots are jealous!", PLAYER_NAME )]
        ],
        LH_D2_SARSTUD_F1_A1_ROBOT1_2: [
            [getSpeakScene( "I'm looking for the robot that robbed the Car Shack. Looks like you have a lot of supplies around here?", null, PLAYER_NAME )],
            [getSpeakScene( "What are you gonna do about it, human? I can bribe any robocop I want with this amount of oil.", PLAYER_NAME, null )],
            [getSpeakScene( "I even ate Li's favorite wrench!", PLAYER_NAME, null )],
            [getSpeakScene( "You might think you're smart now, but justice finds a way...", null, PLAYER_NAME ), getEmoteScene( EMOTE_ANGRY, null, PLAYER_NAME )]
        ],
        LH_D2_SARSTUD_F1_A1_ROBOT1_3: [
            [getSpeakScene( "You tattling meat sack... humans are all the same!", PLAYER_NAME )]
        ],
        LH_D2_SARSTUD_F1_A1_POLICEWOMAN1: [
            [getSpeakScene( "A stealing robot used to live here.", PLAYER_NAME )],
            [getSpeakScene( "Apparently he stole a ton of wrenches and oil from car shops around the city.", PLAYER_NAME )],
            [getSpeakScene( "We returned all the stolen stuff, but the sadly the robot escaped. I'm here in case he comes back.", PLAYER_NAME )],
        ],
        //#endregion
    //#endregion
    //#region LH E4 cinscripts
    LH_E4_WHOLESOME_LIFTER: [
        [getSpeakScene( "Lifting is the best bro!", PLAYER_NAME )],
        [getSpeakScene( "Really increases your self - esteem too, you should try it.", PLAYER_NAME )]
    ]
    //#endregion
}