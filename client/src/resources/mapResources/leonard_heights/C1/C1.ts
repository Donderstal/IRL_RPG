import { GRID_LEONARD_C1 } from './grid';
import { FRONT_GRID_LEONARD_C1 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { getInteractionNotRegisteredCondition } from '../../../../factories/conditionFactory';
import { CUTSCENE_IDS } from '../../../eventChainResources/cutsceneIds';
import { EventChainType } from '../../../../enumerables/EventChainType';

const COLLECTABLE_COIN_C1 = "COLLECTABLE_COIN_C1";

export default {
    "frontGrid": FRONT_GRID_LEONARD_C1,
    "grid": GRID_LEONARD_C1,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "type": "collectable_coin",
            "row": 3,
            "column": 19,
            "condition": getInteractionNotRegisteredCondition( "TEST_KEY_2" ),
            "id": COLLECTABLE_COIN_C1
        },
        {
            "type": "funz",
            "row": 1,
            "column": 15
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "column": 1
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "column": 5
        },
        {
            "type": "Poster_Cruise",
            "row": 2,
            "column": 9
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "column": 13
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "column": 17
        },
        {
            "type": "gate_right",
            "row": 2,
            "column": 21
        },
        {
            "type": "gate_left",
            "row": 2,
            "column": 22
        },
        {
            "type": "tires_2",
            "row": 4,
            "column": 10
        },
        {
            "type": "car_b",
            "row": 5,
            "column": 3,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_a",
            "row": 5,
            "column": 7,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_c",
            "row": 5,
            "column": 17,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_d",
            "row": 12,
            "column": 5,
            "direction": DirectionEnum.down
        },
        {
            "type": "vent_4",
            "row": 15,
            "column": 14
        },
        {
            "type": "vent_1",
            "row": 16,
            "column": 18
        },
        {
			"type": "car_police",
			"column": 13,
			"row": 5,
			"direction": 3
		}
    ],
    "triggers": [
        {
            "eventChainType": EventChainType.cutscene,
            "eventId": CUTSCENE_IDS.C1_FIND_LOST_KEYS,
            "spriteId": COLLECTABLE_COIN_C1
        }
    ]
}