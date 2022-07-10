import { GRID_LEONARD_A4 } from './grid';
import { FRONT_GRID_LEONARD_A4 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_A4,
    "grid": GRID_LEONARD_A4,
    "outdoors": true,
    "mapName": "leonard_heights/A4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [

    ],
    "mapObjects": [
        {
            "type": "vent_4",
            "row": 1,
            "col": 2
        },
        {
            "type": "vent_4",
            "row": 1,
            "col": 9
        },
        {
            "type": "vent_4",
            "row": 3,
            "col": 2
        },
        {
            "type": "vent_4",
            "row": 3,
            "col": 9
        },
        {
            "type": "wheelie_bin_right",
            "row": 3,
            "col": 11
        },
        {
            "type": "vent_4",
            "row": 5,
            "col": 2
        },
        {
            "type": "vent_4",
            "row": 5,
            "col": 9
        },
        {
            "type": "tires_1",
            "row": 5,
            "col": 12
        },
        {
            "type": "vent_4",
            "row": 7,
            "col": 2
        },
        {
            "type": "vent_4",
            "row": 7,
            "col": 9
        },
        {
            "type": "car_a",
            "row": 7,
            "col": 11,
            "direction": DirectionEnum.left
        },
        {
            "type": "vent_4",
            "row": 9,
            "col": 2
        },
        {
            "type": "vent_4",
            "row": 9,
            "col": 9
        },
        {
            "type": "car_b",
            "row": 9,
            "col": 11,
            "direction": DirectionEnum.left
        },
        {
            "type": "gang_z",
            "row": 11,
            "col": 7
        },
        {
            "type": "car_d",
            "row": 11,
            "col": 11,
            "direction": DirectionEnum.right
        },
        {
            "type": "funz",
            "row": 12,
            "col": 1
        },
        {
            "type": "water_puddle",
            "row": 12,
            "col": 11
        },
        {
            "type": "car_b",
            "row": 15,
            "col": 11,
            "direction": DirectionEnum.left
        },
        {
            "type": "Sign_02",
            "row": 16,
            "col": 9
        },
        {
            "type": "trash_1",
            "row": 16,
            "col": 16
        },
        {
            "type": "trash_4",
            "row": 16,
            "col": 22
        }
    ],
    "spawnPoints": [

    ],
    "roads": [

    ],
    "actions": [

    ]
}