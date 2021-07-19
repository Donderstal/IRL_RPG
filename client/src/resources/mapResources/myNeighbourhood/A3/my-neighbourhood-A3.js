const { 
    NPC_ANIM_TYPE_IDLE
   } = require('../../../../game-data/globals')

module.exports = {    
    "mapName": "my-neighbourhood/A3",
    "tileSet": "my_neighbourhood",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
      { "alignment": "HORI", "topRow": 10, "bottomRow": 11, "direction": "FACING_LEFT" },
      { "alignment": "VERT", "leftCol": 1, "rightCol": 2, "direction": "FACING_UP" }
    ],
    "neighbours": {
        "left": "my-neighbourhood/A2",
        "right": "my-neighbourhood/A4",
        "down": "my-neighbourhood/B3"
    },
    "rows":12,
    "columns":24,
    "grid":[[277,296,305,312,312,313,314,315,332,333,334,335,356,334,358,368,370,371,392,393,394,395,412,413],[277,296,305,294,354,316,318,319,336,337,342,339,338,338,338,372,374,375,396,397,398,399,416,417],[277,277,293,312,312,320,322,323,340,341,342,343,360,361,362,376,378,379,400,401,402,403,420,421],[277,296,297,312,312,321,326,327,344,345,346,347,364,365,366,380,312,312,313,405,406,407,424,425],[38,296,301,312,312,312,312,312,312,312,353,312,430,348,312,312,312,329,410,312,312,312,428,429],[277,300,305,294,312,312,312,312,312,313,354,313,312,312,354,382,312,312,312,330,295,312,312,312],[277,304,305,312,312,312,329,312,313,312,351,312,329,312,312,312,386,312,312,298,299,329,312,312],[277,277,305,312,312,312,312,355,359,312,312,312,312,312,312,312,388,384,312,312,303,312,329,312],[277,277,584,585,585,587,588,588,588,588,588,588,588,585,586,585,585,585,585,585,585,586,585,585],[277,277,277,277,277,68,277,277,277,277,277,277,277,277,277,277,277,277,277,42,277,277,277,277],[277,277,277,277,277,574,575,575,575,575,38,575,575,277,559,277,277,575,575,575,575,559,277,277],[42,277,540,541,541,541,542,543,543,543,543,543,543,543,543,543,543,543,537,545,546,546,546,547]],
    "characters": [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "chad.png",
            "direction": "FACING_DOWN",
            "row": 9,
            "col": 10,
            "name": "Cocaine Johnny",
            "action": {
                "type": "TEXT",
                "scenes": [
                  {
                    type: "SPEAK",
                    spriteName: "Cocaine Johnny",
                    "sfx": "voice-1.mp3",
                    "text": "I sold my kidneys to pay for my new house."
                  }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "neckbeard.png",
            "direction": "FACING_DOWN",
            "row": 4,
            "col": 20,
            "name": "Dirk Chan",
            "action": {
                "type": "TEXT",
                "scenes": [
                  {
                    type: "SPEAK",
                    spriteName: "Dirk Chan",
                    "sfx": "voice-1.mp3",
                    "text": "Bronies are so 2016"
                  }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "woman.png",
            "direction": "FACING_DOWN",
            "row": 9,
            "col": 11,
            "name": "Ketamine Kate",
            "action": {
                "type": "TEXT",
                "scenes": [
                  {
                    type: "SPEAK",
                    spriteName: "Ketamine Kate",
                    "sfx": "voice-3.mp3",
                    "text": "I sold my house to pay for a new pair of kidneys."
                  }
                ]
            }
        }
    ],
    "doors": [ 
        {
            "row": 4, 
            "col": 8,
            "to"  : "my-neighbourhood/A3/le-canard-lobby",
            "directionIn": "FACING_UP",
            "directionOut": "FACING_DOWN",
            "locked": false
        },
        {
            "row": 4, 
            "col": 9,
            "to"  : "my-neighbourhood/A3/le-canard-lobby",
            "directionIn": "FACING_UP",
            "directionOut": "FACING_DOWN",
            "locked": false
        }
    ],
    "subMaps": {
        "le-canard-lobby" : {
            "mapName": "my-neighbourhood/A3/le-canard-lobby",
            "tileSet": "Generic_Room_C_Tile_Set",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows":12,
            "columns":12,
            "grid": [
                [11,11,11,11,11,10,44,11,11,11,11,11],
                [14,14,14,14,14,14,48,14,14,14,14,14],
                [42,12,42,9,13,42,42,42,42,25,25,42],
                [26,16,42,9,17,9,42,9,8,42,42,27],
                [30,21,42,42,9,9,9,9,42,42,42,31],
                [10,10,10,10,42,42,42,42,10,10,10,10],
                [15,15,15,15,20,8,42,20,15,15,15,15],
                [46,49,49,49,49,49,49,49,49,49,49,50],
                [49,49,49,36,37,36,37,36,37,49,49,49],
                [49,49,49,40,41,40,41,40,41,49,49,49],
                [49,49,49,49,49,49,49,49,49,49,49,49],
                [49,49,49,49,45,49,49,49,49,49,49,49]
            ],
            "doors": [ 
                {
                    "row": 8, 
                    "col": 1,
                    "to"  : "my-neighbourhood/A3/hotel-west-hall",
                    "directionIn": "FACING_LEFT",
                    "directionOut": "FACING_RIGHT",
                    "locked": false
                },
                {
                    "row": 8, 
                    "col": 12,
                    "to"  : "my-neighbourhood/A3/hotel-east-hall",
                    "directionIn": "FACING_RIGHT",
                    "directionOut": "FACING_LEFT",
                    "locked": true
                },
                {
                    "row": 1, 
                    "col": 7,
                    "to"  : "my-neighbourhood/A3/hotel-office-area",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": true
                },
                {
                    "row": 12, 
                    "col": 5,
                    "to"  : "my-neighbourhood/A3",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ],
            "characters" : [
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "business_man.png",
                    "direction": "FACING_RIGHT",
                    "row": 11,
                    "col": 4,
                    "name": "Monsieur Des Combes",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                          {
                            type: "SPEAK",
                            spriteName: "Monsieur Des Combes",
                            "sfx": "voice-1.mp3",
                            "text": "Welcome to Hotel Le Canard. May I see your credit rating, please?"
                          }
                        ]
                    }
                },
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "woman.png",
                    "direction": "FACING_DOWN",
                    "row": 7,
                    "col": 7,
                    "name": "Receptionist",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                          {
                            type: "SPEAK",
                            spriteName: "Receptionist",
                            "sfx": "voice-3.mp3",
                            "text": "Are you sure you're in the right place sir? You look like a hobo."
                          }
                        ]
                    }
                }
            ]
        },
        "hotel-west-hall" : {
            "mapName": "my-neighbourhood/A3/hotel-west-hall",
            "tileSet": "Generic_Room_A_Tile_Set",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows":4,
            "columns":24,
            "grid": [
                [11,11,11,60,11,11,11,11,11,11,11,60,11,11,11,11,11,11,11,60,11,11,11,11],
                [15,15,15,64,15,15,15,15,15,15,15,64,15,15,15,15,15,15,15,64,15,15,15,15],
                [10,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,63],
                [14,62,62,62,62,67,62,62,62,67,62,62,62,67,62,62,62,67,62,62,62,67,62,62]
            ],
            "doors": [
                {
                    "row": 3, 
                    "col": 23,
                    "to"  : "my-neighbourhood/A3/le-canard-lobby",
                    "directionIn": "FACING_RIGHT",
                    "directionOut": "FACING_LEFT",
                    "locked": false
                },
                {
                    "row": 1, 
                    "col": 4,
                    "to"  : "my-neighbourhood/A3/room-large-1",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ]
        },
        "room-large-1" : {
            "mapName": "my-neighbourhood/A3/room-large-1",
            "tileSet": "Generic_Room_C_Tile_Set",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows":8,
            "columns":8,
            "grid":
            [
                [0,1,2,3,15,15,15,15],
                [5,5,6,5,42,28,29,27],
                [42,25,25,20,42,32,33,31],
                [12,36,37,49,49,49,49,49],
                [16,40,41,49,"E","E","E","E"],
                [26,42,42,24,"E","E","E","E"],
                [30,42,42,49,"E","E","E","E"],
                [49,45,49,49,"E","E","E","E"]
            ],
            "doors": [
                {
                    "row": 8, 
                    "col": 2,
                    "to"  : "my-neighbourhood/A3/hotel-west-hall",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ]
        }
    }
}