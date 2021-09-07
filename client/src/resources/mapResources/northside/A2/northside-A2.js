const { FACING_DOWN, FACING_LEFT, FACING_RIGHT, NPC_ANIM_TYPE_IDLE } = require("../../../../game-data/globals");
const { GRID } = require("./grid");

module.exports = {
    "mapName": "northside/A2",
    "tileSet": "downtown_2",
    "outdoors": true,
    "music": "game-jam.mp3",
    "neighbours": {
        "left": "northside/A1",
        "right": "northside/A3"
    },
    "roads" : [
        { "alignment": "HORI", "topRow": 13, "bottomRow": 14, "direction": FACING_LEFT, "hasStart": true },
        { "alignment": "HORI", "topRow": 15, "bottomRow": 16, "direction": FACING_RIGHT, "hasStart": true }
      ],
    "rows": 16,
    "columns": 24,
    "grid": GRID,
    "mapObjects": [
        {
            "type": "plant_yo",
            "row": 2,
            "col": 10
        },
        {
            "type": "plant_yo",
            "row": 3,
            "col": 14
        },
        {
            "type": "plant_yo",
            "row": 4,
            "col": 11
        },
        {
            "type": "Poster_Gronk",
            "row": 6,
            "col": 2
        },
        {
            "type": "Poster_Cola",
            "row": 6,
            "col": 8
        },
        {
            "type": "Bench_Green",
            "row": 6,
            "col": 10
        },
        {
            "type": "bin_a",
            "row": 6,
            "col": 12
        },
        {
            "type": "Lamppost_1",
            "row": 6,
            "col": 13
        },
        {
            "type": "water_puddle",
            "row": 9,
            "col": 8
        }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 6,
            "col": 14,
            "sprite": "fats.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 6,
            "col": 15,
            "sprite": "generic_balding_guy.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 8,
            "col": 8,
            "sprite": "robot.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 21,
            "sprite": "character_x1_recolour01.png",
            "direction": FACING_DOWN
        }
    ],
    "actions": [],
    "doors": []
}