import globals from '../../../../game-data/globals';
import { GRID_LEONARD_A1 } from './grid';
import { FRONT_GRID_LEONARD_A1 } from './frontgrid';

export default {
    "frontGrid": FRONT_GRID_LEONARD_A1,
    "grid": GRID_LEONARD_A1,
    "outdoors": true,
    "mapName": "leonard_heights/A1",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": globals.NPC_ANIM_TYPE_IDLE,
            "row": 5,
            "col": 20,
            "sprite": "characterx5.png",
            "direction": globals.FACING_DOWN
        },
        {
            "anim_type": globals.NPC_ANIM_TYPE_IDLE,
            "row": 5,
            "col": 23,
            "sprite": "fats_recolour.png",
            "direction": globals.FACING_DOWN
        }
    ],
    "mapObjects": [
        {
            "type": "door_5",
            "row": 4,
            "col": 21,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        }
    ],
    "spawnPoints": [

    ],
    "roads": [

    ],
    "actions": [

    ]
}