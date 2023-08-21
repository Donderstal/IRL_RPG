import { GRID_LEONARD_C4 } from './grid';
import { FRONT_GRID_LEONARD_C4 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { PIGEON } from '../../../spriteTypeResources';
import { EventType } from '../../../../enumerables/EventType';
import { DOOR_IDS } from '../../../eventResources/doorIds';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C4,
    "grid": GRID_LEONARD_C4,
    "outdoors": true,
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
            "row": 12,
            "column": 15,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_c",
            "row": 12,
            "column": 17,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_d",
            "row": 12,
            "column": 23,
            "direction": DirectionEnum.up
        }
    ],
    "triggers": [
        {
            "eventType": EventType.door,
            "eventId": DOOR_IDS.YUM_MART_FRONT_DOOR,
            "row": 7,
            "column": 19,
            "direction": DirectionEnum.up,
        },
        {
            "eventType": EventType.door,
            "eventId": DOOR_IDS.YUM_MART_FRONT_DOOR,
            "row": 7,
            "column": 20,
            "direction": DirectionEnum.up,
        }
    ]
}