import globals from '../../../../game-data/globals';
import { GRID_LEONARD_D2 } from './grid';
import { FRONT_GRID_LEONARD_D2 } from './frontgrid';
import { LOOKING_FOR_APPARTMENT_LADY, WHOLESOME_LIFTER_D2 } from './D2-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';
import { DARK_HAIR_NERD_LADY, TOUGH_GUY } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_D2,
    "grid": GRID_LEONARD_D2,
    "outdoors": true,
    "mapName": "leonard_heights/D2",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "type": DARK_HAIR_NERD_LADY,
            "direction": DirectionEnum.left,
            "row": 9,
            "column": 18,
            "action": LOOKING_FOR_APPARTMENT_LADY
        },
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name": "LIFT",
            "row": 9,
            "column": 8,
            "type": TOUGH_GUY,
            "direction": DirectionEnum.left,
            "name": "Wholesome Lifter",
            "action": WHOLESOME_LIFTER_D2
        },
        {
            "type": "Sign_03",
            "row": 6,
            "column": 15
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 3
        },
        {
            "type": "boxes",
            "row": 9,
            "column": 9
        },
        {
            "type": "hotel_sign",
            "row": 15,
            "column": 18
        }
    ],
    "spawnPoints": [
        {
            "column": 12,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.down
        },
        {
            "column": OutOfMapEnum.left,
            "row": 9,
            "direction": DirectionEnum.right
        },
        {
            "column": 18,
            "row": 10,
            "direction": DirectionEnum.left,
        },
        {
            "column": OutOfMapEnum.left,
            "row": 11,
            "direction": DirectionEnum.right
        },
        {
            "column": 9,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        },
        {
            "column": 17,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        },
        {
            "column": 18,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        }
    ],
    "roads": [
        {
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 14,
            "secondaryRow": 15,
            "primaryColumn": 1,
            "secondaryColumn": 12
        },
        {
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": false,
            "primaryRow": 12,
            "secondaryRow": 13,
            "primaryColumn": 14,
            "secondaryColumn": 1
        },
        {
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 13,
            "secondaryColumn": 14,
            "primaryRow": 16,
            "secondaryRow": 12
        },
        {
            "direction": DirectionEnum.down,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": false,
            "primaryColumn": 11,
            "secondaryColumn": 12,
            "primaryRow": 14,
            "secondaryRow": 16
        }
    ],
    "actions": [

    ]
}
