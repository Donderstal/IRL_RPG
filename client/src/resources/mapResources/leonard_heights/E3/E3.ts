import { GRID_LEONARD_E3 } from './grid';
import { FRONT_GRID_LEONARD_E3 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { PIGEON } from '../../../spriteTypeResources';
import { DOORKEY_GREY_BUILDING_FRONT_DOOR } from './E3-door-keys';
import { LH_GREY_BUILDING_GF_LOBBY } from '../leonard_heights_res';

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
            "row": 7,
            "column": 4,
            "direction": DirectionEnum.right
        },
        {
            "type": "water_puddle",
            "row": 11,
            "column": 10
        }
    ],
    "doors": [
        {
            id: DOORKEY_GREY_BUILDING_FRONT_DOOR,
            column: 10,
            row: 5,
            direction: DirectionEnum.up,
            doorTo: LH_GREY_BUILDING_GF_LOBBY
        },
        {
            id: DOORKEY_GREY_BUILDING_FRONT_DOOR,
            column: 11,
            row: 5,
            direction: DirectionEnum.up,
            doorTo: LH_GREY_BUILDING_GF_LOBBY
        }
    ]
}