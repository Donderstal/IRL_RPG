import { GRID_LEONARD_D2 } from './grid';
import { FRONT_GRID_LEONARD_D2 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { DARK_HAIR_NERD_LADY, TOUGH_GUY } from '../../../spriteTypeResources';
import { ANIM_LIFT } from '../../../../game-data/animationGlobals';
import { EventType } from '../../../../enumerables/EventType';
import { DOOR_IDS } from '../../../eventResources/doorIds';
import { CUTSCENE_IDS } from '../../../eventResources/cutsceneIds';

const ID_D2_DARK_HAIR_NERD_LADY = "ID_D2_DARK_HAIR_NERD_LADY";
const ID_D2_TOUGH_GUY = "ID_D2_TOUGH_GUY";

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
            "id": ID_D2_DARK_HAIR_NERD_LADY
        },
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name": ANIM_LIFT,
            "row": 9,
            "column": 8,
            "type": TOUGH_GUY,
            "direction": DirectionEnum.left,
            "name": "Wholesome Lifter",
            "id": ID_D2_TOUGH_GUY
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
    "triggers": [
        {
            "row": 8,
            "column": 15,
            "direction": DirectionEnum.up,
            "eventId": DOOR_IDS.SARDINE_STUDIOS_FRONT_DOOR,
            "eventType": EventType.door
        },
        {
            "eventType": EventType.cutscene,
            "eventId": CUTSCENE_IDS.D2_LOOKING_FOR_APPARTMENT_LADY,
            "spriteId": ID_D2_DARK_HAIR_NERD_LADY
        },
        {
            "eventType": EventType.cutscene,
            "eventId": CUTSCENE_IDS.D2_WHOLESOME_LIFTER,
            "spriteId": ID_D2_TOUGH_GUY
        }
    ]
}
