import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { ConditionType } from "../../../../../enumerables/ConditionTypeEnum";
import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { UNLOCK_DOOR_TEST } from "../../../../../game-data/interactionGlobals";
import { BUSINESS_MAN } from "../../../../spriteTypeResources";
import { WAITING_BUSINESSMAN } from "./Newtown-Appartments-interactions";

export default {
    "mapName": "leonard_heights/Newtown-Hall",
    "neighbourhood": "leonard_heights",
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
            "condition": [ ConditionType.interactionNotRegistered, UNLOCK_DOOR_TEST ],
            "anim_type": AnimationTypeEnum.semiIdle,
            "row": 11,
            "column": 3,
            "name": "Impatient businessman",
            "type": BUSINESS_MAN,
            "direction": DirectionEnum.left,
            "action": WAITING_BUSINESSMAN
        }
    ],
    "actions": [],
    "doors": [
        {
            "row": 10, 
            "column": 1,
            "doorTo" : "leonard_heights/Newtown-appartment-1",
            "direction": DirectionEnum.left
        },
        {
            "row": 5, 
            "column": 1,
            "doorTo" : "leonard_heights/Newtown-appartment-2",
            "direction": DirectionEnum.left
        },
        {
            "row": 2, 
            "column": 3,
            "doorTo"  : "leonard_heights/Newtown-appartment-3",
            "direction": DirectionEnum.up
        },
        {
            "row": 5, 
            "column": 4,
            "doorTo" : "leonard_heights/Newtown-appartment-4",
            "direction": DirectionEnum.right
        },
        {
            "row": 10, 
            "column": 4,
            "doorTo" : "leonard_heights/Newtown-appartment-5",
            "direction": DirectionEnum.right
        },
        {
            "row": 12, 
            "column": 2,
            "doorTo": "leonard_heights/leonard_heights",
            "direction": DirectionEnum.down
        }
    ]
}