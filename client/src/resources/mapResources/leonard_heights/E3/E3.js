const globals = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/E3","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean","characters":[{"anim_type":globals.NPC_ANIM_TYPE_IDLE,"row":6,"col":23,"sprite":"pigeon.png","direction":globals.FACING_LEFT}],"mapObjects":[{"type":"gang_z","row":3,"col":4},{"type":"Sign_03","row":3,"col":13},{"type":"funz","row":6,"col":17},{"type":"car_b","row":9,"col":7,"direction":globals.FACING_RIGHT},{"type":"water_puddle","row":11,"col":10}],    "spawnPoints": [
    {
        "col": globals.OUT_LEFT,
        "row": 6,
        "direction": globals.FACING_RIGHT
    },
    {
        "col": 10,
        "row": 6,
        "direction": globals.FACING_DOWN
    },
    {
        "col": 11,
        "row": 6,
        "direction": globals.FACING_DOWN
    },
    {
        "col": 11,
        "row": globals.OUT_DOWN,
        "direction": globals.FACING_UP
    }
],"roads":[],"actions":[]}