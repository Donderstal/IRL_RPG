module.exports = {
    "A0" : {
        "neighbourhood-A0" : {
            "mapName": "my-neighbourhood/A0/neighbourhood-A0",
            "tileSet": "my_neighbourhood",
            "outdoors": true,
            "music": "game-jam.mp3",
            "neighbours": {
                "right": "my-neighbourhood/A1/neighbourhood-A1"
            },
            "rows":11,"columns":23,"grid":[
                [40,41,6,14,6,1,3,2,39,9,9,9,9,9,9,9,9,2,3,30,29,2,29,29],
                [36,37,3,10,30,1,3,2,39,9,9,9,9,9,9,9,9,29,30,29,36,37,36,37],
                [40,41,6,14,6,9,3,2,39,9,13,13,13,13,13,13,13,6,6,6,40,41,40,41],
                [36,37,30,10,30,9,10,10,39,9,10,10,10,10,10,10,10,30,30,2,29,3,10,2],
                [40,41,6,14,6,5,14,14,43,5,14,14,14,14,14,14,14,6,6,6,6,6,14,15],
                [36,37,29,3,2,10,10,10,10,10,10,10,10,36,10,37,38,36,10,37,10,10,10,10],
                [40,41,15,15,15,14,14,14,14,14,14,14,14,40,14,41,42,40,14,41,14,14,14,14],
                [17,17,17,17,68,17,17,17,17,17,17,17,17,17,66,17,17,17,17,17,99,25,17,17],
                [17,17,17,17,17,17,17,67,17,17,17,17,17,17,17,17,17,25,17,17,17,17,110,17],
                [17,67,17,17,17,17,17,17,17,64,17,25,17,17,17,17,17,17,17,17,25,17,17,17],
                [17,17,46,17,17,47,17,17,17,17,17,17,17,67,17,17,17,17,92,94,92,94,92,94],
                [17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,109,17,96,98,96,98,96,98]],
            "characters" : [
                {
                    "type": "idle",
                    "name": "Bodyguard Bill",
                    "sprite": "chad.png",
                    "direction": "FACING_DOWN",
                    "row": 8,
                    "col": 18,
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "direction": "FACING_UP",
                        "text": "Sometimes the 'roids just make me so angry..."
                    }
                }
            ],
            "doors": [ 
                {
                    "row": 7, 
                    "col": 17,
                    "to"  : "my-neighbourhood/A0/yum-corp",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ]
        },
        "yum-corp" : {   
            "mapName": "my-neighbourhood/A0/yum-corp",
            "tileSet": "Generic_Room_C_Tile_Set",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows":9,"columns":15,"grid":[
                [49,61,61,61,61,61,61,61,61,61,61,61,61,61,61,48],
                [61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61],
                [61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61],
                [61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61],
                [61,61,61,61,61,61,10,61,61,61,61,61,61,61,61,61],
                [61,61,61,61,61,61,14,61,61,61,61,61,61,61,61,61],
                [61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61],
                [61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61],
                [61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61],
                [45,61,61,61,61,61,61,61,61,61,61,62,61,61,61,44]
        ],
            "doors": [ 
                {
                    "row": 9, 
                    "col": 11,
                    "to"  : "my-neighbourhood/A0/neighbourhood-A0",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                },
                {
                    "row": 5, 
                    "col": 6,
                    "to"  : "my-neighbourhood/A0/yum-corp-b",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ]
        },
        "yum-corp-b" : {   
            "mapName": "my-neighbourhood/A0/yum-corp-b",
            "tileSet": "Generic_Room_C_Tile_Set",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows":7,
            "columns":15,
            "grid":[
                [49,42,42,42,42,42,42,42,42,42,42,42,42,42,42,48],
                [42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42],
                [42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42],
                [42,42,42,42,42,10,42,42,42,42,42,42,42,42,42,42],
                [42,42,42,42,42,14,42,42,42,42,42,42,42,42,42,42],
                [42,42,42,42,42,42,42,42,42,42,42,42,58,42,42,42],
                [42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42],
                [45,42,42,42,42,42,42,42,42,42,42,62,42,42,42,44]
            ],
            "doors": [ 
                {
                    "row": 4, 
                    "col": 5,
                    "to"  : "my-neighbourhood/A0/yum-corp-c",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                },
                {
                    "row": 7, 
                    "col": 11,
                    "to"  : "my-neighbourhood/A0/yum-corp",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                },
            ]
        },
        "yum-corp-c" : {   
            "mapName": "my-neighbourhood/A0/yum-corp-c",
            "tileSet": "Generic_Room_C_Tile_Set",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows":3,
            "columns":9,
            "grid":[
                [0,1,1,1,1,1,1,2,3,10],
                [4,5,5,5,5,5,5,5,7,14],
                [61,24,8,9,61,61,61,61,61,61],
                [45,28,61,61,61,61,62,61,61,44]],
            "doors": [ 
                {
                    "row": 1, 
                    "col": 9,
                    "to"  : "my-neighbourhood/A0/yum-corp-b",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ]
        },
    },
    "A1" : {
        "my-house" : {   
            "mapName": "my-neighbourhood/A1/my-house",
            "tileSet": "my-house",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "columns": 3,
            "rows": 7,
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
                    "row": 2,
                    "col": 1
                },
            "doors": [ 
                {
                    "row": 7, 
                    "col": 1,
                    "to"  : "my-neighbourhood/A1/neighbourhood-A1",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ],
            "actions" : [
                {
                    "row": 0,
                    "col": 3,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "This is my fridge. Sadly, there's nothing in it..."
                },
                {
                    "row": 5,
                    "col": 0,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "I <3 my computer"
                },
                {
                    "row": 3,
                    "col": 3,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "I should clean this stove sometime"
                }
            ]
        },
        "neighbourhood-A1" : {
            "mapName": "my-neighbourhood/A1/neighbourhood-A1",
            "tileSet": "my_neighbourhood",
            "outdoors": true,
            "music": "game-jam.mp3",
            "neighbours": {
                "right": "my-neighbourhood/A2/neighbourhood-A2",
                "left": "my-neighbourhood/A0/neighbourhood-A0",
                "bottom": "downtown/A1/downtown-A1"
            },
            "rows":11,
            "columns":23,
            "grid": [
                [0,1,3,30,3,2,3,31,48,49,50,51,76,77,78,78,78,132,134,135,148,157,150,151],
                [0,5,6,6,6,6,6,35,52,53,54,55,80,81,82,82,82,136,138,139,137,153,154,155],
                [8,1,10,29,10,2,38,39,56,57,58,59,84,85,123,87,86,140,12,143,47,157,158,165],
                [0,5,14,15,14,15,42,43,60,61,62,63,88,89,127,91,90,144,25,142,8,161,162,177],
                [0,0,68,17,18,17,17,17,19,17,17,18,17,83,131,0,0,0,0,0,0,0,0,19],
                [0,0,17,21,22,21,17,17,25,17,25,22,21,17,21,0,0,0,368,0,0,25,0,0],
                [0,21,17,17,19,17,17,17,17,17,21,19,17,64,0,25,0,0,0,0,0,0,0,0],
                [0,0,17,44,45,17,0,17,17,17,17,17,46,0,0,44,45,0,66,46,47,0,21,0],
                [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                [23,23,28,7,32,33,34,70,74,75,75,75,75,7,23,23,23,23,27,72,73,70,23,23],
                [23,23,23,23,23,23,23,23,23,23,28,23,23,23,23,23,23,23,23,23,23,23,23,23],
                [23,23,23,23,23,23,28,23,23,23,23,23,23,23,23,28,23,23,23,23,23,23,23,23]
            ],
            "mapObjects" : [
                {  
                    "type"  : "Lamppost_1",
                    "row"   : 7,
                    "col"   : 8
                },
                {
                    "type"  : "Lamppost_1",
                    "row"   : 7,
                    "col"   : 18
                }
            ],
            "characters" : [
                {
                    "type": "walking",
                    "sprite": "neckbeard.png",
                    "direction": "FACING_DOWN",
                    "name": "Darkwing Dork",    
                    "row": 5,
                    "col": 17,

                    "lastPosition" : {                   
                        "id": 0,
                        "row": 5, 
                        "col": 17, 
                    },
                    "path" : [                     
                        { "id": 0, "row": 3, "col": 17 },
                        { "id": 1, "row": 7, "col": 17 }
                    ],
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "direction": "FACING_UP",
                        "text": "I'm a level 24 Darkmage."
                    }
                },
                {
                    "type": "idle",
                    "sprite": "chad.png",
                    "direction": "FACING_DOWN",
                    "row": 1,
                    "col": 20,
                    "name": "Big Balls Bert",                    
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "direction": "FACING_UP",
                        "text": "Do you even lift, bro?"
                    }
                },
                {
                    "type": "idle",
                    "sprite": "influencer.png",
                    "direction": "FACING_DOWN",
                    "row": 4,
                    "col": 8,
                    "name": "Pauline",                    
                    "action": {
                        "type": "BATTLE",
                        "sfx": "voice-3.mp3",
                        "direction": "FACING_UP",
                        "text": "Ever had your ass kicked by a lady?",
                        "character": {
                            "class": "Influencer",
                            "level": 5,
                            "battleSprite": "influencer.png"
                        }
                    }
                },
                {
                    "type": "idle",
                    "sprite": "tumblr_girl.png",
                    "direction": "FACING_UP",
                    "name": "Lisa",                    
                    "row": 5,
                    "col": 8,
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-2.mp3",
                        "text": "I ate oysters for breakfast this morning. It was a terrible idea... "
                    }
                },
                {
                    "type": "walking",
                    "sprite": "business_man.png",
                    "direction": "FACING_LEFT",
                    "name": "Sir Bik Bax",                    
                    "row": 5,
                    "col": 25,
                    "lastPosition" : {                   
                        "id": 0,
                        "row": 5,
                        "col": 25,
                    },
                    "path" : [                     
                        { "id": 0, "row": 5, "col": 20 },
                        { "id": 1, "row": 5, "col": 25 }
                    ],                    
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "I'm Mr. Business!'"
                    }
                }
            ],
            "doors": [ 
                {
                    "row": 3, 
                    "col": 6,
                    "to"  : "my-neighbourhood/A1/my-house",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                },
                {
                    "row": 3, 
                    "col": 9,
                    "to"  : "my-neighbourhood/A1/neighbours-house",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ],
            "actions" : [
                {
                    "row": 3,
                    "col": 14,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "Who still uses these things anyway?"
                }
            ]
        },
        "neighbours-house" : {   
            "mapName": "my-neighbourhood/A1/neighbours-house",
            "tileSet": "my-house",
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "columns": 6,
            "rows": 7,
            "grid": [
                [ 0,  1,  1,  1,  1,  2,  3  ],
                [ 4,  5,  5,  5,  5,  6,  7  ],
                [ 8,  9,  10, 25, 25, 25, 11 ],
                [ 12, 13, 14, 25, 25, 25, 15 ],
                [ 16, 17, 18, 25, 25, 25, 19 ],
                [ 20, 21, 22, 25, 25, 25, 23 ],
                [ 24, 25, 26, 25, 25, 25, 27 ],
                [ 28, 25, 25, 29, 30, 25, 31 ]
            ],
            "doors": [ 
                {
                    "row": 7, 
                    "col": 3,
                    "to"  : "my-neighbourhood/A1/neighbourhood-A1",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ],
            "characters" : [
                {
                    "type": "idle",
                    "sprite": "neckbeard.png",
                    "direction": "FACING_DOWN",
                    "name": "N00bpwner",
                    "row": 1,
                    "col": 2,
                    "action": {
                        "type": "BATTLE",
                        "sfx": "voice-1.mp3",
                        "text": "Alloweth me to kick thine arse!",
                        "character": {
                            "class": "Influencer",
                            "level": 5,
                            "battleSprite": "influencer.png"
                        }
                    }
                },
                {
                    "type": "idle",
                    "sprite": "tumblr_girl.png",
                    "direction": "FACING_DOWN",
                    "name": "R0x4NN3G4M3RG0D355",
                    "row": 1,
                    "col": 4,
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-2.mp3",
                        "text": "This dump is not fitting for a woman of my stature! I'll have you know I'm a level 30 Warlock."
                    }
                }
            ],
            "actions" : [
                {
                    "row": 0,
                    "col": 6,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "The fridge is filled with... Doritos?"
                },
                {
                    "row": 5,
                    "col": 0,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "Looks like they're playing Guild of Warcraft!"
                },
                {
                    "row": 3,
                    "col": 5,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "The neighbours' stove is much cleaner than mine..."
                }
            ]
        }
    },
    "A2" : {
        "neighbourhood-A2" : {
            "mapName": "my-neighbourhood/A2/neighbourhood-A2",
            "tileSet": "my_neighbourhood",
            "outdoors": true,
            "music": "game-jam.mp3",
            "neighbours": {
                "left": "my-neighbourhood/A1/neighbourhood-A1",
                "right": "my-neighbourhood/A3/neighbourhood-A3"
            },
            "rows":11,
            "columns":23,
            "grid": [
                [165,150,166,171,183,133,119,185,185,185,200,185,185,185,185,203,216,220,217,218,187,224,224,224],
                [168,168,170,167,181,182,183,188,189,189,204,189,189,189,189,207,12,220,221,222,223,228,229,224],
                [151,158,174,171,128,129,130,188,189,193,208,189,189,209,189,207,220,368,220,220,187,232,233,224],
                [177,162,178,175,12,220,8,186,214,197,212,214,214,213,214,215,220,220,220,25,187,224,224,224],
                [220,220,220,220,18,220,220,220,220,201,220,220,220,220,17,19,220,220,220,220,187,224,224,224],
                [220,95,220,220,19,220,18,220,220,67,220,25,220,21,220,220,220,220,220,65,187,160,224,224],
                [220,220,220,92,93,94,22,21,220,109,17,17,17,17,17,17,220,220,68,69,187,224,224,224],
                [220,220,220,96,97,98,19,220,220,220,17,99,17,17,44,45,17,220,64,66,187,160,224,224],
                [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,205,224,70,224],
                [224,224,32,33,34,74,75,75,75,75,75,75,71,27,72,73,7,74,75,75,71,224,224,224],
                [224,70,224,224,224,224,224,70,224,224,224,11,224,224,224,224,224,224,224,224,224,224,224,224],
                [224,224,224,224,224,224,224,224,224,224,28,224,224,224,224,224,224,224,224,224,224,224,224,224]],
            "doors": [ 
                {
                    "row": 3, 
                    "col": 2,
                    "to"  : "my-neighbourhood/A2/yum-corp",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                },
                {
                    "row": 3, 
                    "col": 13,
                    "to"  : "my-neighbourhood/A2/house-of-war",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ],
            "characters" : [
                {
                    "type": "idle",
                    "sprite": "chad.png",
                    "direction": "FACING_DOWN",
                    "name": "Chaddy Chandler",
                    "row": 2,
                    "col": 4,
                    "action": {
                        "type": "BATTLE",
                        "sfx": "voice-1.mp3",
                        "text": "I'll kick your ass, NERD!"
                    }
                },
                {
                    "type": "idle",
                    "sprite": "tumblr_girl.png",
                    "direction": "FACING_DOWN",
                    "row": 5,
                    "col": 17,
                    "name": "Patty",
                    "action": {
                        "type": "TEXT",
                        "sfx": "poo-poo.mp3",
                        "text": "I used to date a level 24 Darkmage."
                    }
                },
                {
                    "type": "idle",
                    "sprite": "neckbeard.png",
                    "direction": "FACING_LEFT",
                    "name": "Yung Edgelord",
                    "row": 6,
                    "col": 18,
                    "action": {
                        "type": "TEXT",
                        "sfx": "mauww.mp3",
                        "text": "I'm an aspiring ninja, m'lady."
                    }
                },
                {
                    "type": "walking",
                    "sprite": "manager.png",
                    "row": 10, 
                    "col": 10, 
                    "direction": "FACING_UP",
                    "name": "Manager Bob",
                    "lastPosition" : { 
                        "id": 0,
                        "row": 10, 
                        "col": 10
                    },
                    "path" : [                     
                        { "id": 0, "row": 7, "col": 10 },
                        { "id": 1, "row": 5, "col": 10 },
                        { "id": 2, "row": 5, "col": 6 },
                        { "id": 3, "row": 7, "col": 6 }
                    ],
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "Greetings, possible patron!"
                    }
                },
                {
                    "type": "walking",
                    "sprite": "robot.png",
                    "row": 8, 
                    "col": 10, 
                    "name": "Consoombot",                    
                    "direction": "FACING_UP",
                    "lastPosition" : { 
                        "id": 0,
                        "row": 8, 
                        "col": 10,  
                    },
                    "path" : [                     
                        { "id": 0, "row": 7, "col": 10 },
                        { "id": 1, "row": 5, "col": 10 },
                        { "id": 2, "row": 5, "col": 6 },
                        { "id": 3, "row": 7, "col": 6 }
                    ],
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "Hello, potential customer!"
                    }
                }
            ],
            "actions" : [
                {
                    "row": 3,
                    "col": 9,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "Who still uses these things anyway?"
                }
            ]
        },
        "yum-corp" : {
            "mapName": "my-neighbourhood/A2/yum-corp",
            "tileSet": "Generic_Room_C_Tile_Set",     
            "music": "yum-mart-theme.mp3",
            "outdoors": false,
            "rows":10,
            "columns":6,
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
                    "row": 10, 
                    "col": 2,
                    "to"  : "my-neighbourhood/A2/neighbourhood-A2",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                },
                {
                    "row": 1, 
                    "col": 5,
                    "to"  : "my-neighbourhood/A2/back-alley",
                    "directionOut": "FACING_DOWN",           
                    "directionIn": "FACING_UP",
                    "locked": false
                }
            ],
            "characters": [
                {
                    "type": "idle",
                    "sprite": "influencer.png",
                    "direction": "FACING_DOWN",
                    "row": 1,
                    "col": 4,
                    "name": "Hot Hannah",
                    "action": {
                        "type": "TEXT",
                        "sfx": "poo-poo.mp3",
                        "text": "There's this weird neckbeard in the back alley trying to connect my to my internet."
                    }
                }
            ],
            "actions" : [
                {
                    "row": 5,
                    "col": 0,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "Is there a used condom in this bin?"
                }
            ]
        },
        "house-of-war" : {
            "mapName": "my-neighbourhood/A2/house-of-war",
            "tileSet": "Generic_Room_A_Tile_Set",
            "outdoors": false,
            "music": "game-jam.mp3",
            "rows":9,
            "columns":6,
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
                    "row": 9, 
                    "col": 4,
                    "to"  : "my-neighbourhood/A2/neighbourhood-A2",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ],
            "inaccessible": [ 
                { 
                    "topLeft": { "row": 0, "col": 0 },
                    "bottomRight": { "row": 0, "col": 0 }
                }
            ],
            "characters": [
                {
                    "type": "idle",
                    "sprite": "chad.png",
                    "direction": "FACING_RIGHT",
                    "row": 3,
                    "col": 3,
                    "name": "Strange Pete",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "Do you even lift, bro?"
                    }
                }
            ]
        },
        "back-alley" : {
            "mapName": "my-neighbourhood/A2/back-alley",
            "tileSet": "my_neighbourhood",
            "outdoors": true,
            "music": "game-jam.mp3",
            "rows":5,
            "columns":7,
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
                    "type": "idle",
                    "sprite": "neckbeard.png",
                    "direction": "FACING_DOWN",
                    "row": 2,
                    "col": 4,
                    "name": "Mortimer Richards III",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-3.mp3",
                        "text": "The Wifi here sucks, man"
                    }
                }
            ],
            "doors": [ 
                {
                    "row": 5, 
                    "col": 3,
                    "to"  : "my-neighbourhood/A2/yum-corp",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                },
                {
                    "row": 5, 
                    "col": 4,
                    "to"  : "my-neighbourhood/A2/yum-corp",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ]
        }
    },
    "A3" : {
        "neighbourhood-A3": {    
            "mapName": "my-neighbourhood/A3/neighbourhood-A3",
            "tileSet": "my_neighbourhood",
            "outdoors": true,
            "music": "game-jam.mp3",
            "neighbours": {
                "left": "my-neighbourhood/A2/neighbourhood-A2",
                "right": "my-neighbourhood/A4/neighbourhood-A4"
            },
            "rows":11,
            "columns":23,
            "grid": [
                [23,28,70,236,287,239,246,251,269,270,271,268,289,289,291,288,288,306,320,321,322,332,333,334],
                [23,226,227,236,237,238,235,243,273,274,275,272,291,288,290,288,291,306,324,325,326,336,337,338],
                [23,230,231,236,241,242,251,247,273,278,279,272,296,297,298,299,312,314,328,329,330,340,341,342],
                [23,23,23,236,249,239,239,253,281,282,283,280,300,301,302,303,316,318,284,285,305,344,345,346],
                [23,23,112,244,239,250,250,239,239,286,287,235,239,234,250,251,246,287,250,250,245,319,351,327],
                [23,23,23,248,249,254,254,255,239,239,251,239,239,253,254,255,253,250,254,254,255,239,239,239],
                [23,23,112,252,246,258,258,239,239,239,239,239,286,239,258,239,239,258,258,254,239,304,287,239],
                [23,28,23,256,239,239,239,262,239,257,259,239,239,262,239,239,261,239,293,258,239,295,308,239],
                [23,23,23,264,225,265,266,265,265,265,265,265,265,265,265,267,265,265,265,265,265,265,265,265],
                [11,70,23,224,224,224,7,224,224,224,32,33,34,74,75,71,7,74,75,75,71,7,224,70],
                [23,23,11,224,224,224,224,224,224,224,224,224,224,224,224,224,28,224,224,224,224,224,224,224],
                [23,23,23,224,224,224,224,224,224,224,224,70,224,224,224,224,224,224,224,224,224,224,28,224]
            ],
            "characters": [
                {
                    "type": "idle",
                    "sprite": "chad.png",
                    "direction": "FACING_DOWN",
                    "row": 8,
                    "col": 9,
                    "name": "Cocaine Johnny",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "I sold my kidneys to pay for my new house."
                    }
                },
                {
                    "type": "idle",
                    "sprite": "neckbeard.png",
                    "direction": "FACING_DOWN",
                    "row": 3,
                    "col": 19,
                    "name": "N3rdPWNerS00pr33m",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "Bronies are so 2016"
                    }
                },
                {
                    "type": "idle",
                    "sprite": "influencer.png",
                    "direction": "FACING_DOWN",
                    "row": 8,
                    "col": 10,
                    "name": "Ketamine Kate",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-3.mp3",
                        "text": "I sold my house to pay for a new pair of kidneys."
                    }
                }
            ],
            "doors": [ 
                {
                    "row": 3, 
                    "col": 9,
                    "to"  : "my-neighbourhood/A3/hotel-le-canard/le-canard-lobby",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                },
                {
                    "row": 3, 
                    "col": 10,
                    "to"  : "my-neighbourhood/A3/hotel-le-canard/le-canard-lobby",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ]
        },
        "hotel-le-canard" : {
            "le-canard-lobby" : {
                "mapName": "my-neighbourhood/A3/hotel-le-canard/le-canard-lobby",
                "tileSet": "Generic_Room_C_Tile_Set",
                "music": "game-jam-2.mp3",
                "outdoors": false,
                "rows":11,
                "columns":11,
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
                        "row": 7, 
                        "col": 0,
                        "to"  : "my-neighbourhood/A3/hotel-le-canard/hotel-west-hall",
                        "directionIn": "FACING_LEFT",
                        "directionOut": "FACING_RIGHT",
                        "locked": false
                    },
                    {
                        "row": 7, 
                        "col": 11,
                        "to"  : "my-neighbourhood/A3/hotel-le-canard/hotel-east-hall",
                        "directionIn": "FACING_RIGHT",
                        "directionOut": "FACING_LEFT",
                        "locked": true
                    },
                    {
                        "row": 0, 
                        "col": 6,
                        "to"  : "my-neighbourhood/A3/hotel-le-canard/hotel-office-area",
                        "directionIn": "FACING_UP",
                        "directionOut": "FACING_DOWN",
                        "locked": true
                    },
                    {
                        "row": 11, 
                        "col": 4,
                        "to"  : "my-neighbourhood/A3/neighbourhood-A3",
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    }
                ],
                "characters" : [
                    {
                        "type": "idle",
                        "sprite": "business_man.png",
                        "direction": "FACING_RIGHT",
                        "row": 10,
                        "col": 3,
                        "name": "Monsieur Des Combes",
                        "action": {
                            "type": "TEXT",
                            "sfx": "voice-1.mp3",
                            "text": "Welcome to Hotel Le Canard. May I see your credit rating, please?"
                        }
                    },
                    {
                        "type": "idle",
                        "sprite": "influencer.png",
                        "direction": "FACING_DOWN",
                        "row": 6,
                        "col": 6,
                        "name": "Receptionist",
                        "action": {
                            "type": "TEXT",
                            "sfx": "voice-3.mp3",
                            "text": "Are you sure you're in the right place sir? You look like a hobo."
                        }
                    }
                ]
            },
            "hotel-west-hall" : {
                "mapName": "my-neighbourhood/A3/hotel-le-canard/hotel-west-hall",
                "tileSet": "Generic_Room_A_Tile_Set",
                "music": "game-jam-2.mp3",
                "outdoors": false,
                "rows":3,
                "columns":23,
                "grid": [
                    [11,11,11,60,11,11,11,11,11,11,11,60,11,11,11,11,11,11,11,60,11,11,11,11],
                    [15,15,15,64,15,15,15,15,15,15,15,64,15,15,15,15,15,15,15,64,15,15,15,15],
                    [10,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,63],
                    [14,62,62,62,62,67,62,62,62,67,62,62,62,67,62,62,62,67,62,62,62,67,62,62]
                ],
                "doors": [
                    {
                        "row": 2, 
                        "col": 23,
                        "to"  : "my-neighbourhood/A3/hotel-le-canard/le-canard-lobby",
                        "directionIn": "FACING_RIGHT",
                        "directionOut": "FACING_LEFT",
                        "locked": false
                    },
                    {
                        "row": 0, 
                        "col": 3,
                        "to"  : "my-neighbourhood/A3/hotel-le-canard/room-large-1",
                        "directionIn": "FACING_UP",
                        "directionOut": "FACING_DOWN",
                        "locked": false
                    }
                ]
            },
            "room-large-1" : {
                "mapName": "my-neighbourhood/A3/hotel-le-canard/west-hall/room-large-1",
                "tileSet": "Generic_Room_C_Tile_Set",
                "music": "game-jam-2.mp3",
                "outdoors": false,
                "rows":7,
                "columns":7,
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
                        "row": 7, 
                        "col": 1,
                        "to"  : "my-neighbourhood/A3/hotel-le-canard/hotel-west-hall",
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    }
                ]
            }
        }
    },
    "A4" : {
        "luxury-house" : {
            "mapName": "my-neighbourhood/A4/luxury-house",
            "tileSet": "Generic_Room_B_Tile_Set",     
            "music": "game-jam-2.mp3",
            "outdoors": false,
            "rows": 13,
            "columns": 6,
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
                    "row": 13, 
                    "col": 2,
                    "to"  : "my-neighbourhood/A4/neighbourhood-A4",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
            ],
            "characters": [
                {
                    "type": "idle",
                    "sprite": "influencer.png",
                    "direction": "FACING_DOWN",
                    "row": 2,
                    "col": 2,
                    "name": "Hot Hannah",
                    "action": {
                        "type": "TEXT",
                        "sfx": "poo-poo.mp3",
                        "text": "I'll send you nudes if you donate to my patreon."
                    }
                }
            ]
        },
        "yum-mart" : {
            "mapName": "my-neighbourhood/A4/yum-mart",
            "tileSet": "Interior_Yum_Mart_Tiles",    
            "music": "yum-mart-theme.mp3",
            "outdoors": false,
            "rows":12,
            "columns":9,
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
                    "row": 12, 
                    "col": 5,
                    "to"  : "my-neighbourhood/A4/neighbourhood-A4",
                    "directionIn": "FACING_DOWN",
                    "directionOut": "FACING_UP",
                    "locked": false
                }
        
            ],
            "characters": [
                {
                    "type": "idle",
                    "sprite": "influencer.png",
                    "direction": "FACING_LEFT",
                    "row": 10,
                    "col": 8,
                    "name": "@TheFitGirlGoodLife",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-3.mp3",
                        "text": "I'm just here to make some money until my Instagram account takes off."
                    }
                },
                {
                    "type": "idle",
                    "sprite": "chad.png",
                    "direction": "FACING_DOWN",
                    "row": 1,
                    "col": 1,
                    "name": "The Dealer",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "Wanna buy some cocaine, nerd?"
                    }
                },
                {
                    "type": "idle",
                    "sprite": "chad.png",
                    "direction": "FACING_UP",
                    "row": 5,
                    "col": 7,
                    "name": "Small balled Steve",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "The Yum-mart sells the best 'roid in town, man!"
                    }
                },
                {
                    "type": "idle",
                    "sprite": "manager.png",
                    "direction": "FACING_DOWN",
                    "row": 9,
                    "col": 5,
                    "name": "Pjotr, the manager",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-2.mp3",
                        "text": "Welcome to Yum-mart! I'm the manager and I do hope you have a great shopping experience."
                    }
                },
                {
                    "type": "idle",
                    "sprite": "tumblr_girl.png",
                    "direction": "FACING_LEFT",
                    "row": 2,
                    "col": 9,
                    "name": "Alana",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-3.mp3",
                        "text": "I wish we had a better stores than Yum-mart in our neighbourhood."
                    }
                }
            ],
            "actions" : [
                {
                    "row": 3,
                    "col": 6,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "The sign reads: 'Caution! Yum-mart cannot be held responsible for any injuries caused by wet floors.'"
                },
                {
                    "row": 10,
                    "col": 0,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "The sign reads: 'Caution! Yum-mart cannot be held responsible for any injuries caused by wet floors.'"
                },
                {
                    "row": 1,
                    "col": 5,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "Now on sale: Jen and Berry's ice cream!'"
                },
                {
                    "row": 4,
                    "col": 2,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "These veggies don't look that fresh..."
                },
                {
                    "row": 4,
                    "col": 4,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "These veggies don't look that fresh..."
                },
                {
                    "row": 7,
                    "col": 0,
                    "type": "TEXT",
                    "sfx": "typing.mp3",
                    "text": "They're all out of Doritos :("
                }
            ]
        },
        "neighbourhood-A4" : {
            "mapName": "my-neighbourhood/A4/neighbourhood-A4",
            "tileSet": "my_neighbourhood",
            "outdoors": true,
            "music": "game-jam.mp3",
            "neighbours": {
                "left": "my-neighbourhood/A3/neighbourhood-A3"
            },
            "rows":11,
            "columns":23,
            "grid": [
                [335,352,353,354,355,393,393,397,396,389,390,390,390,390,390,417,418,17,17,17,202,224,224,224],
                [339,356,357,358,359,380,393,393,396,394,395,404,405,406,407,408,12,17,17,17,169,160,224,224],
                [343,360,361,362,363,370,371,369,396,398,399,399,409,410,411,408,17,17,25,17,187,224,224,224],
                [347,364,365,366,367,374,375,373,400,402,403,403,403,414,415,416,83,17,17,17,206,160,224,224],
                [245,309,255,287,254,19,17,17,17,17,17,17,19,25,17,17,17,21,17,25,187,70,224,224],
                [245,245,286,253,254,17,17,17,17,17,17,17,17,17,18,25,18,17,17,17,187,224,224,224],
                [253,245,245,245,254,17,17,17,368,17,64,17,17,21,22,368,22,21,17,17,187,224,224,224],
                [245,305,261,262,258,17,17,17,17,17,17,66,17,17,19,17,26,25,115,108,187,160,224,224],
                [265,265,265,265,265,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,205,224,224,224],
                [224,224,7,224,224,224,7,224,224,224,32,33,34,224,224,224,7,74,75,75,71,224,224,224],
                [224,224,23,23,224,23,28,23,23,23,23,23,23,23,23,23,23,23,23,23,28,224,224,224],
                [224,23,23,23,224,23,23,23,23,23,23,23,23,28,23,23,23,23,23,23,70,224,224,224]
            ],
            "doors": [ 
                {
                    "row": 3, 
                    "col": 14,
                    "to"  : "my-neighbourhood/A4/yum-mart",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                },
                {
                    "row": 3, 
                    "col": 2,
                    "to"  : "my-neighbourhood/A4/luxury-house",
                    "directionIn": "FACING_UP",
                    "directionOut": "FACING_DOWN",
                    "locked": false
                }
            ]
        }     
    }
}