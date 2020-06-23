const eventScripts = {
    // Chapter 0, Scene 0
    "C0_S0_E0" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Sir Bik Bax",
                text: "Hey!"
            },
            { 
                type: "MOVE",
                spriteName: "Sir Bik Bax",
                destination: "Player"
            },
            { 
                type: "SPEAK",
                spriteName: "Sir Bik Bax",
                text: "Aren't you excited about your job at Yum-Mart?"
            },
            { 
                type: "SPEAK",
                spriteName: "Sir Bik Bax",
                text: "I sure am. Thanks for paying my bonus!"
            },
            { 
                type: "ANIM",
                spriteName: "Sir Bik Bax",
                animName: "TURN_SINGLE_CIRCLE",
                loop: false
            },
            { 
                type: "SPEAK",
                spriteName: "Sir Bik Bax",
                text: "See ya later, wage cuck!"
            },
            { 
                type: "MOVE",
                spriteName: "Sir Bik Bax",
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
                text: "I'm so alpha!!'"
            },
            {    
                type: "ANIM",
                spriteName: "Dirk Chan",
                animName: "TURN_SINGLE_CIRCLE",
                loop: false
            },
            { 
                type: "SPEAK",
                spriteName: "Dirk Chan",
                text: "BOOBIES AND VAGINAS GIVE ME MY ERECTIONS!"
            }
        ]
    },
    // Chapter 2, Scene 0
    "C0_S2_E0" : {
        type: "test C0_S2_E0"
    },
    // Chapter 3, Scene 0
    "C0_S3_E0" : {
        type: "test C0_S3_E0"
    },
}

module.exports = {
    eventScripts
}