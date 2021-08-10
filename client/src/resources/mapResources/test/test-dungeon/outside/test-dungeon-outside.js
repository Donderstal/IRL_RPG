const { NPC_ANIM_TYPE_IDLE, NPC_ANIM_TYPE_ANIMATION_LOOP } = require("../../../../../game-data/globals");
const { STANDARD_ROBOT, KEY_ROBOT, BUTLER } = require("./interactions");
const { EVENT_HAS_FIRED } = require("../../../../../game-data/conditionGlobals");
const { LOGGABLE_INTERACTION_1 } = require("../../../../../game-data/interactionGlobals");

const robotName = "Securebot";

module.exports = {
    "mapName": "test/test-dungeon-outside",
    "tileSet": "downtown_2",
    "outdoors": true,
    "music": "game-jam.mp3",
    "neighbours": {},
    "rows": 8,
    "columns": 12,
    "playerStart":{ 
        "row": 6,
        "col": 7
    },
    "grid": [
        460, 500, 500, 500, 488, 461, 461, 491, 500, 500, 500, 463, 
        464, 453, 452, 506, 492, 465, 466, 495, 506, 452, 453, 467,
        484, 457, 456, 508, 496, 469, 470, 499, 508, 456, 457, 471, 
        472, 526, 526, 526, 526, 474, 474, 526, 526, 526, 526, 475,
        576, 577, 578, 579, 579, 579, 579, 579, 579, 579, 579, 579, 
        583, 583,
        583,
        583,
        583,
        583,
        583,
        583,
        583,
        583,
        583,
        583,
        584,
        585,
        586,
        587,
        587,
        587,
        587,
        587,
        587,
        587,
        587,
        587,
        590, 591, 588, 589, 589, 590, 590, 590, 590, 591, 588, 589
    ],
    "characters": [
        {
            "row": 4,
            "col": 1,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_RIGHT",
            "action": STANDARD_ROBOT
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 4,
            "col": 5,
            "name": "Butler",
            "sprite": "business_man.png",
            "direction": "FACING_DOWN",
            "action": BUTLER
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 4,
            "col": 8,
            "name": "Butler",
            "sprite": "business_man.png",
            "direction": "FACING_DOWN",
            "action": BUTLER
        },
        {
            "row": 4,
            "col": 12,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_LEFT",
            "action": STANDARD_ROBOT
        },
        {
            "row": 5,
            "col": 1,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_RIGHT",
            "action": STANDARD_ROBOT
        },
        {
            "row": 5,
            "col": 12,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_LEFT",
            "action": STANDARD_ROBOT
        },
        {
            "row": 6,
            "col": 1,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_RIGHT",
            "action": STANDARD_ROBOT
        },
        {
            "row": 6,
            "col": 12,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_LEFT",
            "action": KEY_ROBOT
        },
        {
            "row": 7,
            "col": 1,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_RIGHT",
            "action": STANDARD_ROBOT
        },
        {
            "row": 7,
            "col": 12,
            "sprite": "robot.png",
            "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
            "anim_name": "TALK",
            "name": robotName,
            "direction": "FACING_LEFT",
            "action": STANDARD_ROBOT
        }
    ],
    "doors": [ 
        {
          "condition" : {
            "type": EVENT_HAS_FIRED,
            "value": LOGGABLE_INTERACTION_1
          },
          "row": 3, 
          "col": 6,
          "from" : "test/test-dungeon-outside",
          "to"  : "test/test-dungeon-hall",
          "directionIn": "FACING_UP",
          "directionOut": "FACING_DOWN",
        },
        {
            "condition" : {
              "type": EVENT_HAS_FIRED,
              "value": LOGGABLE_INTERACTION_1
            },
            "row": 3, 
            "col": 7,
            "from" : "test/test-dungeon-outside",
            "to"  : "test/test-dungeon-hall",
            "directionIn": "FACING_UP",
            "directionOut": "FACING_DOWN",
          }
    ],
}