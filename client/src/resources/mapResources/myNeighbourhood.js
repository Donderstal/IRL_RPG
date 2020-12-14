module.exports = {
    "A0" : {
        "mapName": "my-neighbourhood/A0",
        "tileSet": "my_neighbourhood",
        "outdoors": true,
        "music": "game-jam.mp3",
        "neighbours": {
            "right": "my-neighbourhood/A1"
        },
        "rows":12,"columns":24,"grid":[
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
                "row": 9,
                "col": 19,
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
                "row": 8, 
                "col": 18,
                "to"  : "my-neighbourhood/A0/yum-corp",
                "directionIn": "FACING_UP",
                "directionOut": "FACING_DOWN",
                "locked": false
            }
        ],
        "subMaps": {
            "yum-corp" : {   
                "mapName": "my-neighbourhood/A0/yum-corp",
                "tileSet": "Generic_Room_C_Tile_Set",
                "music": "game-jam-2.mp3",
                "outdoors": false,
                "rows":10,"columns":16,"grid":[
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
                        "row": 10, 
                        "col": 12,
                        "to"  : "my-neighbourhood/A0",
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    },
                    {
                        "row": 6, 
                        "col": 7,
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
                "rows":8,
                "columns":16,
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
                        "row": 5, 
                        "col": 6,
                        "to"  : "my-neighbourhood/A0/yum-corp-c",
                        "directionIn": "FACING_UP",
                        "directionOut": "FACING_DOWN",
                        "locked": false
                    },
                    {
                        "row": 8, 
                        "col": 12,
                        "to"  : "my-neighbourhood/A0/yum-corp",
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    }
                ]
            },
            "yum-corp-c" : {   
                "mapName": "my-neighbourhood/A0/yum-corp-c",
                "tileSet": "Generic_Room_C_Tile_Set",
                "music": "game-jam-2.mp3",
                "outdoors": false,
                "rows":4,
                "columns":10,
                "grid":[
                    [0,1,1,1,1,1,1,2,3,10],
                    [4,5,5,5,5,5,5,5,7,14],
                    [61,24,8,9,61,61,61,61,61,61],
                    [45,28,61,61,61,61,62,61,61,44]],
                "doors": [ 
                    {
                        "row": 2, 
                        "col": 10,
                        "to"  : "my-neighbourhood/A0",
                        "directionIn": "FACING_UP",
                        "directionOut": "FACING_DOWN",
                        "locked": false
                    }
                ]
            }
        }
    },
    "A1" : {
        "mapName": "my-neighbourhood/A1",
        "tileSet": "my_neighbourhood",
        "outdoors": true,
        "music": "game-jam.mp3",
        "neighbours": {
            "right": "my-neighbourhood/A2",
            "left": "my-neighbourhood/A0"
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
            }
        ],
        "characters" : [
            {
                "type": "walking",
                "sprite": "neckbeard.png",
                "direction": "FACING_DOWN",
                "name": "Darkwing Dork",    
                "row": 6,
                "col": 18,

                "lastPosition" : {                   
                    "id": 0,
                    "row": 6, 
                    "col": 18
                },
                "path" : [                     
                    { "id": 0, "row": 4, "col": 18 },
                    { "id": 1, "row": 8, "col": 18 }
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
                "row": 2,
                "col": 21,
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
                "direction": "FACING_RIGHT",
                "row": 4,
                "col": 4,
                "name": "Pauline",                    
                "action": {
                    "type": "BATTLE",
                    "sfx": "voice-3.mp3",
                    "direction": "FACING_LEFT",
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
                "direction": "FACING_LEFT",
                "name": "Lisa",                    
                "row": 4,
                "col": 5,
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
                "row": 6,
                "col": 26,
                "lastPosition" : {                   
                    "id": 0,
                    "row": 6,
                    "col": 26
                },
                "path" : [                     
                    { "id": 0, "row": 6, "col": 21 },
                    { "id": 1, "row": 6, "col": 26 }
                ]
            }
        ],
        "doors": [ 
            {
                "row": 3, 
                "col": 7,
                "to"  : "my-neighbourhood/A1/my-house",
                "directionIn": "FACING_UP",
                "directionOut": "FACING_DOWN",
                "locked": false
            },
            {
                "row": 4, 
                "col": 10,
                "to"  : "my-neighbourhood/A1/neighbours-house",
                "directionIn": "FACING_UP",
                "directionOut": "FACING_DOWN",
                "locked": false
            }
        ],
        "actions" : [
            {
                "row": 4,
                "col": 15,
                "type": "TEXT",
                "sfx": "typing.mp3",
                "text": "Who still uses these things anyway?"
            }
        ],
        "subMaps": {
            "testmap" : {   
                "mapName": "my-neighbourhood/A1/testmap",
                "tileSet": "Interior_Yum_Mart_Tiles",
                "music": "game-jam-2.mp3",
                "outdoors": false,
                "rows": 16,
                "columns": 24,
                "grid":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[8,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[20,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[20,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[20,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,44],[12,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,54],[16,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,58],[8,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74],[12,75,75,75,75,75,75,75,75,75,75,79,79,75,75,75,75,75,75,75,75,75,75,74]],
                "playerStart":{ 
                    "row": 3,
                    "col": 2
                },
                "characters" : [
                    {
                        "type": "idle",
                        "sprite": "chad_recolour01.png",
                        "direction": "FACING_DOWN",
                        "name": "chad_recolour01.png",
                        "row": 2,
                        "col": 4
                    },
                    {
                        "type": "walking",
                        "sprite": "characterx3.png",
                        "direction": "FACING_DOWN",
                        "name": "characterx3.png",
                        "row": 2,
                        "col": 18,
                        "lastPosition" : {                   
                            "id": 0,
                            "row": 6, 
                            "col": 18
                        },
                        "path" : [                     
                            { "id": 0, "row": 4, "col": 18 },
                            { "id": 1, "row": 8, "col": 18 }
                        ],
                    }
                ]
            },
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
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    },
                    {
                        "row": 16, 
                        "col": 13,
                        "to"  : "my-neighbourhood/A1",
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    }
                ],
                "characters" : [
                    {
                        "type": "idle",
                        "sprite": "business_man.png",
                        "direction": "FACING_DOWN",
                        "name": "business_man.png",
                        "row": 2,
                        "col": 2
                    },
                    {
                        "type": "idle",
                        "sprite": "chad.png",
                        "direction": "FACING_DOWN",
                        "name": "chad.png",
                        "row": 2,
                        "col": 3
                    },
                    {
                        "type": "idle",
                        "sprite": "chad_recolour01.png",
                        "direction": "FACING_DOWN",
                        "name": "chad_recolour01.png",
                        "row": 2,
                        "col": 4
                    },
                    {
                        "type": "idle",
                        "sprite": "chad_recolour02.png",
                        "direction": "FACING_DOWN",
                        "name": "chad_recolour02.png",
                        "row": 2,
                        "col": 5
                    },
                    {
                        "type": "idle",
                        "sprite": "chad_recolour03.png",
                        "direction": "FACING_DOWN",
                        "name": "chad_recolour03.png",
                        "row": 2,
                        "col": 6
                    },
                    {
                        "type": "idle",
                        "sprite": "character_x1_recolour01.png",
                        "direction": "FACING_DOWN",
                        "name": "character_x1_recolour01.png",
                        "row": 2,
                        "col": 7
                    },
                    {
                        "type": "idle",
                        "sprite": "characterx3.png",
                        "direction": "FACING_DOWN",
                        "name": "characterx3.png",
                        "row": 2,
                        "col": 8
                    },
                    {
                        "type": "idle",
                        "sprite": "generic_balding_guy.png",
                        "direction": "FACING_DOWN",
                        "name": "generic_balding_guy.png",
                        "row": 2,
                        "col": 9
                    },
                    {
                        "type": "idle",
                        "sprite": "generic_blonde_guy.png",
                        "direction": "FACING_DOWN",
                        "name": "generic_blonde_guy.png",
                        "row": 2,
                        "col": 10
                    },
                    {
                        "type": "idle",
                        "sprite": "influencer.png",
                        "direction": "FACING_DOWN",
                        "name": "influencer.png",
                        "row": 2,
                        "col": 11
                    },
                    {
                        "type": "idle",
                        "sprite": "manager.png",
                        "direction": "FACING_DOWN",
                        "name": "manager.png",
                        "row": 2,
                        "col": 12
                    },
                    {
                        "type": "idle",
                        "sprite": "monkey_ceo.png",
                        "direction": "FACING_DOWN",
                        "name": "monkey_ceo.png",
                        "row": 2,
                        "col": 13
                    },
                    {
                        "type": "idle",
                        "sprite": "neckbeard.png",
                        "direction": "FACING_DOWN",
                        "name": "neckbeard.png",
                        "row": 2,
                        "col": 14
                    },
                    {
                        "type": "idle",
                        "sprite": "robot.png",
                        "direction": "FACING_DOWN",
                        "name": "robot.png",
                        "row": 2,
                        "col": 15
                    },
                    {
                        "type": "idle",
                        "sprite": "tumbler_girl_recolour01.png",
                        "direction": "FACING_DOWN",
                        "name": "tumbler_girl_recolour01.png",
                        "row": 2,
                        "col": 16
                    },
                    {
                        "type": "idle",
                        "sprite": "tumbler_girl_recolour02.png",
                        "direction": "FACING_DOWN",
                        "name": "tumbler_girl_recolour02.png",
                        "row": 2,
                        "col": 17
                    },
                    {
                        "type": "idle",
                        "sprite": "tumblr_girl.png",
                        "direction": "FACING_DOWN",
                        "name": "tumblr_girl.png",
                        "row": 2,
                        "col": 18
                    }
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
                        "to"  : "my-neighbourhood/A1",
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
                        "row": 2,
                        "col": 3,
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
                        "row": 1,
                        "col": 4,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "This is my fridge. Sadly, there's nothing in it..."
                    },
                    {
                        "row": 6,
                        "col": 1,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "I <3 my computer"
                    },
                    {
                        "row": 4,
                        "col": 4,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "I should clean this stove sometime"
                    }
                ]
            }
        }
    },
    "A2" : {
        "mapName": "my-neighbourhood/A2",
        "tileSet": "my_neighbourhood",
        "outdoors": true,
        "music": "game-jam.mp3",
        "neighbours": {
            "left": "my-neighbourhood/A1",
            "right": "my-neighbourhood/A3"
        },
        "rows":12,
        "columns":24,
        "grid":[[213,213,214,228,229,230,244,245,246,246,246,215,246,246,246,246,260,261,265,265,265,276,280,277],[216,216,218,232,233,234,248,249,208,250,250,238,250,208,250,239,264,535,265,265,265,276,284,277],[213,221,222,236,204,265,252,253,254,239,250,242,251,250,243,250,268,522,523,265,265,276,288,277],[227,225,226,240,265,265,256,257,258,259,259,219,259,259,247,259,272,526,527,265,30,276,277,277],[265,265,265,265,265,265,265,178,265,265,265,265,265,265,265,178,265,265,265,265,265,276,278,277],[265,265,265,23,265,265,265,265,265,265,265,265,265,26,265,265,265,177,265,265,265,276,277,277],[265,53,265,265,132,133,265,265,265,265,108,23,265,265,265,108,265,265,265,265,28,276,277,68],[265,265,265,265,136,137,265,265,265,265,113,265,265,265,35,47,265,265,148,265,265,276,37,277],[553,551,553,553,553,553,553,553,553,553,571,571,571,571,571,571,571,571,576,553,550,557,277,277],[277,277,277,40,277,277,277,37,277,277,277,277,277,277,277,277,277,277,277,277,554,277,277,277],[277,559,277,277,277,42,277,277,277,277,575,575,575,575,575,575,575,575,580,277,558,37,277,277],[543,543,543,543,543,543,537,538,539,539,539,539,539,539,539,539,544,541,541,541,541,549,277,277]],
        "doors": [ 
            {
                "row": 4, 
                "col": 3,
                "to"  : "my-neighbourhood/A2/yum-corp",
                "directionIn": "FACING_UP",
                "directionOut": "FACING_DOWN",
                "locked": false
            },
            {
                "row": 4, 
                "col": 15,
                "to"  : "my-neighbourhood/A2/house-of-war",
                "directionIn": "FACING_UP",
                "directionOut": "FACING_DOWN",
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
                "action" : {
                    "type": "BUS",
                    "to": "downtown/A3",
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
                "row": 3,
                "col": 5,
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
                "row": 6,
                "col": 18,
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
                "row": 7,
                "col": 19,
                "action": {
                    "type": "TEXT",
                    "sfx": "mauww.mp3",
                    "text": "I'm an aspiring ninja, m'lady."
                }
            },
            {
                "type": "walking",
                "sprite": "manager.png",
                "row": 11, 
                "col": 11, 
                "direction": "FACING_UP",
                "name": "Manager Bob",
                "lastPosition" : { 
                    "id": 0,
                    "row": 11, 
                    "col": 11
                },
                "path" : [                     
                    { "id": 0, "row": 8, "col": 11 },
                    { "id": 1, "row": 6, "col": 11 },
                    { "id": 2, "row": 6, "col": 7 },
                    { "id": 3, "row": 8, "col": 7 }
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
                "row": 9, 
                "col": 11, 
                "name": "Consoombot",                    
                "direction": "FACING_UP",
                "lastPosition" : { 
                    "id": 0,
                    "row": 9, 
                    "col": 11 
                },
                "path" : [                     
                    { "id": 0, "row": 8, "col": 11 },
                    { "id": 1, "row": 6, "col": 11 },
                    { "id": 2, "row": 6, "col": 7 },
                    { "id": 3, "row": 8, "col": 7 }
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
                "row": 4,
                "col": 10,
                "type": "TEXT",
                "sfx": "typing.mp3",
                "text": "Who still uses these things anyway?"
            }
        ],
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
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    },
                    {
                        "row": 2, 
                        "col": 6,
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
                        "row": 2,
                        "col": 5,
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
                        "row": 6,
                        "col": 1,
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
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
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
                        "type": "idle",
                        "sprite": "chad.png",
                        "direction": "FACING_RIGHT",
                        "row": 4,
                        "col": 4,
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
                        "type": "idle",
                        "sprite": "neckbeard.png",
                        "direction": "FACING_DOWN",
                        "row": 3,
                        "col": 5,
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
                        "row": 6, 
                        "col": 4,
                        "to"  : "my-neighbourhood/A2/yum-corp",
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    },
                    {
                        "row": 6, 
                        "col": 5,
                        "to"  : "my-neighbourhood/A2/yum-corp",
                        "directionIn": "FACING_DOWN",
                        "directionOut": "FACING_UP",
                        "locked": false
                    }
                ]
            }
        }
    },
    "A3": {    
        "mapName": "my-neighbourhood/A3",
        "tileSet": "my_neighbourhood",
        "outdoors": true,
        "music": "game-jam.mp3",
        "neighbours": {
            "left": "my-neighbourhood/A2",
            "right": "my-neighbourhood/A4"
        },
        "rows":12,
        "columns":24,
        "grid":[[277,296,305,312,312,313,314,315,332,333,334,335,356,334,358,368,370,371,392,393,394,395,412,413],[277,296,305,294,354,316,318,319,336,337,342,339,338,338,338,372,374,375,396,397,398,399,416,417],[277,277,293,312,312,320,322,323,340,341,342,343,360,361,362,376,378,379,400,401,402,403,420,421],[277,296,297,312,312,321,326,327,344,345,346,347,364,365,366,380,312,312,313,405,406,407,424,425],[38,296,301,312,312,312,312,312,312,312,353,312,430,348,312,312,312,329,410,312,312,312,428,429],[277,300,305,294,312,312,312,312,312,313,354,313,312,312,354,382,312,312,312,330,295,312,312,312],[277,304,305,312,312,312,329,312,313,312,351,312,329,312,312,312,386,312,312,298,299,329,312,312],[277,277,305,312,312,312,312,355,359,312,312,312,312,312,312,312,388,384,312,312,303,312,329,312],[277,277,584,585,585,587,588,588,588,588,588,588,588,585,586,585,585,585,585,585,585,586,585,585],[277,277,277,277,277,68,277,277,277,277,277,277,277,277,277,277,277,277,277,42,277,277,277,277],[277,277,277,277,277,574,575,575,575,575,38,575,575,277,559,277,277,575,575,575,575,559,277,277],[42,277,540,541,541,541,542,543,543,543,543,543,543,543,543,543,543,543,537,545,546,546,546,547]],
        "characters": [
            {
                "type": "idle",
                "sprite": "chad.png",
                "direction": "FACING_DOWN",
                "row": 9,
                "col": 10,
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
                "row": 4,
                "col": 20,
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
                "row": 9,
                "col": 11,
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
                        "type": "idle",
                        "sprite": "business_man.png",
                        "direction": "FACING_RIGHT",
                        "row": 11,
                        "col": 4,
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
                        "row": 7,
                        "col": 7,
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
    },
    "A4" : {
        "mapName": "my-neighbourhood/A4",
        "tileSet": "my_neighbourhood",
        "outdoors": true,
        "music": "game-jam.mp3",
        "neighbours": {
            "left": "my-neighbourhood/A3"
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
                        "type": "idle",
                        "sprite": "influencer.png",
                        "direction": "FACING_DOWN",
                        "row": 3,
                        "col": 3,
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
                        "type": "idle",
                        "sprite": "influencer.png",
                        "direction": "FACING_LEFT",
                        "row": 12,
                        "col": 9,
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
                        "row": 2,
                        "col": 2,
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
                        "row": 6,
                        "col": 8,
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
                        "row": 10,
                        "col": 6,
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
                        "row": 3,
                        "col": 10,
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
                        "row": 4,
                        "col": 7,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "The sign reads: 'Caution! Yum-mart cannot be held responsible for any injuries caused by wet floors.'"
                    },
                    {
                        "row": 11,
                        "col": 1,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "The sign reads: 'Caution! Yum-mart cannot be held responsible for any injuries caused by wet floors.'"
                    },
                    {
                        "row": 2,
                        "col": 6,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "Now on sale: Jen and Berry's ice cream!'"
                    },
                    {
                        "row": 5,
                        "col": 3,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "These veggies don't look that fresh..."
                    },
                    {
                        "row": 5,
                        "col": 5,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "These veggies don't look that fresh..."
                    },
                    {
                        "row": 8,
                        "col": 1,
                        "type": "TEXT",
                        "sfx": "typing.mp3",
                        "text": "They're all out of Roditos :("
                    }
                ]
            }
        }
    }     
}