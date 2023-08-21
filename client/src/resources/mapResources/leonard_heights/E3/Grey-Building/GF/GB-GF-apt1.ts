import { MAP_IDS } from "../../../../mapIds";
import GBAptTemplate from "../GB-apt-template";
import GBBedroomTemplate from "../GB-bedroom-template";
import GBToiletTemplate from "../GB-toilet-template";
import { LHGB_AppartmentBedroom_Doors, LHGB_AppartmentMain_Doors, LHGB_AppartmentToilet_Doors } from "../GBDoorsFactory";

export const MAP_LH_GB_GF_APT1 = {
    ...GBAptTemplate,
    "key": MAP_IDS.GREY_BUILDING_GF_APT1,
	"triggers": [...LHGB_AppartmentMain_Doors( MAP_IDS.GREY_BUILDING_GF_APT1 )],
	"sprites": [
		{
			"type": "door_interior_west_light",
			"column": 6,
			"row": 4,
			"direction": 0
		},
		{
			"type": "door_interior_east_light",
			"column": 5,
			"row": 4,
			"direction": 0
		},
		{
			"type": "Fridge",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "Sink",
			"column": 8,
			"row": 9,
			"direction": 0
		},
		{
			"type": "inside_bin",
			"column": 8,
			"row": 6,
			"direction": 0
		},
		{
			"type": "couch_nice_right",
			"column": 1,
			"row": 10,
			"direction": 0
		},
		{
			"type": "tableD",
			"column": 2,
			"row": 6,
			"direction": 0
		},
		{
			"type": "brown_chair_east",
			"column": 1,
			"row": 6,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_north",
			"column": 3,
			"row": 7,
			"direction": 0
		},
		{
			"type": "tv_side",
			"column": 4,
			"row": 9,
			"direction": 0
		},
		{
			"type": "bottle",
			"column": 4,
			"row": 6,
			"direction": 0
		},
		{
			"type": "bottle",
			"column": 5,
			"row": 10,
			"direction": 0
		},
		{
			"type": "bottle",
			"column": 2,
			"row": 8,
			"direction": 0
		},
		{
			"type": "can_red_1",
			"column": 8,
			"row": 10,
			"direction": 0
		},
		{
			"type": "can_red_1",
			"column": 7,
			"row": 7,
			"direction": 0
		},
		{
			"type": "tableC",
			"column": 3,
			"row": 6,
			"direction": 0
		}
	],
}

export const MAP_LH_GB_GF_APT1_BED = {
    ...GBBedroomTemplate,
    "key": MAP_IDS.GREY_BUILDING_GF_APT1_BEDROOM,
	"triggers": [...LHGB_AppartmentBedroom_Doors( MAP_IDS.GREY_BUILDING_GF_APT1_BEDROOM )],
	"sprites": [
		{
			"type": "yellow_rug_a",
			"column": 1,
			"row": 4,
			"direction": 0
		},
		{
			"type": "tableA",
			"column": 1,
			"row": 2,
			"direction": 0
		},
		{
			"type": "bottle",
			"column": 2,
			"row": 4,
			"direction": 0
		},
		{
			"type": "blue_double_bed",
			"column": 2,
			"row": 3,
			"direction": 0
		},
		{
			"type": "bottle",
			"column": 4,
			"row": 5,
			"direction": 0
		},
		{
			"type": "banana",
			"column": 1,
			"row": 5,
			"direction": 0
		},
		{
			"type": "can_red_1",
			"column": 4,
			"row": 4,
			"direction": 0
		},
		{
			"type": "can_red_1",
			"column": 1,
			"row": 3,
			"direction": 0
		},
		{
			"type": "door_interior_west_light",
			"column": 5,
			"row": 4,
			"direction": 0
		},
		{
			"type": "bin_hop",
			"column": 4,
			"row": 2,
			"direction": 0
		}
	],
}

export const MAP_LH_GB_GF_APT1_TOILET = {
    ...GBToiletTemplate,
    "key": MAP_IDS.GREY_BUILDING_GF_APT1_TOILET,
	"triggers": [...LHGB_AppartmentToilet_Doors( MAP_IDS.GREY_BUILDING_GF_APT1_TOILET )],
	"sprites": [
		{
			"type": "toilet",
			"column": 2,
			"row": 2,
			"direction": 0
		},
		{
			"type": "house_plant",
			"column": 3,
			"row": 4,
			"direction": 0
		},
		{
			"type": "inside_bin",
			"column": 1,
			"row": 2,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 2,
			"row": 2,
			"direction": 0
		},
		{
			"type": "vent_1",
			"column": 3,
			"row": 1,
			"direction": 0
		},
		{
			"type": "door_interior_east_light",
			"column": 1,
			"row": 3,
			"direction": 0
		},
		{
			"type": "bottle",
			"column": 3,
			"row": 3,
			"direction": 0
		},
		{
			"type": "can_orange_1",
			"column": 2,
			"row": 3,
			"direction": 0
		}
	],
}