import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { CollectableType } from "../../../../../enumerables/CollectableTypeEnum";
import { EventType } from "../../../../../enumerables/EventType";
import { getCollectibleCondition } from "../../../../collectibleResources";
import { CUTSCENE_IDS } from "../../../../eventResources/cutsceneIds";
import { DOOR_IDS } from "../../../../eventResources/doorIds";
import { MAP_IDS } from "../../../mapIds";
import { getBSAppartmentToHallDoor } from "./registries/BSDoorsFactory";
import BakerStreetAptTemplate from "./templates/Baker-Street-Apt-Template";

const COLLECTIBLE_ID = "COLLECTABLE_COIN_BAKER_STREET_12_F2";
const ROBOT_1_ID = "ROBOT_1_ID";
const ROBOT_2_ID = "ROBOT_1_ID";

export default {
    "key": MAP_IDS.BAKER_STREET_12_F1_APT,
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
			"type": "Single_Bed",
			"column": 1,
			"row": 6,
			"direction": 0
		},
		{
			"type": "Single_Bed",
			"column": 3,
			"row": 6,
			"direction": 0
		},
		{
			"type": "brown_chair_east",
			"column": 5,
			"row": 6,
			"direction": 0
		},
		{
			"type": "brown_chair_west",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "tableA",
			"column": 6,
			"row": 6,
			"direction": 0
		},
		{
			"type": "tires_1",
			"column": 6,
			"row": 2,
			"direction": 0
		},
		{
			"type": "tires_2",
			"column": 6,
			"row": 3,
			"direction": 0
		},
		{
			"type": "tires_1",
			"column": 5,
			"row": 3,
			"direction": 0
		},
		{
			"type": "collectable_juice_can",
			"row": 4,
			"column": 6,
			"id": COLLECTIBLE_ID,
			"condition": getCollectibleCondition( MAP_IDS.BAKER_STREET_12_F2_APT, CollectableType.can )
		},
		{
			"type": "ROBOT_WHITE",
			"column": 7,
			"row": 5,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle,
			"id": ROBOT_1_ID
		},
		{
			"type": "ROBOT_WHITE",
			"column": 2,
			"row": 6,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle,
			"id": ROBOT_2_ID
		}
	],
	"triggers": [
		getBSAppartmentToHallDoor( DOOR_IDS.BAKER_STREET_12_APT_F2 ),
		{
			"eventType": EventType.door,
			"eventId": CUTSCENE_IDS.COLLECT_CAN,
			"spriteId": COLLECTIBLE_ID
		},
		{
			"eventType": EventType.cutscene,
			"eventID": CUTSCENE_IDS.C2_BS12_APT2_ROBOT_1,
			"spriteId": ROBOT_1_ID
		},
		{
			"eventType": EventType.cutscene,
			"eventID": CUTSCENE_IDS.C2_BS12_APT2_ROBOT_2,
			"spriteId": ROBOT_2_ID
		}
	],
}