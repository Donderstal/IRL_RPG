
const { 
    FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT, NPC_ANIM_TYPE_SEMI_IDLE, NPC_ANIM_TYPE_MOVING_IN_LOOP, NPC_ANIM_TYPE_IDLE
} = require('../../../game-data/globals');

module.exports = {
    "mapName": "test/single-turns-test",
    "neighbourhood": "test",
    "neighbours": {
        "right": "",
        "left": "",
        "up": "",
        "down": ""
    },
    "spawnPoints": [],
    "playerStart":{ 
        "row": 11,
        "col": 15
    },
    "roads": [
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 4,
            "bottomRow": 5,
            "startCol": 1,
            "endCol": 13
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 12,
            "rightCol": 13,
            "startRow": 4,
            "endRow": 11
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 10,
            "bottomRow": 11,
            "startCol": 13,
            "endCol": 7
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 7,
            "rightCol": 8,
            "startRow": 10,
            "endRow": 15
        },
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 7,
            "endCol": 23
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 22,
            "rightCol": 23,
            "startRow": 15,
            "endRow": 8
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 8,
            "bottomRow": 9,
            "startCol": 23,
            "endCol": 18
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 18,
            "rightCol": 19,
            "startRow": 9,
            "endRow": 2
        },
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 2,
            "bottomRow": 3,
            "startCol": 18,
            "endCol": 24
        }
    ],
    "tileSet": "downtown_2",
    "outdoors": true,
    "music": "game-jam-2.mp3",
    "rows": 16,
    "columns": 24,
    "grid": [
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 526,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 526,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 526,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 526,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 278,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 566,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E",
        "E"
    ],
    "mapObjects": [],
    "characters": [],
    "actions": [],
    "doors": []
}