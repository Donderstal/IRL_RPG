import { DirectionEnum } from "../../../../../../enumerables/DirectionEnum";
import type { DoorModel } from "../../../../../../models/DoorModel";
import { LH_BAKER_STREET_12_F1_APT_KEY, LH_BAKER_STREET_12_F1_STAIRS_KEY, LH_BAKER_STREET_12_F2_APT_KEY, LH_BAKER_STREET_12_F2_STAIRS_KEY, LH_BAKER_STREET_12_F3_APT_KEY, LH_BAKER_STREET_12_F3_STAIRS_KEY, LH_BAKER_STREET_12_F4_APT_KEY, LH_BAKER_STREET_12_F4_STAIRS_KEY, LH_BAKER_STREET_12_GF_KEY, LH_MAP_KEY } from "../../../leonard_heights_res";
import { DOORKEY_BAKER_STREET_12_FRONT_DOOR } from "../../C2-door-keys";
import { DOORKEY_BAKER_STREET_12_APT_F1, DOORKEY_BAKER_STREET_12_APT_F2, DOORKEY_BAKER_STREET_12_APT_F3, DOORKEY_BAKER_STREET_12_APT_F4, DOORKEY_BAKER_STREET_12_STAIRS_F1, DOORKEY_BAKER_STREET_12_STAIRS_F2, DOORKEY_BAKER_STREET_12_STAIRS_F3, DOORKEY_BAKER_STREET_12_STAIRS_GF } from "./BSDoorKeys";

export const getBSStairHallDoors = ( mapKey: string ): DoorModel[] => {
    switch ( mapKey ) {
        case LH_BAKER_STREET_12_GF_KEY:
            return [
                getFrontDoor(),
                ...getRightStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_GF, LH_BAKER_STREET_12_F1_STAIRS_KEY, DirectionEnum.up )
            ];
        case LH_BAKER_STREET_12_F1_STAIRS_KEY:
            return [
                ...getLeftStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_F1, LH_BAKER_STREET_12_F2_STAIRS_KEY, DirectionEnum.up ),
                getHallToAppartmentDoor( DOORKEY_BAKER_STREET_12_APT_F1, LH_BAKER_STREET_12_F1_APT_KEY ),
                ...getRightStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_GF, LH_BAKER_STREET_12_GF_KEY, DirectionEnum.down )
            ];
        case LH_BAKER_STREET_12_F2_STAIRS_KEY:
            return [
                ...getLeftStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_F1, LH_BAKER_STREET_12_F1_STAIRS_KEY, DirectionEnum.down ),
                getHallToAppartmentDoor( DOORKEY_BAKER_STREET_12_APT_F2, LH_BAKER_STREET_12_F2_APT_KEY ),
                ...getRightStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_F2, LH_BAKER_STREET_12_F3_STAIRS_KEY, DirectionEnum.up )
            ];
        case LH_BAKER_STREET_12_F3_STAIRS_KEY:
            return [
                ...getLeftStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_F3, LH_BAKER_STREET_12_F4_STAIRS_KEY, DirectionEnum.up ),
                getHallToAppartmentDoor( DOORKEY_BAKER_STREET_12_APT_F3, LH_BAKER_STREET_12_F3_APT_KEY ),
                ...getRightStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_F2, LH_BAKER_STREET_12_F2_STAIRS_KEY, DirectionEnum.down )
            ];
        case LH_BAKER_STREET_12_F4_STAIRS_KEY:
            return [
                ...getLeftStairsDoors( DOORKEY_BAKER_STREET_12_STAIRS_F3, LH_BAKER_STREET_12_F3_STAIRS_KEY, DirectionEnum.down ),
                getHallToAppartmentDoor( DOORKEY_BAKER_STREET_12_APT_F4, LH_BAKER_STREET_12_F4_APT_KEY ),
            ];
    }
}

export const getBSAppartmentToHallDoor = ( doorKey: string, mapKey: string ): DoorModel => {
    return {
        id: doorKey,
        direction: DirectionEnum.up,
        doorTo: mapKey,
        column: 4,
        row: 2
    }
}
const getHallToAppartmentDoor = ( doorKey: string, mapKey: string ): DoorModel => {
    return {
        id: doorKey,
        direction: DirectionEnum.down,
        doorTo: mapKey,
        column: 4,
        row: 4
    }
}

const getRightStairsDoors = ( doorKey: string, mapKey: string, direction: DirectionEnum ): DoorModel[] => {
    return [
        {
            id: doorKey,
            direction: direction,
            doorTo: mapKey,
            column: 6,
            row: direction === DirectionEnum.up ? 1 : 4
        },
        {
            id: doorKey,
            direction: direction,
            doorTo: mapKey,
            column: 7,
            row: direction === DirectionEnum.up ? 1 : 4
        },
    ];
}

const getLeftStairsDoors = ( doorKey: string, mapKey: string, direction: DirectionEnum ) => {
    return [
        {
            id: doorKey,
            direction: direction,
            doorTo: mapKey,
            column: 1,
            row: direction === DirectionEnum.up ? 1 : 4
        },
        {
            id: doorKey,
            direction: direction,
            doorTo: mapKey,
            column: 2,
            row: direction === DirectionEnum.up ? 1 : 4
        },
    ];
}

const getFrontDoor = (): DoorModel => {
    return {
        id: DOORKEY_BAKER_STREET_12_FRONT_DOOR,
        direction: DirectionEnum.down,
        doorTo: LH_MAP_KEY,
        column: 4,
        row: 10
    }
}