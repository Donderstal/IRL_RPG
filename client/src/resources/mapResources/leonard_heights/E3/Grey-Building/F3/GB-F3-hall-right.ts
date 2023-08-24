import { MAP_IDS } from "../../../../mapIds";
import GBHallTemplate from "../GB-hall-template";
import { LHGB_Hallway_Doors } from "../GBDoorsFactory";

export default {
    ...GBHallTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_HALL_RIGHT,
    "triggers": [...LHGB_Hallway_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_HALL_RIGHT )],
}