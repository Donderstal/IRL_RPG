const { MONKEY, GRUMPY_MAN } = require("./interactions");
const { NPC_ANIM_TYPE_IDLE, FACING_DOWN, FACING_UP, FACING_RIGHT } = require("../../../../../game-data/globals");

module.exports = {
    "mapName":"test/hall-northwest",
    "tileSet":"Generic_Room_AX",
    "outdoors": false,
    "music": "game-jam-2.mp3",
    "neighbours":{},
    "rows":14,
    "columns":20,
    "grid":["E","E","E","E",11,11,24,11,11,11,11,11,11,11,24,11,11,11,11,11,"E","E","E","E",15,15,28,15,15,15,15,15,15,15,28,15,15,15,15,15,11,0,3,11,43,43,43,43,43,43,43,43,43,43,43,43,43,43,42,42,15,4,7,15,43,43,43,43,43,43,43,43,43,43,43,43,43,43,42,42,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,42,42,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,42,42,43,43,43,43,"E","E","E","E","E","E","E","E","E","E",43,43,43,43,42,42,43,43,43,43,"E","E","E","E","E","E","E","E","E","E",43,43,43,43,42,42,43,43,43,43,"E","E","E","E","E","E","E","E","E","E",43,43,43,43,42,42,43,43,43,43,"E","E","E","E","E","E","E","E","E","E",43,43,43,43,42,42,43,43,43,43,"E","E","E","E","E","E","E","E","E","E",43,43,43,43,42,42,43,43,43,43,"E","E","E","E","E","E","E","E","E","E",43,43,43,43,42,42,43,43,43,43,"E","E","E","E","E","E","E","E","E","E",43,43,43,43,42,42,40,36,40,40,"E","E","E","E","E","E","E","E","E","E",43,43,36,43,42,42],
    "mapObjects":[
        {"type":"shop_shelves_a","row":2,"col":9},
        {"type":"shop_shelves_a","row":2,"col":11},
        {"type":"shop_shelves_a","row":2,"col":13},
        {"type":"rug_g2","row":4,"col":7},
        {"type":"rug_g2","row":4,"col":15},
        {"type":"couch_nice_left","row":4,"col":20},
        {"type":"couch_nice_left","row":6,"col":20},
        {"type":"phone_table","row":7,"col":15},
        {"type":"house_plant","row":7,"col":20},
        {"type":"office_chair","row":8,"col":15},
        {"type":"pot_plant_a","row":14,"col":1},
        {"type":"pot_plant_a","row":14,"col":4}],
    "characters":[
        {
            "anim_type":NPC_ANIM_TYPE_IDLE,"row":2,"col":8,"sprite":"new_girl_recolour.png","direction":FACING_DOWN
        },
        {
            "anim_type":NPC_ANIM_TYPE_IDLE,"row":2,"col":18,"sprite":"generic_balding_guy.png","direction":FACING_DOWN
            , "action": GRUMPY_MAN
        },
        {
            "anim_type":NPC_ANIM_TYPE_IDLE,
            "row":4,"col":2,
            "sprite":"monkey_ceo.png","direction":FACING_RIGHT,
            "action": MONKEY
        },
        {
            "anim_type":NPC_ANIM_TYPE_IDLE,"row":14,"col":17,"sprite":"fats.png","direction":FACING_UP
        }
    ],
    "actions":[],
    "doors":[
        {
            "row": 14, 
            "col": 2,
            "destination"  : "test/hall-west",
            "directionIn": FACING_DOWN,
            "directionOut": FACING_UP
        },
        {
            "row": 14, 
            "col": 17,
            "destination"  : "test/test-dungeon-lobby",
            "directionIn": FACING_DOWN,
            "directionOut": FACING_UP
        }
    ]
}

// c 7 r 2, c15 r2