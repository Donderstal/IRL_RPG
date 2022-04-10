const globals = require('../../../../game-data/globals');
const { FACING_UP } = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/B1","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean","characters":[],"mapObjects":[{"type":"vent_3","row":2,"col":3},{"type":"vent_1","row":2,"col":5},{"type":"Poster_Cruise","row":2,"col":9},{"type":"Poster_Cola","row":2,"col":13},{"type":"Poster_Gronk","row":2,"col":17},{"type":"gang_z","row":2,"col":19},{"type":"Poster_Cruise","row":2,"col":21},{"type":"door_4","row":4,"col":5,"hasDoor":true,"directionIn":"","destination":""},{"type":"car_b","row":4,"col":7,"direction":globals.FACING_LEFT},{"type":"car_d","row":5,"col":15,"direction":globals.FACING_DOWN},{"type":"car_b","row":5,"col":19,"direction":globals.FACING_DOWN},{"type":"car_a","row":5,"col":21,"direction":globals.FACING_UP},{"type":"tires_2","row":9,"col":8},{"type":"bus","row":12,"col":17,"direction":globals.FACING_DOWN},{"type":"tires_1","row":12,"col":20}],"spawnPoints":[],
"roads":[
    {
        "name": "CIN_ROAD_1",
        "direction": FACING_UP,
        "alignment": "VERT",
        "hasStart": false,
        "leftCol": 13,
        "rightCol": 14,
        "startRow": 16,
        "endRow": 3
    }
],"actions":[]}