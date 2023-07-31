import { CHARNAME_CAR_SHACK_BOSS, CHARNAME_CAR_SHACK_MECHANIC, IKEY_CAR_SHACK_1, IKEY_CAR_SHACK_2, IKEY_CAR_SHACK_3, PLAYER_NAME } from "../../../../../game-data/interactionGlobals";
import { EMOTE_EXCLAMATIONMARK, EMOTE_HEART, EMOTE_QUESTIONMARK, EMOTE_SAD } from "../../../../../game-data/textboxGlobals";
import type { CinematicModel } from "../../../../../models/CinematicModel";
import { getEmoteScene, getSpeakScene, getSpeakYesNoScene } from "../../../../../factories/cinematicFactory";
import { getDefaultCondition, getInteractionNotRegisteredCondition, getInteractionRegisteredCondition } from "../../../../../factories/conditionFactory";
import { getDefaultTalkInteraction, getRegistryTalkInteraction } from "../../../../../factories/interactionFactory";

// Car Shack Boss Clint
const CINSCRIPT_CAR_SHACK_BOSS_1: CinematicModel = [
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
];

const CINSCRIPT_CAR_SHACK_BOSS_2: CinematicModel = [
    [getSpeakScene( "So how's it going kid?", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
    [getSpeakScene( "You manage to find that thievin' robot yet?", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
];

const CINSCRIPT_CAR_SHACK_BOSS_3: CinematicModel = [
    [getSpeakScene( "I hope you're bringing good news, kid?", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
    [getSpeakScene( "I've found the robot!", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME )],
    [getSpeakScene( "He lives on the first floor of Sardine Studios, first appartment on the right!", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME ), getEmoteScene( EMOTE_EXCLAMATIONMARK, null, CHARNAME_CAR_SHACK_MECHANIC ), getEmoteScene( EMOTE_EXCLAMATIONMARK, null, CHARNAME_CAR_SHACK_BOSS )],
    [getSpeakScene( "He ate Li's wrench too, he's an extremely unpleasant person...", CHARNAME_CAR_SHACK_BOSS, PLAYER_NAME )],
    [getSpeakScene( "Ah dammit, that's the best wrench we ever had in this company.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS ), getEmoteScene( EMOTE_SAD, null, CHARNAME_CAR_SHACK_MECHANIC )],
    [getSpeakScene( "Thanks a lot kid! We'll contact the police and hopefully we'll get back our stuff soon.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
    [getSpeakScene( "I'd rather go there and kick his ass myself, but robots are pretty strong.", PLAYER_NAME, CHARNAME_CAR_SHACK_BOSS )],
];

export const C3_INTERACTION_CAR_SHACK_BOSS = [
    getRegistryTalkInteraction( CINSCRIPT_CAR_SHACK_BOSS_3, getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ), IKEY_CAR_SHACK_3 ),
    getRegistryTalkInteraction( CINSCRIPT_CAR_SHACK_BOSS_1, getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_1 ), IKEY_CAR_SHACK_1 ),
    getDefaultTalkInteraction( CINSCRIPT_CAR_SHACK_BOSS_2, getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) )
];

// Car Shack Mechanic Li
const CINSCRIPT_CAR_MECHANIC_1: CinematicModel = [
    [getSpeakScene( "I'm not much of a talker, kid.", CHARNAME_CAR_SHACK_MECHANIC )],
    [getSpeakScene( "Talk to Clint if you need something.", CHARNAME_CAR_SHACK_MECHANIC )]
];

export const C3_INTERACTION_CAR_SHACK_MECHANIC = [
    getDefaultTalkInteraction( CINSCRIPT_CAR_MECHANIC_1, getDefaultCondition() )
];