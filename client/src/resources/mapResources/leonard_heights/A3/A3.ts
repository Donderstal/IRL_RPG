import { GRID_LEONARD_A3 } from './grid';
import { FRONT_GRID_LEONARD_A3 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { DOOR_IDS } from '../../../eventChainResources/doorIds';
import { EventChainType } from '../../../../enumerables/EventChainType';

export default {
    "frontGrid": FRONT_GRID_LEONARD_A3,
    "grid": GRID_LEONARD_A3,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "type": "gate_stuk10",
            "row": 1,
            "column": 1
        },
        {
            "type": "gate_stuk10",
            "row": 2,
            "column": 1
        },
        {
            "type": "gate_stuk10",
            "row": 3,
            "column": 1
        },
        {
            "type": "hotel_sign",
            "row": 3,
            "column": 16
        },
        {
            "type": "gate_stuk10",
            "row": 4,
            "column": 1
        },
        {
            "type": "gate_stuk10",
            "row": 5,
            "column": 1
        },
        {
            "type": "boxes",
            "row": 5,
            "column": 2
        },
        {
            "type": "gate_stuk10",
            "row": 6,
            "column": 1
        },
        {
            "type": "gate_stuk8",
            "row": 6,
            "column": 10
        },
        {
            "type": "gate_stuk10",
            "row": 7,
            "column": 1
        },
        {
            "type": "gate_stuk4",
            "row": 7,
            "column": 10
        },
        {
            "type": "tree",
            "row": 7,
            "column": 11
        },
        {
            "type": "gate_stuk10",
            "row": 8,
            "column": 1
        },
        {
            "type": "gate_stuk3",
            "row": 8,
            "column": 10
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 11
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 12
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 13
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 14
        },
        {
            "type": "gate_stuk10",
            "row": 9,
            "column": 1
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 11
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 12
        },
        {
            "type": "bench_a",
            "row": 9,
            "column": 13
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 15
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 16
        },
        {
            "type": "bench_a",
            "row": 9,
            "column": 17
        },
        {
            "type": "tree_plus_base",
            "row": 9,
            "column": 19
        },
        {
            "type": "tree_plus_base",
            "row": 9,
            "column": 23
        },
        {
            "type": "gate_stuk10",
            "row": 10,
            "column": 1
        },
        {
            "type": "gate_stuk10",
            "row": 11,
            "column": 1
        },
        {
            "type": "gate_stuk10",
            "row": 12,
            "column": 1
        },
        {
            "type": "gate_stuk10",
            "row": 13,
            "column": 1
        }
    ],
    "triggers": [
        {
            "row": 7,
            "column": 21,
            "eventChainType": EventChainType.door,
            "direction": DirectionEnum.up,
            "eventId": DOOR_IDS.TWO_TOWERS_MAIN_DOOR
        },
        {
            "row": 7,
            "column": 22,
            "eventChainType": EventChainType.door,
            "direction": DirectionEnum.up,
            "eventId": DOOR_IDS.TWO_TOWERS_MAIN_DOOR
        }
    ]
}