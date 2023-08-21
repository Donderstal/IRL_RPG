import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { IKEY_CAR_SHACK_3 } from "../../../../../game-data/interactionGlobals";
import { getInteractionNotRegisteredCondition, getInteractionRegisteredCondition } from "../../../../../factories/conditionFactory";
import { POLICE_WOMAN_1 } from "../../../../spriteTypeResources";
import { MAP_IDS } from "../../../mapIds";
import { LOCATION_NAMES } from "../../../locationNames";
import { EventType } from "../../../../../enumerables/EventType";
import { DOOR_IDS } from "../../../../eventResources/doorIds";
import { CUTSCENE_IDS } from "../../../../eventResources/cutsceneIds";

const ID_THIEVING_ROBOT = "ID_THIEVING_ROBOT";
const ID_POLICE_WOMAN = "ID_POLICE_WOMAN";

export default {
	"key": MAP_IDS.SARDINE_STUDIOS_F1_APT1,
	"location": LOCATION_NAMES.SARDINE_STUDIOS,
	"columns": 4,
	"rows": 9,
	"tileSet": "Generic_Room_BX",
	"outdoors": false,
	"grid": [
		{
			"id": 10,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 10,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 32,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 10,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 14,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 14,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 36,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 14,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		}
	],
	"frontGrid": [
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		},
		{
			"id": "E",
			"angle": 0,
			"mirrored": false
		}
	],
	"sprites": [
		{
			"type": "Sink",
			"column": 4,
			"row": 4,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "Single_Bed",
			"column": 2,
			"row": 9,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "boxes",
			"column": 1,
			"row": 2,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "boxes",
			"column": 1,
			"row": 3,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "boxes",
			"column": 3,
			"row": 9,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "boxes",
			"column": 3,
			"row": 8,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "boxes",
			"column": 1,
			"row": 4,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "boxes",
			"column": 2,
			"row": 6,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "boxes",
			"column": 3,
			"row": 7,
			"direction": 0
		},
		{
			"condition": getInteractionNotRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": "ROBOT_GREY",
			"column": 2,
			"row": 7,
			"direction": 1,
			"id": ID_THIEVING_ROBOT
		},
		{
			"condition": getInteractionRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": POLICE_WOMAN_1,
			"column": 1,
			"row": 5,
			"direction": DirectionEnum.right,
			"id": ID_POLICE_WOMAN
		}
	],
	"frontSprites": [],
	"spawnPoints": [],
	"roads": [],
	"triggers": [
		{
			"eventType": EventType.door,
			"eventId": DOOR_IDS.SARDINE_STUDIOS_DOOR_F1_APP1,
			"row": 2,
			"column": 3,
			"direction": DirectionEnum.up
		},
		{
			"eventType": EventType.cutscene,
			"eventId": CUTSCENE_IDS.D2_SARSTUD_F1_A1_ROBOT1,
			"spriteId": ID_THIEVING_ROBOT
		},
		{
			"eventType": EventType.cutscene,
			"eventId": CUTSCENE_IDS.D2_SARSTUD_F1_A1_POLICEWOMAN1,
			"spriteId": ID_POLICE_WOMAN
		}
	]
}