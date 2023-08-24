import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { EventType } from "../../../../../enumerables/EventType";
import { CHARNAME_CAR_SHACK_BOSS, CHARNAME_CAR_SHACK_MECHANIC } from "../../../../../game-data/interactionGlobals";
import { CUTSCENE_IDS } from "../../../../eventResources/cutsceneIds";
import { DOOR_IDS } from "../../../../eventResources/doorIds";
import { CAR_MECHANIC, CAR_SHACK_BOSS } from "../../../../spriteTypeResources";
import { LOCATION_NAMES } from "../../../locationNames";
import { MAP_IDS } from "../../../mapIds";

const MECHANIC_LI = "MECHANIC_LI";
const BOSS_CLYDE = "BOSS_CLYDE";

export default {
	"key": MAP_IDS.LEONARD_HEIGHTS.CAR_SHACK,
	"location": LOCATION_NAMES.CAR_SHACK,
	"columns": 12,
	"rows": 8,
	"tileSet": "Generic_Room_BX",
	"outdoors": false,
	"grid": [
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
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
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
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 11,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 15,
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
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 38,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 41,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
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
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
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
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 38,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
			"angle": 0,
			"mirrored": false
		},
		{
			"id": 43,
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
	"frontSprites": [],
	"sprites": [
		{
			"anim_type": AnimationTypeEnum.idle,
			"direction": 0,
			"name": CHARNAME_CAR_SHACK_BOSS,
			"type": CAR_SHACK_BOSS,
			"row": 2,
			"column": 6,
			"id": MECHANIC_LI
		},
		{
			"anim_type": AnimationTypeEnum.idle,
			"direction": 0,
			"name": CHARNAME_CAR_SHACK_MECHANIC,
			"type": CAR_MECHANIC,
			"row": 7,
			"column": 10,
			"id": BOSS_CLYDE
		},
		{
			"type": "boarded_window",
			"direction": 0,
			"row": 1,
			"column": 10
		},
		{
			"type": "boarded_window",
			"direction": 0,
			"row": 1,
			"column": 5
		},
		{
			"type": "bottle",
			"direction": 0,
			"row": 4,
			"column": 8
		},
		{
			"type": "can_red_1",
			"direction": 0,
			"row": 5,
			"column": 8
		},
		{
			"type": "glass",
			"direction": 0,
			"row": 7,
			"column": 12
		},
		{
			"type": "tableA",
			"direction": 0,
			"row": 3,
			"column": 6
		},
		{
			"type": "wall_thing_c",
			"direction": 0,
			"row": 3,
			"column": 3
		},
		{
			"type": "wall_thing_c",
			"direction": 0,
			"row": 6,
			"column": 3
		},
		{
			"type": "shelves_side_a",
			"direction": 0,
			"row": 7,
			"column": 12
		},
		{
			"type": "tires_2",
			"direction": 0,
			"row": 6,
			"column": 8
		},
		{
			"type": "computer_table_with_chair",
			"direction": 0,
			"row": 3,
			"column": 4
		},
		{
			"type": "Sign_03",
			"direction": 0,
			"row": 1,
			"column": 7
		},
		{
			"type": "yellow_rug_a",
			"direction": 0,
			"row": 4,
			"column": 3
		},
		{
			"type": "car_b_colour_b",
			"direction": 2,
			"row": 3,
			"column": 7
		},
		{
			"type": "car_b_colour_b",
			"direction": 2,
			"row": 8,
			"column": 8
		},
		{
			"type": "car_c",
			"direction": 0,
			"row": 4,
			"column": 11
		}
	],
	"spawnPoints": [],
	"roads": [],
	"triggers": [
		{
			"eventType": EventType.door,
			"eventId": DOOR_IDS.CAR_SHACK_FRONT_DOOR,
			"direction": DirectionEnum.down,
			"column": 4,
			"row": 8,
		},
		{
			"eventType": EventType.cutscene,
			"eventId": CUTSCENE_IDS.C3_CAR_SHACK_BOSS,
			"spriteId": BOSS_CLYDE
		},
		{
			"eventType": EventType.cutscene,
			"eventId": CUTSCENE_IDS.C3_CAR_SHACK_MECHANIC,
			"spriteId": MECHANIC_LI
        }
	]
}