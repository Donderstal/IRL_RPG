import { TriggerType } from "../../enumerables/TriggerType";
import { getDefaultCondition, getInteractionRegisteredCondition } from "../../factories/conditionFactory";
import { createCutsceneEventChain, createCutsceneEventScript, createEventConditionPair } from "../../factories/eventFactory";
import { IKEY_CAR_SHACK_1, IKEY_CAR_SHACK_2, IKEY_CAR_SHACK_3 } from "../../game-data/interactionGlobals";
import type { CutsceneEventChain } from "../../models/eventChains/CutsceneEventChain";
import { CUTSCENE_SCRIPTS } from "../cutsceneScripts";
import { CUTSCENE_IDS } from "./cutsceneIds";

export const CUTSCENE_EVENT_CHAINS: { [key in string]: CutsceneEventChain } = {
    //#region Storyline event
    [CUTSCENE_IDS.INTRO_CUTSCENE]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.INTRO_CINEMATIC, CUTSCENE_IDS.INTRO_CUTSCENE ), getDefaultCondition(), TriggerType.map_enter )]
    ),
    //#endregion
    //#region Random encounter cutscene events
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_1]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_1 ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_2]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_2 ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_3]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_3 ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_4]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_4 ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_5]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_5 ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_6]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_6 ), getDefaultCondition() )]
    ),
    //#endregion
    //#region A3 cutscene events
    [CUTSCENE_IDS.A3_ROBOT_RECEPTIONIST]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_A3_ROBOT_RECEPTIONIST ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.A3_ROBOT_COOK]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_A3_ROBOT_COOK ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.A3_MONKEY_COOK]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_A3_MONKEY_COOK ), getDefaultCondition() )]
    ),
    //#endregion
    //#region B3 cutscene events
    [CUTSCENE_IDS.B3_GUY_WHO_LOST_HIS_KEYS]: createCutsceneEventChain(
        [
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_B3_KEY_GUY_1 ), getInteractionRegisteredCondition( "TEST_KEY_3" ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_B3_KEY_GUY_2, "TEST_KEY_3" ), getInteractionRegisteredCondition( "TEST_KEY_2" ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_B3_KEY_GUY_3 ), getDefaultCondition() )
        ]
    ),
    //#endregion
    //#region B4 cutscene events
    [CUTSCENE_IDS.B4_WHOLESOME_LIFTER]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_B4_WHOLESOME_LIFTER ), getDefaultCondition() )]
    ),
    //#endregion
    //#region C1 cutscene events
    [CUTSCENE_IDS.C1_FIND_LOST_KEYS]: createCutsceneEventChain(
        [createEventConditionPair(  createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C1_FINDING_LOST_KEY, "TEST_KEY_2" ), getDefaultCondition() )]
    ),
    //#endregion
    //#region C2 cutscene events
    [CUTSCENE_IDS.C2_BS12_APT4_RESIDENT]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C2_BS12_APT4_RESIDENT ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.C2_BS12_APT2_ROBOT_1]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C2_BS12_APT2_ROBOT_1 ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.C2_BS12_APT2_ROBOT_2]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C2_BS12_APT2_ROBOT_2 ), getDefaultCondition() )]
    ),
    //#endregion
    //#region C3 cutscene events
    [CUTSCENE_IDS.C3_CAR_SHACK_BOSS]: createCutsceneEventChain(
        [
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C3_CAR_SHACK_BOSS_1, IKEY_CAR_SHACK_3 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C3_CAR_SHACK_BOSS_2, IKEY_CAR_SHACK_1 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C3_CAR_SHACK_BOSS_3 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) )
        ]
    ),
    [CUTSCENE_IDS.C3_CAR_SHACK_MECHANIC]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C3_CAR_MECHANIC_1 ), getDefaultCondition() )]
    ),
    //#endregion
    //#region C4 cutscene events
    [CUTSCENE_IDS.C4_YUM_MART_OFFICE_GUY]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_C4_YUM_MART_OFFICE_GUY ), getDefaultCondition() )]
    ),
    //#endregion
    //#region D1 cutscene events
    [CUTSCENE_IDS.D1_FRIENDLY_CHAD]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D1_FRIENDLY_CHAD ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.D1_WHOLESOME_LIFTER]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D1_WHOLESOME_LIFTER ), getDefaultCondition() )]
    ),
    //#endregion
    //#region D2 cutscene events
    [CUTSCENE_IDS.D2_LOOKING_FOR_APPARTMENT_LADY]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_LOOKING_FOR_APPARTMENT ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.D2_WHOLESOME_LIFTER]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_WHOLESOME_LIFTER ), getDefaultCondition() )]
    ),
    [CUTSCENE_IDS.D2_SARSTUD_COMMUNAL_SPACE_GUY1]: createCutsceneEventChain(
        [
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_1 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_2 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_1 ), getDefaultCondition() )
        ]
    ),
    [CUTSCENE_IDS.D2_SARSTUD_COMMUNAL_SPACE_WOMAN1]: createCutsceneEventChain(
        [
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_1 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_2 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_1 ), getDefaultCondition() )
        ]
    ),
    [CUTSCENE_IDS.D2_SARSTUD_COMMUNAL_SPACE_ROBOT1]: createCutsceneEventChain(
        [
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_ROBOT1_1 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_ROBOT1_2 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_ROBOT1_1 ), getDefaultCondition() )
        ]
    ),
    [CUTSCENE_IDS.D2_SARSTUD_F1_A1_ROBOT1]: createCutsceneEventChain(
        [
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_ROBOT1_3 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_ROBOT1_2 ), getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) ),
            createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_ROBOT1_1 ), getDefaultCondition() )
        ]
    ),
    [CUTSCENE_IDS.D2_SARSTUD_F1_A1_POLICEWOMAN1]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_POLICEWOMAN1 ), getDefaultCondition() )]
    ),
    //#endregion
    //#region E4 cutscene events
    [CUTSCENE_IDS.E4_WHOLESOME_LIFTER]: createCutsceneEventChain(
        [createEventConditionPair( createCutsceneEventScript( CUTSCENE_SCRIPTS.LH_E4_WHOLESOME_LIFTER ), getDefaultCondition() )]
    )
    //#endregion
};