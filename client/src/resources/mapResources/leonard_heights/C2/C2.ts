import { GRID_LEONARD_C2 } from './grid';
import { FRONT_GRID_LEONARD_C2 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';
import { PIGEON } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C2,
    "grid": GRID_LEONARD_C2,
    "outdoors": true,
    "mapName": "leonard_heights/C2",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 14,
            "column": 9,
            "type": PIGEON,
            "direction": DirectionEnum.left
        },
        {
            "type": "vent_1",
            "row": 1,
            "column": 7
        },
        {
            "type": "vent_4",
            "row": 1,
            "column": 14
        },
        {
            "type": "vent_3",
            "row": 2,
            "column": 2
        },
        {
            "type": "vent_1",
            "row": 2,
            "column": 18
        },
        {
            "type": "vent_1",
            "row": 3,
            "column": 7
        },
        {
            "type": "vent_4",
            "row": 3,
            "column": 14
        },
        {
            "type": "hotel_sign",
            "row": 3,
            "column": 16
        },
        {
            "type": "vent_3",
            "row": 4,
            "column": 2
        },
        {
            "type": "vent_1",
            "row": 4,
            "column": 18
        },
        {
            "type": "vent_1",
            "row": 5,
            "column": 7
        },
        {
            "type": "vent_4",
            "row": 5,
            "column": 14
        },
        {
            "type": "vent_3",
            "row": 6,
            "column": 2
        },
        {
            "type": "vent_1",
            "row": 6,
            "column": 18
        },
        {
            "type": "car_b",
            "row": 6,
            "column": 8,
            "direction": DirectionEnum.up
        },
        {
            "type": "vent_4",
            "row": 7,
            "column": 14
        },
        {
            "type": "Sign_03",
            "row": 7,
            "column": 19
        },
        {
            "type": "gang_z",
            "row": 7,
            "column": 21
        },
        {
            "type": "water_puddle",
            "row": 8,
            "column": 8
        },
        {
            "type": "funz",
            "row": 8,
            "column": 11
        },
        {
            "type": "gate_right",
            "row": 8,
            "column": 15
        },
        {
            "type": "gate_left",
            "row": 8,
            "column": 16
        },
        {
            "type": "office_chair",
            "row": 11,
            "column": 6
        },
        {
            "type": "banana",
            "row": 16,
            "column": 1
        }
    ],
    "spawnPoints": [
        {
            "column": 1,
            "row": 9,
            "direction": DirectionEnum.right
        },
        {
            "column": 1,
            "row": 11,
            "direction": DirectionEnum.right
        },
        {
            "column": 24,
            "row": 9,
            "direction": DirectionEnum.left
        },
        {
            "column": 24,
            "row": 11,
            "direction": DirectionEnum.left
        },

    ],
    "roads": [
        {
            "direction": DirectionEnum.right,
            "alignment": "HORI",
            "hasStart": true,
            "primaryRow": 15,
            "secondaryRow": 14,
            "primaryColumn": 0,
            "secondaryColumn": 25
        },
        {
            "direction": DirectionEnum.left,
            "alignment": "HORI",
            "hasStart": true,
            "primaryRow": 13,
            "secondaryRow": 12,
            "primaryColumn": 25,
            "secondaryColumn": 0
        }
    ],
    "actions": [

    ],
    "doors": [
        {
            "row": 8,
            "column": 12,
            "doorTo": "leonard_heights/Newtown-Hall",
            "direction": DirectionEnum.up,

        },
        {
            "row": 8,
            "column": 13,
            "doorTo": "leonard_heights/Newtown-Hall",
            "direction": DirectionEnum.up,

        }
    ]
}