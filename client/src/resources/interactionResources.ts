import { CINSCRIPT_COLLECT_CAN, CINSCRIPT_COLLECT_COIN, CINSCRIPT_ELEVATOR, CINSCRIPT_LOCKED_DOOR, CINSCRIPT_RANDOM_ENCOUNTER_1, CINSCRIPT_RANDOM_ENCOUNTER_2, CINSCRIPT_RANDOM_ENCOUNTER_3, CINSCRIPT_RANDOM_ENCOUNTER_4, CINSCRIPT_RANDOM_ENCOUNTER_5, CINSCRIPT_RANDOM_ENCOUNTER_6, CINSCRIPT_SAVE_GAME, CINSCRIPT_SAVE_NOT_LOGGED_IN, CINSCRIPT_UNLOCK_DOOR } from "./cinematicResources";
import { getDefaultCondition } from "./conditionFactory";
import { getDefaultTalkInteraction, getElevatorInteraction, getPromptLogInInteraction, getSaveInteraction } from "./interactionFactory";

export const INTERACTION_RANDOM_ENCOUNTER_1 = [getDefaultTalkInteraction( CINSCRIPT_RANDOM_ENCOUNTER_1, getDefaultCondition() )];
export const INTERACTION_RANDOM_ENCOUNTER_2 = [getDefaultTalkInteraction( CINSCRIPT_RANDOM_ENCOUNTER_2, getDefaultCondition() )];
export const INTERACTION_RANDOM_ENCOUNTER_3 = [getDefaultTalkInteraction( CINSCRIPT_RANDOM_ENCOUNTER_3, getDefaultCondition() )];
export const INTERACTION_RANDOM_ENCOUNTER_4 = [getDefaultTalkInteraction( CINSCRIPT_RANDOM_ENCOUNTER_4, getDefaultCondition() )];
export const INTERACTION_RANDOM_ENCOUNTER_5 = [getDefaultTalkInteraction( CINSCRIPT_RANDOM_ENCOUNTER_5, getDefaultCondition() )];
export const INTERACTION_RANDOM_ENCOUNTER_6 = [getDefaultTalkInteraction( CINSCRIPT_RANDOM_ENCOUNTER_6, getDefaultCondition() )];

export const INTERACTION_LOCKED_DOOR        = [getDefaultTalkInteraction( CINSCRIPT_LOCKED_DOOR, getDefaultCondition() )];
export const INTERACTION_UNLOCK_DOOR        = [getDefaultTalkInteraction( CINSCRIPT_UNLOCK_DOOR, getDefaultCondition() )];
export const INTERACTION_SAVE_GAME          = [getSaveInteraction( CINSCRIPT_SAVE_GAME, getDefaultCondition() )];
export const INTERACTION_SAVE_NOT_LOGGED_IN = [getPromptLogInInteraction( CINSCRIPT_SAVE_NOT_LOGGED_IN, getDefaultCondition() )];
export const INTERACTION_COLLECT_CAN        = [getDefaultTalkInteraction( CINSCRIPT_COLLECT_CAN, getDefaultCondition() )];
export const INTERACTION_COLLECT_COIN       = [getDefaultTalkInteraction( CINSCRIPT_COLLECT_COIN, getDefaultCondition() )];
export const INTERACTION_ELEVATOR           = [getElevatorInteraction( CINSCRIPT_ELEVATOR, getDefaultCondition())]