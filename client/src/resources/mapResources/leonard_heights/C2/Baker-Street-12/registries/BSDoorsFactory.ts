import { DirectionEnum } from "../../../../../../enumerables/DirectionEnum";
import { EventChainType } from "../../../../../../enumerables/EventChainType";
import type { TriggerModel } from "../../../../../../models/TriggerModel";
import { DOOR_IDS } from "../../../../../eventChainResources/doorIds";
import { MAP_IDS } from "../../../../mapIds";

export const getBSStairHallDoors = ( mapKey: string ): TriggerModel[] => {
    switch ( mapKey ) {
        case MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_GF:
            return [
                getFrontDoor(),
                ...getRightStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_GF, DirectionEnum.up )
            ];
        case MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F1_HALL:
            return [
                ...getLeftStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_F1, DirectionEnum.up ),
                getHallToAppartmentDoor( DOOR_IDS.BAKER_STREET_12_APT_F1 ),
                ...getRightStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_GF, DirectionEnum.down )
            ];
        case MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F2_HALL:
            return [
                ...getLeftStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_F1, DirectionEnum.down ),
                getHallToAppartmentDoor( DOOR_IDS.BAKER_STREET_12_APT_F2 ),
                ...getRightStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_F2, DirectionEnum.up )
            ];
        case MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F3_HALL:
            return [
                ...getLeftStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_F3, DirectionEnum.up ),
                getHallToAppartmentDoor( DOOR_IDS.BAKER_STREET_12_APT_F3),
                ...getRightStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_F2, DirectionEnum.down )
            ];
        case MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F4_HALL:
            return [
                ...getLeftStairsDoors( DOOR_IDS.BAKER_STREET_12_STAIRS_F3, DirectionEnum.down ),
                getHallToAppartmentDoor( DOOR_IDS.BAKER_STREET_12_APT_F4 ),
            ];
    }
}
export const getBSAppartmentToHallDoor = ( doorKey: string ): TriggerModel => {
    return {
        eventChainType: EventChainType.door,
        eventId: doorKey,
        direction: DirectionEnum.up,
        column: 4,
        row: 2
    }
}

const getHallToAppartmentDoor = ( doorKey: string ): TriggerModel => {
    return {
        eventChainType: EventChainType.door,
        eventId: doorKey,
        direction: DirectionEnum.down,
        column: 4,
        row: 4
    }
}
const getRightStairsDoors = ( doorKey: string, direction: DirectionEnum ): TriggerModel[] => {
    const baseDoorModel = {
        eventType: EventChainType.door,
        eventId: doorKey,
        direction: direction,
        row: direction === DirectionEnum.up ? 1 : 4
    }
    return [
        {
            ...baseDoorModel,
            column: 6
        },
        {
            ...baseDoorModel,
            column: 7
        },
    ];
}
const getLeftStairsDoors = ( doorKey: string, direction: DirectionEnum ) => {
    const baseDoorModel = {
        direction: direction,
        eventType: EventChainType.door,
        eventId: doorKey,
        row: direction === DirectionEnum.up ? 1 : 4
    }
    return [
        {
            ...baseDoorModel,
            column: 1,
        },
        {
            ...baseDoorModel,
            column: 2,
        },
    ];
}
const getFrontDoor = (): TriggerModel => {
    return {
        eventChainType: EventChainType.door,
        eventId: DOOR_IDS.BAKER_STREET_12_FRONT_DOOR,
        direction: DirectionEnum.down,
        column: 4,
        row: 10
    }
}