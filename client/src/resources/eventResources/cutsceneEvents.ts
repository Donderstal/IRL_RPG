import { EventType } from "../../enumerables/EventType";
import { getDefaultCondition, getInteractionNotRegisteredCondition, getInteractionRegisteredCondition, getLoggedInCondition } from "../../factories/conditionFactory";
import { createCutsceneEventDto } from "../../factories/eventFactory";
import { IKEY_CAR_SHACK_1, IKEY_CAR_SHACK_2, IKEY_CAR_SHACK_3 } from "../../game-data/interactionGlobals";
import type { EventModel } from "../../models/events/EventModel";
import { CUTSCENE_SCRIPTS } from "../cutsceneScripts";
import { CUTSCENE_IDS } from "./cutsceneIds";

export const createCoinCollectableCutscene = ( mapKey: string ): EventModel => {
    return {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.COLLECT_COIN, mapKey ), condition: getDefaultCondition() }
        ]
    }
}
export const createCanCollectableCutscene = ( mapKey: string ): EventModel => {
    return {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.COLLECT_CAN, mapKey ), condition: getDefaultCondition() }
        ]
    }
}
export const createDoorCutscene = ( doorId: string ): EventModel => {
    return {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LOCKED_DOOR ), condition: getInteractionNotRegisteredCondition( doorId ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.UNLOCK_DOOR ), condition: getInteractionRegisteredCondition( doorId ) }
        ]
    }
}
export const createSavePointCutscene = ( ): EventModel => {
    return {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.SAVE_GAME ), condition: getLoggedInCondition() },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.SAVE_NOT_LOGGED_IN ), condition: getDefaultCondition() }
        ]
    }
}

export const CUTSCENE_EVENTS: { [key in string]: EventModel } = {
    //#region Random encounter cutscene events
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_1]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_1 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_2]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_2 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_3]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_3 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_4]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_4 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_5]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_5 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.RANDOM_ENCOUNTER_6]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.RANDOM_ENCOUNTER_6 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region Standard cutscene events
    [CUTSCENE_IDS.DOOR]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LOCKED_DOOR ), condition: getInteractionNotRegisteredCondition( null ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.UNLOCK_DOOR ), condition: getInteractionRegisteredCondition( null ) }
        ]
    },
    [CUTSCENE_IDS.SAVE_POINT]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.SAVE_GAME ), condition: getLoggedInCondition() },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.SAVE_NOT_LOGGED_IN ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.COLLECT_CAN]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.COLLECT_CAN ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.COLLECT_COIN]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.COLLECT_COIN ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region A3 cutscene events
    [CUTSCENE_IDS.A3_ROBOT_RECEPTIONIST]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_A3_ROBOT_RECEPTIONIST ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.A3_ROBOT_COOK]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_A3_ROBOT_COOK ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.A3_MONKEY_COOK]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_A3_MONKEY_COOK ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region B3 cutscene events
    [CUTSCENE_IDS.B3_GUY_WHO_LOST_HIS_KEYS]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_B3_KEY_GUY_1 ), condition: getInteractionRegisteredCondition( "TEST_KEY_3" ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_B3_KEY_GUY_2, "TEST_KEY_3" ), condition: getInteractionRegisteredCondition( "TEST_KEY_2" ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_B3_KEY_GUY_3 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region B4 cutscene events
    [CUTSCENE_IDS.B4_WHOLESOME_LIFTER]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_B4_WHOLESOME_LIFTER ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C1 cutscene events
    [CUTSCENE_IDS.C1_FIND_LOST_KEYS]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C1_FINDING_LOST_KEY, "TEST_KEY_2" ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C2 cutscene events
    [CUTSCENE_IDS.C2_BS12_APT4_RESIDENT]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C2_BS12_APT4_RESIDENT ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.C2_BS12_APT2_ROBOT_1]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C2_BS12_APT2_ROBOT_1 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.C2_BS12_APT2_ROBOT_2]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C2_BS12_APT2_ROBOT_2 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C3 cutscene events
    [CUTSCENE_IDS.C3_CAR_SHACK_BOSS]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C3_CAR_SHACK_BOSS_1, IKEY_CAR_SHACK_3 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C3_CAR_SHACK_BOSS_2, IKEY_CAR_SHACK_1 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C3_CAR_SHACK_BOSS_3 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) }
        ]
    },
    [CUTSCENE_IDS.C3_CAR_SHACK_MECHANIC]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C3_CAR_MECHANIC_1 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C4 cutscene events
    [CUTSCENE_IDS.C4_YUM_MART_OFFICE_GUY]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_C4_YUM_MART_OFFICE_GUY ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region D1 cutscene events
    [CUTSCENE_IDS.D1_FRIENDLY_CHAD]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D1_FRIENDLY_CHAD ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.D1_WHOLESOME_LIFTER]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D1_WHOLESOME_LIFTER ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region D2 cutscene events
    [CUTSCENE_IDS.D2_LOOKING_FOR_APPARTMENT_LADY]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_LOOKING_FOR_APPARTMENT ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.D2_WHOLESOME_LIFTER]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_WHOLESOME_LIFTER ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.D2_SARSTUD_COMMUNAL_SPACE_GUY1]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_1 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_2 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_GUY1_1 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.D2_SARSTUD_COMMUNAL_SPACE_WOMAN1]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_1 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_2 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_SPACE_WOMAN1_1 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.D2_SARSTUD_COMMUNAL_SPACE_ROBOT1]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_ROBOT1_1 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_ROBOT1_2 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_COMMUNAL_ROBOT1_1 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.D2_SARSTUD_F1_A1_ROBOT1]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_ROBOT1_3 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_2 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_ROBOT1_2 ), condition: getInteractionRegisteredCondition( IKEY_CAR_SHACK_1 ) },
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_ROBOT1_1 ), condition: getDefaultCondition() }
        ]
    },
    [CUTSCENE_IDS.D2_SARSTUD_F1_A1_POLICEWOMAN1]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_D2_SARSTUD_F1_A1_POLICEWOMAN1 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region E4 cutscene events
    [CUTSCENE_IDS.E4_WHOLESOME_LIFTER]: {
        eventType: EventType.cutscene,
        triggerableEvents: [
            { event: createCutsceneEventDto( CUTSCENE_SCRIPTS.LH_E4_WHOLESOME_LIFTER ), condition: getDefaultCondition() }
        ]
    }
    //#endregion
};