import { LH_GREY_BUILDING_GF_APT2, LH_GREY_BUILDING_GF_APT2_BEDROOM, LH_GREY_BUILDING_GF_APT2_TOILET, LH_GREY_BUILDING_GF_HALL_LEFT } from "../../../leonard_heights_res";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";
import { DOORKEY_GREY_BUILDING_GF_APT2, DOORKEY_GREY_BUILDING_GF_APT2_BEDROOM, DOORKEY_GREY_BUILDING_GF_APT2_TOILET } from "./GB-GF-door-keys";

const GF_APT_2_DOORS = [DOORKEY_GREY_BUILDING_GF_APT2, DOORKEY_GREY_BUILDING_GF_APT2_BEDROOM, DOORKEY_GREY_BUILDING_GF_APT2_TOILET];
const GF_APT_2_CONNECTED_MAPS = [LH_GREY_BUILDING_GF_HALL_LEFT, LH_GREY_BUILDING_GF_APT2_BEDROOM, LH_GREY_BUILDING_GF_APT2_TOILET];

export const MAP_LH_GB_GF_APT2 = {
    ...GBAptTemplate,
    "key": LH_GREY_BUILDING_GF_APT2,
    "doors": LHGB_AppartmentMain_Doors( GF_APT_2_DOORS, GF_APT_2_CONNECTED_MAPS ),
    "sprites": []
}

export const MAP_LH_GB_GF_APT2_BED = {
    ...GBBedroomTemplate,
    "key": LH_GREY_BUILDING_GF_APT2_BEDROOM,
    "doors": LHGB_AppartmentBedroom_Doors( DOORKEY_GREY_BUILDING_GF_APT2_BEDROOM, LH_GREY_BUILDING_GF_APT2 ),
    "sprites": []
}

export const MAP_LH_GB_GF_APT2_TOILET = {
    ...GBToiletTemplate,
    "key": LH_GREY_BUILDING_GF_APT2_TOILET,
    "doors": LHGB_AppartmentToilet_Doors( DOORKEY_GREY_BUILDING_GF_APT2_TOILET, LH_GREY_BUILDING_GF_APT2 ),
    "sprites": []
}