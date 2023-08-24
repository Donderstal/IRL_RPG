import { MAP_IDS } from "../../../../mapIds";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";

export const MAP_LH_GB_F3_APT2 = {
    ...GBAptTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT2,
    "triggers": [...LHGB_AppartmentMain_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT2 )]
}

export const MAP_LH_GB_F3_APT2_BED = {
    ...GBBedroomTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT2_BEDROOM,
    "triggers": [...LHGB_AppartmentBedroom_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT2_BEDROOM )]
}

export const MAP_LH_GB_F3_APT2_TOILET = {
    ...GBToiletTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT2_TOILET,
    "triggers": [...LHGB_AppartmentToilet_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT2_TOILET )]
}