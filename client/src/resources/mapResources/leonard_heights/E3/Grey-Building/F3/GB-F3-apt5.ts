import { LH_GREY_BUILDING_F3_APT5, LH_GREY_BUILDING_F3_APT5_BEDROOM, LH_GREY_BUILDING_F3_APT5_TOILET, LH_GREY_BUILDING_F3_HALL_RIGHT } from "../../../leonard_heights_res";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";
import { DOORKEY_GREY_BUILDING_F3_APT5, DOORKEY_GREY_BUILDING_F3_APT5_BEDROOM, DOORKEY_GREY_BUILDING_F3_APT5_TOILET } from "./GB-F3-door-keys";

const F3_APT_5_DOORS = [DOORKEY_GREY_BUILDING_F3_APT5, DOORKEY_GREY_BUILDING_F3_APT5_BEDROOM, DOORKEY_GREY_BUILDING_F3_APT5_TOILET];
const F3_APT_5_CONNECTED_MAPS = [LH_GREY_BUILDING_F3_HALL_RIGHT, LH_GREY_BUILDING_F3_APT5_BEDROOM, LH_GREY_BUILDING_F3_APT5_TOILET];

export const MAP_LH_GB_F3_APT5 = {
    ...GBAptTemplate,
    "key": LH_GREY_BUILDING_F3_APT5,
    "doors": LHGB_AppartmentMain_Doors( F3_APT_5_DOORS, F3_APT_5_CONNECTED_MAPS ),
    "sprites": []
}

export const MAP_LH_GB_F3_APT5_BED = {
    ...GBBedroomTemplate,
    "key": LH_GREY_BUILDING_F3_APT5_BEDROOM,
    "doors": LHGB_AppartmentBedroom_Doors( DOORKEY_GREY_BUILDING_F3_APT5_BEDROOM, LH_GREY_BUILDING_F3_APT5 ),
    "sprites": []
}

export const MAP_LH_GB_F3_APT5_TOILET = {
    ...GBToiletTemplate,
    "key": LH_GREY_BUILDING_F3_APT5_TOILET,
    "doors": LHGB_AppartmentToilet_Doors( DOORKEY_GREY_BUILDING_F3_APT5_TOILET, LH_GREY_BUILDING_F3_APT5 ),
    "sprites": []
}