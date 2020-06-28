const eventScripts = {
    // Chapter 0, Scene 0
    "C0_S0_E0" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Yum-mart Exec",
                text: "Hey!",
                sfx: "voice-2.mp3"
            },
            { 
                type: "MOVE",
                spriteName: "Yum-mart Exec",
                destination: "Player",
                endDirection: "FACING_UP"
            },
            { 
                type: "SPEAK",
                spriteName: "Yum-mart Exec",
                text: "Don't you work at our branch a few blocks down the street?",
                sfx: "voice-2.mp3"
            },
            { 
                type: "SPEAK",
                spriteName: "Yum-mart Exec",
                text: "You better hurry up! Your shift's already begun...",
                sfx: "voice-2.mp3"
            },
            { 
                type: "ANIM",
                spriteName: "Yum-mart Exec",
                animName: "TURN_SINGLE_CIRCLE",
                loop: false
            },
            { 
                type: "SPEAK",
                spriteName: "Yum-mart Exec",
                text: "See ya later, wage cuck!",
                sfx: "lala.mp3"
            },
            { 
                type: "MOVE",
                spriteName: "Yum-mart Exec",
                destination: {
                    row: "current",
                    col: -2
                }
            }
        ]
    },
    "C0_S0_E1" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Chaddy Chandler",
                text: "Hey Nerd!",
                sfx: "battle-baba.mp3"
            },
            {
                type: "MOVE",
                spriteName: "Chaddy Chandler",
                destination: {
                    "row": 5,
                    "col": 4
                }
            },
            { 
                type: "MOVE",
                spriteName: "Chaddy Chandler",
                destination: "Player",
            },
            { 
                type: "SPEAK",
                spriteName: "Chaddy Chandler",
                text: "Come over here, will ya?",
                sfx: "voice-1.mp3"
            },
            {
                type: "MOVE",
                spriteName: "Chaddy Chandler",
                destination: {
                    "row": 5,
                    "col": 4
                }
            },
            { 
                type: "MOVE",
                spriteName: "Chaddy Chandler",
                destination: {
                    "row": 2,
                    "col": 4
                },
                endDirection: "FACING_DOWN"
            },
            { 
                type: "ANIM",
                spriteName: "Chaddy Chandler",
                animName: "TURN_SINGLE_CIRCLE",
                endDirection: "FACING_DOWN",
                loop: false
            }
        ]
    },
    // Chapter 1, Scene 0
    "C0_S1_E0" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Dirk Chan",
                text: "Why would you want to work at Yum-Mart?",
                sfx: "mauww.mp3"
            },
            { 
                type: "SPEAK",
                spriteName: "Dirk Chan",
                text: "My Universal Basic Income covers most of my expenses...",
                sfx: "mauww.mp3"
            }
        ]
    },
    // Chapter 2, Scene 0
    "C0_S2_E0" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Player",
                text: "I'm almost there, I hope Bob doesn't get mad at me!"
            }
        ]
    },
    // Chapter 3, Scene 0
    "C0_S3_E0" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "Better late than never!",
                sfx: "battle-baba.mp3"
            },
            { 
                type: "MOVE",
                spriteName: "Manager Bob",
                destination: "Player"
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "Can we talk in the corner for a sec?",
                sfx: "voice-1.mp3"
            },
            { 
                type: "SPEAK",
                spriteName: "Player",
                text: "Sure...!"
            },
            { 
                type: "MOVE",
                spriteName: "Player",
                destination: {
                    row: 12,
                    col: 0
                },
                endDirection: "FACING_RIGHT"
            },
            { 
                type: "MOVE",
                spriteName: "Manager Bob",
                destination: {
                    row: 12,
                    col: 'current'
                },
                endDirection: "FACING_DOWN"
            },
            { 
                type: "MOVE",
                spriteName: "Manager Bob",
                destination: "Player",
                endDirection: "FACING_LEFT"
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "I know you've been going through some things lately...",
                sfx: "voice-1.mp3"
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "But you can't keep coming late. I'm sorry but it just wouldn't be fair to the other employees.",
                sfx: "battle-baba.mp3"
            },
            { 
                type: "SPEAK",
                spriteName: "Player",
                text: "I'm sorry Bob', I'll make sure it won't happen again."
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "Please do, because I'm happy to have you. Now let's stock those shelves!",
                sfx: "voice-1.mp3"
            },
            { 
                type: "MOVE",
                spriteName: "Manager Bob",
                destination: {
                    row: 8,
                    col: 'current'
                },
                endDirection: "FACING_DOWN"
            },
            { 
                type: "MOVE",
                spriteName: "Manager Bob",
                destination: {
                    row: 8,
                    col: 4
                },
                endDirection: "FACING_DOWN"
            }
        ]
    },
}

module.exports = {
    eventScripts
}