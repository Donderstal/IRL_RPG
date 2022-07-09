import globals from '../../../../game-data/globals';
import { GRID_LEONARD_B3 } from './grid';
import { FRONT_GRID_LEONARD_B3 } from './frontgrid';
import { GUY_WHO_LOST_HIS_KEYS } from './B3-interactions';
export default {
    "frontGrid": FRONT_GRID_LEONARD_B3,
    "grid": GRID_LEONARD_B3,
    "outdoors": true,
    "mapName": "leonard_heights/B3",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": globals.NPC_ANIM_TYPE_IDLE,
            "row": 2,
            "col": 4,
            "sprite": "pigeon.png",
            "direction": globals.FACING_LEFT
        },
        {
            "anim_type": globals.NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 20,
            "direction": globals.FACING_DOWN,
            "sprite": "character_x1_recolour01.png",
            "action": GUY_WHO_LOST_HIS_KEYS
        }
    ],
    "mapObjects": [
        {
            "type": "gate_stuk14",
            "row": 6,
            "col": 9
        },
        {
            "type": "tree",
            "row": 7,
            "col": 7
        },
        {
            "type": "gate_stuk10",
            "row": 7,
            "col": 9
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "col": 5
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "col": 6
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "col": 7
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "col": 8
        },
        {
            "type": "gate_stuk9",
            "row": 8,
            "col": 9
        },
        {
            "type": "bench_a",
            "row": 9,
            "col": 1
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 3
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 4
        },
        {
            "type": "bench_a",
            "row": 9,
            "col": 5
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 7
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 8
        },
        {
            "type": "vent_4",
            "row": 15,
            "col": 11
        }
    ],
    "spawnPoints": [

    ],
    "roads": [

    ],
    "actions": [

    ]
}