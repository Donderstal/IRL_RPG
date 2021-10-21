const { NPC_ANIM_TYPE_IDLE, FACING_DOWN, FACING_UP, FACING_RIGHT, FACING_LEFT } = require("../../../../../game-data/globals");
const { D4Grid } = require("./D4-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/D4",
    "neighbourhood": "lennart-neighbourhood",
    "neighbours": {
        "right": "",
        "left": "lennart-neighbourhood/C4",
        "up": "lennart-neighbourhood/D3",
        "down": ""
    },
    "spawnPoints": [
        {
            "col": 4,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 5,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 16,
            "row": 7,
            "direction": FACING_DOWN
        },
        {
            "col": 17,
            "row": 7,
            "direction": FACING_DOWN
        },
        {
            "col": 0,
            "row": 9,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 10,
            "direction": FACING_LEFT
        }
    ],
    "roads": [
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 13,
            "bottomRow": 14,
            "startCol": 24,
            "endCol": 1
        },
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
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 9,
            "rightCol": 10,
            "startRow": 16,
            "endRow": 1
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 7,
            "rightCol": 8,
            "startRow": 1,
            "endRow": 16
        }
    ],
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "music": 'Theme_Overworld_1_HDR.mp3',
    "rows": 16,
    "columns": 24,
    "grid": D4Grid,
    "mapObjects": [
        {
            "type": "car_a",
            "row": 5,
            "col": 11,
            "direction": FACING_UP
        },
        {
            "type": "Sign_01",
            "row": 5,
            "col": 14
        },
        {
            "type": "vent_4",
            "row": 5,
            "col": 16
        },
        {
            "type": "car_d",
            "row": 6,
            "col": 5,
            "direction": FACING_DOWN
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 23
        },
        {
            "type": "wheelie_bin_right",
            "row": 7,
            "col": 19
        },
        {
            "type": "Bollard",
            "row": 8,
            "col": 15
        },
        {
            "type": "Bollard",
            "row": 8,
            "col": 18
        },
        {
            "type": "gang_z",
            "row": 8,
            "col": 22
        },
        {
            "type": "boxes",
            "row": 9,
            "col": 23
        },
        {
            "type": "banana",
            "row": 11,
            "col": 3
        },
        {
            "type": "office_chair",
            "row": 11,
            "col": 4
        },
        {
            "row": 11,
            "col": 14,
            "type": "Bench_Green",
        }
    ],
    "characters": [
        
    ],
    "actions": [],
    "doors": []
}