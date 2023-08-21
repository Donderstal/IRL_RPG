import { EventType } from "../../enumerables/EventType";
import { getDefaultCondition } from "../../factories/conditionFactory";
import { createDoorEventDto } from "../../factories/eventFactory";
import type { EventModel } from "../../models/events/EventModel";
import { MAP_IDS } from "../mapResources/mapIds";
import { DOOR_IDS } from "./doorIds";

export const DOOR_EVENTS: { [key in string]: EventModel } = {
    //#region A3 door events
    [DOOR_IDS.TWO_TOWERS_MAIN_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.HOTEL_THE_TWO_TOWERS_LOBBY, MAP_IDS.LEONARD_HEIGHTS, DOOR_IDS.TWO_TOWERS_MAIN_DOOR ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region B4 door events
    [DOOR_IDS.CLUBSHELTER_MAIN_FRONT_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.LEONARD_HEIGHTS, MAP_IDS.CLUB_SHELTER_ENTRANCE, DOOR_IDS.CLUBSHELTER_MAIN_FRONT_DOOR ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.CLUBSHELTER_MAIN_INNER_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.CLUB_SHELTER_ENTRANCE, MAP_IDS.CLUB_SHELTER_MAIN, DOOR_IDS.CLUBSHELTER_MAIN_INNER_DOOR ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.CLUBSHELTER_TOILET_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.CLUB_SHELTER_MAIN, MAP_IDS.CLUB_SHELTER_TOILETS, DOOR_IDS.CLUBSHELTER_TOILET_DOOR ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C2 door events
    [DOOR_IDS.BAKER_STREET_12_FRONT_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.LEONARD_HEIGHTS, MAP_IDS.BAKER_STREET_12_GF, DOOR_IDS.BAKER_STREET_12_FRONT_DOOR ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_STAIRS_GF]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_GF, MAP_IDS.BAKER_STREET_12_F1_HALL, DOOR_IDS.BAKER_STREET_12_STAIRS_GF ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_APT_F1]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_F1_HALL, MAP_IDS.BAKER_STREET_12_F1_APT, DOOR_IDS.BAKER_STREET_12_APT_F1 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_STAIRS_F1]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_F1_HALL, MAP_IDS.BAKER_STREET_12_F2_HALL, DOOR_IDS.BAKER_STREET_12_STAIRS_GF ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_APT_F2]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_F2_HALL, MAP_IDS.BAKER_STREET_12_F2_APT, DOOR_IDS.BAKER_STREET_12_APT_F2 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_STAIRS_F2]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_F2_HALL, MAP_IDS.BAKER_STREET_12_F3_HALL, DOOR_IDS.BAKER_STREET_12_STAIRS_F2 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_APT_F3]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_F3_HALL, MAP_IDS.BAKER_STREET_12_F3_APT, DOOR_IDS.BAKER_STREET_12_APT_F3 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_STAIRS_F3]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_F3_HALL, MAP_IDS.BAKER_STREET_12_F4_HALL, DOOR_IDS.BAKER_STREET_12_STAIRS_F3 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.BAKER_STREET_12_APT_F4]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.BAKER_STREET_12_F3_HALL, MAP_IDS.BAKER_STREET_12_F3_APT, DOOR_IDS.BAKER_STREET_12_APT_F4 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C3 door events
    [DOOR_IDS.CAR_SHACK_FRONT_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.LEONARD_HEIGHTS, MAP_IDS.CAR_SHACK, DOOR_IDS.CAR_SHACK_FRONT_DOOR ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C4 door events
    [DOOR_IDS.YUM_MART_FRONT_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.LEONARD_HEIGHTS, MAP_IDS.YUM_MART_STORE, DOOR_IDS.YUM_MART_FRONT_DOOR ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.YUM_MART_DOOR_1]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.YUM_MART_STORE, MAP_IDS.YUM_MART_OFFICE, DOOR_IDS.YUM_MART_DOOR_1 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region D2 door events
    [DOOR_IDS.SARDINE_STUDIOS_FRONT_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.LEONARD_HEIGHTS, MAP_IDS.SARDINE_STUDIOS_HALL_GF, DOOR_IDS.SARDINE_STUDIOS_FRONT_DOOR ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.SARDINE_STUDIOS_DOOR_STAIRS_F1]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_HALL_GF, MAP_IDS.SARDINE_STUDIOS_HALL_F1, DOOR_IDS.SARDINE_STUDIOS_DOOR_STAIRS_F1 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.SARDINE_STUDIOS_DOOR_STAIRS_F2]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_HALL_F1, MAP_IDS.SARDINE_STUDIOS_HALL_F2, DOOR_IDS.SARDINE_STUDIOS_DOOR_STAIRS_F2 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.SARDINE_STUDIOS_DOOR_STAIRS_TOP]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_HALL_F2, MAP_IDS.SARDINE_STUDIOS_HALL_F3, DOOR_IDS.SARDINE_STUDIOS_DOOR_STAIRS_TOP ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.SARDINE_STUDIOS_COMMON_AREA]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_HALL_GF, MAP_IDS.SARDINE_STUDIOS_COMMUNAL_SPACE, DOOR_IDS.SARDINE_STUDIOS_COMMON_AREA ), condition: getDefaultCondition() }
        ]
    },

    [DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_HALL]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_HALL_F1, MAP_IDS.SARDINE_STUDIOS_CORRIDOR_F1, DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_HALL ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_APP1]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_CORRIDOR_F1, MAP_IDS.SARDINE_STUDIOS_F1_APT1, DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_APP1 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_APP2]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_CORRIDOR_F1, MAP_IDS.SARDINE_STUDIOS_F1_APT2, DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_APP2 ), condition: getDefaultCondition() }
        ]
    },
    [DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_APP3]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.SARDINE_STUDIOS_CORRIDOR_F1, MAP_IDS.SARDINE_STUDIOS_F1_APT3, DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_APP3 ), condition: getDefaultCondition() }
        ]
    },
    //#endregion
    //#region C4 door events
    [DOOR_IDS.GREY_BUILDING_FRONT_DOOR]: {
        eventType: EventType.door,
        triggerableEvents: [
            { event: createDoorEventDto( MAP_IDS.LEONARD_HEIGHTS, MAP_IDS.GREY_BUILDING_GF_LOBBY, DOOR_IDS.GREY_BUILDING_FRONT_DOOR ), condition: getDefaultCondition() }
        ]
    },
        //#region Grey building GF
        [DOOR_IDS.GREY_BUILDING_GF_LEFT_HALL]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_LOBBY, MAP_IDS.GREY_BUILDING_GF_HALL_LEFT, DOOR_IDS.GREY_BUILDING_GF_LEFT_HALL ), condition: getDefaultCondition() }
            ]
        },
        [DOOR_IDS.GREY_BUILDING_GF_APT1]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_HALL_LEFT, MAP_IDS.GREY_BUILDING_GF_APT1, DOOR_IDS.GREY_BUILDING_GF_APT1 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building GF APT1
            [DOOR_IDS.GREY_BUILDING_GF_APT1_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT1, MAP_IDS.GREY_BUILDING_GF_APT1_TOILET, DOOR_IDS.GREY_BUILDING_GF_APT1_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_GF_APT1_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT1, MAP_IDS.GREY_BUILDING_GF_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT1_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_GF_APT2]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_HALL_LEFT, MAP_IDS.GREY_BUILDING_GF_APT2, DOOR_IDS.GREY_BUILDING_GF_APT2 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building GF APT2
            [DOOR_IDS.GREY_BUILDING_GF_APT2_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT2, MAP_IDS.GREY_BUILDING_GF_APT2_TOILET, DOOR_IDS.GREY_BUILDING_GF_APT2_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_GF_APT2_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT2, MAP_IDS.GREY_BUILDING_GF_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT2_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_GF_APT3]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_HALL_LEFT, MAP_IDS.GREY_BUILDING_GF_APT3, DOOR_IDS.GREY_BUILDING_GF_APT3 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building GF APT3
            [DOOR_IDS.GREY_BUILDING_GF_APT3_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT3, MAP_IDS.GREY_BUILDING_GF_APT3_TOILET, DOOR_IDS.GREY_BUILDING_GF_APT3_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_GF_APT3_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT3, MAP_IDS.GREY_BUILDING_GF_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT3_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_GF_RIGHT_HALL]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_LOBBY, MAP_IDS.GREY_BUILDING_GF_HALL_RIGHT, DOOR_IDS.GREY_BUILDING_GF_RIGHT_HALL ), condition: getDefaultCondition() }
            ]
        },
        [DOOR_IDS.GREY_BUILDING_GF_APT4]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_HALL_RIGHT, MAP_IDS.GREY_BUILDING_GF_APT4, DOOR_IDS.GREY_BUILDING_GF_APT4 ), condition: getDefaultCondition() }
            ]
        },
        //#region Grey building GF APT4
            [DOOR_IDS.GREY_BUILDING_GF_APT4_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT4, MAP_IDS.GREY_BUILDING_GF_APT4_TOILET, DOOR_IDS.GREY_BUILDING_GF_APT4_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_GF_APT4_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT4, MAP_IDS.GREY_BUILDING_GF_APT4_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT4_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
        //#endregion
        [DOOR_IDS.GREY_BUILDING_GF_APT5]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_HALL_RIGHT, MAP_IDS.GREY_BUILDING_GF_APT5, DOOR_IDS.GREY_BUILDING_GF_APT5 ), condition: getDefaultCondition() }
            ]
        },
        //#region Grey building GF APT5
            [DOOR_IDS.GREY_BUILDING_GF_APT5_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT5, MAP_IDS.GREY_BUILDING_GF_APT5_TOILET, DOOR_IDS.GREY_BUILDING_GF_APT5_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_GF_APT5_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT5, MAP_IDS.GREY_BUILDING_GF_APT5_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT5_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
        //#endregion
        [DOOR_IDS.GREY_BUILDING_GF_APT6]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_HALL_RIGHT, MAP_IDS.GREY_BUILDING_GF_APT6, DOOR_IDS.GREY_BUILDING_GF_APT6 ), condition: getDefaultCondition() }
            ]
        },
        //#region Grey building GF APT6
            [DOOR_IDS.GREY_BUILDING_GF_APT6_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT6, MAP_IDS.GREY_BUILDING_GF_APT6_TOILET, DOOR_IDS.GREY_BUILDING_GF_APT6_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_GF_APT6_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_GF_APT6, MAP_IDS.GREY_BUILDING_GF_APT6_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT6_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        //#endregion
        //#region Grey building F1
        [DOOR_IDS.GREY_BUILDING_F1_LEFT_HALL]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_LOBBY, MAP_IDS.GREY_BUILDING_F1_HALL_LEFT, DOOR_IDS.GREY_BUILDING_F1_LEFT_HALL ), condition: getDefaultCondition() }
            ]
        },
        [DOOR_IDS.GREY_BUILDING_F1_APT1]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_HALL_LEFT, MAP_IDS.GREY_BUILDING_F1_APT1, DOOR_IDS.GREY_BUILDING_F1_APT1 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F1 APT1
            [DOOR_IDS.GREY_BUILDING_F1_APT1_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT1, MAP_IDS.GREY_BUILDING_F1_APT1_TOILET, DOOR_IDS.GREY_BUILDING_F1_APT1_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F1_APT1_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT1, MAP_IDS.GREY_BUILDING_F1_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT1_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F1_APT2]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_HALL_LEFT, MAP_IDS.GREY_BUILDING_F1_APT2, DOOR_IDS.GREY_BUILDING_F1_APT2 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F1 APT2
            [DOOR_IDS.GREY_BUILDING_F1_APT2_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT2, MAP_IDS.GREY_BUILDING_F1_APT2_TOILET, DOOR_IDS.GREY_BUILDING_F1_APT2_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F1_APT2_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT2, MAP_IDS.GREY_BUILDING_F1_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT2_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F1_APT3]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_HALL_LEFT, MAP_IDS.GREY_BUILDING_F1_APT3, DOOR_IDS.GREY_BUILDING_F1_APT3 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F1 APT3
            [DOOR_IDS.GREY_BUILDING_F1_APT3_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT3, MAP_IDS.GREY_BUILDING_F1_APT3_TOILET, DOOR_IDS.GREY_BUILDING_F1_APT3_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F1_APT3_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT3, MAP_IDS.GREY_BUILDING_F1_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT3_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F1_RIGHT_HALL]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_LOBBY, MAP_IDS.GREY_BUILDING_F1_HALL_RIGHT, DOOR_IDS.GREY_BUILDING_F1_RIGHT_HALL ), condition: getDefaultCondition() }
            ]
        },
        [DOOR_IDS.GREY_BUILDING_F1_APT4]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_HALL_RIGHT, MAP_IDS.GREY_BUILDING_F1_APT4, DOOR_IDS.GREY_BUILDING_F1_APT4 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F1 APT4
            [DOOR_IDS.GREY_BUILDING_F1_APT4_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT4, MAP_IDS.GREY_BUILDING_F1_APT4_TOILET, DOOR_IDS.GREY_BUILDING_F1_APT4_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F1_APT4_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT4, MAP_IDS.GREY_BUILDING_F1_APT4_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT4_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F1_APT5]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_HALL_RIGHT, MAP_IDS.GREY_BUILDING_F1_APT5, DOOR_IDS.GREY_BUILDING_F1_APT5 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F1 APT5
            [DOOR_IDS.GREY_BUILDING_F1_APT5_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT5, MAP_IDS.GREY_BUILDING_F1_APT5_TOILET, DOOR_IDS.GREY_BUILDING_F1_APT5_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F1_APT5_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT5, MAP_IDS.GREY_BUILDING_F1_APT5_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT5_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F1_APT6]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_HALL_RIGHT, MAP_IDS.GREY_BUILDING_F1_APT6, DOOR_IDS.GREY_BUILDING_F1_APT6 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F1 APT6
            [DOOR_IDS.GREY_BUILDING_F1_APT6_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT6, MAP_IDS.GREY_BUILDING_F1_APT6_TOILET, DOOR_IDS.GREY_BUILDING_F1_APT6_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F1_APT6_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F1_APT6, MAP_IDS.GREY_BUILDING_F1_APT6_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT6_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        //#endregion
        //#region Grey building F2
        [DOOR_IDS.GREY_BUILDING_F2_LEFT_HALL]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_LOBBY, MAP_IDS.GREY_BUILDING_F2_HALL_LEFT, DOOR_IDS.GREY_BUILDING_F2_LEFT_HALL ), condition: getDefaultCondition() }
            ]
        },
        [DOOR_IDS.GREY_BUILDING_F2_APT1]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_HALL_LEFT, MAP_IDS.GREY_BUILDING_F2_APT1, DOOR_IDS.GREY_BUILDING_F2_APT1 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F2 APT1
            [DOOR_IDS.GREY_BUILDING_F2_APT1_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_APT1, MAP_IDS.GREY_BUILDING_F2_APT1_TOILET, DOOR_IDS.GREY_BUILDING_F2_APT1_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F2_APT1_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_APT1, MAP_IDS.GREY_BUILDING_F2_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_F2_APT1_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
        //#endregion
        [DOOR_IDS.GREY_BUILDING_F2_APT2]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_HALL_LEFT, MAP_IDS.GREY_BUILDING_F2_APT2, DOOR_IDS.GREY_BUILDING_F2_APT2 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F2 APT2
            [DOOR_IDS.GREY_BUILDING_F2_APT2_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_APT2, MAP_IDS.GREY_BUILDING_F2_APT2_TOILET, DOOR_IDS.GREY_BUILDING_F2_APT2_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F2_APT2_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_APT2, MAP_IDS.GREY_BUILDING_F2_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_F2_APT2_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
        //#endregion
        [DOOR_IDS.GREY_BUILDING_F2_APT3]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_HALL_LEFT, MAP_IDS.GREY_BUILDING_F2_APT3, DOOR_IDS.GREY_BUILDING_F2_APT3 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F2 APT3
            [DOOR_IDS.GREY_BUILDING_F2_APT3_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_APT3, MAP_IDS.GREY_BUILDING_F2_APT3_TOILET, DOOR_IDS.GREY_BUILDING_F2_APT3_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F2_APT3_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F2_APT3, MAP_IDS.GREY_BUILDING_F2_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_F2_APT3_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        //#endregion
        //#region Grey building F3
        [DOOR_IDS.GREY_BUILDING_F3_LEFT_HALL]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_LOBBY, MAP_IDS.GREY_BUILDING_F3_HALL_LEFT, DOOR_IDS.GREY_BUILDING_F3_LEFT_HALL ), condition: getDefaultCondition() }
            ]
        },
        [DOOR_IDS.GREY_BUILDING_F3_APT1]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_HALL_LEFT, MAP_IDS.GREY_BUILDING_F3_APT1, DOOR_IDS.GREY_BUILDING_F3_APT1 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F3 APT1
            [DOOR_IDS.GREY_BUILDING_F3_APT1_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT1, MAP_IDS.GREY_BUILDING_F3_APT1_TOILET, DOOR_IDS.GREY_BUILDING_F3_APT1_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F3_APT1_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT1, MAP_IDS.GREY_BUILDING_F3_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT1_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F3_APT2]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_HALL_LEFT, MAP_IDS.GREY_BUILDING_F3_APT2, DOOR_IDS.GREY_BUILDING_F3_APT2 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F3 APT2
            [DOOR_IDS.GREY_BUILDING_F3_APT2_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT2, MAP_IDS.GREY_BUILDING_F3_APT2_TOILET, DOOR_IDS.GREY_BUILDING_F3_APT2_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F3_APT2_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT2, MAP_IDS.GREY_BUILDING_F3_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT2_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F3_APT3]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_HALL_LEFT, MAP_IDS.GREY_BUILDING_F3_APT3, DOOR_IDS.GREY_BUILDING_F3_APT3 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F3 APT3
            [DOOR_IDS.GREY_BUILDING_F3_APT3_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT3, MAP_IDS.GREY_BUILDING_F3_APT3_TOILET, DOOR_IDS.GREY_BUILDING_F3_APT3_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F3_APT3_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT3, MAP_IDS.GREY_BUILDING_F3_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT3_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F3_RIGHT_HALL]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_LOBBY, MAP_IDS.GREY_BUILDING_F3_HALL_RIGHT, DOOR_IDS.GREY_BUILDING_F3_RIGHT_HALL ), condition: getDefaultCondition() }
            ]
        },
        [DOOR_IDS.GREY_BUILDING_F3_APT4]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_HALL_RIGHT, MAP_IDS.GREY_BUILDING_F3_APT4, DOOR_IDS.GREY_BUILDING_F3_APT4 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F3 APT4
            [DOOR_IDS.GREY_BUILDING_F3_APT4_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT4, MAP_IDS.GREY_BUILDING_F3_APT4_TOILET, DOOR_IDS.GREY_BUILDING_F3_APT4_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F3_APT4_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT4, MAP_IDS.GREY_BUILDING_F3_APT4_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT4_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F3_APT5]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_HALL_RIGHT, MAP_IDS.GREY_BUILDING_F3_APT5, DOOR_IDS.GREY_BUILDING_F3_APT5 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F3 APT5
            [DOOR_IDS.GREY_BUILDING_F3_APT5_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT5, MAP_IDS.GREY_BUILDING_F3_APT5_TOILET, DOOR_IDS.GREY_BUILDING_F3_APT5_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F3_APT5_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT5, MAP_IDS.GREY_BUILDING_F3_APT5_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT5_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        [DOOR_IDS.GREY_BUILDING_F3_APT6]: {
            eventType: EventType.door,
            triggerableEvents: [
                { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_HALL_RIGHT, MAP_IDS.GREY_BUILDING_F3_APT6, DOOR_IDS.GREY_BUILDING_F3_APT6 ), condition: getDefaultCondition() }
            ]
        },
            //#region Grey building F3 APT6
            [DOOR_IDS.GREY_BUILDING_F3_APT6_TOILET]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT6, MAP_IDS.GREY_BUILDING_F3_APT6_TOILET, DOOR_IDS.GREY_BUILDING_F3_APT6_TOILET ), condition: getDefaultCondition() }
                ]
            },
            [DOOR_IDS.GREY_BUILDING_F3_APT6_BEDROOM]: {
                eventType: EventType.door,
                triggerableEvents: [
                    { event: createDoorEventDto( MAP_IDS.GREY_BUILDING_F3_APT6, MAP_IDS.GREY_BUILDING_F3_APT6_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT6_BEDROOM ), condition: getDefaultCondition() }
                ]
            },
            //#endregion
        //#endregion
    //#endregion
}