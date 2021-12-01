const { FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, OUT_RIGHT, OUT_LEFT, NPC_ANIM_TYPE_IDLE } = require("../../../../../game-data/globals");
const { C4Grid } = require("./C4-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/C4",
    "neighbourhood": "lennart-neighbourhood",
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "grid": C4Grid,
    "spawnPoints": [
        {
            "col": 19,
            "row": 7,
            "direction": FACING_DOWN
        },
        {
            "col": 20,
            "row": 7,
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
    ],
    "mapObjects": [
        {
            "type": "bench_a",
            "row": 2,
            "col": 9
        },
        {
            "type": "water_puddle",
            "row": 3,
            "col": 7
        },
        {
            "type": "trash_4",
            "row": 3,
            "col": 9
        },
        {
            "type": "bench_a",
            "row": 4,
            "col": 9
        },
        {
            "type": "trash_1",
            "row": 5,
            "col": 10
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 13
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 21
        },
        {
            "type": "funz",
            "row": 7,
            "col": 16
        },
        {
            "type": "no_entry_sign",
            "row": 9,
            "col": 1
        },
        {
            "type": "boxes",
            "row": 11,
            "col": 11
        },
        {
            "type": "car_a",
            "row": 12,
            "col": 7,
            "direction": FACING_DOWN
        },
        {
            "type": "car_b",
            "row": 12,
            "col": 13,
            "direction": FACING_DOWN
        },
        {
            "type": "car_b",
            "row": 12,
            "col": 15,
            "direction": FACING_UP
        },
        {
            "type": "car_c",
            "row": 12,
            "col": 17,
            "direction": FACING_UP
        },
        {
            "type": "car_d",
            "row": 12,
            "col": 23,
            "direction": FACING_UP
        }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 2,
            "col": 5,
            "sprite": "robot.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 4,
            "col": 11,
            "sprite": "pigeon.png",
            "direction": FACING_RIGHT
        }
    ],
    "transparentTiles": [
        [
            { 'col': 1, 'row': 1 },
            { 'col': 2, 'row': 1 },
            { 'col': 3, 'row': 1 },
            { 'col': 4, 'row': 1 },
        ]
    ],
    "actions": [],
    "doors": []
}