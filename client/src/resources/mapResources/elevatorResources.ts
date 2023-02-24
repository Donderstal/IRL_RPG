import { DirectionEnum } from "../../enumerables/DirectionEnum";
import type { ElevatorModel } from "../../models/ElevatorModel";
import { getDefaultCondition } from "../conditionFactory";
import {
    LH_GREY_BUILDING_F1_LOBBY,
    LH_GREY_BUILDING_F2_LOBBY,
    LH_GREY_BUILDING_F3_LOBBY,
    LH_GREY_BUILDING_F4_LOBBY,
    LH_GREY_BUILDING_GF_LOBBY,
    LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY, LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY,
    LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY, LH_SARDINE_STUDIOS_STAIRS_TOP_KEY
} from "./leonard_heights/leonard_heights_res";

export const ELEVATOR_SARDINE_STUDIOS: ElevatorModel = {
    id: "SARDINE_STUDIOS_ELEVATOR",
    column: 3,
    row: 3,
    direction: DirectionEnum.up,
    floors: {
        "Top floor": LH_SARDINE_STUDIOS_STAIRS_TOP_KEY,
        "Second floor": LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY,
        "First floor": LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY,
        "Ground floor": LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY
    },
    condition: getDefaultCondition()
}

export const ELEVATOR_GREY_BUILDING: ElevatorModel = {
    id: "GREY_BUILDING_ELEVATOR",
    column: 2,
    row: 2,
    direction: DirectionEnum.up,
    floors: {
        "Top floor": LH_GREY_BUILDING_F4_LOBBY,
        "Third floor": LH_GREY_BUILDING_F3_LOBBY,
        "Second floor": LH_GREY_BUILDING_F2_LOBBY,
        "First floor": LH_GREY_BUILDING_F1_LOBBY,
        "Ground floor": LH_GREY_BUILDING_GF_LOBBY
    },
    condition: getDefaultCondition()
}