import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { EventType } from "../../../../../enumerables/EventType";
import type { TriggerModel } from "../../../../../models/TriggerModel";
import { DOOR_IDS } from "../../../../eventResources/doorIds";
import { ELEVATOR_IDS } from "../../../../eventResources/elevatorIds";
import { MAP_IDS } from "../../../mapIds";

const GF_LEFT_HALL_APPARTMENT_DOORS = [DOOR_IDS.GREY_BUILDING_GF_APT1, DOOR_IDS.GREY_BUILDING_GF_APT2, DOOR_IDS.GREY_BUILDING_GF_APT3];
const GF_RIGHT_HALL_APPARTMENT_DOORS = [ DOOR_IDS.GREY_BUILDING_GF_APT2, DOOR_IDS.GREY_BUILDING_GF_APT3, DOOR_IDS.GREY_BUILDING_GF_APT4 ];

const F1_LEFT_HALL_APPARTMENT_DOORS = [DOOR_IDS.GREY_BUILDING_F1_APT1, DOOR_IDS.GREY_BUILDING_F1_APT2, DOOR_IDS.GREY_BUILDING_F1_APT3];
const F1_RIGHT_HALL_APPARTMENT_DOORS = [DOOR_IDS.GREY_BUILDING_F1_APT2, DOOR_IDS.GREY_BUILDING_F1_APT3, DOOR_IDS.GREY_BUILDING_F1_APT4];

const F2_LEFT_HALL_APPARTMENT_DOORS = [DOOR_IDS.GREY_BUILDING_F2_APT1, DOOR_IDS.GREY_BUILDING_F2_APT2, DOOR_IDS.GREY_BUILDING_F2_APT3];

const F3_LEFT_HALL_APPARTMENT_DOORS = [DOOR_IDS.GREY_BUILDING_F3_APT1, DOOR_IDS.GREY_BUILDING_F3_APT2, DOOR_IDS.GREY_BUILDING_F3_APT3];
const F3_RIGHT_HALL_APPARTMENT_DOORS = [DOOR_IDS.GREY_BUILDING_F3_APT2, DOOR_IDS.GREY_BUILDING_F3_APT3, DOOR_IDS.GREY_BUILDING_F3_APT4];

const GREY_BUILDING_ELEVATOR: TriggerModel = {
    eventType: EventType.elevator,
    eventId: ELEVATOR_IDS.GREY_BUILDING,
    column: 2,
    row: 2,
    direction: DirectionEnum.up,
}

export const LHGB_Lobby_Doors = ( lobbyKey: string ): TriggerModel[] => {
    switch ( lobbyKey ) {
        case MAP_IDS.GREY_BUILDING_GF_LOBBY:
            return [
                getLobbyLeftDoor( DOOR_IDS.GREY_BUILDING_GF_LEFT_HALL ),
                getLobbyRightDoor( DOOR_IDS.GREY_BUILDING_GF_RIGHT_HALL ),
                ...getLobbyFrontDoors(),
                {...GREY_BUILDING_ELEVATOR}
            ];
        case MAP_IDS.GREY_BUILDING_F1_LOBBY:
            return [
                getLobbyLeftDoor( DOOR_IDS.GREY_BUILDING_F1_LEFT_HALL ),
                getLobbyRightDoor( DOOR_IDS.GREY_BUILDING_F1_RIGHT_HALL ),
                { ...GREY_BUILDING_ELEVATOR }
            ];
        case MAP_IDS.GREY_BUILDING_F2_LOBBY:
            return [
                getLobbyLeftDoor( DOOR_IDS.GREY_BUILDING_F2_LEFT_HALL ),
                { ...GREY_BUILDING_ELEVATOR }
            ];
        case MAP_IDS.GREY_BUILDING_F3_LOBBY:
            return [
                getLobbyLeftDoor( DOOR_IDS.GREY_BUILDING_F3_LEFT_HALL ),
                getLobbyRightDoor( DOOR_IDS.GREY_BUILDING_F3_RIGHT_HALL ),
                { ...GREY_BUILDING_ELEVATOR }
            ];
        case MAP_IDS.GREY_BUILDING_F4_LOBBY:
            return [{ ...GREY_BUILDING_ELEVATOR }]
    }
}
export const LHGB_Hallway_Doors = ( hallwayKey: string ): TriggerModel[] => {
    switch ( hallwayKey ) {
        case MAP_IDS.GREY_BUILDING_GF_HALL_LEFT:
            return [
                ...getAppartmentDoors( GF_LEFT_HALL_APPARTMENT_DOORS ),
                getHallwayLeftDoor( DOOR_IDS.GREY_BUILDING_GF_LEFT_HALL )
            ];
        case MAP_IDS.GREY_BUILDING_GF_HALL_RIGHT:
            return [
                ...getAppartmentDoors( GF_RIGHT_HALL_APPARTMENT_DOORS ),
                getHallwayRightDoor( DOOR_IDS.GREY_BUILDING_GF_RIGHT_HALL )
            ];
        case MAP_IDS.GREY_BUILDING_F1_HALL_LEFT:
            return [
                ...getAppartmentDoors( F1_LEFT_HALL_APPARTMENT_DOORS ),
                getHallwayLeftDoor( DOOR_IDS.GREY_BUILDING_F1_LEFT_HALL )
            ];
        case MAP_IDS.GREY_BUILDING_F1_HALL_RIGHT:
            return [
                ...getAppartmentDoors( F1_RIGHT_HALL_APPARTMENT_DOORS ),
                getHallwayRightDoor( DOOR_IDS.GREY_BUILDING_F1_RIGHT_HALL )
            ];
        case MAP_IDS.GREY_BUILDING_F2_HALL_LEFT:
            return [
                ...getAppartmentDoors( F2_LEFT_HALL_APPARTMENT_DOORS ),
                getHallwayLeftDoor( DOOR_IDS.GREY_BUILDING_F2_LEFT_HALL )
            ];
        case MAP_IDS.GREY_BUILDING_F3_HALL_LEFT:
            return [
                ...getAppartmentDoors( F3_LEFT_HALL_APPARTMENT_DOORS ),
                getHallwayLeftDoor( DOOR_IDS.GREY_BUILDING_F3_LEFT_HALL )
            ];
        case MAP_IDS.GREY_BUILDING_F3_HALL_RIGHT:
            return [
                ...getAppartmentDoors( F3_RIGHT_HALL_APPARTMENT_DOORS ),
                getHallwayRightDoor( DOOR_IDS.GREY_BUILDING_F3_RIGHT_HALL )
            ];
    }
}
export const LHGB_AppartmentMain_Doors = ( mapKey: string ): TriggerModel[] => {
    let doors = []
    let doorKeys = getAppartmentDoorIds( mapKey );
    doorKeys.forEach( ( e, index ) => {
        if ( e !== null ) {
            switch ( index ) {
                case 0:
                    doors.push( getAppartmentToHallDoor(e ) )
                    break;
                case 1:
                    doors.push( getAppartmentToBedroomDoor( e ) )
                    break;
                case 2:
                    doors.push( getAppartmentToToiletDoor( e ) )
                    break;
            }
        }
    } )
    return doors;
}
export const LHGB_AppartmentToilet_Doors = ( mapKey: string ): TriggerModel[] => {
    return [{
        eventType: EventType.door,
        eventId: getAppartmentToiletIds(mapKey),
        column: 1,
        row: 3,
        direction: DirectionEnum.left,
    }];
}
export const LHGB_AppartmentBedroom_Doors = ( mapKey: string ): TriggerModel[] => {
    return [{
        eventType: EventType.door,
        eventId: getAppartmentBedroomIds( mapKey ),
        column: 5,
        row: 4,
        direction: DirectionEnum.right,
    }];
}

const getAppartmentDoorIds = ( mapKey: string ): string[] => {
    switch ( mapKey ) {
        // GF
        case MAP_IDS.GREY_BUILDING_GF_APT1:
            return [DOOR_IDS.GREY_BUILDING_GF_APT1, DOOR_IDS.GREY_BUILDING_GF_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT1_TOILET];
        case MAP_IDS.GREY_BUILDING_GF_APT2:
            return [DOOR_IDS.GREY_BUILDING_GF_APT2, DOOR_IDS.GREY_BUILDING_GF_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT2_TOILET];
        case MAP_IDS.GREY_BUILDING_GF_APT3:
            return [DOOR_IDS.GREY_BUILDING_GF_APT3, DOOR_IDS.GREY_BUILDING_GF_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT3_TOILET];
        case MAP_IDS.GREY_BUILDING_GF_APT4:
            return [DOOR_IDS.GREY_BUILDING_GF_APT4, DOOR_IDS.GREY_BUILDING_GF_APT4_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT4_TOILET];
        case MAP_IDS.GREY_BUILDING_GF_APT5:
            return [DOOR_IDS.GREY_BUILDING_GF_APT5, DOOR_IDS.GREY_BUILDING_GF_APT5_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT5_TOILET];
        case MAP_IDS.GREY_BUILDING_GF_APT6:
            return [DOOR_IDS.GREY_BUILDING_GF_APT6, DOOR_IDS.GREY_BUILDING_GF_APT6_BEDROOM, DOOR_IDS.GREY_BUILDING_GF_APT6_TOILET];
        // F1
        case MAP_IDS.GREY_BUILDING_F1_APT1:
            return [DOOR_IDS.GREY_BUILDING_F1_APT1, DOOR_IDS.GREY_BUILDING_F1_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT1_TOILET];
        case MAP_IDS.GREY_BUILDING_F1_APT2:
            return [DOOR_IDS.GREY_BUILDING_F1_APT2, DOOR_IDS.GREY_BUILDING_F1_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT2_TOILET];
        case MAP_IDS.GREY_BUILDING_F1_APT3:
            return [DOOR_IDS.GREY_BUILDING_F1_APT3, DOOR_IDS.GREY_BUILDING_F1_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT3_TOILET];
        case MAP_IDS.GREY_BUILDING_F1_APT4:
            return [DOOR_IDS.GREY_BUILDING_F1_APT4, DOOR_IDS.GREY_BUILDING_F1_APT4_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT4_TOILET];
        case MAP_IDS.GREY_BUILDING_F1_APT5:
            return [DOOR_IDS.GREY_BUILDING_F1_APT5, DOOR_IDS.GREY_BUILDING_F1_APT5_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT5_TOILET];
        case MAP_IDS.GREY_BUILDING_F1_APT6:
            return [DOOR_IDS.GREY_BUILDING_F1_APT6, DOOR_IDS.GREY_BUILDING_F1_APT6_BEDROOM, DOOR_IDS.GREY_BUILDING_F1_APT6_TOILET];
        // F2
        case MAP_IDS.GREY_BUILDING_F2_APT1:
            return [DOOR_IDS.GREY_BUILDING_F2_APT1, DOOR_IDS.GREY_BUILDING_F2_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_F2_APT1_TOILET];
        case MAP_IDS.GREY_BUILDING_F2_APT2:
            return [DOOR_IDS.GREY_BUILDING_F2_APT2, DOOR_IDS.GREY_BUILDING_F2_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_F2_APT2_TOILET];
        case MAP_IDS.GREY_BUILDING_F2_APT3:
            return [DOOR_IDS.GREY_BUILDING_F2_APT3, DOOR_IDS.GREY_BUILDING_F2_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_F2_APT3_TOILET];
        // F3
        case MAP_IDS.GREY_BUILDING_F3_APT1:
            return [DOOR_IDS.GREY_BUILDING_F3_APT1, DOOR_IDS.GREY_BUILDING_F3_APT1_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT1_TOILET];
        case MAP_IDS.GREY_BUILDING_F3_APT2:
            return [DOOR_IDS.GREY_BUILDING_F3_APT2, DOOR_IDS.GREY_BUILDING_F3_APT2_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT2_TOILET];
        case MAP_IDS.GREY_BUILDING_F3_APT3:
            return [DOOR_IDS.GREY_BUILDING_F3_APT3, DOOR_IDS.GREY_BUILDING_F3_APT3_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT3_TOILET];
        case MAP_IDS.GREY_BUILDING_F3_APT4:
            return [DOOR_IDS.GREY_BUILDING_F3_APT4, DOOR_IDS.GREY_BUILDING_F3_APT4_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT4_TOILET];
        case MAP_IDS.GREY_BUILDING_F3_APT5:
            return [DOOR_IDS.GREY_BUILDING_F3_APT5, DOOR_IDS.GREY_BUILDING_F3_APT5_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT5_TOILET];
        case MAP_IDS.GREY_BUILDING_F3_APT6:
            return [DOOR_IDS.GREY_BUILDING_F3_APT6, DOOR_IDS.GREY_BUILDING_F3_APT6_BEDROOM, DOOR_IDS.GREY_BUILDING_F3_APT6_TOILET];
    }
}
const getAppartmentBedroomIds = ( mapKey: string ): string => {
    switch ( mapKey ) {
        // GF
        case MAP_IDS.GREY_BUILDING_GF_APT1:
            return DOOR_IDS.GREY_BUILDING_GF_APT1_BEDROOM;
        case MAP_IDS.GREY_BUILDING_GF_APT2:
            return DOOR_IDS.GREY_BUILDING_GF_APT2_BEDROOM;
        case MAP_IDS.GREY_BUILDING_GF_APT3:
            return DOOR_IDS.GREY_BUILDING_GF_APT3_BEDROOM;
        case MAP_IDS.GREY_BUILDING_GF_APT4:
            return DOOR_IDS.GREY_BUILDING_GF_APT4_BEDROOM;
        case MAP_IDS.GREY_BUILDING_GF_APT5:
            return DOOR_IDS.GREY_BUILDING_GF_APT5_BEDROOM;
        case MAP_IDS.GREY_BUILDING_GF_APT6:
            return DOOR_IDS.GREY_BUILDING_GF_APT6_BEDROOM;
        // F1
        case MAP_IDS.GREY_BUILDING_F1_APT1:
            return DOOR_IDS.GREY_BUILDING_F1_APT1_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F1_APT2:
            return DOOR_IDS.GREY_BUILDING_F1_APT2_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F1_APT3:
            return DOOR_IDS.GREY_BUILDING_F1_APT3_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F1_APT4:
            return DOOR_IDS.GREY_BUILDING_F1_APT4_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F1_APT5:
            return DOOR_IDS.GREY_BUILDING_F1_APT5_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F1_APT6:
            return DOOR_IDS.GREY_BUILDING_F1_APT6_BEDROOM;;
        // F2
        case MAP_IDS.GREY_BUILDING_F2_APT1:
            return DOOR_IDS.GREY_BUILDING_F2_APT1_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F2_APT2:
            return DOOR_IDS.GREY_BUILDING_F2_APT2_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F2_APT3:
            return DOOR_IDS.GREY_BUILDING_F2_APT3_BEDROOM;
        // F3
        case MAP_IDS.GREY_BUILDING_F3_APT1:
            return DOOR_IDS.GREY_BUILDING_F3_APT1_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F3_APT2:
            return DOOR_IDS.GREY_BUILDING_F3_APT2_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F3_APT3:
            return DOOR_IDS.GREY_BUILDING_F3_APT3_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F3_APT4:
            return DOOR_IDS.GREY_BUILDING_F3_APT4_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F3_APT5:
            return DOOR_IDS.GREY_BUILDING_F3_APT5_BEDROOM;
        case MAP_IDS.GREY_BUILDING_F3_APT6:
            return DOOR_IDS.GREY_BUILDING_F3_APT6_BEDROOM;
    }
}
const getAppartmentToiletIds = ( mapKey: string ): string => {
    switch ( mapKey ) {
        // GF
        case MAP_IDS.GREY_BUILDING_GF_APT1:
            return DOOR_IDS.GREY_BUILDING_GF_APT1_TOILET;
        case MAP_IDS.GREY_BUILDING_GF_APT2:
            return DOOR_IDS.GREY_BUILDING_GF_APT2_TOILET;
        case MAP_IDS.GREY_BUILDING_GF_APT3:
            return DOOR_IDS.GREY_BUILDING_GF_APT3_TOILET;
        case MAP_IDS.GREY_BUILDING_GF_APT4:
            return DOOR_IDS.GREY_BUILDING_GF_APT4_TOILET;
        case MAP_IDS.GREY_BUILDING_GF_APT5:
            return DOOR_IDS.GREY_BUILDING_GF_APT5_TOILET;
        case MAP_IDS.GREY_BUILDING_GF_APT6:
            return DOOR_IDS.GREY_BUILDING_GF_APT6_TOILET;
        // F1
        case MAP_IDS.GREY_BUILDING_F1_APT1:
            return DOOR_IDS.GREY_BUILDING_F1_APT1_TOILET;
        case MAP_IDS.GREY_BUILDING_F1_APT2:
            return DOOR_IDS.GREY_BUILDING_F1_APT2_TOILET;
        case MAP_IDS.GREY_BUILDING_F1_APT3:
            return DOOR_IDS.GREY_BUILDING_F1_APT3_TOILET;
        case MAP_IDS.GREY_BUILDING_F1_APT4:
            return DOOR_IDS.GREY_BUILDING_F1_APT4_TOILET;
        case MAP_IDS.GREY_BUILDING_F1_APT5:
            return DOOR_IDS.GREY_BUILDING_F1_APT5_TOILET;
        case MAP_IDS.GREY_BUILDING_F1_APT6:
            return DOOR_IDS.GREY_BUILDING_F1_APT6_TOILET;
        // F2
        case MAP_IDS.GREY_BUILDING_F2_APT1:
            return DOOR_IDS.GREY_BUILDING_F2_APT1_TOILET;
        case MAP_IDS.GREY_BUILDING_F2_APT2:
            return DOOR_IDS.GREY_BUILDING_F2_APT2_TOILET;
        case MAP_IDS.GREY_BUILDING_F2_APT3:
            return DOOR_IDS.GREY_BUILDING_F2_APT3_TOILET;
        // F3
        case MAP_IDS.GREY_BUILDING_F3_APT1:
            return DOOR_IDS.GREY_BUILDING_F3_APT1_TOILET;
        case MAP_IDS.GREY_BUILDING_F3_APT2:
            return DOOR_IDS.GREY_BUILDING_F3_APT2_TOILET;
        case MAP_IDS.GREY_BUILDING_F3_APT3:
            return DOOR_IDS.GREY_BUILDING_F3_APT3_TOILET;
        case MAP_IDS.GREY_BUILDING_F3_APT4:
            return DOOR_IDS.GREY_BUILDING_F3_APT4_TOILET;
        case MAP_IDS.GREY_BUILDING_F3_APT5:
            return DOOR_IDS.GREY_BUILDING_F3_APT5_TOILET;
        case MAP_IDS.GREY_BUILDING_F3_APT6:
            return DOOR_IDS.GREY_BUILDING_F3_APT6_TOILET;
    }
}
const getLobbyLeftDoor = ( doorId: string ): TriggerModel => {
    return {
        eventType: EventType.door,
        eventId: doorId,
        column: 1,
        row: 7,
        direction: DirectionEnum.left
    }
}
const getLobbyRightDoor = ( doorId: string ): TriggerModel => {
    return {
        eventType: EventType.door,
        eventId: doorId,
        column: 12,
        row: 7,
        direction: DirectionEnum.right
    }
}
const getLobbyFrontDoors = (): TriggerModel[] => {
    return [
        {
            eventType: EventType.door,
            eventId: DOOR_IDS.GREY_BUILDING_FRONT_DOOR,
            column: 6,
            row: 8,
            direction: DirectionEnum.down
        },
        {
            eventType: EventType.door,
            eventId: DOOR_IDS.GREY_BUILDING_FRONT_DOOR,
            column: 7,
            row: 8,
            direction: DirectionEnum.down
        }
    ]
}
const getAppartmentDoors = ( doorKeys: string[] ): TriggerModel[] => {
    let doors = [];
    let doorColumnPositions = [4, 8, 12]
    doorKeys.forEach( ( key, index ) => {
        if ( key !== null ) {
            doors.push(
                {
                    eventType: EventType.door,
                    eventId: key,
                    column: doorColumnPositions[index],
                    row: 4,
                    direction: DirectionEnum.down
                }
            )
        }
    } )
    return doors;
}
const getHallwayLeftDoor = ( key: string ): TriggerModel => {
    return {
        eventType: EventType.door,
        eventId: key,
        column: 15,
        row: 3,
        direction: DirectionEnum.right
    }
}
const getHallwayRightDoor = ( key: string ): TriggerModel => {
    return {
        eventType: EventType.door,
        eventId: key,
        column: 1,
        row: 3,
        direction: DirectionEnum.left
    }
}
const getAppartmentToHallDoor = ( key: string ): TriggerModel => {
    return {
        eventType: EventType.door,
        eventId: key,
        column: 6,
        row: 2,
        direction: DirectionEnum.up,
    }
}
const getAppartmentToBedroomDoor = ( key: string ): TriggerModel => {
    return {
        eventType: EventType.door,
        eventId: key,
        column: 5,
        row: 4,
        direction: DirectionEnum.left,
    }
}
const getAppartmentToToiletDoor = ( key: string ): TriggerModel => {
    return {
        eventType: EventType.door,
        eventId: key,
        column: 6,
        row: 4,
        direction: DirectionEnum.right,
    }
}