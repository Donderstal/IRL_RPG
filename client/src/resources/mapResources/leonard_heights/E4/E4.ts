import { GRID_LEONARD_E4 } from './grid';
import { FRONT_GRID_LEONARD_E4 } from './frontgrid';
import { WHOLESOME_LIFTER_E4 } from './E4-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { STRONG_GUY } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_E4,
    "grid": GRID_LEONARD_E4,
    "outdoors": true,
    "mapName": "leonard_heights/E4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name": "LIFT",
            "row": 9,
            "column": 12,
            "type": STRONG_GUY,
            "direction": DirectionEnum.left,
            "name": "Wholesome Lifter",
            "action": WHOLESOME_LIFTER_E4
        },
        {
            "type": "Sign_04",
            "row": 7,
            "column": 4
        },
        {
            "type": "Sign_02",
            "row": 7,
            "column": 13
        },
        {
            "type": "door_4",
            "row": 8,
            "column": 5,
            "hasDoor": true,
            "directionIn": "",
            "doorTo": ""
        },
        {
            "type": "wheelie_bin_left",
            "row": 13,
            "column": 10
        },
        {
            "type": "car_d",
            "row": 15,
            "column": 6,
            "direction": DirectionEnum.left
        },
        {
            "type": "wheelie_bin_left",
            "row": 15,
            "column": 10
        }
    ],
    "actions": [

    ]
}