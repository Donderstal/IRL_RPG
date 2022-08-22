import { GRID_LEONARD_B1 } from './grid';
import { FRONT_GRID_LEONARD_B1 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_B1,
    "grid": GRID_LEONARD_B1,
    "outdoors": true,
    "mapName": "leonard_heights/B1",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "type": "vent_3",
            "row": 2,
            "column": 3
        },
        {
            "type": "vent_1",
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
            "type": "gang_z",
            "row": 2,
            "column": 19
        },
        {
            "type": "Poster_Cruise",
            "row": 2,
            "column": 21
        },
        {
            "type": "door_4",
            "row": 4,
            "column": 5,
            "hasDoor": true,
            "directionIn": "",
            "doorTo": ""
        },
        {
            "type": "car_b",
            "row": 4,
            "column": 7,
            "direction": DirectionEnum.left
        },
        {
            "type": "car_d",
            "row": 5,
            "column": 15,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_b",
            "row": 5,
            "column": 19,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_a",
            "row": 3,
            "column": 21,
            "direction": DirectionEnum.up
        },
        {
            "type": "tires_2",
            "row": 9,
            "column": 8
        },
        {
            "type": "bus",
            "row": 12,
            "column": 17,
            "direction": DirectionEnum.down
        },
        {
            "type": "tires_1",
            "row": 12,
            "column": 20
        }
    ],
    "spawnPoints": [

    ],
    "roads": [
        {
            "name": "CIN_ROAD_1",
            "direction": DirectionEnum.up,
            "alignment": "VERT",
            "hasStart": false,
            "primaryColumn": 13,
            "secondaryColumn": 14,
            "primaryRow": 17,
            "secondaryRow": 3
        }
    ],
    "actions": [

    ]
}