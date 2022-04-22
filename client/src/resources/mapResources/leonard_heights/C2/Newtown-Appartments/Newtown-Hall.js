const { EVENT_HAS_FIRED } = require("../../../../../game-data/conditionGlobals");
const { FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT } = require("../../../../../game-data/globals");
const { UNLOCK_DOOR_TEST } = require("../../../../../game-data/interactionGlobals");

module.exports = {
    "mapName": "leonard_heights/Newtown-Hall",
    "neighbourhood": "leonard_heights",
    "tileSet": "Generic_Room_AX",
    "outdoors": false,
    "music": "game-jam-5-10-21.mp3",
    "rows": 12,
    "columns": 4,
    "grid": [
        {
            "id": 0,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 3,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 24,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 11,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 4,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 7,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 28,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 15,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 25,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 9,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 26,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 29,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 30,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 33,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 34,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 25,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 26,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 29,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 30,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 33,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 34,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 36,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        },
        {
            "id": 38,
            "angle": 0,
            "mirrored": false
        }
    ],
    "mapObjects": [
        {
            "type": "house_plant",
            "row": 3,
            "col": 1
        },
        {
            "type": "house_plant",
            "row": 3,
            "col": 4
        },
        {
            "type": "trash_2",
            "row": 4,
            "col": 4
        },
        {
            "type": "crisps",
            "row": 7,
            "col": 1
        },
        {
            "type": "house_plant",
            "row": 8,
            "col": 1
        },
        {
            "type": "house_plant",
            "row": 8,
            "col": 4
        },
        {
            "type": "Small_Table",
            "row": 12,
            "col": 3
        },
        {
            "type": "newspaper_trash",
            "row": 12,
            "col": 4
        }
    ],
    "characters": [],
    "actions": [],
    "doors": [
        {
            "row": 10, 
            "col": 1,
            "destination" : "leonard_heights/Newtown-appartment-1",
            "direction" : FACING_LEFT
        },
        {
            "row": 5, 
            "col": 1,
            "destination" : "leonard_heights/Newtown-appartment-2",
            "direction" : FACING_LEFT
        },
        {
            "row": 2, 
            "col": 3,
            "destination"  : "leonard_heights/Newtown-appartment-3",
            "direction": FACING_UP,
        },
        {
            "row": 5, 
            "col": 4,
            "destination" : "leonard_heights/Newtown-appartment-4",
            "direction" : FACING_RIGHT
        },
        {
            "row": 10, 
            "col": 4,
            "destination" : "leonard_heights/Newtown-appartment-5",
            "direction" : FACING_RIGHT
        },
        {
            "row": 12, 
            "col": 2,
            "destination" : "leonard_heights/C2",
            "direction" : FACING_DOWN
        }
    ]
}