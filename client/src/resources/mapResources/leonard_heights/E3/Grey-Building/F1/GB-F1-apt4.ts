import { LH_GREY_BUILDING_F1_APT4, LH_GREY_BUILDING_F1_APT4_BEDROOM, LH_GREY_BUILDING_F1_APT4_TOILET, LH_GREY_BUILDING_F1_HALL_RIGHT } from "../../../leonard_heights_res";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";
import { DOORKEY_GREY_BUILDING_F1_APT4, DOORKEY_GREY_BUILDING_F1_APT4_BEDROOM, DOORKEY_GREY_BUILDING_F1_APT4_TOILET } from "./GB-F1-door-keys";

const F1_APT_4_DOORS = [DOORKEY_GREY_BUILDING_F1_APT4, DOORKEY_GREY_BUILDING_F1_APT4_BEDROOM, DOORKEY_GREY_BUILDING_F1_APT4_TOILET];
const F1_APT_4_CONNECTED_MAPS = [LH_GREY_BUILDING_F1_HALL_RIGHT, LH_GREY_BUILDING_F1_APT4_BEDROOM, LH_GREY_BUILDING_F1_APT4_TOILET];

export const MAP_LH_GB_F1_APT4 = {
    ...GBAptTemplate,
    "key": LH_GREY_BUILDING_F1_APT4,
    "doors": LHGB_AppartmentMain_Doors( F1_APT_4_DOORS, F1_APT_4_CONNECTED_MAPS ),
    "sprites": []
}

export const MAP_LH_GB_F1_APT4_BED = {
    ...GBBedroomTemplate,
    "key": LH_GREY_BUILDING_F1_APT4_BEDROOM,
    "doors": LHGB_AppartmentBedroom_Doors( DOORKEY_GREY_BUILDING_F1_APT4_BEDROOM, LH_GREY_BUILDING_F1_APT4 ),
    "sprites": []
}

export const MAP_LH_GB_F1_APT4_TOILET = {
    ...GBToiletTemplate,
    "key": LH_GREY_BUILDING_F1_APT4_TOILET,
    "doors": LHGB_AppartmentToilet_Doors( DOORKEY_GREY_BUILDING_F1_APT4_TOILET, LH_GREY_BUILDING_F1_APT4 ),
    "sprites": []
}