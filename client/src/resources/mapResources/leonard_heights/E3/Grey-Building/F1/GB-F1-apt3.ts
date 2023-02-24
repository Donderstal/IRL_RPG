import { LH_GREY_BUILDING_F1_APT3, LH_GREY_BUILDING_F1_APT3_BEDROOM, LH_GREY_BUILDING_F1_APT3_TOILET, LH_GREY_BUILDING_F1_HALL_LEFT } from "../../../leonard_heights_res";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";
import { DOORKEY_GREY_BUILDING_F1_APT3, DOORKEY_GREY_BUILDING_F1_APT3_BEDROOM, DOORKEY_GREY_BUILDING_F1_APT3_TOILET } from "./GB-F1-door-keys";

const F1_APT_3_DOORS = [DOORKEY_GREY_BUILDING_F1_APT3, DOORKEY_GREY_BUILDING_F1_APT3_BEDROOM, DOORKEY_GREY_BUILDING_F1_APT3_TOILET];
const F1_APT_3_CONNECTED_MAPS = [LH_GREY_BUILDING_F1_HALL_LEFT, LH_GREY_BUILDING_F1_APT3_BEDROOM, LH_GREY_BUILDING_F1_APT3_TOILET];

export const MAP_LH_GB_F1_APT3 = {
    ...GBAptTemplate,
    "key": LH_GREY_BUILDING_F1_APT3,
    "doors": LHGB_AppartmentMain_Doors( F1_APT_3_DOORS, F1_APT_3_CONNECTED_MAPS ),
    "sprites": []
}

export const MAP_LH_GB_F1_APT3_BED = {
    ...GBBedroomTemplate,
    "key": LH_GREY_BUILDING_F1_APT3_BEDROOM,
    "doors": LHGB_AppartmentBedroom_Doors( DOORKEY_GREY_BUILDING_F1_APT3_BEDROOM, LH_GREY_BUILDING_F1_APT3 ),
    "sprites": []
}

export const MAP_LH_GB_F1_APT3_TOILET = {
    ...GBToiletTemplate,
    "key": LH_GREY_BUILDING_F1_APT3_TOILET,
    "doors": LHGB_AppartmentToilet_Doors( DOORKEY_GREY_BUILDING_F1_APT3_TOILET, LH_GREY_BUILDING_F1_APT3 ),
    "sprites": []
}