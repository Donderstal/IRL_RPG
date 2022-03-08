const globals = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/D3","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean","characters":[],"mapObjects":[{"type":"tires_1","row":4,"col":8},{"type":"car_b","row":4,"col":9,"direction":globals.FACING_DOWN},{"type":"door_4","row":8,"col":4,"hasDoor":true,"directionIn":"","destination":""},{"type":"funz","row":8,"col":5},{"type":"wheelie_bin_right","row":8,"col":7},{"type":"bench_a","row":11,"col":8}],"spawnPoints":[],    "roads": [
    {
        "direction": globals.FACING_UP,
        "alignment": "VERT",
        "hasStart": false,
        "leftCol": 13,
        "rightCol": 14,
        "startRow": 15,
        "endRow": 1
    },
    {
        "direction": globals.FACING_DOWN,
        "alignment": "VERT",
        "hasStart": true,
        "leftCol": 11,
        "rightCol": 12,
        "startRow": 1,
        "endRow": 13
    },
    //
    {
        "direction": globals.FACING_RIGHT,
        "alignment": "HORI",
        "hasStart": false,
        "topRow": 14,
        "bottomRow": 15,
        "startCol": 9,
        "endCol": 14
    },
    {
        "direction": globals.FACING_LEFT,
        "alignment": "HORI",
        "hasStart": false,
        "topRow": 12,
        "bottomRow": 13,
        "startCol": 12,
        "endCol": 7
    },
    //
    {
        "direction": globals.FACING_DOWN,
        "alignment": "VERT",
        "hasStart": false,
        "leftCol": 7,
        "rightCol": 8,
        "startRow": 12,
        "endRow": 16
    },
    {
        "direction": globals.FACING_UP,
        "alignment": "VERT",
        "hasStart": true,
        "leftCol": 9,
        "rightCol": 10,
        "startRow": 16,
        "endRow": 14
    },
    //
    {
        "direction": globals.FACING_RIGHT,
        "alignment": "HORI",
        "hasStart": false,
        "topRow": 10,
        "bottomRow": 11,
        "startCol": 11,
        "endCol": 24
    },
    {
        "direction": globals.FACING_LEFT,
        "alignment": "HORI",
        "hasStart": true,
        "topRow": 8,
        "bottomRow": 9,
        "startCol": 24,
        "endCol": 11
    }
],"actions":[]}