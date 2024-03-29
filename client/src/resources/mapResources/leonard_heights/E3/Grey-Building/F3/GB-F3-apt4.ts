import { MAP_IDS } from "../../../../mapIds";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";

export const MAP_LH_GB_F3_APT4 = {
    ...GBAptTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT4,
    "triggers": [...LHGB_AppartmentMain_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT4 )]
}

export const MAP_LH_GB_F3_APT4_BED = {
    ...GBBedroomTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT4_BEDROOM,
    "triggers": [...LHGB_AppartmentBedroom_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT4_BEDROOM )]
}

export const MAP_LH_GB_F3_APT4_TOILET = {
    ...GBToiletTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT4_TOILET,
    "triggers": [...LHGB_AppartmentToilet_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_APT4_TOILET )]
}