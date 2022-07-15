import { GRID_LEONARD_E3 } from './grid';
import { FRONT_GRID_LEONARD_E3 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';
import { PIGEON } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_E3,
    "grid": GRID_LEONARD_E3,
    "outdoors": true,
    "mapName": "leonard_heights/E3",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 6,
            "column": 23,
            "type": PIGEON,
            "direction": DirectionEnum.left
        },
        {
            "type": "gang_z",
            "row": 3,
            "column": 4
        },
        {
            "type": "Sign_03",
            "row": 3,
            "column": 13
        },
        {
            "type": "funz",
            "row": 6,
            "column": 17
        },
        {
            "type": "car_b",
            "row": 9,
            "column": 7,
            "direction": DirectionEnum.right
        },
        {
            "type": "water_puddle",
            "row": 11,
            "column": 10
        }
    ],
    "spawnPoints": [
        {
            "column": OutOfMapEnum.left,
            "row": 6,
            "direction": DirectionEnum.right
        },
        {
            "column": 10,
            "row": 6,
            "direction": DirectionEnum.down
        },
        {
            "column": 11,
            "row": 6,
            "direction": DirectionEnum.down
        },
        {
            "column": 11,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        }
    ],
    "roads": [

    ],
    "actions": [

    ]
}