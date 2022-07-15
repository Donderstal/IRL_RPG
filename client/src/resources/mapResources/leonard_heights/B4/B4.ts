import { GRID_LEONARD_B4 } from './grid';
import { FRONT_GRID_LEONARD_B4 } from './frontgrid';
import { WHOLESOME_LIFTER_B4 } from './B4-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';
import { TOUGH_GUY } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_B4,
    "grid": GRID_LEONARD_B4,
    "outdoors":true,
    "mapName":"leonard_heights/B4",
    "rows":16,
    "columns":24,
    "tileSet":"starting_neighbourhood_clean",
    "sprites":[
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name":"LIFT",
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
            "type":"bar_sign",
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
    "spawnPoints":[
        {
            "column":24,
            "row": OutOfMapEnum.up,
            "direction":DirectionEnum.down
        },
        {
            "column":13,
            "row":8,
            "direction": DirectionEnum.down
        },
        {
            "column":18,
            "row":8,
            "direction": DirectionEnum.down
        },
        {
            "column": OutOfMapEnum.right,
            "row":9,
            "direction": DirectionEnum.left
        },
        {
            "column": OutOfMapEnum.left,
            "row":10,
            "direction": DirectionEnum.right
        }
    ],
    "roads":[
        {
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart":true,
            "primaryRow":15,
            "secondaryRow":16,
            "primaryColumn":1,
            "secondaryColumn":24
        },
        {
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart":true,
            "primaryRow":13,
            "secondaryRow":14,
            "primaryColumn":24,
            "secondaryColumn":1
        }
    ],
    "actions":[
      
    ]
}