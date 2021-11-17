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
            "row": 6,
            "col": 8
        },
        {
            "type": "car_b",
            "row": 6,
            "col": 9,
            "direction": FACING_DOWN
        },
        {
            "type": "bench_a",
            "row": 11,
            "col": 8
        }
    ],
    "characters": [],
    "actions": [],
    "doors": []
}