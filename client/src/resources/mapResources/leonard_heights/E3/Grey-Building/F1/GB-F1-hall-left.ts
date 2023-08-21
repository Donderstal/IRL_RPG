import { MAP_IDS } from "../../../../mapIds";
import GBHallTemplate from "../GB-hall-template";
import { LHGB_Hallway_Doors } from "../GBDoorsFactory";

export default {
    ...GBHallTemplate,
    "key": MAP_IDS.GREY_BUILDING_F1_HALL_LEFT,
    "triggers": [...LHGB_Hallway_Doors( MAP_IDS.GREY_BUILDING_F1_HALL_LEFT )],
}