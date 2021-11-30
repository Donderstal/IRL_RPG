const { NPC_ANIM_TYPE_IDLE, FACING_LEFT, FACING_RIGHT, FACING_UP, FACING_DOWN, OUT_LEFT, OUT_DOWN } = require("../../../../../game-data/globals");
const { E3Grid } = require("./E3-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/E3",
    "neighbourhood": "lennart-neighbourhood",
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "grid": E3Grid,
    "spawnPoints": [
        {
            "col": OUT_LEFT,
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
            "row": OUT_DOWN,
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
    "transparentTiles": [
        [
            { 'col': 1, 'row': 14 },
            { 'col': 2, 'row': 14 },
            { 'col': 1, 'row': 15 },
            { 'col': 2, 'row': 15 }
        ],
        [ 
            { 'col': 3, 'row': 13 },
            { 'col': 4, 'row': 13 },
            { 'col': 5, 'row': 13 },
            { 'col': 6, 'row': 13 },
            { 'col': 7, 'row': 13 },
            { 'col': 8, 'row': 13 },
            { 'col': 9, 'row': 13 },
            { 'col': 3, 'row': 14 },
            { 'col': 4, 'row': 14 },
            { 'col': 5, 'row': 14 },
            { 'col': 6, 'row': 14 },
            { 'col': 7, 'row': 14 },
            { 'col': 8, 'row': 14 },
            { 'col': 9, 'row': 14 },
            { 'col': 3, 'row': 15 },
            { 'col': 4, 'row': 15 },
            { 'col': 5, 'row': 15 },
            { 'col': 6, 'row': 15 },
            { 'col': 7, 'row': 15 },
            { 'col': 8, 'row': 15 },
            { 'col': 9, 'row': 15 },
        ]
    ],
    "actions": [],
    "doors": []
}