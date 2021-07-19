module.exports = {
    "mapName": "my-neighbourhood/A4",
    "tileSet": "my_neighbourhood",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
    { "alignment": "HORI", "topRow": 10, "bottomRow": 11, "direction": "FACING_LEFT" },
    { "alignment": "VERT", "leftCol": 23, "rightCol": 24, "direction": "FACING_DOWN" }
    ],
    "neighbours": {
        "left": "my-neighbourhood/A3",
        "down": "my-neighbourhood/B4"
    },
    "rows":12,
    "columns":24,
    "grid":[[414,432,432,433,434,435,434,434,474,475,475,475,475,475,475,475,475,499,4,520,521,276,277,277],[418,419,436,437,438,439,460,438,478,479,488,489,490,491,500,501,502,503,4,524,525,276,277,38],[422,423,440,441,442,443,464,465,482,483,492,493,494,495,504,505,506,507,4,4,4,276,284,277],[426,427,444,445,446,447,468,469,486,487,496,497,498,497,508,509,510,511,4,30,528,276,284,277],[429,312,321,448,450,4,535,4,4,4,178,4,30,4,4,29,4,4,176,4,4,276,284,277],[354,312,312,448,450,4,4,23,4,4,4,4,4,4,4,4,4,4,4,529,530,276,284,277],[312,382,313,449,450,4,4,4,4,4,28,4,194,4,23,26,4,177,4,533,534,276,288,277],[312,312,312,453,450,532,4,4,4,4,4,4,4,4,4,4,4,4,4,148,4,276,37,277],[585,585,585,590,556,553,553,570,571,571,571,571,560,561,562,553,571,571,571,571,551,557,277,277],[277,277,277,277,277,277,277,41,277,277,277,277,277,277,38,277,277,277,277,277,277,42,277,277],[277,574,575,41,575,575,575,574,575,575,575,575,277,277,277,277,575,575,575,575,559,277,277,277],[546,546,547,538,539,539,539,539,539,539,539,539,539,539,539,539,544,541,541,541,541,549,280,277]],
    "doors": [ 
        {
            "row": 4, 
            "col": 16,
            "to"  : "my-neighbourhood/A4/yum-mart",
            "directionIn": "FACING_UP",
            "directionOut": "FACING_DOWN",
            "locked": false
        },
        {
            "row": 4, 
            "col": 2,
            "to"  : "my-neighbourhood/A4/luxury-house",
            "directionIn": "FACING_UP",
            "directionOut": "FACING_DOWN",
            "locked": false
        }
    ],
    "subMaps": {
        "luxury-house" : {
            "mapName": "my-neighbourhood/A4/luxury-house",
            "tileSet": "Generic_Room_B_Tile_Set",     
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows": 14,
            "columns": 7,
            "grid": [
                [11,0,1,1,3,80,81],
                [15,4,5,5,7,84,85],
                [26,32,96,97,98,99,33],
                [30,36,100,101,92,103,37],
                [30,40,100,95,93,103,41],
                [48,30,104,106,105,107,54],
                [52,27,30,13,9,30,45],
                [64,72,73,30,30,46,30],
                [68,76,77,30,30,50,83],
                [64,30,9,8,9,30,87],
                [68,30,12,8,49,30,91],
                [60,60,60,60,53,60,67],
                [8,9,26,60,60,60,71],
                [60,60,89,60,60,9,60]
            ],
            "doors": [ 
                {
                    "row": 14, 
                    "col": 3,
                    "to"  : "my-neighbourhood/A4",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ],
            "characters": [
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "woman.png",
                    "direction": "FACING_DOWN",
                    "row": 3,
                    "col": 3,
                    "name": "Hot Hannah",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                        {
                            type: "SPEAK",
                            spriteName: "Hot Hannah",
                            "sfx": "poo-poo.mp3",
                            "text": "I'll send you nudes if you donate to my patreon."
                        }
                        ]
                    }
                }
            ]
        },
        "yum-mart" : {
            "mapName": "my-neighbourhood/A4/yum-mart",
            "tileSet": "Interior_Yum_Mart_Tiles",    
            "music": "yum-mart-theme.mp3",
            "outdoors": false,
            "rows":13,
            "columns":10,
            "grid": [
                [0,0,2,3,36,37,38,39,60,61],
                [4,5,6,7,40,41,42,43,64,65],
                [8,9,9,9,9,10,9,33,9,1],
                [12,9,14,15,48,9,32,9,62,63],
                [16,9,18,19,52,9,9,11,66,67],
                [20,9,22,23,56,9,9,9,70,71],
                [13,1,9,9,9,10,9,9,9,11],
                [17,9,26,27,45,46,9,74,68,69],
                [21,9,30,31,49,50,51,74,72,73],
                [33,9,34,35,9,11,9,74,76,77],
                [32,9,24,25,53,9,9,47,9,44],
                [9,9,28,29,57,9,9,55,9,54],
                [11,9,1,11,9,79,9,59,9,58]
            ],
            "doors": [ 
                {
                    "row": 13, 
                    "col": 6,
                    "to"  : "my-neighbourhood/A4",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
        
            ],
            "characters": [
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "woman.png",
                    "direction": "FACING_LEFT",
                    "row": 12,
                    "col": 9,
                    "name": "@TheFitGirlGoodLife",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                        {
                            type: "SPEAK",
                            spriteName: "@TheFitGirlGoodLife",
                            "sfx": "voice-3.mp3",
                            "text": "I'm just here to make some money until my Instagram account takes off."
                        }
                        ]
                    }
                },
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "chad.png",
                    "direction": "FACING_DOWN",
                    "row": 2,
                    "col": 2,
                    "name": "The Dealer",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                        {
                            type: "SPEAK",
                            spriteName: "The Dealer",
                            "sfx": "voice-1.mp3",
                            "text": "Wanna buy something, nerd?"
                        }
                        ]
                    }
                },
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "chad.png",
                    "direction": "FACING_UP",
                    "row": 6,
                    "col": 8,
                    "name": "Small balled Steve",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                        {
                            type: "SPEAK",
                            spriteName: "Small balled Steve",
                            "sfx": "voice-1.mp3",
                            "text": "The Yum-mart sells the best 'roid in town, man!"
                        }
                        ]
                    }
                },
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "manager.png",
                    "direction": "FACING_DOWN",
                    "row": 10,
                    "col": 6,
                    "name": "Manager Bob",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                        {
                            type: "SPEAK",
                            spriteName: "Manager Bob",
                            "sfx": "voice-2.mp3",
                            "text": "What could be better than seeing all these happy customers trust our high quality products?"
                        }
                        ]
                    }
                },
                {
                    "anim_type": NPC_ANIM_TYPE_IDLE,
                    "sprite": "tumblr_girl.png",
                    "direction": "FACING_LEFT",
                    "row": 3,
                    "col": 10,
                    "name": "Alana",
                    "action": {
                        "type": "TEXT",
                        "scenes": [
                        {
                            type: "SPEAK",
                            spriteName: "Alana",
                            "sfx": "voice-3.mp3",
                            "text": "I wish we had a better stores than Yum-mart in our neighbourhood."
                        }
                        ]
                    }
                }
            ],
            "actions" : [
                {
                    "row": 4,
                    "col": 7,
                    "type": "TEXT",
                    "scenes": [
                    {
                        type: "SPEAK",
                        spriteName: "Player",
                        "sfx": "typing.mp3",
                        "text": "The sign reads: 'Caution! Yum-mart cannot be held responsible for any injuries caused by wet floors.'"
                    }
                    ]
                },
                {
                    "row": 11,
                    "col": 1,
                    "type": "TEXT",
                    "scenes": [
                    {
                        type: "SPEAK",
                        spriteName: "Player",
                        "sfx": "typing.mp3",
                        "text": "The sign reads: 'Caution! Yum-mart cannot be held responsible for any injuries caused by wet floors.'"
                    }
                    ]
                },
                {
                    "row": 2,
                    "col": 6,
                    "type": "TEXT",
                    "scenes": [
                    {
                        type: "SPEAK",
                        spriteName: "Player",
                        "sfx": "typing.mp3",
                        "text": "Now on sale: Jen and Berry's ice cream!'"
                    }
                    ]
                },
                {
                    "row": 5,
                    "col": 3,
                    "type": "TEXT",
                    "scenes": [
                    {
                        type: "SPEAK",
                        spriteName: "Player",
                        "sfx": "typing.mp3",
                        "text": "These veggies don't look that fresh..."
                    }
                    ]
                },
                {
                    "row": 5,
                    "col": 5,
                    "type": "TEXT",
                    "scenes": [
                    {
                        type: "SPEAK",
                        spriteName: "Player",
                        "sfx": "typing.mp3",
                        "text": "These veggies don't look that fresh..."
                    }
                    ]
                },
                {
                    "row": 8,
                    "col": 1,
                    "type": "TEXT",
                    "scenes": [
                    {
                        type: "SPEAK",
                        spriteName: "Player",
                        "sfx": "typing.mp3",
                        "text": "They're all out of Roditos."
                    }
                    ]
                }
            ]
        }
    }
}