const { FACING_DOWN, FACING_LEFT, FACING_RIGHT, OUT_RIGHT, OUT_UP, OUT_LEFT } = require("../../../../../game-data/globals");
const { B4Grid } = require("./B4-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/B4",
    "neighbourhood": "lennart-neighbourhood",
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "grid": B4Grid,
    "mapObjects": [
        {
            "type": "vent_1",
            "row": 2,
            "col": 14
        },
        {
            "type": "vent_1",
            "row": 2,
            "col": 19
        },
        {
            "type": "vent_1",
            "row": 4,
            "col": 14
        },
        {
            "type": "vent_1",
            "row": 4,
            "col": 19
        },
        {
            "type": "vent_1",
            "row": 6,
            "col": 14
        },
        {
            "type": "vent_1",
            "row": 6,
            "col": 19
        },
        {
            "type": "car_b",
            "row": 12,
            "col": 2,
            "direction": FACING_LEFT
        },
        {
            "type": "car_a",
            "row": 12,
            "col": 8,
            "direction": FACING_LEFT
        },
        {
            "type": "car_d",
            "row": 12,
            "col": 14,
            "direction": FACING_RIGHT
        }
    ],
    "characters": [],
    "actions": [],
    "doors": [],
    "spawnPoints": [ 
        {
            "col": 24,
            "row": OUT_UP,
            "direction": FACING_DOWN
        },
        {
            "col": 13,
            "row": 8,
            "direction": FACING_DOWN
        },
        {
            "col": 18,
            "row": 8,
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
    ]
}