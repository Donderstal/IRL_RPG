import globals from '../../../../game-data/globals';
import { GRID_LEONARD_C1 } from './grid';
import { FRONT_GRID_LEONARD_C1 } from './frontgrid';
import { LOST_KEYS_INTERACTION } from './C1-interactions';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C1,
    "grid": GRID_LEONARD_C1,
    "outdoors": true,
    "mapName": "leonard_heights/C1",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [

    ],
    "mapObjects": [
        {
            "type": "collectable_coin",
            "row": 3,
            "col": 19,
            "action": LOST_KEYS_INTERACTION
        },
        {
            "type": "funz",
            "row": 1,
            "col": 15
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "col": 1
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "col": 5
        },
        {
            "type": "Poster_Cruise",
            "row": 2,
            "col": 9
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "col": 13
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "col": 17
        },
        {
            "type": "gate_right",
            "row": 2,
            "col": 21
        },
        {
            "type": "gate_left",
            "row": 2,
            "col": 22
        },
        {
            "type": "tires_2",
            "row": 4,
            "col": 10
        },
        {
            "type": "car_b",
            "row": 5,
            "col": 3,
            "direction": globals.FACING_UP
        },
        {
            "type": "car_a",
            "row": 5,
            "col": 7,
            "direction": globals.FACING_UP
        },
        {
            "type": "car_c",
            "row": 5,
            "col": 17,
            "direction": globals.FACING_DOWN
        },
        {
            "type": "car_d",
            "row": 12,
            "col": 5,
            "direction": globals.FACING_DOWN
        },
        {
            "type": "vent_4",
            "row": 15,
            "col": 14
        },
        {
            "type": "vent_1",
            "row": 16,
            "col": 18
        }
    ],
    "spawnPoints": [

    ],
    "roads": [

    ],
    "actions": [

    ]
}