const globals = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/C2","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean","characters":[{"anim_type":globals.NPC_ANIM_TYPE_IDLE,"row":14,"col":9,"sprite":"pigeon.png","direction":globals.FACING_LEFT}],"mapObjects":[{"type":"vent_1","row":1,"col":7},{"type":"vent_4","row":1,"col":14},{"type":"vent_3","row":2,"col":2},{"type":"vent_1","row":2,"col":18},{"type":"vent_1","row":3,"col":7},{"type":"vent_4","row":3,"col":14},{"type":"hotel_sign","row":3,"col":16},{"type":"vent_3","row":4,"col":2},{"type":"vent_1","row":4,"col":18},{"type":"vent_1","row":5,"col":7},{"type":"vent_4","row":5,"col":14},{"type":"vent_3","row":6,"col":2},{"type":"vent_1","row":6,"col":18},{"type":"car_b","row":7,"col":8,"direction":globals.FACING_UP},{"type":"vent_4","row":7,"col":14},{"type":"Sign_03","row":7,"col":19},{"type":"gang_z","row":7,"col":21},{"type":"water_puddle","row":8,"col":8},{"type":"funz","row":8,"col":11},{"type":"gate_right","row":8,"col":15},{"type":"gate_left","row":8,"col":16},{"type":"office_chair","row":11,"col":6},{"type":"banana","row":16,"col":1}],"spawnPoints": [
    {
        "col": globals.OUT_LEFT,
        "row": 9,
        "direction": globals.FACING_RIGHT
    },
    {
        "col": globals.OUT_LEFT,
        "row": 11,
        "direction": globals.FACING_RIGHT
    },
    {
        "col": globals.OUT_RIGHT,
        "row": 9,
        "direction": globals.FACING_LEFT
    },
    {
        "col": globals.OUT_RIGHT,
        "row": 11,
        "direction": globals.FACING_LEFT
    },
],"roads": [
    {
        "direction": globals.FACING_RIGHT,
        "alignment": "HORI",
        "hasStart": true,
        "topRow": 14,
        "bottomRow": 15,
        "startCol": 1,
        "endCol": 24
    },
    {
        "direction": globals.FACING_LEFT,
        "alignment": "HORI",
        "hasStart": true,
        "topRow": 12,
        "bottomRow": 13,
        "startCol": 24,
        "endCol": 1
    }
],"actions":[],
"doors": [
    {
        "row": 8, 
        "col": 12,
        "destination"  : "leonard_heights/Newtown-Hall",
        "direction": globals.FACING_UP,
    },
    {
        "row": 8, 
        "col": 13,
        "destination"  : "leonard_heights/Newtown-Hall",
        "direction": globals.FACING_UP,
    }
]}