module.exports = {
        "mapName": "Chad-outer",
        "tileSet": "my_neighbourhood_2",
        "outdoors": true,
        "music": "game-jam-2.mp3",
        "neighbours": {},
        "rows": 12,
        "columns": 24,
        "playerStart":{ 
          "row": 12,
          "col": 12
      },
        "grid": [
          322,
          726,
          716,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          729,
          695,
          727,
          323,
    
          322,
          730,
          770,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          771,
          765,
          731,
          323,
          
          326,
          305,
          327,
          572,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          533,
          573,
          326,
          305,
          327,
    
          330,
          309,
          323,
          572,
          533,
          533,
          533,
          533,
          533,
          533,
          552,
          553,
          553,
          554,
          533,
          533,
          546,
          546,
          533,
          533,
          573,
          322,
          309,
          331,
    
          322,
          309,
          323,
          576,
          544,
          545,
          537,
          537,
          539,
          537,
          556,
          557,
          557,
          558,
          537,
          537,
          537,
          537,
          544,
          545,
          577,
          322,
          309,
          323,
    
          326,
          305,
          327,
          580,
          548,
          549,
          541,
          541,
          543,
          541,
          560,
          561,
          561,
          562,
          541,
          541,
          541,
          541,
          548,
          549,
          581,
          326,
          289,
          327,
    
          322,
          309,
          331,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          330,
          309,
          323,
    
          322,
          293,
          335,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          334,
          293,
          323,
    
          322,
          297,
          335,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          334,
          297,
          323,
    
          338,
          301,
          339,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          338,
          301,
          339,
    
          727,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          726,
          731,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          725,
          730
        ],
        "mapObjects": [],
        "characters": [
          {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "row": 2,
            "col": 15,
            "sprite": "pigeon.png",
            "direction": "FACING_DOWN",
          },
          {
            "anim_type": NPC_ANIM_TYPE_MOVING_IN_LOOP,
            "move_type": NPC_MOVE_TYPE_FLYING,
            "row": 3,
            "col": 3,
            "sprite": "pigeon.png",
            "direction": "FACING_DOWN",
            "destination": {
              "col": 9,
              "row": 3
            }
          },
          {
            "type": "idle",
            "row": 7,
            "col": 5,
            "sprite": "new_girl.png",
            "direction": "FACING_UP",
            "name": "Anne",
            "action": {
              "type": "TEXT",
              "scenes" : [
                {
                  type: "SPEAK",
                  spriteName: "Anne",
                  "sfx": "voice-2.mp3",
                  "text": "What are we looking at? I forgot my glasses."              
                }
              ]
            }
          },
          {
            "type": "idle",
            "row": 7,
            "col": 6,
            "sprite": "pony_tail.png",
            "direction": "FACING_UP",
            "name": "Jolene",
            "action": {
              "type": "TEXT",
              "scenes" : [
                {
                  type: "SPEAK",
                  spriteName: "Jolene",
                  "sfx": "voice-2.mp3",
                  "text": "Wow, these guys are hot!"           
                }
              ]
            }
          },
          {
            "type": "idle",
            "row": 7,
            "col": 9,
            "sprite": "tumbler_girl_recolour01.png",
            "direction": "FACING_UP",
            "name": "Wendy",
            "action": {
              "type": "TEXT",
              "scenes" : [
                {
                  type: "SPEAK",
                  spriteName: "Wendy",
                  "sfx": "lalala.mp3",
                  "text": "I wish I could be as fit as those girls..."     
                }
              ]
            }
          },
          {
            "type": "idle",
            "row": 7,
            "col": 19,
            "sprite": "generic_balding_guy.png",
            "direction": "FACING_UP",
            "name": "William",
            "action": {
              "type": "TEXT",
              "scenes" : [
                {
                  type: "SPEAK",
                  spriteName: "William",
                  "sfx": "mauww.mp3",
                  "text": "Bro, that bro is ripped bro!"  
                }
              ]
            }
          },
          {
            "type": "idle",
            "row": 7,
            "col": 20,
            "sprite": "neckbeard.png",
            "direction": "FACING_UP",
            "name": "Billiam",
            "action": {
              "type": "TEXT",
              "scenes" : [
                {
                  type: "SPEAK",
                  spriteName: "Billiam",
                  "sfx": "mauww.mp3",
                  "text": "Man, I wish a was as tough as those guys..."
                }
              ]
            }
          },
          {
            "anim_type": NPC_ANIM_TYPE_MOVING,
            "row": 11,
            "col": 9,
            "sprite": "robot.png",
            "direction": "FACING_RIGHT",
            "name": "Securitybot_r11c9",
            "action": {
              "type": "TEXT",
              "scenes" : [
                {
                  type: "SPEAK",
                  spriteName: "Securitybot_r11c9",
                  "sfx": "typing.mp3",
                  "text": "Beep-boop. Scanning for possible security breaches."
                }
              ]
            }
          },
          {
            "anim_type": NPC_ANIM_TYPE_MOVING,
            "row": 11,
            "col": 16,
            "sprite": "robot.png",
            "direction": "FACING_LEFT",
            "name": "Securitybot_r11c16",
            "action": {
              "type": "TEXT",
              "scenes" : [
                {
                  type: "SPEAK",
                  spriteName: "Securitybot_r11c16",
                  "sfx": "typing.mp3",
                  "text": "Beep-boop. Scanning for possible security breaches."
                }
              ]
            }
          }
        ],
        "actions": [],
        "doors": [
          {
              "row": 6, 
              "col": 12,
              "to"  : "my-neighbourhood/Chad-outer/chad-club",
              "directionIn": "FACING_UP",
              "directionOut": "FACING_DOWN",
              "locked": false
          },
          {
              "row": 6, 
              "col": 13,
              "to"  : "my-neighbourhood/Chad-outer/chad-club",
              "directionIn": "FACING_UP",
              "directionOut": "FACING_DOWN",
              "locked": false
          }
        ],
        "subMaps" : {
          "chad-club" : {
          "mapName": "Chad-club",
          "tileSet": "Interior_Yum_Mart_Tiles",
          "outdoors": false,
          "music": "Im2Sexy.mp3",
          "neighbours": {},
          "rows": 16,
          "columns": 24,
          "grid": [
            49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
             9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  0,  0,  0,  0,  0,  0,  0,  0,
             9, 15, 74, 15,  9, 15, 78,  9,  9,  9,  9,  9,  9,  9, 13,  9,  0,  0,  0,  0,  0,  0,  0,  0,
             9, 19,  9, 19,  9, 19,  9,  9,  9,  9,  9,  9,  9,  9, 17,  9,  0,  0,  0,  0,  0,  0,  0,  0,
             9, 23,  9, 23,  9, 23,  9,  9,  9,  9,  9,  9,  9,  9, 21,  9,  0,  0,  0,  0,  0,  0,  0,  0,
             9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 13,  9,  0,  0,  0,  0,  0,  0,  0,  0,
             9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 17,  9,  0,  0,  0,  0,  0,  0,  0,  0,
            45, 46,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            21,
            9,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            49,
            50,
            13,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            46,
            45,
            46,
            45,
            46,
            45,
            48,
            9,
            17,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            26,
            27,
            9,
            9,
            9,
            9,
            9,
            50,
            49,
            50,
            49,
            50,
            49,
            52,
            9,
            21,
            {
              "id": 47,
              "angle": 0,
              "mirrored": true
            },,
            9,
            9,
            9,
            9,
            9,
            9,
            74,
            30,
            31,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            56,
            9,
            9,
            {
              "id": 55,
              "angle": 0,
              "mirrored": true
            },,
            9,
            9,
            9,
            9,
            74,
            9,
            74,
            34,
            35,
            74,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            {
              "id": 14,
              "angle": 0,
              "mirrored": true
            },
            9,
            9,
            {
              "id": 59,
              "angle": 0,
              "mirrored": true
            },,
            74,
            9,
            38,
            39,
            38,
            39,
            74,
            9,
            9,
            74,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            {
              "id": 18,
              "angle": 0,
              "mirrored": true
            },,
            9,
            13,
            9,
            9,
            9,
            42,
            43,
            42,
            43,
            {
              "id": 44,
              "angle": 0,
              "mirrored": true
            },,
            9,
            9,
            44,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            {
              "id": 22,
              "angle": 0,
              "mirrored": false
            },
            9,
            17,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            {
              "id": 54,
              "angle": 0,
              "mirrored": true
            },,
            9,
            9,
            54,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            78,
            78,
            21,
            78,
            78,
            78,
            78,
            78,
            78,
            78,
            {
              "id": 58,
              "angle": 0,
              "mirrored": true
            }, 
            79,
            79,
            58,
            78,
            78,
            78,
            78,
            78,
            78,
            78,
            78,
            78,
            78
          ],
          "mapObjects": [
          ],
          "characters": [
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "BACK_AND_FORTH_STEP",
              "row": 3,
              "col": 2,
              "sprite": "characterx4.png",
              "direction": "FACING_DOWN",
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "BACK_AND_FORTH_STEP",
              "row": 3,
              "col": 4,
              "sprite": "characterx5.png",
              "direction": "FACING_DOWN",
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "BACK_AND_FORTH_STEP",
              "row": 3,
              "col": 6,
              "sprite": "characterx5_recolour.png",
              "direction": "FACING_DOWN",
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LIFT",
              "row": 3,
              "col": 9,
              "sprite": "chad.png",
              "direction": "FACING_LEFT",
              "name": "Big lifter_r3c9",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Big lifter_r3c9",    
                      "sfx": "voice-1.mp3",
                      "text": "Do you even lift, bro?"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LIFT",
              "row": 3,
              "col": 11,
              "sprite": "chad_recolour01.png",
              "direction": "FACING_LEFT",
              "name": "Big lifter_r3c11",                    
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Big lifter_r3c11",      
                    "sfx": "voice-1.mp3",
                    "text": "Do you even lift, bro?"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LIFT",
              "row": 3,
              "col": 13,
              "sprite": "chad_recolour03.png",
              "direction": "FACING_LEFT",
              "name": "Big lifter_r3c13",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Big lifter_r3c13",   
                      "sfx": "voice-1.mp3",
                      "text": "Do you even lift, bro?"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 3,
              "col": 22,
              "sprite": "characterx3.png",
              "direction": "FACING_RIGHT",
              "name": "Training Granny",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Granny",    
                      "sfx": "voice-2.mp3",
                      "text": "Not bad for a granny, eh?"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 3,
              "col": 23,
              "sprite": "characterx5.png",
              "direction": "FACING_LEFT",
              "name": "Training Guy_r3c23",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r3c23",  
                      "sfx": "voice-1.mp3",
                      "text": "It feels kinda wrong to punch a granny."
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 4,
              "col": 18,
              "sprite": "characterx5_recolour.png",
              "direction": "FACING_RIGHT",
              "name": "Training Guy_r4c18",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r4c18", 
                      "sfx": "voice-1.mp3",
                      "text": "I love kicking ass!"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 4,
              "col": 19,
              "sprite": "chad_recolour02.png",
              "direction": "FACING_LEFT",
              "name": "Training Guy_r4c19",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r4c19", 
                      "sfx": "voice-1.mp3",
                      "text": "I love getting my ass kicked."
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LEFT_AND_RIGHT_STEP",
              "row": 4,
              "col": 2,
              "sprite": "pony_tail.png",
              "direction": "FACING_DOWN",
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LEFT_AND_RIGHT_STEP",
              "row": 4,
              "col": 4,
              "sprite": "new_girl.png",
              "direction": "FACING_DOWN",
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LEFT_AND_RIGHT_STEP",
              "row": 4,
              "col": 6,
              "sprite": "woman.png",
              "direction": "FACING_DOWN",
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LIFT",
              "row": 5,
              "col": 9,
              "sprite": "chad_recolour01.png",
              "direction": "FACING_LEFT",
              "name": "Big lifter_r5c9",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Big lifter_r5c9", 
                      "sfx": "voice-1.mp3",
                      "text": "Do you even lift, bro?"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LIFT",
              "row": 5,
              "col": 11,
              "sprite": "chad_recolour03.png",
              "direction": "FACING_LEFT",
              "name": "Big lifter_r5c11",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Big lifter_r5c11", 
                      "sfx": "voice-1.mp3",
                      "text": "Do you even lift, bro?"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "LIFT",
              "row": 5,
              "col": 13,
              "sprite": "chad.png",
              "direction": "FACING_LEFT",
              "name": "Big lifter_r5c13",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Big lifter_r5c13", 
                      "sfx": "voice-1.mp3",
                      "text": "Do you even lift, bro?"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 5,
              "col": 22,
              "sprite": "chad_recolour03.png",
              "direction": "FACING_RIGHT",
              "name": "Training Guy_r5c22",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r5c22",        
                      "sfx": "voice-1.mp3",
                      "text": "I'm usually not even particularly aggressive, you know."
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 5,
              "col": 23,
              "sprite": "chad_recolour01.png",
              "direction": "FACING_LEFT",
              "name": "Training Guy_r5c23",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r5c23",
                      "sfx": "voice-1.mp3",
                      "text": "I'm usually not even particularly aggressive, you know."
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 6,
              "col": 18,
              "sprite": "characterx5.png",
              "direction": "FACING_RIGHT",
              "name": "Training Guy_r6c18",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r6c18",     
                      "sfx": "voice-1.mp3",
                      "text": "I wish I was punching that granny."
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 6,
              "col": 19,
              "sprite": "fats_recolour.png",
              "direction": "FACING_LEFT",
              "name": "Training Guy_r6c19",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r6c19",     
                      "sfx": "voice-1.mp3",
                      "text": "So is this Krav Magna or Taekwondo?"
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 7,
              "col": 22,
              "sprite": "fats.png",
              "direction": "FACING_RIGHT",
              "name": "Training Guy_r7c22",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r7c22",
                      "sfx": "voice-1.mp3",
                      "text": "I thought we were doing Karate."
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "PUNCH",
              "row": 7,
              "col": 23,
              "sprite": "characterx4.png",
              "direction": "FACING_LEFT",
              "name": "Training Guy_r7c23",                    
              "action": {
                  "type": "TEXT",
                  "scenes" : [
                    {
                      type: "SPEAK",
                      "spriteName": "Training Guy_r7c23",  
                      "sfx": "voice-1.mp3",
                      "text": "I'm pretty sure we're practicing Capoeira."
                    }
                  ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_IDLE,
              "row": 8,
              "col": 3,
              "sprite": "robot.png",
              "direction": "FACING_UP",
              "name": "Securitybot_r8c3",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Securitybot_r8c3",
                    "sfx": "typing.mp3",
                    "text": "Beep-boop. Don't make me kick your ass, potential customer!"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
              "move_type": NPC_MOVE_TYPE_FLYING,
              "row": 9,
              "col": 7,
              "sprite": "pigeon.png",
              "direction": "FACING_DOWN",
              "name": "Lost pigeon",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Lost pigeon",
                    "sfx": "poo-poo.mp3",
                    "text": "Roo-koo! I got in but can't find my way out! Roo-koo!"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "TALK",
              "row": 7,
              "col": 13,
              "sprite": "chad.png",
              "direction": "FACING_DOWN",
              "name": "Talking Chad_r7c13",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Talking Chad_r7c13",
                    "sfx": "mauww.mp3",
                    "text": "Can't you see I'm talking?"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "TALK",
              "row": 8,
              "col": 12,
              "sprite": "chad.png",
              "direction": "FACING_RIGHT",
              "name": "Talking Chad_r8c12",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Talking Chad_r8c12",
                    "sfx": "mauww.mp3",
                    "text": "Can't you see I'm talking?"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "TALK",
              "row": 8,
              "col": 14,
              "sprite": "chad.png",
              "direction": "FACING_LEFT",
              "name": "Talking Chad_r8c14",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Talking Chad_r8c14",
                    "sfx": "mauww.mp3",
                    "text": "Can't you see I'm talking?"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_IDLE,
              "row": 9,
              "col": 15,
              "sprite": "robot.png",
              "direction": "FACING_DOWN",
              "name": "Securitybot_r9c15",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Securitybot_r9c15",
                    "sfx": "typing.mp3",
                    "text": "Beep-boop. Don't make me kick your ass, potential customer!"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_IDLE,
              "row": 12,
              "col": 3,
              "sprite": "new_girl.png",
              "direction": "FACING_RIGHT"
            },
            {
              "anim_type": NPC_ANIM_TYPE_IDLE,
              "row": 12,
              "col": 12,
              "sprite": "monkey_ceo.png",
              "direction": "FACING_DOWN",
              "name": "Mr. Chimp Phd. Esq.",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Mr. Chimp Phd. Esq.",
                    "sfx": "voice-3.mp3",
                    "text": "I got rich in the great GME short of 2021."
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_IDLE,
              "row": 12,
              "col": 13,
              "sprite": "business_man.png",
              "direction": "FACING_DOWN",
              "name": "Sir Makesalot",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Sir Makesalot",
                    "sfx": "voice-4.mp3",
                    "text": "Welcome to Chad club! I'm Sir Makesalot, the founder of this fine establishment."
                  },
                  {
                    type: "SPEAK",
                    "spriteName": "Mr. Chimp Phd. Esq.",
                    "sfx": "voice-3.mp3",
                    "text": "And I'm Mr. Chimp Phd. Esq., the financial backer of this luxurious gym."
                  },
                  {
                    type: "SPEAK",
                    "spriteName": "Sir Makesalot",
                    "sfx": "voice-4.mp3",
                    "text": "This is you first time here, right? Shall I show you around?"
                  },
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_MOVING_IN_LOOP,
              "row": 11,
              "col": 23,
              "sprite": "chad_recolour01.png",
              "direction": "FACING_LEFT",
              "name": "Runner_r11c23",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Runner_r11c23",
                    "sfx": "voice-1.mp3",
                    "text": "I love running, man."
                  }
                ]
              },  
              "destination" : {
                "row": 11,
                "col": 16,
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_IDLE,
              "row": 14,
              "col": 4,
              "sprite": "robot.png",
              "direction": "FACING_RIGHT",
              "name": "Securitybot_r14c4",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Securitybot_r14c4",
                    "sfx": "typing.mp3",
                    "text": "Beep-boop. Don't make me kick your ass, potential customer!"
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "NECKBEARD_HACK",
              "row": 15,
              "col": 7,
              "sprite": "generic_blonde_guy.png",
              "direction": "FACING_RIGHT",
              "name": "Jealous Neckbeard_r15c7",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Jealous Neckbeard_r15c7",
                    "sfx": "voice-1.mp3",
                    "text": "I hate all these show-offs here in the club."
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
              "anim_name": "NECKBEARD_HACK",
              "row": 15,
              "col": 10,
              "sprite": "character_x1_recolour01.png",
              "direction": "FACING_LEFT",
              "name":  "Jealous Neckbeard_r15c10",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Jealous Neckbeard_r15c10",
                    "sfx": "voice-1.mp3",
                    "text": "I'm a true warrior! At least in my RPG games..."
                  }
                ]
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_MOVING_IN_LOOP,
              "row": 13,
              "col": 16,
              "sprite": "chad_recolour03.png",
              "direction": "FACING_RIGHT",
              "name": "Runner_r13c16",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Runner_r13c16",
                    "sfx": "voice-1.mp3",
                    "text": "Can't you see I'm training?"
                  }
                ]
              },  
              "destination" : {
                "row": 13,
                "col": 23,
              }
            },
            {
              "anim_type": NPC_ANIM_TYPE_MOVING_IN_LOOP,
              "row": 15,
              "col": 23,
              "sprite": "chad.png",
              "direction": "FACING_LEFT",
              "name": "Runner_r15c23",
              "action": {
                "type": "TEXT",
                "scenes" : [
                  {
                    type: "SPEAK",
                    "spriteName": "Runner_r15c23",
                    "sfx": "voice-1.mp3",
                    "text": "Get out of my way!"
                  }
                ]
              },          
              "destination" : {
                "row": 15,
                "col": 16,
              }
            }
          ],
          "actions": [],
          "doors": [
            {
              "row": 16, 
              "col": 12,
              "to"  : "my-neighbourhood/Chad-outer",
              "directionIn": "FACING_DOWN",
              "directionOut": "FACING_UP",
              "locked": false
            },
            {
              "row": 16, 
              "col": 13,
              "to"  : "my-neighbourhood/Chad-outer",
              "directionIn": "FACING_DOWN",
              "directionOut": "FACING_UP",
              "locked": false
            } 
          ]
        }
    }
    
}