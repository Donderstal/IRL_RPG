const { NPC_ANIM_TYPE_IDLE, FACING_LEFT, FACING_RIGHT, FACING_UP, FACING_DOWN } = require("../../../../../game-data/globals");
const { E3Grid } = require("./E3-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/D3",
    "neighbourhood": "lennart-neighbourhood",
    "neighbours": {
        "right": "",
        "left": "lennart-neighbourhood/D3",
        "up": "",
        "down": ""
    },
    "spawnPoints": [
        {
            "col": 0,
            "row": 6,
            "direction": FACING_RIGHT
        },
        {
            "col": 10,
            "row": 6,
            "direction": FACING_DOWN
        },
        {
            "col": 11,
            "row": 6,
            "direction": FACING_DOWN
        },
        {
            "col": 11,
            "row": 17,
            "direction": FACING_UP
        }
    ],
    "roads": [
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 11,
            "bottomRow": 12,
            "startCol": 1,
            "endCol": 10
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 9,
            "rightCol": 10,
            "startRow": 12,
            "endRow": 9
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 9,
            "bottomRow": 10,
            "startCol": 10,
            "endCol": 1
        }
    ],
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "music": 'Theme_Overworld_1_HDR.mp3',
    "rows": 16,
    "columns": 24,
    "grid": E3Grid,
    "mapObjects": [
        {
            "type": "gang_z",
            "row": 3,
            "col": 4
        },
        {
            "type": "Sign_03",
            "row": 3,
            "col": 13
        },
        {
            "type": "funz",
            "row": 6,
            "col": 17
        },
        {
            "type": "car_b",
            "row": 9,
            "col": 7,
            "direction": FACING_RIGHT
        },
        {
            "type": "bin_a",
            "row": 10,
            "col": 11
        },
        {
            "type": "water_puddle",
            "row": 11,
            "col": 10
        }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 6,
            "col": 23,
            "sprite": "pigeon.png",
            "direction": FACING_LEFT
        }
    ],
    "actions": [],
    "doors": []
}