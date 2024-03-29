import { GRID_LEONARD_E4 } from './grid';
import { FRONT_GRID_LEONARD_E4 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { STRONG_GUY } from '../../../spriteTypeResources';
import { ANIM_LIFT } from '../../../../game-data/animationGlobals';
import { CUTSCENE_IDS } from '../../../eventChainResources/cutsceneIds';
import { EventChainType } from '../../../../enumerables/EventChainType';

const ID_WHOLESOME_LIFTER_E4 = "ID_WHOLESOME_LIFTER_E4";

export default {
    "frontGrid": FRONT_GRID_LEONARD_E4,
    "grid": GRID_LEONARD_E4,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name": ANIM_LIFT,
            "row": 9,
            "column": 12,
            "type": STRONG_GUY,
            "direction": DirectionEnum.left,
            "name": "Wholesome Lifter",
            "id": ID_WHOLESOME_LIFTER_E4
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
            "hasDoor": false
        },
        {
            "type": "wheelie_bin_left",
            "row": 13,
            "column": 10
        },
        {
            "type": "car_d",
            "row": 11,
            "column": 6,
            "direction": DirectionEnum.left
        },
        {
            "type": "wheelie_bin_left",
            "row": 15,
            "column": 10
        }
    ],
    "triggers": [
        {
            "eventChainType": EventChainType.cutscene,
            "eventId": CUTSCENE_IDS.E4_WHOLESOME_LIFTER,
            "spriteId": ID_WHOLESOME_LIFTER_E4
        }
    ]
}