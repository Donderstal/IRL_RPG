const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../../../game-data/globals");

module.exports = {
    "mapName": "test",
    "neighbourhood": "downtown",
    "neighbours": {
        "right": "",
        "left": "",
        "up": "",
        "down": ""
    },
    "playerStart":{ 
        "row": 2,
        "col": 2
    },
    "spawnPoints": [],
    "roads": [
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 10,
            "bottomRow": 11,
            "startCol": 1,
            "endCol": 10
        },
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 9,
            "endCol": 20
        },
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 4,
            "bottomRow": 5,
            "startCol": 19,
            "endCol": 24
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 2,
            "bottomRow": 3,
            "startCol": 24,
            "endCol": 17
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 12,
            "bottomRow": 13,
            "startCol": 18,
            "endCol": 11
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": false,
            "topRow": 8,
            "bottomRow": 9,
            "startCol": 12,
            "endCol": 1
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 19,
            "rightCol": 20,
            "startRow": 15,
            "endRow": 4
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 11,
            "rightCol": 12,
            "startRow": 13,
            "endRow": 8
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 9,
            "rightCol": 10,
            "startRow": 10,
            "endRow": 15
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 17,
            "rightCol": 18,
            "startRow": 2,
            "endRow": 13
        }
    ],
    "tileSet": "downtown_2",
    "outdoors": true,
    "music": "game-jam-2.mp3",
    "rows": 16,
    "columns": 24,
    "grid": [
        {
            "id": 441,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 441,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 441,
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
        {
            "id": 441,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 473,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 441,
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
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 441,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 441,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 441,
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
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        "E",
        "E",
        "E",
        "E",
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 13,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 582,
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