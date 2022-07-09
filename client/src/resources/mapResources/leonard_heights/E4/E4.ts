import globals from '../../../../game-data/globals';
import { GRID_LEONARD_E4 } from './grid';
import { FRONT_GRID_LEONARD_E4 } from './frontgrid';
import { WHOLESOME_LIFTER_E4 } from './E4-interactions';

export default {
    "frontGrid": FRONT_GRID_LEONARD_E4,
    "grid": GRID_LEONARD_E4,
    "outdoors": true,
    "mapName": "leonard_heights/E4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": globals.NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "LIFT",
            "row": 9,
            "col": 12,
            "sprite": "chad_recolour01.png",
            "direction": globals.FACING_LEFT,
            "name": "Wholesome Lifter",
            "action": WHOLESOME_LIFTER_E4
        }
    ],
    "mapObjects": [
        {
            "type": "Sign_04",
            "row": 7,
            "col": 4
        },
        {
            "type": "Sign_02",
            "row": 7,
            "col": 13
        },
        {
            "type": "door_4",
            "row": 8,
            "col": 5,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "wheelie_bin_left",
            "row": 13,
            "col": 10
        },
        {
            "type": "car_d",
            "row": 15,
            "col": 6,
            "direction": globals.FACING_LEFT
        },
        {
            "type": "wheelie_bin_left",
            "row": 15,
            "col": 10
        }
    ],
    "spawnPoints": [

    ],
    "roads": [

    ],
    "actions": [

    ]
}