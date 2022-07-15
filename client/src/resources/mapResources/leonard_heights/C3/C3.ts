import { GRID_LEONARD_C3 } from './grid';
import { FRONT_GRID_LEONARD_C3 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { MovementType } from '../../../../enumerables/MovementTypeEnum';
import { PIGEON } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C3,
    "grid": GRID_LEONARD_C3,
    "outdoors": true,
    "mapName": "leonard_heights/C3",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "move_type": MovementType.flying,
            "row": 12,
            "column": 11,
            "type": PIGEON,
            "direction": DirectionEnum.right
        },
        {
            "anim_type": AnimationTypeEnum.idle,
            "move_type": MovementType.flying,
            "row": 14,
            "column": 15,
            "type": PIGEON,
            "direction": DirectionEnum.left
        },
        {
            "type": "vent_3",
            "row": 5,
            "column": 20
        },
        {
            "type": "door_1",
            "row": 7,
            "column": 19,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "gang_z",
            "row": 7,
            "column": 21
        },
        {
            "type": "door_3",
            "row": 8,
            "column": 4,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 2
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 3
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 5
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 6
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 7
        },
        {
            "type": "Bench_Green",
            "row": 9,
            "column": 8
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 10
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 13
        },
        {
            "type": "Bench_Green",
            "row": 9,
            "column": 14
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 16
        },
        {
            "type": "boxes",
            "row": 9,
            "column": 22
        }
    ],
    "spawnPoints": [
        {
            "column": 18,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.down
        },
        {
            "column": 11,
            "row": 8,
            "direction": DirectionEnum.down
        },
        {
            "column": OutOfMapEnum.right,
            "row": 10,
            "direction": DirectionEnum.left
        },
        {
            "column": OutOfMapEnum.left,
            "row": 11,
            "direction": DirectionEnum.right
        },
        {
            "column": 8,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        }
    ],
    "roads": [

    ],
    "actions": [

    ]
}