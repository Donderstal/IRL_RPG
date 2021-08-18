const { 
  NPC_ANIM_TYPE_IDLE, NPC_ANIM_TYPE_SEMI_IDLE,
  FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT
} = require('../../../../game-data/globals')
const {
  BUS_TO_DOWTOWN, A2_TALKING_CHAD, A2_TALKING_NECKBEARD, A2_TALKING_GIRL, 
  A2_TALKING_ROBOT, A2_SUBMAP1_WOMAN, A2_SUBMAP1_ACTION_BIN, A2_SUBMAP3_WIFIGUY, A2_SUBMAP2_LIFTING_CHAD, 
} = require( './interactions')

module.exports = {
    "mapName": "my-neighbourhood/A2",
    "tileSet": "my_neighbourhood",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
      { "alignment": "HORI", "topRow": 10, "bottomRow": 11, "direction": FACING_LEFT, "hasBusLine": true, "hasStart": true, "busStopLocation": { "row": 8, "col": 20 }, "roadId": "road_1" },
      { "alignment": "VERT", "leftCol": 23, "rightCol": 24, "direction": FACING_DOWN, "hasStart": true }
    ],
    "neighbours": {
        "left": "my-neighbourhood/A1",
        "right": "my-neighbourhood/A3",
        "down": "my-neighbourhood/B2"
    },
    "rows":12,
    "columns":24,
    "grid":[[213,213,214,228,229,230,244,245,246,246,246,215,246,246,246,246,260,261,265,265,265,276,280,277],[216,216,218,232,233,234,248,249,208,250,250,238,250,208,250,239,264,535,265,265,265,276,284,277],[213,221,222,236,204,265,252,253,254,239,250,242,251,250,243,250,268,522,523,265,265,276,288,277],[227,225,226,240,265,265,256,257,258,259,259,219,259,259,247,259,272,526,527,265,30,276,277,277],[265,265,265,265,265,265,265,178,265,265,265,265,265,265,265,178,265,265,265,265,265,276,278,277],[265,265,265,23,265,265,265,265,265,265,265,265,265,26,265,265,265,177,265,265,265,276,277,277],[265,53,265,265,132,133,265,265,265,265,108,23,265,265,265,108,265,265,265,265,28,276,277,68],[265,265,265,265,136,137,265,265,265,265,113,265,265,265,35,47,265,265,148,265,265,276,37,277],[553,551,553,553,553,553,553,553,553,553,571,571,571,571,571,571,571,571,576,553,550,557,277,277],[277,277,277,40,277,277,277,37,277,277,277,277,277,277,277,277,277,277,277,277,554,277,277,277],[277,559,277,277,277,42,277,277,277,277,575,575,575,575,575,575,575,575,580,277,558,37,277,277],[543,543,543,543,543,543,537,538,539,539,539,539,539,539,539,539,544,541,541,541,541,549,277,277]],
    "doors": [ 
        {
            "row": 4, 
            "col": 3,
            "to"  : "my-neighbourhood/A2/yum-corp",
            "directionIn": FACING_UP,
            "directionOut": FACING_DOWN,
            "locked": false
        },
        {
            "row": 4, 
            "col": 15,
            "to"  : "my-neighbourhood/A2/house-of-war",
            "directionIn": FACING_UP,
            "directionOut": FACING_DOWN,
            "locked": false
        }
    ],
    "mapObjects" : [
        {  
            "type"  : "Lamppost_1",
            "row"   : 8,
            "col"   : 9
        },
        {
            "type"  : "Bus_Stop",
            "row"   : 8,
            "col"   : 20,
            "hasAction" : true,
            "action" : BUS_TO_DOWTOWN
        }
    ],
    "characters" : [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "chad.png",
            "direction": FACING_DOWN,
            "name": "Chaddy Chandler",
            "row": 3,
            "col": 5,
            "action": A2_TALKING_CHAD
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "tumblr_girl.png",
            "direction": FACING_DOWN,
            "row": 6,
            "col": 18,
            "name": "Patty",
            "action": A2_TALKING_GIRL
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "neckbeard.png",
            "direction": FACING_LEFT,
            "name": "Yung Edgelord",
            "row": 7,
            "col": 19,
            "action": A2_TALKING_NECKBEARD
        },
        {
            "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
            "sprite": "robot.png",
            "row": 8, 
            "col": 12, 
            "name": "Consoombot",                    
            "direction": FACING_UP,
            "action": A2_TALKING_ROBOT
        }
    ],
    "actions" : [ ],
    "subMaps": {
      "yum-corp" : {
          "mapName": "my-neighbourhood/A2/yum-corp",
          "tileSet": "Generic_Room_C_Tile_Set",     
          "music": "yum-mart-theme.mp3",
          "outdoors": false,
          "rows":11,
          "columns":7,
          "grid": [
              [11,0,2,2,3,10,11],
              [15,4,5,6,7,14,15],
              [12,33,9,53,54,9,31],
              [16,9,46,47,9,9,35],
              [20,9,50,51,9,9,9],
              [32,9,9,9,32,38,19],
              [25,24,9,44,45,9,23],
              [29,28,9,48,49,9,27],
              [9,9,57,9,9,57,13],
              [25,9,9,9,58,9,17],
              [29,9,62,9,9,9,21]
          ],
          "doors": [ 
              {
                  "row": 11, 
                  "col": 3,
                  "to"  : "my-neighbourhood/A2",
                  "directionIn": FACING_DOWN,
                  "directionOut": FACING_UP,
                  "locked": false
              },
              {
                  "row": 2, 
                  "col": 6,
                  "to"  : "my-neighbourhood/A2/back-alley",
                  "directionOut": FACING_DOWN,           
                  "directionIn": FACING_UP,
                  "locked": false
              }
          ],
          "characters": [
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "woman.png",
                  "direction": FACING_DOWN,
                  "row": 2,
                  "col": 5,
                  "name": "Hot Hannah",
                  "action": A2_SUBMAP1_WOMAN
              }
          ],
          "actions" : [
            A2_SUBMAP1_ACTION_BIN
          ]
        },
        "house-of-war" : {
            "mapName": "my-neighbourhood/A2/house-of-war",
            "tileSet": "Generic_Room_A_Tile_Set",
            "outdoors": false,
            "music": "game-jam.mp3",
            "rows":10,
            "columns":7,
            "grid":[
                [11,0,1,2,1,3,11],
                [15,4,5,6,5,7,15],
                [69,19,8,50,12,50,9],
                [73,8,8,52,53,54,13],
                [10,62,63,56,57,58,17],
                [14,66,67,8,8,8,71],
                [18,8,12,21,22,23,75],
                [60,8,8,25,26,27,79],
                [64,8,78,29,30,31,83],
                [80,8,8,8,77,19,8]
            ],
            "doors": [ 
                {
                    "row": 10, 
                    "col": 5,
                    "to"  : "my-neighbourhood/A2",
                    "directionIn": FACING_DOWN,
                    "directionOut": FACING_UP,
                    "locked": false
                }
            ],
            "inaccessible": [ 
                { 
                    "topLeft": { "row": 1, "col": 1 },
                    "bottomRight": { "row": 1, "col": 1 }
                }
            ],
            "characters": [
                {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "chad.png",
                  "direction": FACING_RIGHT,
                  "row": 4,
                  "col": 4,
                  "name": "Strange Pete",
                  "action": A2_SUBMAP2_LIFTING_CHAD
                }
            ]
        },
        "back-alley" : {
            "mapName": "my-neighbourhood/A2/back-alley",
            "tileSet": "my_neighbourhood",
            "outdoors": true,
            "music": "game-jam.mp3",
            "rows":6,
            "columns":8,
            "grid": [ 
                [30,31,133,133,133,133,77,78],
                [30,31,137,152,137,137,77,78],
                [15,35,142,147,142,115,81,82],
                [30,39,146,147,147,114,85,87],
                [30,39,147,147,147,147,85,87],
                [15,43,108,147,115,108,89,91]
            ],
            "characters" : [
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "neckbeard.png",
                    "direction": FACING_DOWN,
                    "row": 3,
                    "col": 5,
                    "name": "Mortimer Richards III",
                    "action": A2_SUBMAP3_WIFIGUY
                }
            ],
            "doors": [ 
                {
                    "row": 6, 
                    "col": 4,
                    "to"  : "my-neighbourhood/A2/yum-corp",
                    "directionIn": FACING_DOWN,
                    "directionOut": FACING_UP,
                    "locked": false
                },
                {
                    "row": 6, 
                    "col": 5,
                    "to"  : "my-neighbourhood/A2/yum-corp",
                    "directionIn": FACING_DOWN,
                    "directionOut": FACING_UP,
                    "locked": false
                }
            ]
        }
    }
}