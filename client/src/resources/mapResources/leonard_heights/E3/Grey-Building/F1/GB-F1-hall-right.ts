import { LH_GREY_BUILDING_F1_HALL_RIGHT } from "../../../leonard_heights_res";
import GBHallTemplate from "../GB-hall-template";
import { LHGB_Hallway_Doors } from "../GBDoorsFactory";

export default {
    ...GBHallTemplate,
    "key": LH_GREY_BUILDING_F1_HALL_RIGHT,
    "doors": LHGB_Hallway_Doors( LH_GREY_BUILDING_F1_HALL_RIGHT ),
    "sprites": []
}