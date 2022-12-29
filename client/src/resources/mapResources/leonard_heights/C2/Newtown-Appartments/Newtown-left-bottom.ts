import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { UNLOCK_DOOR_TEST } from "../../../../../game-data/interactionGlobals";
import { getInteractionRegisteredCondition } from "../../../../conditionFactory";
import { FAT_BUFF_GUY, PINK_HAIR_NERD_LADY } from "../../../../spriteTypeResources";
import { LH_NEWTOWN_APP_1_KEY, LH_NEWTOWN_APP_HALL_KEY, LH_NEWTOWN_APP_NAME } from "../../leonard_heights_res";
import { DOORKEY_NEWTOWN_APPARTMENTS_APP_1_DOOR } from "../C2-door-keys";
import { C1_INTERACTION_KEY_GUY, C1_INTERACTION_BODYGUARD } from "./Newtown-Appartments-interactions";

export default {
    "key": LH_NEWTOWN_APP_1_KEY,
    "location": LH_NEWTOWN_APP_NAME,
    "tileSet": "Generic_Room_AX",
    "outdoors": false,
    "music": "game-jam-5-10-21.mp3",
    "rows": 8,
    "columns": 8,
    "grid": [
        {
            "id": 16,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 19,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 27,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 27,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 27,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 27,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 27,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 27,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 20,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 23,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 31,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 31,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 31,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 31,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 31,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 31,
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
            "id": 26,
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
            "id": 30,
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
            "id": 34,
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
    "sprites": [
        {
            "type": "Fridge",
            "row": 2,
            "column": 3
        },
        {
            "type": "blue_lamp_left",
            "row": 2,
            "column": 5
        },
        {
            "type": "computer_table",
            "row": 2,
            "column": 6
        },
        {
            "type": "bin_a",
            "row": 3,
            "column": 1
        },
        {
            "type": "water_puddle",
            "row": 3,
            "column": 3
        },
        {
            "type": "office_chair",
            "row": 3,
            "column": 7
        },
        {
            "type": "Sink",
            "row": 4,
            "column": 4
        },
        {
            "type": "yellow_rug_a",
            "row": 4,
            "column": 5
        },
        {
            "type": "pot_plant_a",
            "row": 6,
            "column": 8
        },
        {
            "type": "Small_Table",
            "row": 7,
            "column": 8
        },
        {
            "type": "blue_double_bed",
            "row": 8,
            "column": 2
        },
        {
            "type": "pot_plant_a",
            "row": 8,
            "column": 8
        },
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 5,
            "column": 4,
            "type": PINK_HAIR_NERD_LADY,
            "direction": DirectionEnum.down,
            "action": C1_INTERACTION_KEY_GUY
        },
        {
            "condition": getInteractionRegisteredCondition( UNLOCK_DOOR_TEST ),
            "anim_type": AnimationTypeEnum.idle,
            "row": 2,
            "column": 2,
            "type": FAT_BUFF_GUY,
            "direction": DirectionEnum.down,
            "action": C1_INTERACTION_BODYGUARD
        }
    ],
    "actions": [],
    "doors": [
        {
            "id": DOORKEY_NEWTOWN_APPARTMENTS_APP_1_DOOR,
            "row": 4, 
            "column": 8,
            "doorTo" : LH_NEWTOWN_APP_HALL_KEY,
            "direction": DirectionEnum.right,
        }
    ]
}