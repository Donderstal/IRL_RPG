const { NPC_ANIM_TYPE_IDLE, NPC_ANIM_TYPE_MOVING, FACING_DOWN, FACING_DOWN_FLYING, FACING_RIGHT, FACING_UP } = require("../../../../game-data/globals");
const { GRID } = require("./grid");

module.exports = {
    "mapName": "northside-Z4",
    "tileSet": "downtown_2",
    "outdoors": true,
    "music": "game-jam.mp3",
    "neighbours": {
        "down": "northside/A4"
    },
    "rows": 16,
    "columns": 24,
    "grid": GRID,
    "randomDestinations" : [],
    "mapObjects": [
        {
            "type": "Sign_02",
            "row": 4,
            "col": 14
        },
        {
            "type": "bar_sign",
            "row": 4,
            "col": 17
        },
        {
            "type": "pot_plant_a",
            "row": 6,
            "col": 17
        },
        {
            "type": "shop_cupboard_a",
            "row": 6,
            "col": 18
        },
        {
            "type": "shop_shelves_a",
            "row": 6,
            "col": 21
        },
        {
            "type": "Sign_04",
            "row": 8,
            "col": 1
        },
        {
            "type": "Sign_04",
            "row": 8,
            "col": 6
        },
        {
            "type": "Lamppost_1",
            "row": 8,
            "col": 7
        },
        {
            "type": "bin_a",
            "row": 8,
            "col": 9
        },
        {
            "type": "Bench_Green",
            "row": 10,
            "col": 19
        },
        {
            "type": "Bench_Green",
            "row": 10,
            "col": 22
        },
        {
            "type": "bolard_x",
            "row": 11,
            "col": 1
        },
        {
            "type": "bolard_x",
            "row": 12,
            "col": 1
        },
        {
            "type": "Lamppost_1",
            "row": 12,
            "col": 12
        },
        {
            "type": "bolard_x",
            "row": 13,
            "col": 1
        },
        {
            "type": "pot_plant_a",
            "row": 13,
            "col": 21
        },
        {
            "type": "pot_plant_a",
            "row": 13,
            "col": 22
        },
        {
            "type": "bolard_x",
            "row": 14,
            "col": 1
        },
        {
            "type": "pot_plant_a",
            "row": 14,
            "col": 21
        },
        {
            "type": "bolard_x",
            "row": 15,
            "col": 1
        }
    ],
    "characters": [
        {
            'anim_type': NPC_ANIM_TYPE_MOVING,
            "row": 6,
            "col": 3,
            "sprite": "pigeon.png",
            "direction": FACING_DOWN
        },
        {
            'anim_type': NPC_ANIM_TYPE_MOVING,
            "row": 6,
            "col": 4,
            "sprite": "pigeon.png",
            "direction": FACING_DOWN
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 6,
            "col": 20,
            "sprite": "manager.png",
            "direction": FACING_DOWN
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 8,
            "col": 13,
            "sprite": "pony_tail_recolour.png",
            "direction": FACING_RIGHT
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 9,
            "col": 19,
            "sprite": "woman.png",
            "direction": FACING_UP
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 22,
            "sprite": "characterx3.png",
            "direction": FACING_DOWN
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 23,
            "sprite": "pigeon.png",
            "direction": FACING_UP
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 3,
            "sprite": "robot.png",
            "direction": FACING_DOWN
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 11,
            "col": 4,
            "sprite": "robot.png",
            "direction": FACING_DOWN
        },
        {
            'anim_type': NPC_ANIM_TYPE_IDLE,
            "row": 13,
            "col": 12,
            "sprite": "chad_recolour02.png",
            "direction": FACING_DOWN
        }
    ],
    "actions": [],
    "doors": []
}