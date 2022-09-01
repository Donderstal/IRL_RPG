import { GRID_LEONARD_C4 } from './grid';
import { FRONT_GRID_LEONARD_C4 } from './frontgrid';
import { LOGGABLE_INTERACTION_3 } from '../../../../game-data/interactionGlobals';
import { ConditionType } from '../../../../enumerables/ConditionTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';
import { FAT_BUFF_GUY, PIGEON } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C4,
    "grid": GRID_LEONARD_C4,
    "outdoors": true,
    "mapName": "leonard_heights/C4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 3,
            "column": 12,
            "type": PIGEON,
            "direction": DirectionEnum.left
        },
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 8,
            "column": 19,
            "type": FAT_BUFF_GUY,
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
            "column": 20,
            "type": FAT_BUFF_GUY,
            "direction": DirectionEnum.down,
            "name": "Bob B",
            "condition": [
                ConditionType.interactionRegistered,
                LOGGABLE_INTERACTION_3
            ]
        },
        {
            "type": "vent_1",
            "row": 1,
            "column": 2
        },
        {
            "type": "vent_1",
            "row": 1,
            "column": 4
        },
        {
            "type": "vent_1",
            "row": 1,
            "column": 11
        },
        {
            "type": "bench_a",
            "row": 2,
            "column": 1
        },
        {
            "type": "bench_a",
            "row": 2,
            "column": 4
        },
        {
            "type": "bench_a",
            "row": 2,
            "column": 10
        },
        {
            "type": "trash_2",
            "row": 4,
            "column": 5
        },
        {
            "type": "trash_4",
            "row": 4,
            "column": 10
        },
        {
            "type": "bench_a",
            "row": 4,
            "column": 11
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "column": 13
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "column": 21
        },
        {
            "type": "gang_z",
            "row": 7,
            "column": 1
        },
        {
            "type": "tree_plus_base",
            "row": 7,
            "column": 5
        },
        {
            "type": "tree_plus_base",
            "row": 7,
            "column": 9
        },
        {
            "type": "tree_plus_base",
            "row": 7,
            "column": 11
        },
        {
            "type": "Sign_03",
            "row": 7,
            "column": 13
        },
        {
            "type": "funz",
            "row": 7,
            "column": 16
        },
        {
            "type": "no_entry_sign",
            "row": 9,
            "column": 1
        },
        {
            "type": "boxes",
            "row": 11,
            "column": 11
        },
        {
            "type": "car_a",
            "row": 12,
            "column": 7,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_b",
            "row": 12,
            "column": 13,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_b",
            "row": 10,
            "column": 15,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_c",
            "row": 10,
            "column": 17,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_d",
            "row": 10,
            "column": 23,
            "direction": DirectionEnum.up
        }
    ],
    "spawnPoints": [
        {
            "column": 9,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.left
        },
        {
            "column": OutOfMapEnum.left,
            "row": 10,
            "direction": DirectionEnum.right
        }
    ],
    "roads": [
        {
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 16,
            "secondaryRow": 15,
            "primaryColumn": 0,
            "secondaryColumn": 25
        },
        {
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 14,
            "secondaryRow": 13,
            "primaryColumn": 25,
            "secondaryColumn": 0
        }
    ],
    "actions": [

    ]
}