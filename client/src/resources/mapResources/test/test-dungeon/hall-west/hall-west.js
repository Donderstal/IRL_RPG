const { NPC_ANIM_TYPE_IDLE, FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT } = require("../../../../../game-data/globals");
const { 
    BUTLER_IN_TRAINING, SECUREBOT, LADY_LEFT, NECKBEARD_RIGHT, SECUREBOT_LEFT,
    COMPUTER_1_ACTION, COMPUTER_2_ACTION, COMPUTER_3_ACTION
 } = require("./interactions")

module.exports = {
    "mapName":"test/hall-west",
    "tileSet":"Generic_Room_AX",
    "music": "game-jam-2.mp3",
    "outdoors": false,
    "neighbours":{},
    "rows":5,"columns":20,
    "grid":[11,24,11,11,11,11,11,11,11,11,24,11,11,11,24,11,11,11,11,11,15,28,15,15,15,15,15,15,15,15,28,15,15,15,28,15,15,15,15,15,43,43,42,37,37,43,42,42,43,37,43,43,38,43,43,42,43,43,43,26,37,35,43,43,35,43,43,43,43,43,43,43,35,43,35,42,43,37,43,30,43,43,42,42,43,35,43,37,43,43,38,43,42,43,38,43,43,43,43,34],
    "mapObjects":[{"type":"yellow_stand","row":2,"col":12},{"type":"yellow_stand","row":2,"col":14},{"type":"rug_boo","row":4,"col":6},{"type":"blue_couch_right","row":5,"col":1}],
    "characters":[
        {
            "name": "Securebot Mk II",
            "anim_type":NPC_ANIM_TYPE_IDLE,
            "row":2,"col":2,
            "sprite":"robot.png","direction":FACING_DOWN,
            "action": SECUREBOT
        },
        {
            "name": "Newbie butler",
            "anim_type":NPC_ANIM_TYPE_IDLE,
            "row":2,"col":13,
            "sprite":"manager.png","direction":FACING_DOWN,
            "action": BUTLER_IN_TRAINING
        }
    ],
    "actions":[],
    "doors":[
        {
            "row": 4, 
            "col": 20,
            "from" : "test/hall-west",
            "to"  : "test/test-dungeon-lobby",
            "directionIn": FACING_RIGHT,
            "directionOut": FACING_LEFT
        },
        {
            "row": 2, 
            "col": 2,
            "from" : "test/hall-west",
            "to"  : "test/hall-northwest",
            "directionIn": FACING_UP,
            "directionOut": FACING_DOWN
        },
        {
            "row": 2, 
            "col": 11,
            "from" : "test/hall-west",
            "to"  : "test/hall-west/room-left",
            "directionIn": FACING_UP,
            "directionOut": FACING_DOWN
        },
        {
            "row": 2, 
            "col": 15,
            "from" : "test/hall-west",
            "to"  : "test/hall-west/room-right",
            "directionIn": FACING_UP,
            "directionOut": FACING_DOWN
        }
    ],
    "subMaps": {
        "room-left" : {
            "mapName":"test/hall-west/room-left",
            "tileSet":"Generic_Room_BX",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "neighbours":{},
            "rows":8,
            "columns":4,
            "grid":[16,17,18,19,20,21,22,23,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,38,42],
            "mapObjects":[{"type":"chair_red_cushion","row":2,"col":1},{"type":"blue_double_bed","row":3,"col":3},{"type":"Rug_01","row":5,"col":2}],
            "characters":[
                {"anim_type":NPC_ANIM_TYPE_IDLE,"name":"Secure Bob","row":3,"col":1,"sprite":"robot.png","direction":FACING_DOWN, "action": SECUREBOT_LEFT},
                {"anim_type":NPC_ANIM_TYPE_IDLE,"name":"Annie","row":4,"col":4,"sprite":"tumbler_girl_recolour01.png","direction":FACING_DOWN, "action": LADY_LEFT}
            ],
            "actions":[],
            "doors":[
                {
                    "row": 8, 
                    "col": 3,
                    "from" : "test/hall-west/room-left",
                    "to"  : "test/hall-west",
                    "directionIn": FACING_DOWN,
                    "directionOut": FACING_UP
                }
            ]
        },
        "room-right" : {
            "mapName":"test/hall-west/room-right",
            "tileSet":"Generic_Room_BX",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "neighbours":{},
            "rows":8,
            "columns":4,
            "grid":[16,17,18,19,20,21,22,23,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,38,42,42],
            "mapObjects":[{"type":"bin_hop","row":3,"col":1},{"type":"computer_table","row":3,"col":2},{"type":"computer_table","row":3,"col":3},{"type":"computer_table","row":3,"col":4}],
            "characters":[{"anim_type":NPC_ANIM_TYPE_IDLE,"name":"Furious jerker","row":4,"col":3,"sprite":"neckbeard.png","direction":FACING_UP, "action": NECKBEARD_RIGHT }],
            "actions":[ COMPUTER_1_ACTION, COMPUTER_2_ACTION, COMPUTER_3_ACTION ],
            "doors":[
                {
                    "row": 8, 
                    "col": 2,
                    "from" : "test/hall-west/room-right",
                    "to"  : "test/hall-west",
                    "directionIn": FACING_DOWN,
                    "directionOut": FACING_UP
                }
            ]
        }
    }
}