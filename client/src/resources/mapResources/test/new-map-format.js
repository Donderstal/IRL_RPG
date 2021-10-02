const { 
    FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT, NPC_ANIM_TYPE_IDLE
  } = require('../../../game-data/globals');
module.exports = {
    "mapName": "AA5",
    "neighbourhood": "NEW",
    "neighbours": {
        "right": "my-neighbourhood/neighbourhood-A1",
        "left": "null/AA4",
        "up": "my-neighbourhood/neighbourhood-A1",
        "down": "my-neighbourhood/neighbourhood-A1"
    },
    "spawnPoints": [
        {
            "col": 10,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 11,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 18,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 19,
            "row": 0,
            "direction": FACING_DOWN
        },
        {
            "col": 23,
            "row": 8,
            "direction": FACING_DOWN
        },
        {
            "col": 0,
            "row": 10,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 10,
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
            "row": 12,
            "direction": FACING_RIGHT
        },
        {
            "col": 25,
            "row": 12,
            "direction": FACING_LEFT
        },
        {
            "col": 10,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 11,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 18,
            "row": 17,
            "direction": FACING_UP
        },
        {
            "col": 19,
            "row": 17,
            "direction": FACING_UP
        }
    ],
    "roads": [
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 24,
            "endCol": 1
        },
        {
            "direction": FACING_UP,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 15,
            "rightCol": 16,
            "startRow": 16,
            "endRow": 1
        },
        {
            "direction": FACING_DOWN,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 13,
            "rightCol": 14,
            "startRow": 1,
            "endRow": 16
        }
    ],
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "music": "game-jam.mp3",
    "rows": 16,
    "columns": 24,
    "grid": [
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 802,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 226,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
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
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 625,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 796,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 797,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 797,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 797,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 109,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 109,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 90,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 196,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
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
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 746,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 745,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 800,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 801,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 79,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 113,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 113,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 90,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 230,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 741,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 627,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 752,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1056,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1065,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1065,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1065,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 118,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 118,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 118,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 90,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 196,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 751,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 653,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 756,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1052,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1055,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1059,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1063,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 65,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 65,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 65,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 65,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 65,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 81,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 65,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 82,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 230,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 743,
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
            "id": 756,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1056,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1051,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1065,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1065,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 96,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 97,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 97,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 98,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 89,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 90,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 196,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 743,
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
            "id": 756,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 744,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1052,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1055,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1059,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1063,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 85,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 100,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 101,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 101,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 102,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 91,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 90,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 200,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 625,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 743,
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
            "id": 756,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1056,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1057,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1065,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1057,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 93,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 93,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 104,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 105,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 105,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 106,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 93,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 94,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 625,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 741,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 743,
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
            "id": 756,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1060,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1061,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1079,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 1061,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 749,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 742,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 743,
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
            "id": 756,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 631,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 742,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 742,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 747,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 653,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 760,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 627,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 627,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
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
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 741,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 748,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 623,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 634,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 660,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 661,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 662,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 624,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 636,
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
            "id": 628,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 197,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 647,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 640,
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
            "id": 632,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 640,
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
            "id": 632,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 647,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 645,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 647,
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
            "id": 654,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 683,
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
            "id": 683,
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
            "id": 655,
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
            "id": 655,
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
            "id": 655,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 690,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 690,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 690,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 690,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 690,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 690,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 690,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 691,
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
            "id": 637,
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
            "id": 649,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 682,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 639,
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
            "id": 657,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 658,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 658,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 658,
            "angle": 0,
            "mirrored": false
        }
    ],
    "playerStart" : {
        "col": 12,
        "row": 8
    },
    "mapObjects": [
        {
            "type": "door_1",
            "row": 8,
            "col": 23,
            "hasDoor": true,
            "direction": FACING_UP,
            "destination": "Tst/A1"
        },
        {
            "type": "Bollard",
            "row": 12,
            "col": 2
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 3
        },
        {
            "type": "bolard_x",
            "row": 12,
            "col": 11
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 19
        },
        {
            "type": "Fire_Hydrant",
            "row": 12,
            "col": 23
        },
        {
            "type": "car_d",
            "row": 13,
            "col": 5,
            "direction": FACING_LEFT
        }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 4,
            "col": 20,
            "sprite": "character_x1_recolour01.png",
            "direction": FACING_LEFT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 8,
            "col": 9,
            "sprite": "characterx4.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 21,
            "sprite": "characterx3.png",
            "direction": FACING_DOWN
        }
    ],
    "actions": [],
    "doors": []
}