import { GRID_LEONARD_C2 } from './grid';
import { FRONT_GRID_LEONARD_C2 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C2,
    "grid": GRID_LEONARD_C2,
    "outdoors": true,
    "mapName": "leonard_heights/C2",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 14,
            "col": 9,
            "sprite": "pigeon.png",
            "direction": DirectionEnum.left
        }
    ],
    "mapObjects": [
        {
            "type": "vent_1",
            "row": 1,
            "col": 7
        },
        {
            "type": "vent_4",
            "row": 1,
            "col": 14
        },
        {
            "type": "vent_3",
            "row": 2,
            "col": 2
        },
        {
            "type": "vent_1",
            "row": 2,
            "col": 18
        },
        {
            "type": "vent_1",
            "row": 3,
            "col": 7
        },
        {
            "type": "vent_4",
            "row": 3,
            "col": 14
        },
        {
            "type": "hotel_sign",
            "row": 3,
            "col": 16
        },
        {
            "type": "vent_3",
            "row": 4,
            "col": 2
        },
        {
            "type": "vent_1",
            "row": 4,
            "col": 18
        },
        {
            "type": "vent_1",
            "row": 5,
            "col": 7
        },
        {
            "type": "vent_4",
            "row": 5,
            "col": 14
        },
        {
            "type": "vent_3",
            "row": 6,
            "col": 2
        },
        {
            "type": "vent_1",
            "row": 6,
            "col": 18
        },
        {
            "type": "car_b",
            "row": 7,
            "col": 8,
            "direction": DirectionEnum.up
        },
        {
            "type": "vent_4",
            "row": 7,
            "col": 14
        },
        {
            "type": "Sign_03",
            "row": 7,
            "col": 19
        },
        {
            "type": "gang_z",
            "row": 7,
            "col": 21
        },
        {
            "type": "water_puddle",
            "row": 8,
            "col": 8
        },
        {
            "type": "funz",
            "row": 8,
            "col": 11
        },
        {
            "type": "gate_right",
            "row": 8,
            "col": 15
        },
        {
            "type": "gate_left",
            "row": 8,
            "col": 16
        },
        {
            "type": "office_chair",
            "row": 11,
            "col": 6
        },
        {
            "type": "banana",
            "row": 16,
            "col": 1
        }
    ],
    "spawnPoints": [
        {
            "col": OutOfMapEnum.left,
            "row": 9,
            "direction": DirectionEnum.right
        },
        {
            "col": OutOfMapEnum.left,
            "row": 11,
            "direction": DirectionEnum.right
        },
        {
            "col": OutOfMapEnum.right,
            "row": 9,
            "direction": DirectionEnum.left
        },
        {
            "col": OutOfMapEnum.right,
            "row": 11,
            "direction": DirectionEnum.left
        },

    ],
    "roads": [
        {
            "direction": DirectionEnum.right,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 1,
            "endCol": 24
        },
        {
            "direction": DirectionEnum.left,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 12,
            "bottomRow": 13,
            "startCol": 24,
            "endCol": 1
        }
    ],
    "actions": [

    ],
    "doors": [
        {
            "row": 8,
            "col": 12,
            "destination": "leonard_heights/Newtown-Hall",
            "direction": DirectionEnum.up,

        },
        {
            "row": 8,
            "col": 13,
            "destination": "leonard_heights/Newtown-Hall",
            "direction": DirectionEnum.up,

        }
    ]
}