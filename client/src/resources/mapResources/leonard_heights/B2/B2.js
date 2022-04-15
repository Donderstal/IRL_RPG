const { FACING_UP } = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/B2","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean","characters":[],"mapObjects":[{"type":"gang_z","row":5,"col":3},{"type":"yum_mart_sign","row":6,"col":3},{"type":"funz","row":7,"col":20}],"spawnPoints":[],
"roads":[
    {
        "name": "CIN_ROAD_1",
        "direction": FACING_UP,
        "alignment": "VERT",
        "hasStart": true,
        "leftCol": 13,
        "rightCol": 14,
        "startRow": 16,
        "endRow": 1
    }
],"actions":[]}