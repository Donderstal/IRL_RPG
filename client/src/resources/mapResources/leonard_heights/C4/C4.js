const globals = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/C4","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean",
"characters":[
    {"anim_type":globals.NPC_ANIM_TYPE_IDLE,"row":3,"col":12,"sprite":"pigeon.png","direction":globals.FACING_LEFT},
    {
        "anim_type": globals.NPC_ANIM_TYPE_IDLE,
        "row": 8,
        "col": 19,
        "sprite": "fats.png",
        "direction": globals.FACING_DOWN,
        "name": "Bob A"
    },
    {
        "anim_type": globals.NPC_ANIM_TYPE_IDLE,
        "row": 8,
        "col": 20,
        "sprite": "fats.png",
        "direction": globals.FACING_DOWN,
        "name": "Bob B"
    }
]
,"mapObjects":[{"type":"vent_1","row":1,"col":2},{"type":"vent_1","row":1,"col":4},{"type":"vent_1","row":1,"col":11},{"type":"bench_a","row":2,"col":1},{"type":"bench_a","row":2,"col":4},{"type":"bench_a","row":2,"col":10},{"type":"trash_2","row":4,"col":5},{"type":"trash_4","row":4,"col":10},{"type":"bench_a","row":4,"col":11},{"type":"yum_mart_sign","row":6,"col":13},{"type":"yum_mart_sign","row":6,"col":21},{"type":"gang_z","row":7,"col":1},{"type":"tree_plus_base","row":7,"col":5},{"type":"tree_plus_base","row":7,"col":9},{"type":"tree_plus_base","row":7,"col":11},{"type":"Sign_03","row":7,"col":13},{"type":"funz","row":7,"col":16},{"type":"no_entry_sign","row":9,"col":1},{"type":"boxes","row":11,"col":11},{"type":"car_a","row":12,"col":7,"direction":globals.FACING_DOWN},{"type":"car_b","row":12,"col":13,"direction":globals.FACING_DOWN},{"type":"car_b","row":12,"col":15,"direction":globals.FACING_UP},{"type":"car_c","row":12,"col":17,"direction":globals.FACING_UP},{"type":"car_d","row":12,"col":23,"direction":globals.FACING_UP}],    "spawnPoints": [
    {
        "col": 9,
        "row": globals.OUT_UP,
        "direction": globals.FACING_LEFT
    },
    {
        "col": globals.OUT_LEFT,
        "row": 10,
        "direction": globals.FACING_RIGHT
    }
],
"roads": [
    {
        "direction": globals.FACING_RIGHT,
        "alignment": "HORI",
        "hasStart": true,
        "topRow": 15,
        "bottomRow": 16,
        "startCol": 1,
        "endCol": 24
    },
    {
        "direction": globals.FACING_LEFT,
        "alignment": "HORI",
        "hasStart": true,
        "topRow": 13,
        "bottomRow": 14,
        "startCol": 24,
        "endCol": 1
    }
],"actions":[]}