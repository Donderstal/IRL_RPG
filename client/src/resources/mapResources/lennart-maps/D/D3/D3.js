const { FACING_DOWN, FACING_RIGHT, FACING_LEFT, FACING_UP } = require("../../../../../game-data/globals");
const { D3Grid } = require("./D3-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/D3",
    "neighbourhood": "lennart-neighbourhood",
    "spawnPoints": [],
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "grid": D3Grid,
    "roads": [
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 13,
            "rightCol": 14,
            "startRow": 15,
            "endRow": 1
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 11,
            "rightCol": 12,
            "startRow": 1,
            "endRow": 13
        },
        //
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 9,
            "endCol": 14
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 12,
            "bottomRow": 13,
            "startCol": 12,
            "endCol": 7
        },
        //
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 7,
            "rightCol": 8,
            "startRow": 12,
            "endRow": 16
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 9,
            "rightCol": 10,
            "startRow": 16,
            "endRow": 14
        },
        //
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 10,
            "bottomRow": 11,
            "startCol": 11,
            "endCol": 24
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 8,
            "bottomRow": 9,
            "startCol": 24,
            "endCol": 11
        }
    ],
    "mapObjects": [
        {
            "type": "tires_1",
            "row": 4,
            "col": 8
        },
        {
            "type": "car_b",
            "row": 4,
            "col": 9,
            "direction": FACING_DOWN
        },
        {
            "type": "door_4",
            "row": 8,
            "col": 4,
            "hasDoor": false,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "funz",
            "row": 8,
            "col": 5
        },
        {
            "type": "wheelie_bin_right",
            "row": 8,
            "col": 7
        },
        {
            "type": "bench_a",
            "row": 11,
            "col": 8
        }
    ],
    "transparentTiles": [
        [
            { 'col': 1, 'row': 3 },
            { 'col': 2, 'row': 3 },
        ],
        [
            { 'col': 1, 'row': 13 },
            { 'col': 2, 'row': 13 },
            { 'col': 1, 'row': 14 },
            { 'col': 2, 'row': 14 },
            { 'col': 1, 'row': 15 },
            { 'col': 2, 'row': 15 }
        ],
        [ 
            { 'col': 3, 'row': 1 },
            { 'col': 4, 'row': 1 },
            { 'col': 5, 'row': 1 },
            { 'col': 6, 'row': 1 },
            { 'col': 3, 'row': 2 },
            { 'col': 4, 'row': 2 },
            { 'col': 5, 'row': 2 },
            { 'col': 6, 'row': 2 },
            { 'col': 3, 'row': 3 },
            { 'col': 4, 'row': 3 },
            { 'col': 5, 'row': 3 },
            { 'col': 6, 'row': 3 },
        ],
        [
            { 'col': 15, 'row': 14 },
            { 'col': 16, 'row': 14 },
            { 'col': 17, 'row': 14 },
            { 'col': 18, 'row': 14 }, 
            { 'col': 15, 'row': 15 },
            { 'col': 16, 'row': 15 },
            { 'col': 17, 'row': 15 },
            { 'col': 18, 'row': 15 }, 
        ],
        [
            { 'col': 19, 'row': 14 },
            { 'col': 20, 'row': 14 },
            { 'col': 21, 'row': 14 },
            { 'col': 22, 'row': 14 }, 
            { 'col': 23, 'row': 14 },
            { 'col': 24, 'row': 14 },
            { 'col': 19, 'row': 15 },
            { 'col': 20, 'row': 15 },
            { 'col': 21, 'row': 15 },
            { 'col': 22, 'row': 15 }, 
            { 'col': 23, 'row': 15 },
            { 'col': 24, 'row': 15 }
        ]
    ],
    "characters": [],
    "actions": [],
    "doors": []
}