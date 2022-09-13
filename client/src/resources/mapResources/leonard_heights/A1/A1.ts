import { GRID_LEONARD_A1 } from './grid';
import { FRONT_GRID_LEONARD_A1 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { PINK_HAIRED_FAT_GUY, TOUGH_GUY_WITH_COOL_HAIR } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_A1,
    "grid": GRID_LEONARD_A1,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 5,
            "column": 20,
            "type": TOUGH_GUY_WITH_COOL_HAIR,
            "direction": DirectionEnum.down
        },
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 5,
            "column": 23,
            "type": PINK_HAIRED_FAT_GUY,
            "direction": DirectionEnum.down
        },
        {
            "type": "door_5",
            "row": 4,
            "column": 21,
            "hasDoor": true,
            "directionIn": "",
            "doorTo": ""
        }
    ],
    "actions": [

    ]
}