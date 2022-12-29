import { DirectionEnum } from "../../enumerables/DirectionEnum";
import type { ElevatorModel } from "../../models/ElevatorModel";
import { getDefaultCondition } from "../conditionFactory";
import {
    LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY, LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY,
    LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY, LH_SARDINE_STUDIOS_STAIRS_TOP_KEY
} from "./leonard_heights/leonard_heights_res";

export const ELEVATOR_SARDINE_STUDIOS: ElevatorModel = {
    id: "SARDINE_STUDIOS_ELEVATOR",
    column: 3,
    row: 3,
    direction: DirectionEnum.up,
    floors: {
        "Ground floor": LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY,
        "First floor": LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY,
        "Second floor": LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY,
        "Top floor": LH_SARDINE_STUDIOS_STAIRS_TOP_KEY,
    },
    condition: getDefaultCondition()
}