import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { EventType } from "../../../../../enumerables/EventType";
import { CUTSCENE_IDS } from "../../../../eventResources/cutsceneIds";
import { DOOR_IDS } from "../../../../eventResources/doorIds";
import { MAP_IDS } from "../../../mapIds";
import { getBSAppartmentToHallDoor } from "./registries/BSDoorsFactory";
import BakerStreetAptTemplate from "./templates/Baker-Street-Apt-Template";

const RESIDENT = "RESIDENT";

export default {
	"key": MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F4_APT,
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
			"type": "vent_1",
			"column": 7,
			"row": 1,
			"direction": 0
		},
		{
			"type": "BLACK PONY TAIL LADY",
			"column": 6,
			"row": 3,
			"direction": 2,
			"name": "New Neighbour",
			"anim_type": AnimationTypeEnum.idle,
			"id": RESIDENT
		},
		{
			"type": "Fridge",
			"column": 6,
			"row": 2,
			"direction": 0
		},
		{
			"type": "couch_nice_right",
			"column": 1,
			"row": 5,
			"direction": 0
		},
		{
			"type": "tv_side",
			"column": 3,
			"row": 4,
			"direction": 0
		},
		{
			"type": "tableC",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "chair_red_cushion",
			"column": 7,
			"row": 5,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_east",
			"column": 6,
			"row": 6,
			"direction": 0
		},
		{
			"type": "single_bed_side",
			"column": 3,
			"row": 6,
			"direction": 0
		},
		{
			"type": "pot_plant_a",
			"column": 5,
			"row": 2,
			"direction": 0
		}
	],
	"triggers": [
		getBSAppartmentToHallDoor( DOOR_IDS.BAKER_STREET_12_APT_F4 ),
		{
			"eventType": EventType.cutscene,
			"eventId": CUTSCENE_IDS.C2_BS12_APT4_RESIDENT,
			"spriteId": RESIDENT
        }
	]
}