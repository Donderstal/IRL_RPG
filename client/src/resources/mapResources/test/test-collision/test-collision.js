const { 
    FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT, NPC_ANIM_TYPE_SEMI_IDLE, NPC_ANIM_TYPE_MOVING_IN_LOOP, NPC_ANIM_TYPE_IDLE
} = require('../../../../game-data/globals');
const { 
  CONDITION_TEST_1_ITEM
} = require("./interactions");
module.exports = { 
    "mapName": "test/test-collision",
    "tileSet": "downtown",
    "outdoors": false,
    "music": "game-jam-2.mp3",
    "rows":16,
    "columns":24,
    "playerStart":{ 
        "row": 8,
        "col": 12
    },
    "roads" : [
      { "alignment": "HORI", "topRow": 13, "bottomRow": 14, "startCol": 1, "endCol": 21, "direction": FACING_RIGHT, "hasStart": true  },
      { "alignment": "HORI", "topRow": 3, "bottomRow": 4, "direction": FACING_LEFT, "hasStart": true  },

      { "alignment": "VERT", "leftCol": 4, "rightCol": 5, "direction": FACING_DOWN, "hasStart": true  },
      { "alignment": "VERT", "leftCol": 20, "rightCol": 21, "startRow": 16, "endRow": 3, "direction": FACING_UP, "hasStart": true  },
  ],
    "grid": [
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
        [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
        [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
        [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39],
        [39,39,39,16,16,39,39,39,39,39,39,39,39,39,39,39,39,39,39,16,16,39,39,39]
    ],
    "characters" : [
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 6,
          "col": 10,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 7,
          "col": 10,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 8,
          "col": 10,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 9,
          "col": 10,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 10,
          "col": 10,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 11,
          "col": 10,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 6,
          "col": 11,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 7,
          "col": 11,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 8,
          "col": 11,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 9,
          "col": 11,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 10,
          "col": 11,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 11,
          "col": 11,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 6,
          "col": 12,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 7,
          "col": 12,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 9,
          "col": 12,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 10,
          "col": 12,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 11,
          "col": 12,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 6,
          "col": 13,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 7,
          "col": 13,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 8,
          "col": 13,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 9,
          "col": 13,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 10,
          "col": 13,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 11,
          "col": 13,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 6,
          "col": 14,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 7,
          "col": 14,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 8,
          "col": 14,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 9,
          "col": 14,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 10,
          "col": 14,
          "name": "Bro"
        },
        {
          "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
          "sprite": "pony_tail.png",
          "direction": FACING_DOWN,
          "row": 11,
          "col": 14,
          "name": "Bro"
        }
    ],
    "mapObjects" : [
        {
          "type"  : "Couch_Blue",
          "row"   : 9,
          "col"   : 6
        },
        {
          "type"  : "Bench_Green",
          "row"   : 10,
          "col"   : 18
        },
        {
          "type"  : "Rug_01",
          "row"   : 4,
          "col"   : 8
        },
        {
          "type"  : "bar_sign",
          "row"   : 3,
          "col"   : 3
        },
        {
          "type"  : "hotel_sign",
          "row"   : 6,
          "col"   : 10
        },
    ]
}