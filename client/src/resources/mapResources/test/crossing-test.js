const { FACING_RIGHT, FACING_LEFT, FACING_DOWN, FACING_UP } = require("../../../game-data/globals");

module.exports = {
    "mapName": "crossing-test",
    "neighbourhood": "test",
    "neighbours": {
        "right": "",
        "left": "",
        "up": "",
        "down": ""
    },
    "spawnPoints": [
        {
            "col": 2,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 4,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 6,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 8,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 10,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 12,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 14,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 16,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 18,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 20,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 22,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 3,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 5,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 7,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 9,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 11,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 13,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 15,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 17,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 19,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 21,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 23,
            "row": 17,
            "direction": FACING_UP
        }
    ],
    "roads": [
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 9,
            "bottomRow": 10,
            "startCol": 1,
            "endCol": 24,
            "crossings" : [
                [ 7, 8 ],
                [ 17, 18 ]
            ]
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 7,
            "bottomRow": 8,
            "startCol": 24,
            "endCol": 1,
            "crossings" : [
                [ 7, 8 ],
                [ 17, 18 ]
            ]
        }
    ],
    "playerStart" : {
        "row": 3,
        "col": 3
    },
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "music": 'Theme_Overworld_1_HDR.mp3',
    "rows": 16,
    "columns": 24,
    "grid": [
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 709,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 687,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 769,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 724,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 719,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 717,
            "angle": 0,
            "mirrored": false
        }
    ],
    "mapObjects": [],
    "characters": [],
    "actions": [],
    "doors": []
}