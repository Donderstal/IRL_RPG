import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import type { DoorModel } from "../../../../../models/DoorModel";
import {
    LH_GREY_BUILDING_F1_HALL_LEFT, LH_GREY_BUILDING_F1_HALL_RIGHT, LH_GREY_BUILDING_F1_LOBBY,
    LH_GREY_BUILDING_F2_LOBBY,
    LH_GREY_BUILDING_F3_LOBBY,
    LH_GREY_BUILDING_F4_LOBBY,
    LH_GREY_BUILDING_GF_HALL_LEFT, LH_GREY_BUILDING_GF_HALL_RIGHT, LH_GREY_BUILDING_GF_LOBBY,
    LH_GREY_BUILDING_GF_APT1, LH_GREY_BUILDING_GF_APT2, LH_GREY_BUILDING_GF_APT3,
    LH_GREY_BUILDING_GF_APT4, LH_GREY_BUILDING_GF_APT5, LH_GREY_BUILDING_GF_APT6,
    LH_MAP_KEY,
    LH_GREY_BUILDING_F1_APT1,
    LH_GREY_BUILDING_F1_APT2,
    LH_GREY_BUILDING_F1_APT3,
    LH_GREY_BUILDING_F1_APT4,
    LH_GREY_BUILDING_F1_APT5,
    LH_GREY_BUILDING_F1_APT6,
    LH_GREY_BUILDING_F2_APT1,
    LH_GREY_BUILDING_F2_APT2,
    LH_GREY_BUILDING_F2_APT3,
    LH_GREY_BUILDING_F3_APT1,
    LH_GREY_BUILDING_F3_APT2,
    LH_GREY_BUILDING_F3_APT3,
    LH_GREY_BUILDING_F3_APT4,
    LH_GREY_BUILDING_F3_APT5,
    LH_GREY_BUILDING_F3_APT6,
    LH_GREY_BUILDING_F3_HALL_LEFT,
    LH_GREY_BUILDING_F3_HALL_RIGHT,
    LH_GREY_BUILDING_F2_HALL_LEFT
} from "../../leonard_heights_res";
import { DOORKEY_GREY_BUILDING_FRONT_DOOR } from "../E3-door-keys";
import { DOORKEY_GREY_BUILDING_F1_APT1, DOORKEY_GREY_BUILDING_F1_APT2, DOORKEY_GREY_BUILDING_F1_APT3, DOORKEY_GREY_BUILDING_F1_APT4, DOORKEY_GREY_BUILDING_F1_APT5, DOORKEY_GREY_BUILDING_F1_APT6, DOORKEY_GREY_BUILDING_F1_LEFT_HALL, DOORKEY_GREY_BUILDING_F1_RIGHT_HALL } from "./F1/GB-F1-door-keys";
import { DOORKEY_GREY_BUILDING_F2_APT1, DOORKEY_GREY_BUILDING_F2_APT2, DOORKEY_GREY_BUILDING_F2_APT3, DOORKEY_GREY_BUILDING_F2_LEFT_HALL } from "./F2/GB-F2-door-keys";
import { DOORKEY_GREY_BUILDING_F3_APT1, DOORKEY_GREY_BUILDING_F3_APT2, DOORKEY_GREY_BUILDING_F3_APT3, DOORKEY_GREY_BUILDING_F3_APT4, DOORKEY_GREY_BUILDING_F3_APT5, DOORKEY_GREY_BUILDING_F3_APT6, DOORKEY_GREY_BUILDING_F3_LEFT_HALL, DOORKEY_GREY_BUILDING_F3_RIGHT_HALL } from "./F3/GB-F3-door-keys";
import {
    DOORKEY_GREY_BUILDING_GF_APT1, DOORKEY_GREY_BUILDING_GF_APT2, DOORKEY_GREY_BUILDING_GF_APT3,
    DOORKEY_GREY_BUILDING_GF_APT4, DOORKEY_GREY_BUILDING_GF_APT5, DOORKEY_GREY_BUILDING_GF_APT6,
    DOORKEY_GREY_BUILDING_GF_LEFT_HALL, DOORKEY_GREY_BUILDING_GF_RIGHT_HALL
} from "./GF/GB-GF-door-keys";

const GF_LEFT_DOORS = [DOORKEY_GREY_BUILDING_GF_APT1, DOORKEY_GREY_BUILDING_GF_APT2, DOORKEY_GREY_BUILDING_GF_APT3];
const GF_LEFT_APPARTMENTS = [LH_GREY_BUILDING_GF_APT1, LH_GREY_BUILDING_GF_APT2, LH_GREY_BUILDING_GF_APT3];

const GF_RIGHT_DOORS = [DOORKEY_GREY_BUILDING_GF_APT4, DOORKEY_GREY_BUILDING_GF_APT5, DOORKEY_GREY_BUILDING_GF_APT6];
const GF_RIGHT_APPARTMENTS = [LH_GREY_BUILDING_GF_APT4, LH_GREY_BUILDING_GF_APT5, LH_GREY_BUILDING_GF_APT6];

const F1_LEFT_DOORS = [DOORKEY_GREY_BUILDING_F1_APT1, DOORKEY_GREY_BUILDING_F1_APT2, DOORKEY_GREY_BUILDING_F1_APT3];
const F1_LEFT_APPARTMENTS = [LH_GREY_BUILDING_F1_APT1, LH_GREY_BUILDING_F1_APT2, LH_GREY_BUILDING_F1_APT3];

const F1_RIGHT_DOORS = [DOORKEY_GREY_BUILDING_F1_APT4, DOORKEY_GREY_BUILDING_F1_APT5, DOORKEY_GREY_BUILDING_F1_APT6];
const F1_RIGHT_APPARTMENTS = [LH_GREY_BUILDING_F1_APT4, LH_GREY_BUILDING_F1_APT5, LH_GREY_BUILDING_F1_APT6];

const F2_LEFT_DOORS = [DOORKEY_GREY_BUILDING_F2_APT1, DOORKEY_GREY_BUILDING_F2_APT2, DOORKEY_GREY_BUILDING_F2_APT3];
const F2_LEFT_APPARTMENTS = [LH_GREY_BUILDING_F2_APT1, LH_GREY_BUILDING_F2_APT2, LH_GREY_BUILDING_F2_APT3];

const F3_LEFT_DOORS = [DOORKEY_GREY_BUILDING_F3_APT1, DOORKEY_GREY_BUILDING_F3_APT2, DOORKEY_GREY_BUILDING_F3_APT3];
const F3_LEFT_APPARTMENTS = [LH_GREY_BUILDING_F3_APT1, LH_GREY_BUILDING_F3_APT2, LH_GREY_BUILDING_F3_APT3];

const F3_RIGHT_DOORS = [DOORKEY_GREY_BUILDING_F3_APT4, DOORKEY_GREY_BUILDING_F3_APT5, DOORKEY_GREY_BUILDING_F3_APT6];
const F3_RIGHT_APPARTMENTS = [LH_GREY_BUILDING_F3_APT4, LH_GREY_BUILDING_F3_APT5, LH_GREY_BUILDING_F3_APT6];

export const LHGB_Lobby_Doors = ( lobbyKey: string ): DoorModel[] => {
    switch ( lobbyKey ) {
        case LH_GREY_BUILDING_GF_LOBBY:
            return [
                getLobbyLeftDoor( DOORKEY_GREY_BUILDING_GF_LEFT_HALL, LH_GREY_BUILDING_GF_HALL_LEFT ),
                getLobbyRightDoor( DOORKEY_GREY_BUILDING_GF_RIGHT_HALL, LH_GREY_BUILDING_GF_HALL_RIGHT ),
                ...getLobbyFrontDoors()
            ];
        case LH_GREY_BUILDING_F1_LOBBY:
            return [
                getLobbyLeftDoor( DOORKEY_GREY_BUILDING_F1_LEFT_HALL, LH_GREY_BUILDING_F1_HALL_LEFT ),
                getLobbyRightDoor( DOORKEY_GREY_BUILDING_F1_RIGHT_HALL, LH_GREY_BUILDING_F1_HALL_RIGHT )
            ];
        case LH_GREY_BUILDING_F2_LOBBY:
            return [getLobbyLeftDoor( DOORKEY_GREY_BUILDING_F2_LEFT_HALL, LH_GREY_BUILDING_F2_HALL_LEFT )];
        case LH_GREY_BUILDING_F3_LOBBY:
            return [
                getLobbyLeftDoor( DOORKEY_GREY_BUILDING_F3_LEFT_HALL, LH_GREY_BUILDING_F3_HALL_LEFT ),
                getLobbyRightDoor( DOORKEY_GREY_BUILDING_F3_RIGHT_HALL, LH_GREY_BUILDING_F3_HALL_RIGHT )
            ];
        case LH_GREY_BUILDING_F4_LOBBY:
            return []
    }
}

export const LHGB_Hallway_Doors = ( hallwayKey: string ): DoorModel[] => {
    switch ( hallwayKey ) {
        case LH_GREY_BUILDING_GF_HALL_LEFT:
            return [
                ...getAppartmentDoors( GF_LEFT_DOORS, GF_LEFT_APPARTMENTS ),
                getHallwayLeftDoor( DOORKEY_GREY_BUILDING_GF_LEFT_HALL, LH_GREY_BUILDING_GF_LOBBY )
            ];
        case LH_GREY_BUILDING_GF_HALL_RIGHT:
            return [
                ...getAppartmentDoors( GF_RIGHT_DOORS, GF_RIGHT_APPARTMENTS ),
                getHallwayRightDoor( DOORKEY_GREY_BUILDING_GF_RIGHT_HALL, LH_GREY_BUILDING_GF_LOBBY )
            ];
        case LH_GREY_BUILDING_F1_HALL_LEFT:
            return [
                ...getAppartmentDoors( F1_LEFT_DOORS, F1_LEFT_APPARTMENTS ),
                getHallwayLeftDoor( DOORKEY_GREY_BUILDING_F1_LEFT_HALL, LH_GREY_BUILDING_F1_LOBBY )
            ];
        case LH_GREY_BUILDING_F1_HALL_RIGHT:
            return [
                ...getAppartmentDoors( F1_RIGHT_DOORS, F1_RIGHT_APPARTMENTS ),
                getHallwayRightDoor( DOORKEY_GREY_BUILDING_F1_RIGHT_HALL, LH_GREY_BUILDING_F1_LOBBY )
            ];
        case LH_GREY_BUILDING_F2_HALL_LEFT:
            return [
                ...getAppartmentDoors( F2_LEFT_DOORS, F2_LEFT_APPARTMENTS ),
                getHallwayLeftDoor( DOORKEY_GREY_BUILDING_F2_LEFT_HALL, LH_GREY_BUILDING_F2_LOBBY )
            ];
        case LH_GREY_BUILDING_F3_HALL_LEFT:
            return [
                ...getAppartmentDoors( F3_LEFT_DOORS, F3_LEFT_APPARTMENTS ),
                getHallwayLeftDoor( DOORKEY_GREY_BUILDING_F3_LEFT_HALL, LH_GREY_BUILDING_F3_LOBBY )
            ];
        case LH_GREY_BUILDING_F3_HALL_RIGHT:
            return [
                ...getAppartmentDoors( F3_RIGHT_DOORS, F3_RIGHT_APPARTMENTS ),
                getHallwayRightDoor( DOORKEY_GREY_BUILDING_F3_RIGHT_HALL, LH_GREY_BUILDING_F3_LOBBY )
            ];
    }
}

export const LHGB_AppartmentMain_Doors = ( doorKeys: string[], mapKeys: string[] ): DoorModel[] => {
    let doors = []
    doorKeys.forEach( ( e, index ) => {
        if ( e !== null ) {
            switch ( index ) {
                case 0:
                    doors.push( getAppartmentToHallDoor(e, mapKeys[index]) )
                    break;
                case 1:
                    doors.push( getAppartmentToBedroomDoor( e, mapKeys[index] ) )
                    break;
                case 2:
                    doors.push( getAppartmentToToiletDoor( e, mapKeys[index] ) )
                    break;
            }
        }
    } )
    return doors;
}

export const LHGB_AppartmentToilet_Doors = ( doorKey: string, appartmentKey: string ): DoorModel[] => {
    return [{
        id: doorKey,
        column: 1,
        row: 3,
        direction: DirectionEnum.left,
        doorTo: appartmentKey
    }];
}
export const LHGB_AppartmentBedroom_Doors = ( doorKey: string, appartmentKey: string ): DoorModel[] => {
    return [{
        id: doorKey,
        column: 5,
        row: 4,
        direction: DirectionEnum.right,
        doorTo: appartmentKey
    }];
}

const getLobbyLeftDoor = ( doorId: string, doorTo: string ): DoorModel => {
    return {
        id: doorId,
        column: 1,
        row: 7,
        doorTo: doorTo,
        direction: DirectionEnum.left
    }
}
const getLobbyRightDoor = ( doorId: string, doorTo: string ): DoorModel => {
    return {
        id: doorId,
        column: 12,
        row: 7,
        doorTo: doorTo,
        direction: DirectionEnum.right
    }
}
const getLobbyFrontDoors = (): DoorModel[] => {
    return [
        {
            id: DOORKEY_GREY_BUILDING_FRONT_DOOR,
            column: 6,
            row: 8,
            doorTo: LH_MAP_KEY,
            direction: DirectionEnum.down
        },
        {
            id: DOORKEY_GREY_BUILDING_FRONT_DOOR,
            column: 7,
            row: 8,
            doorTo: LH_MAP_KEY,
            direction: DirectionEnum.down
        }
    ]
}
const getAppartmentDoors = ( doorKeys: string[], mapKeys: string[] ): DoorModel[] => {
    let doors = [];
    let doorColumnPositions = [4, 8, 12]
    doorKeys.forEach( ( key, index ) => {
        if ( key !== null ) {
            doors.push(
                {
                    id: key,
                    column: doorColumnPositions[index],
                    row: 4,
                    doorTo: mapKeys[index],
                    direction: DirectionEnum.down
                }
            )
        }
    } )
    return doors;
}
const getHallwayLeftDoor = ( key: string, doorTo: string ): DoorModel => {
    return {
        id: key,
        column: 15,
        row: 3,
        doorTo: doorTo,
        direction: DirectionEnum.right
    }
}
const getHallwayRightDoor = ( key: string, doorTo: string ): DoorModel => {
    return {
        id: key,
        column: 1,
        row: 3,
        doorTo: doorTo,
        direction: DirectionEnum.left
    }
}
const getAppartmentToHallDoor = ( key: string, doorTo: string ): DoorModel => {
    return {
        id: key,
        column: 6,
        row: 2,
        direction: DirectionEnum.up,
        doorTo: doorTo
    }
}
const getAppartmentToBedroomDoor = ( key: string, doorTo: string ): DoorModel => {
    return {
        id: key,
        column: 5,
        row: 4,
        direction: DirectionEnum.left,
        doorTo: doorTo
    }
}
const getAppartmentToToiletDoor = ( key: string, doorTo: string ): DoorModel => {
    return {
        id: key,
        column: 6,
        row: 4,
        direction: DirectionEnum.right,
        doorTo: doorTo
    }
}