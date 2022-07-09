import globals from '../../../../game-data/globals';
import { GRID_LEONARD_D4 } from './grid';
import { FRONT_GRID_LEONARD_D4 } from './frontgrid';

export default {
    "frontGrid": FRONT_GRID_LEONARD_D4,
    "grid": GRID_LEONARD_D4,
    "outdoors": true,
    "mapName": "leonard_heights/D4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": globals.NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 14,
            "sprite": "Bench_Green",
            "direction": false
        }
    ],
    "mapObjects": [
        {
            "type": "gang_z",
            "row": 3,
            "col": 20
        },
        {
            "type": "car_a",
            "row": 5,
            "col": 11,
            "direction": globals.FACING_UP
        },
        {
            "type": "Sign_01",
            "row": 5,
            "col": 14
        },
        {
            "type": "vent_4",
            "row": 5,
            "col": 16
        },
        {
            "type": "car_d",
            "row": 6,
            "col": 5,
            "direction": globals.FACING_DOWN
        },
        {
            "type": "wheelie_bin_right",
            "row": 7,
            "col": 19
        },
        {
            "type": "Bollard",
            "row": 8,
            "col": 15
        },
        {
            "type": "Bollard",
            "row": 8,
            "col": 18
        },
        {
            "type": "funz",
            "row": 8,
            "col": 22
        },
        {
            "type": "boxes",
            "row": 9,
            "col": 22
        },
        {
            "type": "banana",
            "row": 11,
            "col": 3
        },
        {
            "type": "office_chair",
            "row": 11,
            "col": 4
        }
    ],
    "spawnPoints": [
        {
            "col": 4,
            "row": globals.OUT_UP,
            "direction": globals.FACING_DOWN
        },
        {
            "col": 5,
            "row": globals.OUT_UP,
            "direction": globals.FACING_DOWN
        },
        {
            "col": 16,
            "row": 7,
            "direction": globals.FACING_DOWN
        },
        {
            "col": 17,
            "row": 7,
            "direction": globals.FACING_DOWN
        },
        {
            "col": globals.OUT_LEFT,
            "row": 9,
            "direction": globals.FACING_RIGHT
        },
        {
            "col": globals.OUT_RIGHT,
            "row": 10,
            "direction": globals.FACING_LEFT
        }
    ],
    "roads": [
        {
            "direction": globals.FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 13,
            "bottomRow": 14,
            "startCol": 24,
            "endCol": 1
        },
        {
            "direction": globals.FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 15,
            "bottomRow": 16,
            "startCol": 1,
            "endCol": 24
        },
        {
            "direction": globals.FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 9,
            "rightCol": 10,
            "startRow": 16,
            "endRow": 1
        },
        {
            "direction": globals.FACING_DOWN,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 7,
            "rightCol": 8,
            "startRow": 1,
            "endRow": 16
        }
    ],
    "actions": [

    ]
}