const { FACING_DOWN, FACING_RIGHT, FACING_LEFT, FACING_UP, OUT_UP, OUT_LEFT, OUT_DOWN } = require("../../../../../game-data/globals");
const { D2grid } = require("./D2-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/D2",
    "neighbourhood": "lennart-neighbourhood",
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "playerStart" : {
        'row': 8,
        'col': 4
    },
    "grid": D2grid,
    "spawnPoints": [
        {
            "col": 12,
            "row": OUT_UP,
            "direction": FACING_DOWN
        },
        {
            "col": OUT_LEFT,
            "row": 9,
            "direction": FACING_RIGHT
        },
        {
            "col": 18,
            "row": 10,
            "direction": FACING_LEFT
        },
        {
            "col": OUT_LEFT,
            "row": 11,
            "direction": FACING_RIGHT
        },
        {
            "col": 9,
            "row": OUT_DOWN,
            "direction": FACING_UP
        },
        {
            "col": 17,
            "row": OUT_DOWN,
            "direction": FACING_UP
        },
        {
            "col": 18,
            "row": OUT_DOWN,
            "direction": FACING_UP
        }
    ],
    "roads": [
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 1,
            "endCol": 12
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 12,
            "bottomRow": 13,
            "startCol": 14,
            "endCol": 1
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 13,
            "rightCol": 14,
            "startRow": 16,
            "endRow": 12
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 11,
            "rightCol": 12,
            "startRow": 14,
            "endRow": 16
        }
    ],
    "mapObjects": [
        {
            "type": "Sign_03",
            "row": 6,
            "col": 15
        },
        {
            "type": "pot_plant_a",
            "row": 8,
            "col": 3
        },
        {
            "type": "boxes",
            "row": 9,
            "col": 9
        },
        {
            "type": "hotel_sign",
            "row": 15,
            "col": 18
        }
    ],
    "characters": [],
    "actions": [],
    "doors": []
}