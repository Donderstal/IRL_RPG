import globals from '../../../../game-data/globals';
import { GRID_LEONARD_C3 } from './grid';
import { FRONT_GRID_LEONARD_C3 } from './frontgrid';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C3,
    "grid": GRID_LEONARD_C3,
    "outdoors": true,
    "mapName": "leonard_heights/C3",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": globals.NPC_ANIM_TYPE_IDLE,
            "row": 12,
            "col": 11,
            "sprite": "pigeon.png",
            "direction": globals.FACING_RIGHT
        },
        {
            "anim_type": globals.NPC_ANIM_TYPE_IDLE,
            "row": 14,
            "col": 15,
            "sprite": "pigeon.png",
            "direction": globals.FACING_LEFT
        }
    ],
    "mapObjects": [
        {
            "type": "vent_3",
            "row": 5,
            "col": 20
        },
        {
            "type": "door_1",
            "row": 7,
            "col": 19,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "gang_z",
            "row": 7,
            "col": 21
        },
        {
            "type": "door_3",
            "row": 8,
            "col": 4,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 2
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 3
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 5
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 6
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 7
        },
        {
            "type": "Bench_Green",
            "row": 9,
            "col": 8
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 10
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 13
        },
        {
            "type": "Bench_Green",
            "row": 9,
            "col": 14
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 16
        },
        {
            "type": "boxes",
            "row": 9,
            "col": 22
        }
    ],
    "spawnPoints": [
        {
            "col": 18,
            "row": globals.OUT_UP,
            "direction": globals.FACING_DOWN
        },
        {
            "col": 11,
            "row": 8,
            "direction": globals.FACING_DOWN
        },
        {
            "col": globals.OUT_RIGHT,
            "row": 10,
            "direction": globals.FACING_LEFT
        },
        {
            "col": globals.OUT_LEFT,
            "row": 11,
            "direction": globals.FACING_RIGHT
        },
        {
            "col": 8,
            "row": globals.OUT_DOWN,
            "direction": globals.FACING_UP
        }
    ],
    "roads": [

    ],
    "actions": [

    ]
}