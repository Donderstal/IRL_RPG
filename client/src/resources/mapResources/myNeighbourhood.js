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
            "characters" : [
                {
                    "type": "idle",
                    "sprite": "chad.png",
                    "direction": "FACING_DOWN",
                    "row": 1,
                    "col": 2,
                    "name": "Boze Bert",                    
                    "action": {
                        "type": "BATTLE",
                        "sfx": "voice-1.mp3",
                        "direction": "FACING_UP",
                        "text": "I'm in your house, about to kick your ass!",
                        "character": {
                            "class": "chad",
                            "level": 5,
                            "battleSprite": "chad.png"
                        }
                    }
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
                "left": "my-neighbourhood/A0/neighbourhood-A0"
            },
            "rows":11,
            "columns":23,
            "grid":[[4,5,45,50,7,46,48,51,76,77,79,78,116,117,118,118,118,180,182,183,196,197,73,75],[29,9,11,11,11,11,11,55,80,75,82,83,120,121,122,122,122,184,186,187,200,201,202,203],[52,13,14,15,14,15,58,59,84,85,86,87,124,125,514,515,512,188,26,4,4,205,206,221],[4,17,18,19,18,19,62,63,88,89,90,91,128,129,518,519,516,192,99,4,528,209,210,225],[4,96,4,54,4,4,4,4,4,4,4,4,4,4,54,4,4,535,4,4,4,4,94,54],[4,4,26,53,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,28,26,4,4],[4,4,4,4,4,4,4,4,4,4,23,4,4,4,4,4,4,4,99,4,4,4,4,4],[4,4,4,35,47,4,4,4,28,4,4,4,92,123,4,35,47,139,108,92,98,4,4,4],[32,33,32,32,32,32,32,32,32,32,33,32,32,32,32,32,32,32,32,32,32,32,33,32],[36,37,39,102,103,103,103,103,39,102,103,103,140,64,65,66,39,135,135,105,135,39,135,135],[36,135,135,135,40,135,135,135,135,135,135,40,135,135,135,135,135,135,135,135,42,135,135,135],[36,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43]],
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
                    "name": "Yum-mart Exec",                    
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
                    ]
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
            "columns":23,"grid":[[198,214,221,228,229,230,244,245,246,246,246,215,246,246,246,260,261,0,262,263,276,135,135,135],[216,216,218,232,233,234,248,249,239,250,250,238,250,251,239,264,535,265,266,267,269,270,271,135],[75,112,222,236,98,22,252,253,254,251,250,242,250,243,250,268,522,523,265,16,276,274,275,135],[225,225,226,240,265,27,256,257,258,259,259,219,259,247,259,272,526,527,4,4,276,135,135,40],[4,4,4,4,4,4,4,4,532,4,528,4,4,4,4,178,4,4,4,0,276,135,135,135],[4,4,23,4,4,4,4,4,4,4,4,4,4,177,4,4,4,4,4,4,276,278,135,135],[4,4,4,132,133,4,4,4,4,4,4,4,4,22,4,4,4,4,4,25,276,284,135,135],[4,4,4,136,137,4,4,16,4,4,4,113,4,4,35,47,4,148,190,4,276,284,135,135],[32,32,32,32,32,34,33,32,32,32,32,32,32,32,32,32,32,32,33,32,273,288,135,135],[135,278,102,103,103,103,103,103,103,103,140,278,141,142,142,142,142,142,143,278,36,135,135,135],[135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,42,135,135,135,135,36,135,135,105],[135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,107,43,36,135,135,135]],
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
            "mapObjects" : [
                {  
                    "type"  : "Lamppost_1",
                    "row"   : 7,
                    "col"   : 8
                },
                {
                    "type"  : "Bus_Stop",
                    "row"   : 7,
                    "col"   : 19,
                    "hasAction" : true,
                    "action" : {
                        "type": "BUS",
                        "to": "downtown/A3/downtown-A3",
                        "sfx": "typing.mp3",
                        "text": "Take the bus downtown?"
                    }
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
                        "type": "TEXT",
                        "sfx": "voice-1.mp3",
                        "text": "What's the definition of insanity?"
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
            "grid":[[40,135,304,289,312,312,298,314,315,332,333,334,335,358,356,358,368,370,371,392,393,394,395,395],[135,279,281,289,286,287,316,318,319,336,337,342,342,342,339,339,372,374,375,396,397,398,399,416],[135,283,285,282,290,291,320,322,323,340,341,342,343,360,361,362,376,378,379,400,401,402,403,420],[135,135,135,289,312,312,298,326,327,344,345,346,347,364,365,366,380,321,390,353,405,406,407,424],[135,135,304,293,294,312,349,312,312,312,312,312,295,312,348,410,312,312,312,308,312,428,429,430],[135,135,135,297,312,312,312,312,353,312,354,298,299,302,312,312,382,312,312,350,312,295,312,312],[135,135,105,301,294,386,312,312,312,312,312,312,303,312,312,312,312,312,391,312,298,411,302,312],[135,135,135,289,312,351,312,354,355,359,312,312,306,312,312,388,312,312,307,384,312,298,312,312],[135,135,135,309,310,310,325,310,310,310,311,310,310,324,310,310,310,310,310,325,310,310,310,310],[135,135,135,36,103,103,103,103,103,103,103,103,103,141,142,142,142,142,142,142,142,142,135,39],[135,135,135,36,135,135,135,135,135,135,135,135,135,105,135,135,135,135,135,135,135,135,135,40],[37,42,135,36,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135,43,135]],
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
                    "name": "Dirk Chan",
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
                    "row": 11,
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
                    "name": "Manager Bob",
                    "action": {
                        "type": "TEXT",
                        "sfx": "voice-2.mp3",
                        "text": "What could be better than seeing all these happy customers trust our high quality products?"
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
            "grid":[[413,414,415,432,433,434,434,434,435,474,475,475,475,475,475,475,475,499,520,521,276,288,277,277],[417,418,419,436,437,438,439,460,461,478,488,489,490,491,500,501,502,503,524,525,276,278,69,277],[421,422,423,440,441,442,443,464,465,482,492,493,494,495,504,505,506,507,265,265,276,280,277,277],[425,426,427,444,445,446,447,468,469,486,496,497,498,497,508,509,510,511,531,528,276,284,277,277],[354,429,295,312,449,450,535,531,531,531,531,531,178,531,531,531,4,531,12,531,276,284,277,277],[312,298,299,302,453,450,531,22,531,531,26,531,531,531,531,22,531,531,529,530,276,288,277,277],[382,312,303,321,448,450,531,531,531,531,531,531,8,8,531,531,177,531,533,534,276,278,105,69],[312,386,384,307,448,450,532,30,531,531,144,531,35,47,531,531,531,204,92,22,276,277,277,277],[310,310,310,311,452,454,32,32,32,32,32,32,32,32,32,33,32,32,32,32,273,277,277,277],[103,103,103,140,39,141,142,142,142,142,143,64,65,66,141,142,142,143,39,135,277,135,135,135],[135,105,277,277,277,277,277,277,277,277,277,277,277,277,277,277,277,105,277,69,277,277,277,277],[43,277,43,277,43,277,43,277,43,277,43,105,43,277,43,277,43,277,43,277,43,277,43,134]],
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