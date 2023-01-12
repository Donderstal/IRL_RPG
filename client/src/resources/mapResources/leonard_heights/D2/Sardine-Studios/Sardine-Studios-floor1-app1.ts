import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { IKEY_CAR_SHACK_3 } from "../../../../../game-data/interactionGlobals";
import { getInteractionNotRegisteredCondition, getInteractionRegisteredCondition } from "../../../../conditionFactory";
import { POLICE_WOMAN_1 } from "../../../../spriteTypeResources";
import { LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY, LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY, LH_SARDINE_STUDIOS_NAME } from "../../leonard_heights_res";
import { DOORKEY_SARDINE_STUDIOS_DOOR_F1_APP1 } from "../D2-door-keys";
import { D2_INTERACTION_FLOOR1_APP1_POLICEWOMAN, D2_INTERACTION_FLOOR1_APP1_ROBOT_1 } from "./Sardine-Studios-interactions";

export default {
	"key": LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY,
	"location": LH_SARDINE_STUDIOS_NAME,
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
			"action": D2_INTERACTION_FLOOR1_APP1_ROBOT_1
		},
		{
			"condition": getInteractionRegisteredCondition( IKEY_CAR_SHACK_3 ),
			"type": POLICE_WOMAN_1,
			"column": 1,
			"row": 5,
			"direction": DirectionEnum.right,
			"action": D2_INTERACTION_FLOOR1_APP1_POLICEWOMAN
		}
	],
	"frontSprites": [],
	"spawnPoints": [],
	"roads": [],
	"doors": [
		{
			"id": DOORKEY_SARDINE_STUDIOS_DOOR_F1_APP1,
			"row": 2,
			"column": 3,
			"doorTo": LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY,
			"direction": DirectionEnum.up
		},
	]
}