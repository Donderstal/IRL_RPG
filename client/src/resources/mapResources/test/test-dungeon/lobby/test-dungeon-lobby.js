const { EVENT_HAS_FIRED } = require("../../../../../game-data/conditionGlobals");
const { NPC_ANIM_TYPE_IDLE, NPC_ANIM_TYPE_SEMI_IDLE, FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT } = require("../../../../../game-data/globals");
const { LOGGABLE_INTERACTION_4 } = require("../../../../../game-data/interactionGlobals");
const { BUTLER_1, BUTLER_2, JONA, REST, SHOP } = require("./interactions");

module.exports = {
    "mapName":"test/test-dungeon-lobby",
    "tileSet":"Generic_Room_BX",
    "outdoors": false,
    "music": "game-jam-2.mp3",
    "neighbours":{},
    "rows":12,
    "columns":18,
    "grid":[
        10,10,10,10,0,1,2,3,32,32,0,1,2,3,10,10,10,10,10,32,10,10,4,5,6,7,36,36,4,5,6,7,10,10,32,10,15,36,15,15,41,41,41,41,41,41,41,41,41,41,14,14,36,14,41,41,41,41,41,41,41,41,41,41,41,41,41,41,9,9,9,9,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,26,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,9,30,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,9,34,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,9,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,38,38,41,41,41,41,41,41,41,41],
    "mapObjects":[
        {"type":"house_plant","row":3,"col":4},
        {"type":"shop_cupboard_a","row":4,"col":5},
        {"type":"shop_cupboard_a","row":4,"col":7},
        {"type":"rug_g1","row":4,"col":9},
        {"type":"shop_cupboard_a","row":4,"col":11},
        {"type":"shop_cupboard_a","row":4,"col":13},
        {"type":"house_plant","row":3,"col":15},
        {"type":"pot_plant_a","row":8,"col":15},
        {"type":"house_plant","row":8,"col":16},
        {"type":"house_plant","row":8,"col":17},
        {"type":"house_plant","row":8,"col":18},
        {"type":"pot_plant_a","row":9,"col":15},
        {"type":"Fridge","row":9,"col":16},
        {"type":"Fridge","row":9,"col":18},
        {"type":"pot_plant_a","row":11,"col":15},
        {"type":"pot_plant_a","row":12,"col":15}],
    "characters":[
        {"anim_type": NPC_ANIM_TYPE_IDLE,"row":5,"col":8,"name": "Butler","sprite":"business_man.png","direction":FACING_DOWN, "action": BUTLER_1},
        {"anim_type": NPC_ANIM_TYPE_IDLE,"row":5,"col":11,"name": "Butler","sprite":"business_man.png","direction":FACING_DOWN, "action": BUTLER_2},
        {"anim_type": NPC_ANIM_TYPE_SEMI_IDLE,"row":7,"col":6,"name": "Jona","sprite":"chad_recolour01.png","direction":FACING_DOWN, "action": JONA},
        {
            "name": "Sweet granny",
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row":9,"col":17,
            "sprite":"characterx3.png","direction":FACING_DOWN,
            "action": REST
        },
        {
            "name": "Consoombot",
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row":12,"col":17,
            "sprite":"robot.png","direction":FACING_UP,
            "action": SHOP
        }
    ],
    "actions":[],
    "doors":[
        {
            "row": 12, 
            "col": 9,
            "destination"  : "test/newMapFormat",
            "direction": FACING_DOWN,
        },
        {
            "row": 12, 
            "col": 10,
            "destination"  : "test/newMapFormat",
            "direction": FACING_DOWN,
        },
        {
            "row": 9, 
            "col": 1,
            "destination"  : "test/hall-west",
            "direction": FACING_LEFT,
        },
        {
            "condition" : {
              "type": EVENT_HAS_FIRED,
              "value": LOGGABLE_INTERACTION_4
            },
            "row": 3, 
            "col": 2,
            "destination"  : "test/hall-northwest",
            "direction": FACING_UP,
          },
    ]
}