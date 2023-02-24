import { LH_GREY_BUILDING_F2_HALL_LEFT } from "../../../leonard_heights_res";
import GBHallTemplate from "../GB-hall-template";
import { LHGB_Hallway_Doors } from "../GBDoorsFactory";

export default {
    ...GBHallTemplate,
    "key": LH_GREY_BUILDING_F2_HALL_LEFT,
    "doors": LHGB_Hallway_Doors( LH_GREY_BUILDING_F2_HALL_LEFT ),
    "sprites": []
}