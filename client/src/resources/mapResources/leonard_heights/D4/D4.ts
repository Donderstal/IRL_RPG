import { GRID_LEONARD_D4 } from './grid';
import { FRONT_GRID_LEONARD_D4 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_D4,
    "grid": GRID_LEONARD_D4,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "row": 11,
            "column": 14,
            "type": "Bench_Green"
        },
        {
            "type": "gang_z",
            "row": 3,
            "column": 20
        },
        {
            "type": "car_a",
            "row": 5,
            "column": 11,
            "direction": DirectionEnum.up
        },
        {
            "type": "Sign_01",
            "row": 5,
            "column": 14
        },
        {
            "type": "vent_4",
            "row": 5,
            "column": 16
        },
        {
            "type": "car_d",
            "row": 6,
            "column": 5,
            "direction": DirectionEnum.down
        },
        {
            "type": "wheelie_bin_right",
            "row": 7,
            "column": 19
        },
        {
            "type": "Bollard",
            "row": 8,
            "column": 15
        },
        {
            "type": "Bollard",
            "row": 8,
            "column": 18
        },
        {
            "type": "funz",
            "row": 8,
            "column": 22
        },
        {
            "type": "boxes",
            "row": 9,
            "column": 22
        },
        {
            "type": "banana",
            "row": 11,
            "column": 3
        },
        {
            "type": "office_chair",
            "row": 11,
            "column": 4
        }
    ],
    "actions": [

    ]
}