import { GRID_LEONARD_D2 } from './grid';
import { FRONT_GRID_LEONARD_D2 } from './frontgrid';
import { LOOKING_FOR_APPARTMENT_LADY, WHOLESOME_LIFTER_D2 } from './D2-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { DARK_HAIR_NERD_LADY, TOUGH_GUY } from '../../../spriteTypeResources';

export default {
    "frontGrid": FRONT_GRID_LEONARD_D2,
    "grid": GRID_LEONARD_D2,
    "outdoors": true,
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
            "name": "Jenn Trification",
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
    "actions": [

    ]
}
