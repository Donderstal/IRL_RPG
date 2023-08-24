import { MAP_IDS } from "../../../../mapIds";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";

export const MAP_LH_GB_F2_APT1 = {
    ...GBAptTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F2_APT1,
    "triggers": [...LHGB_AppartmentMain_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F2_APT1 )]
}

export const MAP_LH_GB_F2_APT1_BED = {
    ...GBBedroomTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F2_APT1_BEDROOM,
    "triggers": [...LHGB_AppartmentBedroom_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F2_APT1_BEDROOM )]
}

export const MAP_LH_GB_F2_APT1_TOILET = {
    ...GBToiletTemplate,
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F2_APT1_TOILET,
    "triggers": [...LHGB_AppartmentToilet_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F2_APT1_TOILET )]
}