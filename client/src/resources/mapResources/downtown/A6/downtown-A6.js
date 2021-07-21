const { 
    NPC_ANIM_TYPE_IDLE, NPC_ANIM_TYPE_SEMI_IDLE, NPC_ANIM_TYPE_MOVING
   } = require('../../../../game-data/globals')

module.exports = {
    "mapName": "downtown/A6",
    "tileSet": "downtown",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
        { "alignment": "HORI", "topRow": 10, "bottomRow": 11, "direction": "FACING_LEFT" },
        { "alignment": "VERT", "leftCol": 23, "rightCol": 24, "direction": "FACING_DOWN" }
      ],
    "neighbours": {
        "left": "downtown/A5"
    },
    "rows":12,
    "columns":24,
    "grid":[[522,523,523,523,523,523,523,210,0,0,0,0,0,0,0,0,0,0,0,0,339,347,347,347],[526,527,540,541,542,543,556,328,73,0,518,0,0,559,572,518,0,0,0,0,147,347,347,347],[530,531,544,545,546,547,560,332,0,0,562,563,580,581,582,583,600,0,0,0,147,347,347,36],[534,535,548,549,550,551,564,0,561,0,566,567,584,585,586,587,604,0,569,0,147,347,347,347],[538,539,552,553,554,555,568,0,565,0,570,571,588,589,590,591,601,0,573,0,147,347,347,347],[536,0,516,0,0,57,0,0,0,0,574,575,592,593,594,595,602,0,0,73,147,347,347,347],[0,0,0,0,0,0,0,0,518,0,578,579,596,597,598,599,603,0,0,0,147,347,347,347],[0,438,439,102,28,103,0,96,0,0,0,0,0,576,577,518,0,0,40,4,147,347,347,347],[28,28,105,106,38,107,28,28,28,28,28,28,28,28,28,28,28,28,28,28,329,347,36,347],[347,347,347,347,347,347,347,347,347,347,66,67,67,67,67,67,67,67,67,347,347,347,347,347],[347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347,347],[347,39,347,39,347,39,347,39,347,39,347,39,347,39,347,39,347,39,347,39,347,39,347,39]],
    "characters" : [
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "characterx5_recolour.png",
            "direction": "FACING_DOWN",
            "row": 3,
            "col": 13,
            "name": "Pidgebert thug",                     
            "action": {
                "type": "TEXT",
                "sfx": "battle-baba.mp3",
                "scenes": [
                    {
                      "type": "SPEAK",
                      "text": "If you mess with Pidgebert you mess with me!"
                    }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "pigeon.png",
            "direction": "FACING_DOWN",
            "row": 3,
            "col": 14,
            "name": "Pidgebert",                    
            "action": {
                "type": "TEXT",
                "sfx": "voice-1.mp3",
                "scenes": [
                    {
                      "type": "SPEAK",
                      "text": "Who you lookin at, shithead?"
                    },
                    {
                        "type": "SPEAK",
                        "text": "I'm Pidgebert, the meanest pigeon in town!"
                    }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_IDLE,
            "sprite": "fats_recolour.png",
            "direction": "FACING_DOWN",
            "row": 3,
            "col": 15,
            "name": "Pidgebert thug",                    
            "action": {
                "type": "TEXT",
                "sfx": "battle-baba.mp3",
                "scenes": [
                    {
                      "type": "SPEAK",
                      "text": "A powerful pigeon like Pidgebert needs protection."
                    }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_MOVING,
            "sprite": "pigeon.png",
            "direction": "FACING_LEFT",
            "name": "Marching pigeon",    
            "row": 5,
            "col": 14,
            "action": {
                "type": "TEXT",
                "sfx": "poo-poo.mp3",
                "scenes": [
                    {
                      "type": "SPEAK",
                      "text": "Pigeons of the world, unite!"
                    }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_MOVING,
            "sprite": "pigeon.png",
            "direction": "FACING_LEFT",
            "name": "Marching pigeon",    
            "row": 6,
            "col": 14,
            "action": {
                "type": "TEXT",
                "sfx": "poo-poo.mp3",
                "scenes": [
                    {
                      "type": "SPEAK",
                      "text": "I'm mad as hell and I'm not going to take it anymore"
                    }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_MOVING,
            "sprite": "pigeon.png",
            "direction": "FACING_LEFT",
            "name": "Marching pigeon",    
            "row": 7,
            "col": 14,
            "action": {
                "type": "TEXT",
                "sfx": "poo-poo.mp3",
                "scenes": [
                    {
                      "type": "SPEAK",
                      "text": "Proud pigeons far and wide, march with us!"
                    }
                ]
            }
        },
        {
            "anim_type": NPC_ANIM_TYPE_SEMI_IDLE,
            "sprite": "characterx3.png",
            "direction": "FACING_DOWN",
            "name": "Grandma Shanksville",    
            "row": 8,
            "col": 3,
            "action": {
                "type": "TEXT",
                "sfx": "voice-2.mp3",
                "scenes": [
                    {
                      "type": "SPEAK",
                      "text": "Pidgebert is not like other pigeons, if you understand what I mean."
                    }
                ]
            }
        }
    ]
}