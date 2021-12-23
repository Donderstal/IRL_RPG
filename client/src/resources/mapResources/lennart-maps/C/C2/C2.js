const { FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, OUT_RIGHT, OUT_UP, OUT_DOWN, OUT_LEFT, NPC_ANIM_TYPE_IDLE } = require("../../../../../game-data/globals");
const { C2Grid } = require("./C2-grid");

module.exports = {
    "mapName": "lennart-neighbourhood/C2",
    "neighbourhood": "lennart-neighbourhood",
    "tileSet": "starting_neighbourhood_clean",
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "grid": C2Grid,
    "roads": [
        {
            "direction": FACING_RIGHT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 1,
            "endCol": 24
        },
        {
            "direction": FACING_LEFT,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 12,
            "bottomRow": 13,
            "startCol": 24,
            "endCol": 1
        }
    ],
    "mapObjects": [
        {
            "type": "vent_1",
            "row": 1,
            "col": 7
        },
        {
            "type": "vent_4",
            "row": 1,
            "col": 14
        },
        {
            "type": "vent_3",
            "row": 2,
            "col": 2
        },
        {
            "type": "vent_1",
            "row": 2,
            "col": 18
        },
        {
            "type": "vent_1",
            "row": 3,
            "col": 7
        },
        {
            "type": "vent_4",
            "row": 3,
            "col": 14
        },
        {
            "type": "hotel_sign",
            "row": 3,
            "col": 16
        },
        {
            "type": "vent_3",
            "row": 4,
            "col": 2
        },
        {
            "type": "vent_1",
            "row": 4,
            "col": 18
        },
        {
            "type": "vent_1",
            "row": 5,
            "col": 7
        },
        {
            "type": "vent_4",
            "row": 5,
            "col": 14
        },
        {
            "type": "vent_3",
            "row": 6,
            "col": 2
        },
        {
            "type": "vent_1",
            "row": 6,
            "col": 18
        },
        {
            "type": "car_b",
            "row": 7,
            "col": 8,
            "direction": FACING_UP
        },
        {
            "type": "vent_4",
            "row": 7,
            "col": 14
        },
        {
            "type": "Sign_03",
            "row": 7,
            "col": 19
        },
        {
            "type": "gang_z",
            "row": 7,
            "col": 21
        },
        {
            "type": "water_puddle",
            "row": 8,
            "col": 8
        },
        {
            "type": "funz",
            "row": 8,
            "col": 11
        },
        {
            "type": "gate_right",
            "row": 8,
            "col": 15
        },
        {
            "type": "gate_left",
            "row": 8,
            "col": 16
        },
        {
            "type": "office_chair",
            "row": 11,
            "col": 6
        },
        {
            "type": "banana",
            "row": 16,
            "col": 1
        }
    ],
    "characters": [

    ],
    "transparentTiles": [
        [
            { 'col': 2, 'row': 13 },
            { 'col': 3, 'row': 13 },
            { 'col': 4, 'row': 13 },
            { 'col': 5, 'row': 13 },
            { 'col': 6, 'row': 13 },
            { 'col': 2, 'row': 14 },
            { 'col': 3, 'row': 14 },
            { 'col': 4, 'row': 14 },
            { 'col': 5, 'row': 14 },
            { 'col': 6, 'row': 14 },
            { 'col': 2, 'row': 15 },
            { 'col': 3, 'row': 15 },
            { 'col': 4, 'row': 15 },
            { 'col': 5, 'row': 15 },
            { 'col': 6, 'row': 15 },
            { 'col': 2, 'row': 16 },
            { 'col': 3, 'row': 16 },
            { 'col': 4, 'row': 16 },
            { 'col': 5, 'row': 16 },
            { 'col': 6, 'row': 16 },
        ],
        [
            { 'col': 7, 'row': 14 },
            { 'col': 8, 'row': 14 },
            { 'col': 9, 'row': 14 },
            { 'col': 10, 'row': 14 },
            { 'col': 11, 'row': 14 },
            { 'col': 12, 'row': 14 },
            { 'col': 13, 'row': 14 },
            { 'col': 14, 'row': 14 },
            { 'col': 15, 'row': 14 },
            { 'col': 16, 'row': 14 },
            { 'col': 7, 'row': 15 },
            { 'col': 8, 'row': 15 },
            { 'col': 9, 'row': 15 },
            { 'col': 10, 'row': 15 },
            { 'col': 11, 'row': 15 },
            { 'col': 12, 'row': 15 },
            { 'col': 13, 'row': 15 },
            { 'col': 14, 'row': 15 },
            { 'col': 15, 'row': 15 },
            { 'col': 16, 'row': 15 },
            { 'col': 7, 'row': 16 },
            { 'col': 8, 'row': 16 },
            { 'col': 9, 'row': 16 },
            { 'col': 10, 'row': 16 },
            { 'col': 11, 'row': 16 },
            { 'col': 12, 'row': 16 },
            { 'col': 13, 'row': 16 },
            { 'col': 14, 'row': 16 },
            { 'col': 15, 'row': 16 },
            { 'col': 16, 'row': 16 }
        ]
    ],
    "spawnPoints": [
        {
            "col": OUT_LEFT,
            "row": 9,
            "direction": FACING_RIGHT
        },
        {
            "col": OUT_LEFT,
            "row": 11,
            "direction": FACING_RIGHT
        },
        {
            "col": OUT_RIGHT,
            "row": 9,
            "direction": FACING_LEFT
        },
        {
            "col": OUT_RIGHT,
            "row": 11,
            "direction": FACING_LEFT
        },
    ],
    "actions": [],
    "doors": [
        {
            "row": 8, 
            "col": 12,
            "destination"  : "lennart-neighbourhood/Newtown-Hall",
            "direction": FACING_UP,
        },
        {
            "row": 8, 
            "col": 13,
            "destination"  : "lennart-neighbourhood/Newtown-Hall",
            "direction": FACING_UP,
        }
    ]
}