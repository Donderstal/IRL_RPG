import { GRID_LEONARD_B4 } from './grid';
import { FRONT_GRID_LEONARD_B4 } from './frontgrid';
import { WHOLESOME_LIFTER_B4 } from './B4-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_B4,
    "grid": GRID_LEONARD_B4,
    "outdoors":true,
    "mapName":"leonard_heights/B4",
    "rows":16,
    "columns":24,
    "tileSet":"starting_neighbourhood_clean",
    "characters":[
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name":"LIFT",
            "row":9,
            "col":9,
            "sprite":"chad.png",
            "direction": DirectionEnum.left,
            "name":"Wholesome Lifter",
            "action": WHOLESOME_LIFTER_B4
        }
    ],
    "mapObjects":[
        {
            "type":"vent_4",
            "row":1,
            "col":11
        },
        {
            "type":"vent_4",
            "row":2,
            "col":17
        },
        {
            "type":"vent_4",
            "row":3,
            "col":11
        },
        {
            "type":"vent_4",
            "row":5,
            "col":11
        },
        {
            "type":"vent_3",
            "row":5,
            "col":22
        },
        {
            "type":"bar_sign",
            "row":6,
            "col":7
        },
        {
            "type":"gang_z",
            "row":6,
            "col":18
        },
        {
            "type":"Sign_03",
            "row":7,
            "col":16
        },
        {
            "type":"funz",
            "row":7,
            "col":17
        },
        {
            "type":"car_a",
            "row":12,
            "col":3,
            "direction":DirectionEnum.left
        }
    ],
    "spawnPoints":[
        {
            "col":24,
            "row": OutOfMapEnum.up,
            "direction":DirectionEnum.down
        },
        {
            "col":13,
            "row":8,
            "direction": DirectionEnum.down
        },
        {
            "col":18,
            "row":8,
            "direction": DirectionEnum.down
        },
        {
            "col": OutOfMapEnum.right,
            "row":9,
            "direction": DirectionEnum.left
        },
        {
            "col": OutOfMapEnum.left,
            "row":10,
            "direction": DirectionEnum.right
        }
    ],
    "roads":[
        {
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart":true,
            "topRow":15,
            "bottomRow":16,
            "startCol":1,
            "endCol":24
        },
        {
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart":true,
            "topRow":13,
            "bottomRow":14,
            "startCol":24,
            "endCol":1
        }
    ],
    "actions":[
      
    ]
}