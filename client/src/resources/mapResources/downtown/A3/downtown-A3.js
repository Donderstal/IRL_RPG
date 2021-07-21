const { NPC_ANIM_TYPE_MOVING_IN_LOOP, NPC_MOVE_TYPE_FLYING } = require('../../../../game-data/globals')
const { BUS_TO_FIRST_NEIGHBOURHOOD } = require('./interactions')

module.exports = {
    "mapName": "downtown/A3",
    "tileSet": "downtown",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
        { "alignment": "HORI", "topRow": 10, "bottomRow": 11, "direction": "FACING_LEFT" }
      ],
    "neighbours": {
        "left": "downtown/A2",
        "right": "downtown/A4"
    },
    "rows":12,
    "columns":24,
    "grid":[
        [113,114,113,114,113,114,139,185,186,187,212,213,215,215,215,213,215,215,214,215,243,152,153,154],
        [117,118,117,118,117,118,143,189,190,191,208,209,209,209,209,209,209,209,209,209,239,148,149,150],
        [121,122,121,122,121,122,143,145,88,211,212,213,214,215,214,215,215,215,214,215,243,156,157,157],
        [0,140,0,0,0,73,4,88,0,252,216,217,218,217,217,244,245,217,217,218,247,0,0,0],
        [0,0,24,0,0,0,0,0,0,256,220,221,221,221,221,248,249,221,221,221,251,0,0,24],
        [0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,0,0,0,12],
        [0,0,0,0,125,126,0,0,0,0,0,24,0,12,0,0,0,0,0,40,0,0,0,0],
        [0,12,0,102,28,28,31,28,28,28,28,28,28,28,28,103,0,0,25,0,0,25,23,0],
        [28,28,105,106,66,67,67,67,67,67,67,67,67,67,100,107,28,28,28,28,31,28,28,28],
        [347,38,347,347,347,36,347,347,347,347,347,347,54,347,37,347,347,347,347,347,347,347,347,347],
        [347,347,347,347,347,38,347,347,347,347,347,347,347,347,347,347,347,36,347,347,347,347,347,38],
        [39,347,39,347,39,347,39,347,39,347,39,347,39,36,39,347,39,347,39,347,39,347,39,36]
    ],
    "mapObjects" : [
        {
            "type"  : "Bus_Stop",
            "row"   : 8,
            "col"   : 20,
            "hasAction" : true,
            "action" : BUS_TO_FIRST_NEIGHBOURHOOD
        },
        { 
            "type"  : "Sign_01",
            "row"   : 2,
            "col"   : 10
        },
        { 
            "type"  : "Sign_02",
            "row"   : 2,
            "col"   : 8
        },
        { 
            "type"  : "Sign_03",
            "row"   : 2,
            "col"   : 15
        },
        { 
            "type"  : "Sign_04",
            "row"   : 2,
            "col"   : 17
        }
    ],
    "characters" : [
        {
            "anim_type": NPC_ANIM_TYPE_MOVING_IN_LOOP,
            "move_type": NPC_MOVE_TYPE_FLYING,
            "sprite": "pigeon.png",
            "direction": "FACING_DOWN", 
            "row": 6,
            "col": 8,
            "destination" : {
                "row": 2,
                "col": 13,
            },
        },
        {
            "anim_type": NPC_ANIM_TYPE_MOVING_IN_LOOP,
            "move_type": NPC_MOVE_TYPE_FLYING,
            "sprite": "pigeon.png",
            "direction": "FACING_DOWN",
            "row": 1,
            "col": 14,
            "destination" : {
                "row": 5,
                "col": 18,
            },
        }
    ]
}