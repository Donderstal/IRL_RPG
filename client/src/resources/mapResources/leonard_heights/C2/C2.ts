import { GRID_LEONARD_C2 } from './grid';
import { FRONT_GRID_LEONARD_C2 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { LH_NEWTOWN_APP_HALL_KEY } from '../leonard_heights_res';
import { DOORKEY_NEWTOWN_APPARTMENTS_FRONT_DOOR } from './C2-door-keys';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C2,
    "grid": GRID_LEONARD_C2,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "type": "vent_1",
            "row": 1,
            "column": 7
        },
        {
            "type": "vent_4",
            "row": 1,
            "column": 14
        },
        {
            "type": "vent_3",
            "row": 2,
            "column": 2
        },
        {
            "type": "vent_1",
            "row": 2,
            "column": 18
        },
        {
            "type": "vent_1",
            "row": 3,
            "column": 7
        },
        {
            "type": "vent_4",
            "row": 3,
            "column": 14
        },
        {
            "type": "hotel_sign",
            "row": 3,
            "column": 16
        },
        {
            "type": "vent_3",
            "row": 4,
            "column": 2
        },
        {
            "type": "vent_1",
            "row": 4,
            "column": 18
        },
        {
            "type": "vent_1",
            "row": 5,
            "column": 7
        },
        {
            "type": "vent_4",
            "row": 5,
            "column": 14
        },
        {
            "type": "vent_3",
            "row": 6,
            "column": 2
        },
        {
            "type": "vent_1",
            "row": 6,
            "column": 18
        },
        {
            "type": "car_b",
            "row": 7,
            "column": 8,
            "direction": DirectionEnum.up
        },
        {
            "type": "vent_4",
            "row": 7,
            "column": 14
        },
        {
            "type": "Sign_03",
            "row": 7,
            "column": 19
        },
        {
            "type": "gang_z",
            "row": 7,
            "column": 21
        },
        {
            "type": "water_puddle",
            "row": 8,
            "column": 8
        },
        {
            "type": "funz",
            "row": 8,
            "column": 11
        },
        {
            "type": "gate_right",
            "row": 8,
            "column": 15
        },
        {
            "type": "gate_left",
            "row": 8,
            "column": 16
        },
        {
            "type": "office_chair",
            "row": 11,
            "column": 6
        },
        {
            "type": "banana",
            "row": 16,
            "column": 1
        }
    ],
    "actions": [

    ],
    "doors": [
        {
            "id": DOORKEY_NEWTOWN_APPARTMENTS_FRONT_DOOR,
            "row": 8,
            "column": 12,
            "doorTo": LH_NEWTOWN_APP_HALL_KEY,
            "direction": DirectionEnum.up
        },
        {
            "id": DOORKEY_NEWTOWN_APPARTMENTS_FRONT_DOOR,
            "row": 8,
            "column": 13,
            "doorTo": LH_NEWTOWN_APP_HALL_KEY,
            "direction": DirectionEnum.up
        }
    ]
}