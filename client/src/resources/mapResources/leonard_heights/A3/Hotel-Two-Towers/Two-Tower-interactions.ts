import { ConditionType } from "../../../../../enumerables/ConditionTypeEnum"
import { InteractionType } from "../../../../../enumerables/InteractionType"
import { SceneAnimationType } from "../../../../../enumerables/SceneAnimationTypeEnum"
import { PLAYER_NAME } from "../../../../../game-data/interactionGlobals"
import type { CinematicModel } from "../../../../../models/CinematicModel"
import { getSpeakScene } from "../../../../cinematicFactory"
import { getDefaultCondition } from "../../../../conditionFactory"
import { getDefaultTalkInteraction } from "../../../../interactionFactory"

const CINSCRIPT_ROBOT_RECEPTIONIST: CinematicModel = [
    [getSpeakScene( "Greetings sir, welcome to the Two Towers Hotel!", PLAYER_NAME )],
    [getSpeakScene( "I regret to tell you we are fully booked today.", PLAYER_NAME )],
    [getSpeakScene( "We're hosting many prominent international businessmen.", PLAYER_NAME )]
];
export const A3_INTERACTION_ROBOT_RECEPTIONIST = [
    getDefaultTalkInteraction( CINSCRIPT_ROBOT_RECEPTIONIST, getDefaultCondition() )
];

const CINSCRIPT_ROBOT_COOK: CinematicModel = [
    [getSpeakScene( "What am I supposed to cook? I don't even eat.", PLAYER_NAME )],
    [getSpeakScene( "I was thinking cupcakes in sweet sour sauce.", PLAYER_NAME )]
];
export const A3_INTERACTION_ROBOT_COOK = [
    getDefaultTalkInteraction( CINSCRIPT_ROBOT_COOK, getDefaultCondition() )
];

const CINSCRIPT_MONKEY_COOK: CinematicModel = [
    [getSpeakScene( "Tonight the chefs special is baked banana with banana bread.", PLAYER_NAME )],
    [getSpeakScene( "For dessert we've got a lovely fresh banana split!", PLAYER_NAME )]
]

export const A3_INTERACTION_MONKEY_COOK = [
    getDefaultTalkInteraction( CINSCRIPT_MONKEY_COOK, getDefaultCondition() )
]