import { GRID_LEONARD_D4 } from './grid';
import { FRONT_GRID_LEONARD_D4 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_D4,
    "grid": GRID_LEONARD_D4,
    "outdoors": true,
    "mapName": "leonard_heights/D4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "row": 11,
            "column": 14,
            "type": "Bench_Green"
        },
        {
            "type": "gang_z",
            "row": 3,
            "column": 20
        },
        {
            "type": "car_a",
            "row": 5,
            "column": 11,
            "direction": DirectionEnum.up
        },
        {
            "type": "Sign_01",
            "row": 5,
            "column": 14
        },
        {
            "type": "vent_4",
            "row": 5,
            "column": 16
        },
        {
            "type": "car_d",
            "row": 6,
            "column": 5,
            "direction": DirectionEnum.down
        },
        {
            "type": "wheelie_bin_right",
            "row": 7,
            "column": 19
        },
        {
            "type": "Bollard",
            "row": 8,
            "column": 15
        },
        {
            "type": "Bollard",
            "row": 8,
            "column": 18
        },
        {
            "type": "funz",
            "row": 8,
            "column": 22
        },
        {
            "type": "boxes",
            "row": 9,
            "column": 22
        },
        {
            "type": "banana",
            "row": 11,
            "column": 3
        },
        {
            "type": "office_chair",
            "row": 11,
            "column": 4
        }
    ],
    "spawnPoints": [
        {
            "column": 4,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.down
        },
        {
            "column": 5,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.down
        },
        {
            "column": 16,
            "row": 7,
            "direction": DirectionEnum.down
        },
        {
            "column": 17,
            "row": 7,
            "direction": DirectionEnum.down
        },
        {
            "column": OutOfMapEnum.left,
            "row": 9,
            "direction": DirectionEnum.right
        },
        {
            "column": OutOfMapEnum.right,
            "row": 10,
            "direction": DirectionEnum.left
        }
    ],
    "roads": [
        {
            "direction": DirectionEnum.left,
            "alignment": "HORI",
            "hasStart": true,
            "primaryRow": 14,
            "secondaryRow": 13,
            "primaryColumn": 25,
            "secondaryColumn": 0
        },
        {
            "direction": DirectionEnum.right,
            "alignment": "HORI",
            "hasStart": true,
            "primaryRow": 16,
            "secondaryRow": 15,
            "primaryColumn": 0,
            "secondaryColumn": 25
        },
        {
            "direction": DirectionEnum.up,
            "alignment": "VERT",
            "hasStart": false,
            "primaryColumn": 9,
            "secondaryColumn": 10,
            "primaryRow": 17,
            "secondaryRow": 0
        },
        {
            "direction": DirectionEnum.down,
            "alignment": "VERT",
            "hasStart": true,
            "primaryColumn": 7,
            "secondaryColumn": 8,
            "primaryRow": 0,
            "secondaryRow": 17
        }
    ],
    "actions": [

    ]
}