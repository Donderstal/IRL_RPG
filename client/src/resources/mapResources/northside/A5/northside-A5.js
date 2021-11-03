const { NPC_ANIM_TYPE_IDLE, FACING_LEFT, FACING_RIGHT, FACING_DOWN, NPC_MOVE_TYPE_FLYING, OUT_LEFT, OUT_RIGHT } = require("../../../../game-data/globals");
const { GRID } = require("./grid");

module.exports = {
    "mapName": "northside/E2",
    "tileSet": "downtown_2",
    "outdoors": true,
    "roads" : [
        { "alignment": "HORI", "topRow": 13, "bottomRow": 14, "direction": FACING_LEFT, "hasStart": true },
        { "alignment": "HORI", "topRow": 15, "bottomRow": 16, "direction": FACING_RIGHT, "hasStart": true }
      ],
    "rows": 16,
    "columns": 24,
    "grid": GRID,
    "spawnPoints" : [
        { "col": OUT_LEFT, "row": 4, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 5, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 6, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 7, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 8, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 9, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 10, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 11, "direction": FACING_RIGHT },
        { "col": OUT_LEFT, "row": 12, "direction": FACING_RIGHT },
        { "col": 16, "row": 3, "direction": FACING_DOWN },
        { "col": 23, "row": 3, "direction": FACING_DOWN },
        { "col": 24, "row": 3, "direction": FACING_DOWN },
        { "col": OUT_RIGHT, "row": 9, "direction": FACING_LEFT },
        { "col": OUT_RIGHT, "row": 10, "direction": FACING_LEFT },
        { "col": OUT_RIGHT, "row": 11, "direction": FACING_LEFT },
        { "col": OUT_RIGHT, "row": 12, "direction": FACING_LEFT }
      ],
    "mapObjects": [
        {
            "type": "Sign_03",
            "row": 4,
            "col": 12
        },
        {
            "type": "Sign_03",
            "row": 4,
            "col": 13
        },
        {
            "type": "Sign_02",
            "row": 4,
            "col": 15
        },
        {
            "type": "water_puddle",
            "row": 7,
            "col": 10
        },
        {
            "type": "yellow_stand",
            "row": 8,
            "col": 9
        },
        {
            "type": "Fire_Hydrant",
            "row": 11,
            "col": 4
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 7
        },
        {
            "type": "Bollard",
            "row": 12,
            "col": 8
        },
        {
            "type": "Bollard",
            "row": 12,
            "col": 13
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 17
        },
        {
            "type": "Bollard",
            "row": 12,
            "col": 18
        }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 3,
            "col": 10,
            "sprite": "chad.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 5,
            "col": 17,
            "sprite": "robot.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 4,
            "sprite": "tumblr_girl.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "move_type": NPC_MOVE_TYPE_FLYING,
            "row": 9,
            "col": 23,
            "sprite": "pigeon.png",
            "direction": FACING_DOWN
        }
    ],
    "actions": [],
    "doors": []
}