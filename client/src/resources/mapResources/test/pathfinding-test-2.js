const { FACING_LEFT, FACING_RIGHT, FACING_DOWN, FACING_UP } = require("../../../game-data/globals");

module.exports = {
    "mapName": "test/pathfinding-test-2",
    "neighbourhood": "test",
    "neighbours": {
        "right": "",
        "left": "",
        "up": "",
        "down": ""
    },
    "spawnPoints": [
        {
            "col": 12,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 19,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 5,
            "row": 5,
            "direction": FACING_DOWN
        },
        {
            "col": 6,
            "row": 5,
            "direction": FACING_DOWN
        },
        {
            "col": 21,
            "row": 5,
            "direction": FACING_DOWN
        },
        {
            "col": 22,
            "row": 5,
            "direction": FACING_DOWN
        },
        {
            "col": 0,
            "row": 6,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 6,
            "direction": FACING_LEFT
        },
        {
            "col": 0,
            "row": 8,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 8,
            "direction": FACING_LEFT
        },
        {
            "col": 2,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 5,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 10,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 19,
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
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 10,
            "bottomRow": 11,
            "startCol": 24,
            "endCol": 1,
            "crossings" : [
                8, 9, 21, 22
            ]
        },
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 1,
            "endCol": 24,
            "crossings" : [
                8, 9, 21, 22
            ]
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 16,
            "rightCol": 17,
            "startRow": 16,
            "endRow": 1,
            "crossings" : [
                7, 8
            ]
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 14,
            "rightCol": 15,
            "startRow": 1,
            "endRow": 16,
            "crossings" : [
                7, 8
            ]
        }
    ],
    "playerStart" : {
        "row": 8,
        "col": 3
    },
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "music": 'Theme_Overworld_1_HDR.mp3',
    "rows": 16,
    "columns": 24,
    "grid": [
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 536,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 537,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 538,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 540,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 542,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 540,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 541,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 542,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": true
        },
        {
            "id": 704,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 714,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 720,
            "angle": 0,
            "mirrored": true
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 720,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 721,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": true
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": true
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 726,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 727,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 726,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 727,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 730,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 731,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 730,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 731,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": true
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 180,
            "mirrored": true
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 656,
            "angle": 0,
            "mirrored": false
        }
    ],
    "mapObjects": [
        {
            "type": "Sign_02",
            "row": 2,
            "col": 12
        },
        {
            "type": "Poster_Gronk",
            "row": 3,
            "col": 3
        },
        {
            "type": "Poster_Gronk",
            "row": 3,
            "col": 8
        },
        {
            "type": "hotel_sign",
            "row": 3,
            "col": 19
        },
        {
            "type": "door_5",
            "row": 5,
            "col": 5,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "door_5",
            "row": 5,
            "col": 21,
            "hasDoor": true,
            "directionIn": "",
            "destination": ""
        },
        {
            "type": "Lamppost_1",
            "row": 8,
            "col": 12
        },
        {
            "type": "Lamppost_1",
            "row": 8,
            "col": 19
        },
        {
            "type": "Bus_Stop",
            "row": 12,
            "col": 7
        }
    ],
    "characters": [],
    "actions": [],
    "doors": []
}
