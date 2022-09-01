import { GRID_LEONARD_C1 } from './grid';
import { FRONT_GRID_LEONARD_C1 } from './frontgrid';
import { LOST_KEYS_INTERACTION } from './C1-interactions';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C1,
    "grid": GRID_LEONARD_C1,
    "outdoors": true,
    "mapName": "leonard_heights/C1",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "type": "collectable_coin",
            "row": 3,
            "column": 19,
            "action": LOST_KEYS_INTERACTION
        },
        {
            "type": "funz",
            "row": 1,
            "column": 15
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "column": 1
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "column": 5
        },
        {
            "type": "Poster_Cruise",
            "row": 2,
            "column": 9
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "column": 13
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "column": 17
        },
        {
            "type": "gate_right",
            "row": 2,
            "column": 21
        },
        {
            "type": "gate_left",
            "row": 2,
            "column": 22
        },
        {
            "type": "tires_2",
            "row": 4,
            "column": 10
        },
        {
            "type": "car_b",
            "row": 3,
            "column": 3,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_a",
            "row": 3,
            "column": 7,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_c",
            "row": 5,
            "column": 17,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_d",
            "row": 12,
            "column": 5,
            "direction": DirectionEnum.down
        },
        {
            "type": "vent_4",
            "row": 15,
            "column": 14
        },
        {
            "type": "vent_1",
            "row": 16,
            "column": 18
        }
    ],
    "spawnPoints": [

    ],
    "roads": [

    ],
    "actions": [

    ]
}