const { NPC_ANIM_TYPE_IDLE, FACING_DOWN, FACING_LEFT, FACING_RIGHT, OUT_LEFT, OUT_RIGHT } = require("../../../../game-data/globals");
const { GRID } = require("./grid");

module.exports = {
    "mapName": "northside/C2",
    "tileSet": "downtown_2",
    "outdoors": true,
    "roads" : [
        { "alignment": "HORI", "topRow": 13, "bottomRow": 14, "direction": FACING_LEFT, "hasStart": true },
        { "alignment": "HORI", "topRow": 15, "bottomRow": 16, "direction": FACING_RIGHT, "hasStart": true }
      ],
    "playerStart" : {
        "row": 9,
        "col": 13
    },
    "rows": 16,
    "columns": 24,
    "grid": GRID,
    "actions": [],
    "doors": [],
    "spawnPoints" : [
        { "col": OUT_LEFT, "row": 9, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 10, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 11, "direction": FACING_RIGHT },
        { "col": 2, "row": 8, "direction": FACING_DOWN },
        { "col": 12, "row": 8, "direction": FACING_DOWN },
        { "col": 18, "row": 8, "direction": FACING_DOWN },
        { "col": OUT_RIGHT, "row": 9, "direction": FACING_LEFT },
        { "col": OUT_RIGHT, "row": 10, "direction": FACING_LEFT },
        { "col": OUT_RIGHT, "row": 11, "direction": FACING_LEFT }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 10,
            "col": 22,
            "sprite": "characterx3.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 8,
            "sprite": "tumbler_girl_recolour02.png",
            "direction": FACING_RIGHT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 9,
            "sprite": "woman.png",
            "direction": FACING_LEFT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 12,
            "col": 3,
            "sprite": "generic_blonde_guy.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 12,
            "col": 4,
            "sprite": "pigeon.png",
            "direction": FACING_DOWN
        }
    ],
    "mapObjects": [
        {
            "type": "hotel_sign",
            "row": 3,
            "col": 1
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 16
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 20
        },
        {
            "type": "Bench_Green",
            "row": 9,
            "col": 22
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 1
        },
        {
            "type": "bin_x",
            "row": 12,
            "col": 2
        },
        {
            "type": "Fire_Hydrant",
            "row": 12,
            "col": 11
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 13
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 24
        }
    ]
}