import { DOOR_IDS } from "../../../../eventChainResources/doorIds";
import { MAP_IDS } from "../../../mapIds";
import { getBSAppartmentToHallDoor } from "./registries/BSDoorsFactory";
import BakerStreetAptTemplate from "./templates/Baker-Street-Apt-Template";

export default {
	"key": MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F1_APT,
	...BakerStreetAptTemplate,
	"sprites": [
		{
			"type": "Sink",
			"column": 7,
			"row": 4,
			"direction": 0
		},
		{
			"type": "toilet_left",
			"column": 1,
			"row": 2,
			"direction": 0
		},
		{
			"type": "wall_thing",
			"column": 1,
			"row": 3,
			"direction": 0
		},
		{
			"type": "wall_thing_c",
			"column": 3,
			"row": 2,
			"direction": 0
		},
		{
			"type": "inside_bin",
			"column": 7,
			"row": 5,
			"direction": 0
		},
		{
			"type": "blue_double_bed",
			"column": 1,
			"row": 4,
			"direction": 0
		},
		{
			"type": "blue_couch_north",
			"column": 4,
			"row": 6,
			"direction": 0
		},
		{
			"type": "house_plant",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "lamp_red",
			"column": 1,
			"row": 6,
			"direction": 0
		},
		{
			"type": "brown_chair_north",
			"column": 2,
			"row": 6,
			"direction": 0
		},
		{
			"type": "vent_1",
			"column": 7,
			"row": 1,
			"direction": 0
		},
		{
			"type": "crisps",
			"column": 6,
			"row": 3,
			"direction": 0
		}
	],
    "triggers": [getBSAppartmentToHallDoor( DOOR_IDS.BAKER_STREET_12_APT_F1 )]
}