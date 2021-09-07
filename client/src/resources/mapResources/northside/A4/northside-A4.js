const { FACING_DOWN, FACING_LEFT, FACING_RIGHT, NPC_ANIM_TYPE_IDLE, NPC_MOVE_TYPE_FLYING } = require("../../../../game-data/globals");
const { GRID } = require("./grid");

module.exports = {
    "mapName": "northside/A4",
    "tileSet": "downtown_2",
    "outdoors": true,
    "music": "game-jam.mp3",
    "neighbours": {
        "left": "northside/A3",
        "right": "northside/A5",
        "up": "northside/Z4"
    },
    "roads" : [
        { "alignment": "HORI", "topRow": 13, "bottomRow": 14, "direction": FACING_LEFT, "hasStart": true },
        { "alignment": "HORI", "topRow": 15, "bottomRow": 16, "direction": FACING_RIGHT, "hasStart": true }
      ],
    "randomDestinations" : [
    { "col": 0, "row": 9, "direction": FACING_RIGHT },
    { "col": 0, "row": 10, "direction": FACING_RIGHT },
    { "col": 0, "row": 11, "direction": FACING_RIGHT },
    { "col": 0, "row": 12, "direction": FACING_RIGHT },
    { "col": 15, "row": 0, "direction": FACING_DOWN },
    { "col": 16, "row": 0, "direction": FACING_DOWN },
    { "col": 25, "row": 9, "direction": FACING_LEFT },
    { "col": 25, "row": 10, "direction": FACING_LEFT },
    { "col": 25, "row": 11, "direction": FACING_LEFT },
    { "col": 25, "row": 12, "direction": FACING_LEFT }
    ],
    "rows": 16,
    "columns": 24,
    "grid": GRID,
    "mapObjects": [
        {
            "type": "Sign_02",
            "row": 3,
            "col": 15
        },
        {
            "type": "Sign_01",
            "row": 3,
            "col": 16
        },
        {
            "type": "Sign_04",
            "row": 5,
            "col": 1
        },
        {
            "type": "Sign_03",
            "row": 5,
            "col": 2
        },
        {
            "type": "Sign_04",
            "row": 5,
            "col": 3
        },
        {
            "type": "Sign_03",
            "row": 5,
            "col": 4
        },
        {
            "type": "Sign_04",
            "row": 5,
            "col": 5
        },
        {
            "type": "Sign_03",
            "row": 5,
            "col": 6
        },
        {
            "type": "bin_x",
            "row": 12,
            "col": 4
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 5
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 20
        }
    ],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "move_type": NPC_MOVE_TYPE_FLYING,
            "row": 6,
            "col": 7,
            "sprite": "pigeon.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "move_type": NPC_MOVE_TYPE_FLYING,
            "row": 6,
            "col": 8,
            "sprite": "pigeon.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "move_type": NPC_MOVE_TYPE_FLYING,
            "row": 6,
            "col": 9,
            "sprite": "pigeon.png",
            "direction": FACING_DOWN
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 8,
            "col": 16,
            "sprite": "robot.png",
            "direction": FACING_LEFT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 9,
            "sprite": "pony_tail_recolour.png",
            "direction": FACING_DOWN
        }
    ],
    "actions": [],
    "doors": []
}