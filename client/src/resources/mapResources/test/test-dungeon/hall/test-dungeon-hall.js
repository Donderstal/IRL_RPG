const { NPC_ANIM_TYPE_IDLE } = require("../../../../../game-data/globals");
const { BUTLER_1, BUTLER_2 } = require("./interactions");

module.exports = {
    "mapName":"test/test-dungeon-hall",
    "tileSet":"Generic_Room_AX",
    "outdoors": false,
    "music": "game-jam-2.mp3",
    "neighbours":{},
    "rows":16,
    "columns":4,
    "grid":[11,24,24,11,15,28,28,15,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,36,36,9],
    "mapObjects":[
        { "type": "yellow_rug_a", "row": 3, "col": 1 },
        {"type":"plant_yo","row":6,"col":1},
        {"type":"plant_yo","row":6,"col":4},
        {"type":"plant_yo","row":10,"col":1},
        {"type":"plant_yo","row":10,"col":4},
        {"type":"plant_yo","row":14,"col":1},
        {"type":"plant_yo","row":14,"col":4}],
    "characters":[
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row":2,
            "col":1,
            "name": "Butler",
            "sprite":"business_man.png",
            "direction":"FACING_DOWN",
            "action": BUTLER_1
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row":2,
            "col":4,
            "name": "Butler",
            "sprite": "business_man.png",
            "direction":"FACING_DOWN",
            "action": BUTLER_2
        }
    ],
    "doors": [ 
        {

            "row": 2, 
            "col": 2,
            "from" : "test/test-dungeon-hall",
            "to"  : "test/test-dungeon-lobby",
            "directionIn": "FACING_UP",
            "directionOut": "FACING_DOWN",
        },
        {
            "row": 2, 
            "col": 3,
            "from" : "test/test-dungeon-hall",
            "to"  : "test/test-dungeon-lobby",
            "directionIn": "FACING_UP",
            "directionOut": "FACING_DOWN",
        },
        {
            "row": 16, 
            "col": 2,
            "from" : "test/test-dungeon-hall",
            "to"  : "test/test-dungeon-outside",
            "directionIn": "FACING_DOWN",
            "directionOut": "FACING_UP",
        },
        {
            "row": 16, 
            "col": 3,
            "from" : "test/test-dungeon-hall",
            "to"  : "test/test-dungeon-outside",
            "directionIn": "FACING_DOWN",
            "directionOut": "FACING_UP",
        }
    ],
}