import { GRID_LEONARD_B4 } from './grid';
import { FRONT_GRID_LEONARD_B4 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { TOUGH_GUY } from '../../../spriteTypeResources';
import { ANIM_LIFT } from '../../../../game-data/animationGlobals';
import { CUTSCENE_IDS } from '../../../eventChainResources/cutsceneIds';
import { DOOR_IDS } from '../../../eventChainResources/doorIds';
import { EventChainType } from '../../../../enumerables/EventChainType';

const WHOLESOME_LIFTER_ID = "WHOLESOME_LIFT_B4"

export default {
    "frontGrid": FRONT_GRID_LEONARD_B4,
    "grid": GRID_LEONARD_B4,
    "outdoors":true,
    "rows":16,
    "columns":24,
    "tileSet":"starting_neighbourhood_clean",
    "sprites":[
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name": ANIM_LIFT,
            "row":9,
            "column":9,
            "type": TOUGH_GUY,
            "direction": DirectionEnum.left,
            "name": "Wholesome Lifter",
            "id": WHOLESOME_LIFTER_ID
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
            "type":"bar_sign_old",
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
    "triggers": [
        {
            "eventChainType": EventChainType.cutscene,
            "eventId": CUTSCENE_IDS.B4_WHOLESOME_LIFTER,
            "spriteId": WHOLESOME_LIFTER_ID
        },
        {
            "eventChainType": EventChainType.door,
            "row": 8,
            "column": 4,
            "direction": DirectionEnum.up,
            "eventId": DOOR_IDS.CLUBSHELTER_MAIN_FRONT_DOOR
        },
        {
            "eventChainType": EventChainType.door,
            "row": 8,
            "column": 5,
            "direction": DirectionEnum.up,
            "eventId": DOOR_IDS.CLUBSHELTER_MAIN_FRONT_DOOR
        }
    ]
}