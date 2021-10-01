const { NPC_ANIM_TYPE_IDLE, FACING_DOWN, FACING_LEFT, FACING_RIGHT, FACING_UP } = require("../../../../game-data/globals");
const { GRID } = require("./grid");

module.exports = {
    "mapName": "northside/A1",
    "tileSet": "downtown_2",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
        { "alignment": "HORI", "topRow": 13, "bottomRow": 14, "direction": FACING_LEFT, "hasStart": true },
        { "alignment": "HORI", "topRow": 15, "bottomRow": 16, "direction": FACING_RIGHT, "hasStart": true }
      ],
    "neighbours": {
        "right": "northside/A2"
    },
    "rows": 16,
    "columns": 24,
    "grid": GRID,
    "spawnPoints" : [
        { "col": 0, "row": 9, "direction": FACING_RIGHT },
        { "col": 0, "row": 10, "direction": FACING_RIGHT },
        { "col": 0, "row": 11, "direction": FACING_RIGHT },
        { "col": 2, "row": 6, "direction": FACING_DOWN },
        { "col": 10, "row": 8, "direction": FACING_DOWN },
        { "col": 20, "row": 8, "direction": FACING_DOWN },
        { "col": 21, "row": 8, "direction": FACING_DOWN },
        { "col": 25, "row": 9, "direction": FACING_LEFT },
        { "col": 25, "row": 10, "direction": FACING_LEFT },
        { "col": 25, "row": 11, "direction": FACING_LEFT }
    ],
    "actions": [],
    "doors": [],
    "mapObjects": [
        {
            "type": "Sign_01",
            "row": 3,
            "col": 18
        },
        {
            "type": "Sign_02",
            "row": 4,
            "col": 12
        },
        {
            "type": "yellow_stand",
            "row": 9,
            "col": 3
        },
        {
            "type": "water_puddle",
            "row": 9,
            "col": 4
        },
        {
            "type": "water_puddle",
            "row": 9,
            "col": 6
        },
        {
            "type": "yellow_stand",
            "row": 9,
            "col": 7
        },
        {
            "type": "yellow_stand",
            "row": 10,
            "col": 3
        },
        {
            "type": "water_puddle",
            "row": 10,
            "col": 4
        },
        {
            "type": "water_puddle",
            "row": 10,
            "col": 5
        },
        {
            "type": "water_puddle",
            "row": 10,
            "col": 6
        },
        {
            "type": "yellow_stand",
            "row": 10,
            "col": 7
        },
        {
            "type": "yellow_stand",
            "row": 11,
            "col": 4
        },
        {
            "type": "yellow_stand",
            "row": 11,
            "col": 7
        }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 7,
            "col": 2,
            "sprite": "business_man.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 5,
            "sprite": "woman.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 11,
            "sprite": "characterx5.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 10,
            "col": 2,
            "sprite": "chad_recolour01.png",
            "direction": FACING_RIGHT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 10,
            "col": 9,
            "sprite": "chad_recolour03.png",
            "direction": FACING_UP
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 10,
            "col": 14,
            "sprite": "chad_recolour01.png",
            "direction": FACING_UP
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 10,
            "col": 23,
            "sprite": "characterx5_recolour.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 17,
            "sprite": "chad_recolour02.png",
            "direction": FACING_RIGHT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 21,
            "sprite": "chad_recolour03.png",
            "direction": FACING_LEFT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 12,
            "col": 6,
            "sprite": "chad_recolour02.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 12,
            "col": 11,
            "sprite": "chad.png",
            "direction": FACING_DOWN
        }
    ]
}