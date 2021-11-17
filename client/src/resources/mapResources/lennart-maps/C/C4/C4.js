const { FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, OUT_RIGHT, OUT_LEFT } = require("../../../../../game-data/globals");
const { C4Grid } = require("./C4-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/C4",
    "neighbourhood": "lennart-neighbourhood",
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "grid": C4Grid,
    "spawnPoints": [
        {
            "col": 19,
            "row": 7,
            "direction": FACING_DOWN
        },
        {
            "col": 20,
            "row": 7,
            "direction": FACING_DOWN
        },
        {
            "col": OUT_RIGHT,
            "row": 9,
            "direction": FACING_LEFT
        },
        {
            "col": OUT_LEFT,
            "row": 10,
            "direction": FACING_RIGHT
        }
    ],
    "roads": [
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 15,
            "bottomRow": 16,
            "startCol": 1,
            "endCol": 24
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 13,
            "bottomRow": 14,
            "startCol": 24,
            "endCol": 1
        }
    ],
    "mapObjects": [
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 13
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 21
        },
        {
            "type": "funz",
            "row": 7,
            "col": 16
        },
        {
            "type": "car_a",
            "row": 12,
            "col": 7,
            "direction": FACING_DOWN
        },
        {
            "type": "car_b",
            "row": 12,
            "col": 13,
            "direction": FACING_DOWN
        },
        {
            "type": "car_b",
            "row": 12,
            "col": 15,
            "direction": FACING_UP
        },
        {
            "type": "car_c",
            "row": 12,
            "col": 17,
            "direction": FACING_UP
        },
        {
            "type": "car_d",
            "row": 12,
            "col": 23,
            "direction": FACING_UP
        }
    ],
    "characters": [],
    "actions": [],
    "doors": []
}