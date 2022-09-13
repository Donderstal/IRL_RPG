import { GRID_LEONARD_E3 } from './grid';
import { FRONT_GRID_LEONARD_E3 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { PIGEON } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_E3,
    "grid": GRID_LEONARD_E3,
    "outdoors": true,
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
            "column": 10,
            "direction": DirectionEnum.right
        },
        {
            "type": "water_puddle",
            "row": 11,
            "column": 10
        }
    ],
    "actions": [

    ]
}