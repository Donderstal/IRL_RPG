const { FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, OUT_RIGHT, OUT_UP, OUT_DOWN, OUT_LEFT } = require("../../../../../game-data/globals");
const { C3Grid } = require("./C3-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/C3",
    "neighbourhood": "lennart-neighbourhood",
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "grid": C3Grid,
    "roads": [],
    "mapObjects": [
        {
            "type": "vent_3",
            "row": 5,
            "col": 20
        },
        {
            "type": "door_1",
            "row": 7,
            "col": 19,
            "hasDoor": false,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "gang_z",
            "row": 7,
            "col": 21
        },
        {
            "type": "boxes",
            "row": 9,
            "col": 23
        }
    ],
    "characters": [],
    "spawnPoints": [
        {
            "col": 18,
            "row": OUT_UP,
            "direction": FACING_DOWN
        },
        {
            "col": 11,
            "row": 8,
            "direction": FACING_DOWN
        },
        {
            "col": OUT_RIGHT,
            "row": 10,
            "direction": FACING_LEFT
        },
        {
            "col": OUT_LEFT,
            "row": 11,
            "direction": FACING_RIGHT
        },
        {
            "col": 3,
            "row": OUT_DOWN,
            "direction": FACING_UP
        }
    ],
    "transparentTiles": [
        [
            { 'col': 1, 'row': 1 },
            { 'col': 2, 'row': 1 },
            { 'col': 3, 'row': 1 },
            { 'col': 4, 'row': 1 },
            { 'col': 1, 'row': 2 },
            { 'col': 2, 'row': 2 },
            { 'col': 3, 'row': 2 },
            { 'col': 4, 'row': 2 },
        ],
        [
            { 'col': 5, 'row': 3 },
            { 'col': 6, 'row': 3 },
            { 'col': 5, 'row': 4 },
            { 'col': 6, 'row': 4 },
        ],
        [
            { 'col': 7, 'row': 1 },
            { 'col': 8, 'row': 1 },
            { 'col': 9, 'row': 1 },
            { 'col': 10, 'row': 1 },
            { 'col': 11, 'row': 1 },
            { 'col': 12, 'row': 1 },
            { 'col': 13, 'row': 1 },
            { 'col': 14, 'row': 1 },
            { 'col': 15, 'row': 1 },
            { 'col': 16, 'row': 1 },
            { 'col': 7, 'row': 2 },
            { 'col': 8, 'row': 2 },
            { 'col': 9, 'row': 2 },
            { 'col': 10, 'row': 2 },
            { 'col': 11, 'row': 2 },
            { 'col': 12, 'row': 2 },
            { 'col': 13, 'row': 2 },
            { 'col': 14, 'row': 2 },
            { 'col': 15, 'row': 2 },
            { 'col': 16, 'row': 2 }
        ],
        [
            { 'col': 1, 'row': 13 },
            { 'col': 2, 'row': 13 },
            { 'col': 3, 'row': 13 },
            { 'col': 4, 'row': 13 },
            { 'col': 1, 'row': 14 },
            { 'col': 2, 'row': 14 },
            { 'col': 3, 'row': 14 },
            { 'col': 4, 'row': 14 },
            { 'col': 1, 'row': 15 },
            { 'col': 2, 'row': 15 },
            { 'col': 3, 'row': 15 },
            { 'col': 4, 'row': 15 },
            { 'col': 1, 'row': 16 },
            { 'col': 2, 'row': 16 },
            { 'col': 3, 'row': 16 },
            { 'col': 4, 'row': 16 }
        ],
        [ 
            { 'col': 13, 'row': 13 },
            { 'col': 14, 'row': 13 },
            { 'col': 15, 'row': 13 },
            { 'col': 16, 'row': 13 },
            { 'col': 17, 'row': 13 },
            { 'col': 18, 'row': 13 },
            { 'col': 19, 'row': 13 },
            { 'col': 20, 'row': 13 },
            { 'col': 21, 'row': 13 },
            { 'col': 22, 'row': 13 },
            { 'col': 23, 'row': 13 },
            { 'col': 24, 'row': 13 },
            { 'col': 13, 'row': 14 },
            { 'col': 14, 'row': 14 },
            { 'col': 15, 'row': 14 },
            { 'col': 16, 'row': 14 },
            { 'col': 17, 'row': 14 },
            { 'col': 18, 'row': 14 },
            { 'col': 19, 'row': 14 },
            { 'col': 20, 'row': 14 },
            { 'col': 21, 'row': 14 },
            { 'col': 22, 'row': 14 },
            { 'col': 23, 'row': 14 },
            { 'col': 24, 'row': 14 },
            { 'col': 13, 'row': 15 },
            { 'col': 14, 'row': 15 },
            { 'col': 15, 'row': 15 },
            { 'col': 16, 'row': 15 },
            { 'col': 17, 'row': 15 },
            { 'col': 18, 'row': 15 },
            { 'col': 19, 'row': 15 },
            { 'col': 20, 'row': 15 },
            { 'col': 21, 'row': 15 },
            { 'col': 22, 'row': 15 },
            { 'col': 23, 'row': 15 },
            { 'col': 24, 'row': 15 }
        ],
        [
            { 'col': 20, 'row': 3 },
            { 'col': 21, 'row': 3 },
            { 'col': 22, 'row': 3 },
            { 'col': 23, 'row': 3 },
            { 'col': 24, 'row': 3 }
        ]
    ],
    "actions": [],
    "doors": []
}