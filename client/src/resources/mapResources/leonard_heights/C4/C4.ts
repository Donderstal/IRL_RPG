import { GRID_LEONARD_C4 } from './grid';
import { FRONT_GRID_LEONARD_C4 } from './frontgrid';
import { LOGGABLE_INTERACTION_3 } from '../../../../game-data/interactionGlobals';
import { ConditionType } from '../../../../enumerables/ConditionTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C4,
    "grid": GRID_LEONARD_C4,
    "outdoors": true,
    "mapName": "leonard_heights/C4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 3,
            "col": 12,
            "sprite": "pigeon.png",
            "direction": DirectionEnum.left
        },
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 8,
            "col": 19,
            "sprite": "fats.png",
            "direction": DirectionEnum.down,
            "name": "Bob A",
            "condition": [
                ConditionType.interactionNotRegistered,
                LOGGABLE_INTERACTION_3
            ]
        },
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 8,
            "col": 20,
            "sprite": "fats.png",
            "direction": DirectionEnum.down,
            "name": "Bob B",
            "condition": [
                ConditionType.interactionRegistered,
                LOGGABLE_INTERACTION_3
            ]
        }
    ],
    "mapObjects": [
        {
            "type": "vent_1",
            "row": 1,
            "col": 2
        },
        {
            "type": "vent_1",
            "row": 1,
            "col": 4
        },
        {
            "type": "vent_1",
            "row": 1,
            "col": 11
        },
        {
            "type": "bench_a",
            "row": 2,
            "col": 1
        },
        {
            "type": "bench_a",
            "row": 2,
            "col": 4
        },
        {
            "type": "bench_a",
            "row": 2,
            "col": 10
        },
        {
            "type": "trash_2",
            "row": 4,
            "col": 5
        },
        {
            "type": "trash_4",
            "row": 4,
            "col": 10
        },
        {
            "type": "bench_a",
            "row": 4,
            "col": 11
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 13
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 21
        },
        {
            "type": "gang_z",
            "row": 7,
            "col": 1
        },
        {
            "type": "tree_plus_base",
            "row": 7,
            "col": 5
        },
        {
            "type": "tree_plus_base",
            "row": 7,
            "col": 9
        },
        {
            "type": "tree_plus_base",
            "row": 7,
            "col": 11
        },
        {
            "type": "Sign_03",
            "row": 7,
            "col": 13
        },
        {
            "type": "funz",
            "row": 7,
            "col": 16
        },
        {
            "type": "no_entry_sign",
            "row": 9,
            "col": 1
        },
        {
            "type": "boxes",
            "row": 11,
            "col": 11
        },
        {
            "type": "car_a",
            "row": 12,
            "col": 7,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_b",
            "row": 12,
            "col": 13,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_b",
            "row": 12,
            "col": 15,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_c",
            "row": 12,
            "col": 17,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_d",
            "row": 12,
            "col": 23,
            "direction": DirectionEnum.up
        }
    ],
    "spawnPoints": [
        {
            "col": 9,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.left
        },
        {
            "col": OutOfMapEnum.left,
            "row": 10,
            "direction": DirectionEnum.right
        }
    ],
    "roads": [
        {
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "topRow": 15,
            "bottomRow": 16,
            "startCol": 1,
            "endCol": 24
        },
        {
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "topRow": 13,
            "bottomRow": 14,
            "startCol": 24,
            "endCol": 1
        }
    ],
    "actions": [

    ]
}