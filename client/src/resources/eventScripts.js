const eventScripts = {
    // Chapter 0, Scene 0
    "C0_S0_E0" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Yum-mart Exec",
                text: "Hey!"
            },
            { 
                type: "MOVE",
                spriteName: "Yum-mart Exec",
                destination: "Player"
            },
            { 
                type: "SPEAK",
                spriteName: "Yum-mart Exec",
                text: "Don't you work at our branch a few blocks down the street?"
            },
            { 
                type: "SPEAK",
                spriteName: "Yum-mart Exec",
                text: "You better hurry up! Your shift's already begun..."
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
                text: "See ya later, wage cuck!"
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
                text: "Hey Nerd!"
            },
            { 
                type: "SPEAK",
                spriteName: "Chaddy Chandler",
                text: "Come over here, will ya?"
            },
            { 
                type: "ANIM",
                spriteName: "Chaddy Chandler",
                animName: "TURN_SINGLE_CIRCLE",
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
                text: "Why would you want to work at Yum-Mart?"
            },
            { 
                type: "SPEAK",
                spriteName: "Dirk Chan",
                text: "My Universal Basic Income covers most of my expenses..."
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
                text: "Better late than never!"
            },
            { 
                type: "MOVE",
                spriteName: "Manager Bob",
                destination: "Player"
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "Can we talk in the corner for a sec?"
            },
            { 
                type: "SPEAK",
                spriteName: "Player",
                text: "Sure...!"
            },
            { 
                type: "Move",
                spriteName: "Player",
                destination: {
                    row: 12,
                    col: 0
                }
            },
            { 
                type: "MOVE",
                spriteName: "Manager Bob",
                destination: "Player"
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "I know you've been going through some things lately..."
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "But you can't keep coming late. I'm sorry but it just wouldn't be fair to the other employees."
            },
            { 
                type: "SPEAK",
                spriteName: "Player",
                text: "I'm sorry Bob', I'll make sure it won't happen again."
            },
            { 
                type: "SPEAK",
                spriteName: "Manager Bob",
                text: "Please do, because you're a great guy all the rest. Now let's stock those shelves!"
            },
            { 
                type: "Move",
                spriteName: "Player",
                destination: {
                    row: 9,
                    col: 5
                }
            }
        ]
    },
}

module.exports = {
    eventScripts
}