const globals = require('../../../../game-data/globals');
const { GRID } = require('./grid.js');
const { FRONT_GRID } = require('./frontgrid.js');
const { LOOKING_FOR_APPARTMENT_LADY } = require('./D2-interactions');
module.exports =
{"frontGrid":FRONT_GRID,"grid":GRID,"outdoors":true,"mapName":"leonard_heights/D2","rows":16,"columns":24,"tileSet":"starting_neighbourhood_clean",
"characters":[{
    "anim_type": globals.NPC_ANIM_TYPE_IDLE,
    "sprite":"tumbler_girl_recolour02.png","direction":globals.FACING_LEFT,
    "row": 9, "col": 18,
    "action": LOOKING_FOR_APPARTMENT_LADY
}],
"mapObjects":[{"type":"Sign_03","row":6,"col":15},{"type":"pot_plant_a","row":9,"col":3},{"type":"boxes","row":9,"col":9},{"type":"hotel_sign","row":15,"col":18}],"spawnPoints": [
    {
        "col": 12,
        "row": globals.OUT_UP,
        "direction": globals.FACING_DOWN
    },
    {
        "col": globals.OUT_LEFT,
        "row": 9,
        "direction": globals.FACING_RIGHT
    },
    {
        "col": 18,
        "row": 10,
        "direction": globals.FACING_LEFT
    },
    {
        "col": globals.OUT_LEFT,
        "row": 11,
        "direction": globals.FACING_RIGHT
    },
    {
        "col": 9,
        "row": globals.OUT_DOWN,
        "direction": globals.FACING_UP
    },
    {
        "col": 17,
        "row": globals.OUT_DOWN,
        "direction": globals.FACING_UP
    },
    {
        "col": 18,
        "row": globals.OUT_DOWN,
        "direction": globals.FACING_UP
    }
],
"roads": [
    {
        "direction": globals.FACING_RIGHT,
        "alignment": "HORI",
        "hasStart": true,
        "topRow": 14,
        "bottomRow": 15,
        "startCol": 1,
        "endCol": 12
    },
    {
        "direction": globals.FACING_LEFT,
        "alignment": "HORI",
        "hasStart": false,
        "topRow": 12,
        "bottomRow": 13,
        "startCol": 14,
        "endCol": 1
    },
    {
        "direction": globals.FACING_UP,
        "alignment": "VERT",
        "hasStart": true,
        "leftCol": 13,
        "rightCol": 14,
        "startRow": 16,
        "endRow": 12
    },
    {
        "direction": globals.FACING_DOWN,
        "alignment": "VERT",
        "hasStart": false,
        "leftCol": 11,
        "rightCol": 12,
        "startRow": 14,
        "endRow": 16
    }
],"actions":[]}