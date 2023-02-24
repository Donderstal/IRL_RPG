import { LH_GREY_BUILDING_F1_APT6, LH_GREY_BUILDING_F1_APT6_BEDROOM, LH_GREY_BUILDING_F1_APT6_TOILET, LH_GREY_BUILDING_F1_HALL_RIGHT } from "../../../leonard_heights_res";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";
import { DOORKEY_GREY_BUILDING_F1_APT6, DOORKEY_GREY_BUILDING_F1_APT6_BEDROOM, DOORKEY_GREY_BUILDING_F1_APT6_TOILET } from "./GB-F1-door-keys";

const F1_APT_6_DOORS = [DOORKEY_GREY_BUILDING_F1_APT6, DOORKEY_GREY_BUILDING_F1_APT6_BEDROOM, DOORKEY_GREY_BUILDING_F1_APT6_TOILET];
const F1_APT_6_CONNECTED_MAPS = [LH_GREY_BUILDING_F1_HALL_RIGHT, LH_GREY_BUILDING_F1_APT6_BEDROOM, LH_GREY_BUILDING_F1_APT6_TOILET];

export const MAP_LH_GB_F1_APT6 = {
    ...GBAptTemplate,
    "key": LH_GREY_BUILDING_F1_APT6,
    "doors": LHGB_AppartmentMain_Doors( F1_APT_6_DOORS, F1_APT_6_CONNECTED_MAPS ),
    "sprites": []
}

export const MAP_LH_GB_F1_APT6_BED = {
    ...GBBedroomTemplate,
    "key": LH_GREY_BUILDING_F1_APT6_BEDROOM,
    "doors": LHGB_AppartmentBedroom_Doors( DOORKEY_GREY_BUILDING_F1_APT6_BEDROOM, LH_GREY_BUILDING_F1_APT6 ),
    "sprites": []
}

export const MAP_LH_GB_F1_APT6_TOILET = {
    ...GBToiletTemplate,
    "key": LH_GREY_BUILDING_F1_APT6_TOILET,
    "doors": LHGB_AppartmentToilet_Doors( DOORKEY_GREY_BUILDING_F1_APT6_TOILET, LH_GREY_BUILDING_F1_APT6 ),
    "sprites": []
}