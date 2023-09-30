import { EventChainType } from "../../../../../enumerables/EventChainType";
import { TriggerType } from "../../../../../enumerables/TriggerType";
import { CUTSCENE_IDS } from "../../../../eventChainResources/cutsceneIds";
import { DOOR_IDS } from "../../../../eventChainResources/doorIds";
import { MAP_IDS } from "../../../mapIds";
import { getBSAppartmentToHallDoor } from "./registries/BSDoorsFactory";
import BakerStreetAptTemplate from "./templates/Baker-Street-Apt-Template";

export default {
	"key": MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F3_APT,
    ...BakerStreetAptTemplate,
	"sprites": [
		{
			"type": "Sink",
			"column": 7,
			"row": 4,
			"direction": 0
		},
		{
			"type": "Fridge",
			"column": 6,
			"row": 2,
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
			"type": "computer_table",
			"column": 2,
			"row": 4,
			"direction": 0
		},
		{
			"type": "couch_nice_left",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "Single_Bed",
			"column": 1,
			"row": 6,
			"direction": 0
		},
		{
			"type": "house_plant",
			"column": 1,
			"row": 4,
			"direction": 0
		},
		{
			"type": "Rug_01",
			"column": 4,
			"row": 6,
			"direction": 0
		},
		{
			"type": "tableB",
			"column": 4,
			"row": 5,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_west",
			"column": 5,
			"row": 5,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_north",
			"column": 4,
			"row": 6,
			"direction": 0
		},
		{
			"type": "inside_bin",
			"column": 5,
			"row": 2,
			"direction": 0
		}
	],
	"triggers": [
		getBSAppartmentToHallDoor( DOOR_IDS.BAKER_STREET_12_APT_F3 ),
		//{
		//	"eventChainType": EventChainType.cutscene,
		//	"eventId": CUTSCENE_IDS.INTRO_CUTSCENE,
		//	"triggerType": TriggerType.map_leave
		//}
	]
}