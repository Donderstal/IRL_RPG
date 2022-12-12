import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { UNLOCK_DOOR_TEST } from "../../../../../game-data/interactionGlobals";
import { getInteractionNotRegisteredCondition } from "../../../../conditionFactory";
import { BUSINESS_MAN } from "../../../../spriteTypeResources";
import { LH_MAP_KEY, LH_NEWTOWN_APP_1_KEY, LH_NEWTOWN_APP_2_KEY, LH_NEWTOWN_APP_3_KEY, LH_NEWTOWN_APP_4_KEY, LH_NEWTOWN_APP_5_KEY, LH_NEWTOWN_APP_HALL_KEY, LH_NEWTOWN_APP_NAME } from "../../leonard_heights_res";
import { C1_INTERACTION_WAITING_BUSINESSMAN } from "./Newtown-Appartments-interactions";

export default {
    "key": LH_NEWTOWN_APP_HALL_KEY,
    "location": LH_NEWTOWN_APP_NAME,
    "tileSet": "Generic_Room_AX",
    "outdoors": false,
    "music": "game-jam-5-10-21.mp3",
    "rows": 12,
    "columns": 4,
    "grid": [
        {
            "id": 0,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 3,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 24,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 11,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 4,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 7,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 28,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 15,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 25,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 9,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 26,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 29,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 30,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 33,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 34,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 25,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 26,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 29,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 30,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 33,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 34,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 36,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        }
    ],
    "sprites": [
        {
            "type": "house_plant",
            "row": 3,
            "column": 1
        },
        {
            "type": "house_plant",
            "row": 3,
            "column": 4
        },
        {
            "type": "trash_2",
            "row": 4,
            "column": 4
        },
        {
            "type": "crisps",
            "row": 7,
            "column": 1
        },
        {
            "type": "house_plant",
            "row": 8,
            "column": 1
        },
        {
            "type": "house_plant",
            "row": 8,
            "column": 4
        },
        {
            "type": "Small_Table",
            "row": 12,
            "column": 3
        },
        {
            "type": "newspaper_trash",
            "row": 12,
            "column": 4
        },
        {
            "condition": getInteractionNotRegisteredCondition( UNLOCK_DOOR_TEST ),
            "anim_type": AnimationTypeEnum.semiIdle,
            "row": 11,
            "column": 3,
            "name": "Impatient businessman",
            "type": BUSINESS_MAN,
            "direction": DirectionEnum.left,
            "action": C1_INTERACTION_WAITING_BUSINESSMAN
        }
    ],
    "actions": [],
    "doors": [
        {
            "row": 10, 
            "column": 1,
            "doorTo" : LH_NEWTOWN_APP_1_KEY,
            "direction": DirectionEnum.left
        },
        {
            "row": 5, 
            "column": 1,
            "doorTo": LH_NEWTOWN_APP_2_KEY,
            "direction": DirectionEnum.left
        },
        {
            "row": 2, 
            "column": 3,
            "doorTo": LH_NEWTOWN_APP_3_KEY,
            "direction": DirectionEnum.up
        },
        {
            "row": 5, 
            "column": 4,
            "doorTo": LH_NEWTOWN_APP_4_KEY,
            "direction": DirectionEnum.right
        },
        {
            "row": 10, 
            "column": 4,
            "doorTo": LH_NEWTOWN_APP_5_KEY,
            "direction": DirectionEnum.right
        },
        {
            "row": 12, 
            "column": 2,
            "doorTo": LH_MAP_KEY,
            "direction": DirectionEnum.down
        }
    ]
}