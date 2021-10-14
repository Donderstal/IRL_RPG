const { 
    FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT, NPC_ANIM_TYPE_IDLE
  } = require('../../../game-data/globals');
  
module.exports = {
    "mapName": "test/pathfinding-test",
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
            "col": 17,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 19,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 21,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 23,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 0,
            "row": 2,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 2,
            "direction": FACING_LEFT
        },
        {
            "col": 0,
            "row": 4,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 4,
            "direction": FACING_LEFT
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
            "row": 11,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 11,
            "direction": FACING_LEFT
        },
        {
            "col": 0,
            "row": 13,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 13,
            "direction": FACING_LEFT
        },
        {
            "col": 0,
            "row": 15,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 15,
            "direction": FACING_LEFT
        },
        {
            "col": 2,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 4,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 6,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 8,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 10,
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
                [ 10, 11], 
                [ 16, 17 ]
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
                [ 10, 11], 
                [ 16, 17 ]
            ]
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 14,
            "rightCol": 15,
            "startRow": 16,
            "endRow": 1,
            "crossings" : [
                [ 5, 6 ], 
                [ 11, 12 ]
            ]
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 12,
            "rightCol": 13,
            "startRow": 1,
            "endRow": 16,
            "crossings" : [
                [ 5, 6 ], 
                [ 11, 12 ]
            ]
        }
    ],
    "playerStart" : {
        "row": 1,
        "col": 1
    },
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "music": 'Theme_Overworld_1_HDR.mp3',
    "rows": 16,
    "columns": 24,
    "grid": [
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
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 750,
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
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 749,
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
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 648,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 648,
            "angle": 270,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 270,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 90,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 90,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": true
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
            "id": 749,
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
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
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
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
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
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 180,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 180,
            "mirrored": true
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 180,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 180,
            "mirrored": true
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 0,
            "mirrored": true
        },
        {
            "id": 648,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
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
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
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
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 750,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 648,
            "angle": 270,
            "mirrored": true
        },
        {
            "id": 648,
            "angle": 270,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 270,
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
            "id": 749,
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
            "id": 749,
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
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 90,
            "mirrored": false
        },
        {
            "id": 648,
            "angle": 90,
            "mirrored": true
        },
        {
            "id": 652,
            "angle": 90,
            "mirrored": true
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 750,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 750,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 750,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 750,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
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
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 750,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 750,
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
            "id": 630,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 654,
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
        }
    ],
    "mapObjects": [],
    "characters": [],
    "actions": [],
    "doors": []
}