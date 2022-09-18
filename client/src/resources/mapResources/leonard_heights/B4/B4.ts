import { GRID_LEONARD_B4 } from './grid';
import { FRONT_GRID_LEONARD_B4 } from './frontgrid';
import { WHOLESOME_LIFTER_B4 } from './B4-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { TOUGH_GUY } from '../../../spriteTypeResources';
import { ANIM_LIFT } from '../../../../game-data/animationGlobals';

export default {
    "frontGrid": FRONT_GRID_LEONARD_B4,
    "grid": GRID_LEONARD_B4,
    "outdoors":true,
    "rows":16,
    "columns":24,
    "tileSet":"starting_neighbourhood_clean",
    "sprites":[
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name": ANIM_LIFT,
            "row":9,
            "column":9,
            "type": TOUGH_GUY,
            "direction": DirectionEnum.left,
            "name":"Wholesome Lifter",
            "action": WHOLESOME_LIFTER_B4
        },
        {
            "type":"vent_4",
            "row":1,
            "column":11
        },
        {
            "type":"vent_4",
            "row":2,
            "column":17
        },
        {
            "type":"vent_4",
            "row":3,
            "column":11
        },
        {
            "type":"vent_4",
            "row":5,
            "column":11
        },
        {
            "type":"vent_3",
            "row":5,
            "column":22
        },
        {
            "type":"bar_sign_old",
            "row":6,
            "column":7
        },
        {
            "type":"gang_z",
            "row":6,
            "column":18
        },
        {
            "type":"Sign_03",
            "row":7,
            "column":16
        },
        {
            "type":"funz",
            "row":7,
            "column":17
        },
        {
            "type":"car_a",
            "row":12,
            "column":3,
            "direction":DirectionEnum.left
        }
    ],
    "actions":[
      
    ],
    "doors": [
        {
            "row": 8,
            "column": 4,
            "doorTo": "leonard_heights/club-shelter-entrance",
            "direction": DirectionEnum.up,

        },
        {
            "row": 8,
            "column": 5,
            "doorTo": "leonard_heights/club-shelter-entrance",
            "direction": DirectionEnum.up,

        }
    ],
}