const globals = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
const { FRIENDLY_CHAD, WHOLESOME_LIFTER } = require('./D1-interactions');
const { LOGGABLE_INTERACTION_7 } = require('../../../../game-data/interactionGlobals');
const { EVENT_HAS_NOT_FIRED, EVENT_HAS_FIRED } = require('../../../../game-data/conditionGlobals');

module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/D1","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean","characters":[
    {
        "anim_type": globals.NPC_ANIM_TYPE_IDLE,
        "row": 5,
        "col": 21,
        "sprite": "chad_recolour01.png",
        "direction": globals.FACING_RIGHT,
        "name": "Helpful Bro",
        "action" : FRIENDLY_CHAD,
        "condition": [ EVENT_HAS_NOT_FIRED, LOGGABLE_INTERACTION_7 ]
    },
    {
        "anim_type": globals.NPC_ANIM_TYPE_ANIMATION_LOOP,
        "anim_name": "BOP_UP",
        "row": 5,
        "col": 22,
        "sprite": "chad.png",
        "direction": globals.FACING_UP,
        "name": "Sad Bro",
        "condition": [ EVENT_HAS_NOT_FIRED, LOGGABLE_INTERACTION_7 ]
    },
    {
        "anim_type": globals.NPC_ANIM_TYPE_ANIMATION_LOOP,
        "anim_name": "LIFT",
        "row": 5,
        "col": 21,
        "sprite": "chad_recolour01.png",
        "direction": globals.FACING_LEFT,
        "name": "Wholesome Lifter",
        "action" : WHOLESOME_LIFTER,
        "condition": [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_7 ]
    },
    {
        "anim_type": globals.NPC_ANIM_TYPE_ANIMATION_LOOP,
        "anim_name": "LIFT",
        "row": 5,
        "col": 22,
        "sprite": "chad.png",
        "direction": globals.FACING_LEFT,
        "name": "Wholesome Lifter",
        "action" : WHOLESOME_LIFTER,
        "condition": [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_7 ]
    },
],"mapObjects":[{"type":"funz","row":1,"col":6},{"type":"gate_stuk8","row":4,"col":6},{"type":"gate_stuk1","row":4,"col":7},{"type":"gate_stuk1","row":4,"col":8},{"type":"gate_stuk1","row":4,"col":9},{"type":"gate_stuk1","row":4,"col":10},{"type":"gate_stuk1","row":4,"col":11},{"type":"gate_stuk1","row":4,"col":12},{"type":"gate_stuk1","row":4,"col":13},{"type":"gate_stuk1","row":4,"col":14},{"type":"gate_stuk1","row":4,"col":15},{"type":"gate_stuk1","row":4,"col":16},{"type":"gate_stuk1","row":4,"col":17},{"type":"gate_stuk1","row":4,"col":18},{"type":"gate_stuk1","row":4,"col":19},{"type":"gate_stuk1","row":4,"col":20},{"type":"gate_stuk1","row":4,"col":21},{"type":"gate_stuk1","row":4,"col":22},{"type":"gate_stuk4","row":5,"col":6},{"type":"gang_z","row":5,"col":24},{"type":"gate_stuk4","row":6,"col":6},{"type":"gate_stuk6","row":6,"col":9},{"type":"trash_3","row":6,"col":11},{"type":"gate_stuk12","row":6,"col":16},{"type":"gate_stuk4","row":7,"col":6},{"type":"plants","row":7,"col":7},{"type":"gate_stuk4","row":7,"col":9},{"type":"bench_a","row":7,"col":10},{"type":"bench_a","row":7,"col":14},{"type":"gate_stuk10","row":7,"col":16},{"type":"plants","row":7,"col":18},{"type":"gate_stuk4","row":8,"col":6},{"type":"gate_stuk3","row":8,"col":9},{"type":"gate_stuk1","row":8,"col":10},{"type":"gate_stuk1","row":8,"col":11},{"type":"gate_stuk1","row":8,"col":12},{"type":"gate_stuk1","row":8,"col":13},{"type":"gate_stuk1","row":8,"col":14},{"type":"gate_stuk1","row":8,"col":15},{"type":"gate_stuk9","row":8,"col":16},{"type":"gate_stuk4","row":9,"col":6},{"type":"vent_3","row":10,"col":4},{"type":"gate_stuk4","row":10,"col":6},{"type":"plants","row":10,"col":7},{"type":"gate_stuk6","row":10,"col":10},{"type":"gate_stuk12","row":10,"col":15},{"type":"plants","row":10,"col":18},{"type":"office_chair","row":10,"col":21},{"type":"gate_stuk4","row":11,"col":6},{"type":"gate_stuk3","row":11,"col":10},{"type":"gate_stuk1","row":11,"col":11},{"type":"gate_stuk14","row":11,"col":12},{"type":"gate_stuk8","row":11,"col":13},{"type":"gate_stuk1","row":11,"col":14},{"type":"gate_stuk9","row":11,"col":15},{"type":"gate_stuk3","row":12,"col":6},{"type":"gate_stuk1","row":12,"col":7},{"type":"gate_stuk1","row":12,"col":8},{"type":"gate_stuk1","row":12,"col":9},{"type":"gate_stuk1","row":12,"col":10},{"type":"gate_stuk1","row":12,"col":11},{"type":"gate_stuk9","row":12,"col":12},{"type":"gate_stuk3","row":12,"col":13},{"type":"gate_stuk1","row":12,"col":14},{"type":"gate_stuk1","row":12,"col":15},{"type":"gate_stuk1","row":12,"col":16},{"type":"gate_stuk1","row":12,"col":17},{"type":"gate_stuk1","row":12,"col":18},{"type":"gate_stuk1","row":12,"col":19},{"type":"gate_stuk1","row":12,"col":20},{"type":"gate_stuk1","row":12,"col":21},{"type":"gate_stuk1","row":12,"col":22}],"spawnPoints":[],"roads":[],"actions":[]}