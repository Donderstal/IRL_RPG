const { SPEAK, MOVE, ANIM } = require("../game-data/conditionGlobals")
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../game-data/globals")
const { 
    ON_ENTER, ON_LEAVE, ON_POSITION
}  = require('../game-data/conditionGlobals')

const STORY_EVENTS = [
    {
        mapName: "my-neighbourhood/A1",
        trigger: ON_ENTER,
        scenes: [
            { 
                type: SPEAK, spriteName: "Mr. Business",
                text: "Hey!", sfx: "voice-2.mp3"
            },
            { 
                type: MOVE, spriteName: "Mr. Business",
                destination: "Player", endDirection: FACING_UP
            },
            { 
                type: SPEAK, spriteName: "Mr. Business",
                text: "Don't you work at our branch a few blocks down the street?", sfx: "voice-2.mp3"
            },
            { 
                type: SPEAK, spriteName: "Mr. Business",
                text: "You better hurry up! Your shift's already begun...", sfx: "voice-2.mp3"
            },
            { 
                type: ANIM, spriteName: "Mr. Business",
                animName: "TURN_SINGLE_CIRCLE", loop: false
            },
            { 
                type: SPEAK, spriteName: "Mr. Business",
                text: "See ya later, wage cuck!", sfx: "lala.mp3"
            },
            { 
                type: MOVE, spriteName: "Mr. Business",
                destination: { "row": 6, "col": 22 }
            }
        ]
    },
    ////////////////////
    {
        mapName: "my-neighbourhood/A2",
        trigger: ON_ENTER,
        scenes: [
            { 
                type: SPEAK, spriteName: "Chaddy Chandler",
                text: "Hey Nerd!", sfx: "battle-baba.mp3"
            },
            {
                type: MOVE, spriteName: "Chaddy Chandler",
                destination: { "row": 5, "col": 4 }
            },
            { 
                type: MOVE, spriteName: "Chaddy Chandler",
                destination: "Player",
            },
            { 
                type: SPEAK, spriteName: "Chaddy Chandler",
                text: "Come over here, will ya?", sfx: "voice-1.mp3"
            },
            { 
                type: MOVE, spriteName: "Chaddy Chandler",
                destination: { "row": 3, "col": 5 }, endDirection: FACING_DOWN
            },
            { 
                type: ANIM, spriteName: "Chaddy Chandler",
                animName: "TURN_SINGLE_CIRCLE", endDirection: FACING_DOWN, loop: false
            }
        ]
    },
    //////////////////////////
    {
        mapName: "my-neighbourhood/A3",
        trigger: ON_LEAVE,
        scenes: [
            { 
                type: SPEAK, spriteName: "Dirk Chan",
                text: "Why would you want to work at Yum-Mart?", sfx: "mauww.mp3"
            },
            { 
                type: SPEAK, spriteName: "Dirk Chan",
                text: "My Universal Basic Income covers most of my expenses...", sfx: "mauww.mp3"
            }
        ]
    },
    //////////////////////////
    {
        mapName: "my-neighbourhood/A4",
        trigger: ON_POSITION,
        position: {
            "col": 12,
            "direction": FACING_RIGHT
        },
        scenes: [
            { 
                type: SPEAK, spriteName: "Player",
                text: "I'm almost there, I hope Bob doesn't get mad at me!"
            }
        ]
    },
    //////////////////////////
    {
        mapName: "my-neighbourhood/A4/yum-mart",
        trigger: ON_ENTER,
        scenes: [
            { 
                type: SPEAK, spriteName: "Manager Bob",
                text: "Better late than never!", sfx: "battle-baba.mp3"
            },
            { 
                type: MOVE, spriteName: "Manager Bob",
                destination: "Player"
            },
            { 
                type: SPEAK, spriteName: "Manager Bob",
                text: "Can we talk in the corner for a sec?", sfx: "voice-1.mp3"
            },
            { 
                type: SPEAK, spriteName: "Player",
                text: "Sure...!"
            },
            { 
                type: MOVE, spriteName: "Player",
                destination: { row: 13, col: 1  }, endDirection: FACING_RIGHT
            },
            { 
                type: MOVE, spriteName: "Manager Bob",
                destination: { row: 13, col: 2 }, endDirection: FACING_LEFT
            },
            { 
                type: SPEAK, spriteName: "Manager Bob",
                text: "I know you've been going through some things lately...", sfx: "voice-1.mp3"
            },
            { 
                type: SPEAK, spriteName: "Manager Bob",
                text: "But you can't keep coming late. I'm sorry but it just wouldn't be fair to the other employees.", sfx: "battle-baba.mp3"
            },
            { 
                type: SPEAK, spriteName: "Player",
                text: "I'm sorry Bob', I'll make sure it won't happen again."
            },
            { 
                type: SPEAK, spriteName: "Manager Bob",
                text: "Please do, because I'm happy to have you. Now let's stock those shelves!", sfx: "voice-1.mp3"
            },
            { 
                type: MOVE, spriteName: "Manager Bob",
                destination: { row: 10, col: 6 }, endDirection: FACING_DOWN
            }
        ]
    }
    
    
]

module.exports = {
    STORY_EVENTS
}