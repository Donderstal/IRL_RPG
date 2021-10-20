const { FACING_DOWN, FACING_RIGHT, FACING_LEFT, FACING_UP } = require("../../../../../game-data/globals");
const { D3Grid } = require("./D3-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/D3",
    "neighbourhood": "lennart-neighbourhood",
    "neighbours": {
        "right": "",
        "left": "",
        "up": "lennart-neighbourhood/D2",
        "down": ""
    },
    "spawnPoints": [],
    "roads": [
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 13,
            "rightCol": 14,
            "startRow": 16,
            "endRow": 1
        },
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 15,
            "bottomRow": 16,
            "startCol": 9,
            "endCol": 14
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 9,
            "rightCol": 10,
            "startRow": 16,
            "endRow": 15
        },
        //
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 11,
            "rightCol": 12,
            "startRow": 1,
            "endRow": 14
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 13,
            "bottomRow": 14,
            "startCol": 12,
            "endCol": 7
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 7,
            "rightCol": 8,
            "startRow": 13,
            "endRow": 16
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
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "music": 'Theme_Overworld_1_HDR.mp3',
    "rows": 16,
    "columns": 24,
    "grid": D3Grid,
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