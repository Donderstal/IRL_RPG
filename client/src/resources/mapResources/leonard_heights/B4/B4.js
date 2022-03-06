const globals = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/B4","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean","characters":[],"mapObjects":[{"type":"vent_4","row":1,"col":11},{"type":"vent_4","row":2,"col":17},{"type":"vent_4","row":3,"col":11},{"type":"vent_4","row":5,"col":11},{"type":"vent_3","row":5,"col":22},{"type":"bar_sign","row":6,"col":7},{"type":"gang_z","row":6,"col":18},{"type":"Sign_03","row":7,"col":16},{"type":"funz","row":7,"col":17},{"type":"car_a","row":12,"col":3,"direction":globals.FACING_LEFT}],"spawnPoints": [ 
    {
        "col": 24,
        "row": globals.OUT_UP,
        "direction": globals.FACING_DOWN
    },
    {
        "col": 13,
        "row": 8,
        "direction": globals.FACING_DOWN
    },
    {
        "col": 18,
        "row": 8,
        "direction": globals.FACING_DOWN
    },
    {
        "col": globals.OUT_RIGHT,
        "row": 9,
        "direction": globals.FACING_LEFT
    },
    {
        "col": globals.OUT_LEFT,
        "row": 10,
        "direction": globals.FACING_RIGHT
    }
],    "roads": [
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