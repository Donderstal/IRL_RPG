const { 
  NPC_ANIM_TYPE_ANIMATION_LOOP, NPC_ANIM_TYPE_IDLE, NPC_ANIM_TYPE_MOVING, 
  FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT
 } = require('../../../../game-data/globals');
const {
  A1_MY_HOUSE_COMPUTER_ACTION, A1_MY_HOUSE_FRIDGE_ACTION, A1_MY_HOUSE_STOVE_ACTION,
  A1_BUSINESS_MAN, A1_GIRL_OUTSIDE, A1_WOMAN_FIGHT, A1_MY_HOUSE_CHAD_FIGHT
} = require('./interactions');

module.exports = {
    "mapName": "my-neighbourhood/A1",
    "tileSet": "my_neighbourhood",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
      { "alignment": "HORI", "topRow": 10, "bottomRow": 11, "direction": FACING_LEFT, "hasStart": true }
    ],
    "neighbours": {
        "right": "my-neighbourhood/A2",
        "left": "my-neighbourhood/A0",
        "down": "my-neighbourhood/B1"
    },
    "rows":12,
    "columns":24,
    "grid":[[4,5,7,7,3,2,7,51,76,79,79,78,116,117,118,118,118,180,182,183,196,197,198,199],[4,13,14,15,14,15,58,59,80,73,82,83,120,121,122,122,122,184,186,187,200,201,202,203],[4,17,18,19,18,19,62,63,80,85,86,87,124,125,145,146,126,188,8,8,8,205,206,221],[30,8,8,8,22,8,8,8,88,89,90,91,128,129,149,150,130,192,94,265,532,209,210,225],[4,29,265,265,265,265,98,265,8,8,8,8,8,8,8,8,8,535,265,265,265,265,265,265],[4,4,265,265,265,265,265,265,265,26,265,265,265,265,265,265,265,265,265,265,265,265,30,265],[4,4,265,35,47,265,96,265,265,265,265,93,265,265,35,47,265,265,98,92,265,265,265,26],[265,265,265,265,29,265,265,25,24,265,265,97,265,265,265,265,265,265,265,265,265,99,265,265],[553,553,551,553,570,571,571,571,571,553,553,553,551,553,553,553,570,571,571,571,571,571,571,553],[135,70,135,69,135,105,135,135,135,135,68,135,135,135,135,135,70,135,135,135,135,135,71,135],[135,277,559,135,574,575,575,575,575,135,135,135,559,135,69,135,574,575,575,575,70,575,575,135],[541,545,546,546,546,546,546,546,546,546,547,542,543,543,543,543,543,543,543,537,542,543,543,543]],
    "mapObjects" : [
        {  
            "type"  : "Lamppost_1",
            "row"   : 8,
            "col"   : 9
        },
        {
            "type"  : "Lamppost_1",
            "row"   : 8,
            "col"   : 19
        },
        { 
          "type"  : "Poster_Gronk",
          "row"   : 3,
          "col"   : 18
        }
    ],
    "characters" : [
        {
          "anim_type": NPC_ANIM_TYPE_ANIMATION_LOOP,
          "anim_name": "LIFT",
          "sprite": "chad.png",
          "direction": FACING_DOWN,
          "row": 3,
          "col": 21,
          "name": "Big Balls Bert",                    
          "action": A1_MY_HOUSE_CHAD_FIGHT
        },
        {
          "anim_type": NPC_ANIM_TYPE_IDLE,
          "sprite": "woman.png",
          "direction": FACING_RIGHT,
          "row": 4,
          "col": 4,
          "name": "Pauline",                    
          "action": A1_WOMAN_FIGHT
        },
        {
          "anim_type": NPC_ANIM_TYPE_IDLE,
          "sprite": "tumblr_girl.png",
          "direction": FACING_LEFT,
          "name": "Lisa",                    
          "row": 4,
          "col": 5,
          "action": A1_GIRL_OUTSIDE
        },
        {
          "anim_type": NPC_ANIM_TYPE_MOVING,
          "sprite": "business_man.png",
          "direction": FACING_LEFT,
          "name": "Mr. Business",                    
          "row": 6,
          "col": 22,
          "action": A1_BUSINESS_MAN
        }
    ],
    "doors": [ 
        {
            "row": 3, 
            "col": 7,
            "to"  : "my-neighbourhood/A1/my-house",
            "directionIn": FACING_UP,
            "directionOut": FACING_DOWN,
            "locked": false
        },
        {
            "row": 4, 
            "col": 10,
            "to"  : "my-neighbourhood/A1/neighbours-house",
            "directionIn": FACING_UP,
            "directionOut": FACING_DOWN,
            "locked": false
        }
    ],
    "actions" : [ ],
    "subMaps": {
        "neighbours-house" : {   
            "mapName": "my-neighbourhood/A1/neighbours-house",
            "tileSet": "Interior_Yum_Mart_Tiles",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows": 16,
            "columns": 24,
            "grid":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[8,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[20,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[20,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[20,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[8,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74],[12,75,75,75,75,75,75,75,75,75,75,79,79,75,75,75,75,75,75,75,75,75,75,74]],
            "doors": [ 
                {
                    "row": 16, 
                    "col": 12,
                    "to"  : "my-neighbourhood/A1",
                    "directionIn": FACING_DOWN,
                    "directionOut": FACING_UP,
                    "locked": false
                },
                {
                    "row": 16, 
                    "col": 13,
                    "to"  : "my-neighbourhood/A1",
                    "directionIn": FACING_DOWN,
                    "directionOut": FACING_UP,
                    "locked": false
                }
            ],
            "mapObjects" : [
              {
                "type"  : "Couch_Blue",
                "row"   : 9,
                "col"   : 3
              },
              {
                "type"  : "Bench_Green",
                "row"   : 10,
                "col"   : 6
              },
              {
                "type"  : "Rug_01",
                "row"   : 4,
                "col"   : 8
              },
          ],
            "characters" : [
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "business_man.png",
                  "direction": FACING_DOWN,
                  "name": "business_man.png",
                  "row": 2,
                  "col": 2
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "chad.png",
                  "direction": FACING_DOWN,
                  "name": "chad.png",
                  "row": 2,
                  "col": 3
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "chad_recolour01.png",
                  "direction": FACING_DOWN,
                  "name": "chad_recolour01.png",
                  "row": 2,
                  "col": 4
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "chad_recolour02.png",
                  "direction": FACING_DOWN,
                  "name": "chad_recolour02.png",
                  "row": 2,
                  "col": 5
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "chad_recolour03.png",
                  "direction": FACING_DOWN,
                  "name": "chad_recolour03.png",
                  "row": 2,
                  "col": 6
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "character_x1_recolour01.png",
                  "direction": FACING_DOWN,
                  "name": "character_x1_recolour01.png",
                  "row": 2,
                  "col": 7
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "characterx3.png",
                  "direction": FACING_DOWN,
                  "name": "characterx3.png",
                  "row": 2,
                  "col": 8
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "generic_balding_guy.png",
                  "direction": FACING_DOWN,
                  "name": "generic_balding_guy.png",
                  "row": 2,
                  "col": 9
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "generic_blonde_guy.png",
                  "direction": FACING_DOWN,
                  "name": "generic_blonde_guy.png",
                  "row": 2,
                  "col": 10
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "woman.png",
                  "direction": FACING_DOWN,
                  "name": "woman.png",
                  "row": 2,
                  "col": 11
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "manager.png",
                  "direction": FACING_DOWN,
                  "name": "manager.png",
                  "row": 2,
                  "col": 12
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "monkey_ceo.png",
                  "direction": FACING_DOWN,
                  "name": "monkey_ceo.png",
                  "row": 2,
                  "col": 13
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "neckbeard.png",
                  "direction": FACING_DOWN,
                  "name": "neckbeard.png",
                  "row": 2,
                  "col": 14
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "robot.png",
                  "direction": FACING_DOWN,
                  "name": "robot.png",
                  "row": 2,
                  "col": 15,
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "tumbler_girl_recolour01.png",
                  "direction": FACING_DOWN,
                  "name": "tumbler_girl_recolour01.png",
                  "row": 2,
                  "col": 16
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "tumbler_girl_recolour02.png",
                  "direction": FACING_DOWN,
                  "name": "tumbler_girl_recolour02.png",
                  "row": 2,
                  "col": 17
              },
              {
                  "anim_type": NPC_ANIM_TYPE_IDLE,
                  "sprite": "tumblr_girl.png",
                  "direction": FACING_DOWN,
                  "name": "tumblr_girl.png",
                  "row": 2,
                  "col": 18
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "characterx4.png",
                "direction": FACING_DOWN,
                "name": "CharacterX4.png",
                "row": 2,
                "col": 19
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "characterx5.png",
                "direction": FACING_DOWN,
                "name": "CharacterX5.png",
                "row": 2,
                "col": 20
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "characterx5_recolour.png",
                "direction": FACING_DOWN,
                "name": "CharacterX5_recolour.png",
                "row": 2,
                "col": 21
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "fats.png",
                "direction": FACING_DOWN,
                "name": "fats.png",
                "row": 2,
                "col": 22
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "fats_recolour.png",
                "direction": FACING_DOWN,
                "name": "fats_recolour.png",
                "row": 2,
                "col": 23
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "new_girl.png",
                "direction": FACING_DOWN,
                "name": "new_girl.png",
                "row": 4,
                "col": 2
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "new_girl_recolour.png",
                "direction": FACING_DOWN,
                "name": "new_girl_recolour.png",
                "row": 4,
                "col": 3
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "pigeon.png",
                "direction": FACING_DOWN,
                "name": "pigeon.png",
                "row": 4,
                "col": 4
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "pony_tail.png",
                "direction": FACING_DOWN,
                "name": "pony_tail.png",
                "row": 4,
                "col": 5
              },
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "pony_tail_recolour.png",
                "direction": FACING_DOWN,
                "name": "pony_tail_recolour.png",
                "row": 4,
                "col": 6
              },
              
            ]
        },
        "my-house" : {   
            "mapName": "my-neighbourhood/A1/my-house",
            "tileSet": "my_house",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "columns": 4,
            "rows": 8,
            "grid": [
                [0,1,2,3],
                [4,5,6,7],
                [8,9,10,11],
                [12,13,14,15],
                [16,17,18,19],
                [20,21,22,23],
                [24,25,26,27],
                [28,29,30,31]
            ],
            "playerStart":{ 
                    "row": 3,
                    "col": 2
                },
            "doors": [ 
                {
                  "row": 8, 
                  "col": 2,
                  "from" : "my-neighbourhood/A1/my-house",
                  "to"  : "my-neighbourhood/A1",
                  "directionIn": FACING_DOWN,
                  "directionOut": FACING_UP,
                }
            ],
            "characters" : [
              {
                "anim_type": NPC_ANIM_TYPE_IDLE,
                "sprite": "chad.png",
                "direction": FACING_DOWN,
                "name": "Boze Bert",
                "row": 2,
                "col": 3,               
                "action": A1_MY_HOUSE_CHAD_FIGHT
              }
            ],
            "actions" : [
              A1_MY_HOUSE_COMPUTER_ACTION, A1_MY_HOUSE_FRIDGE_ACTION, A1_MY_HOUSE_STOVE_ACTION
            ]
        }
    }
}