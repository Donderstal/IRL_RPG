const eventScripts = {
    // Chapter 0, Scene 0
    "C0_S0_E0" : {
        scenes: [
            { 
                type: "SPEAK",
                spriteName: "Sir Bik Bax",
                text: [
                    "Hey!",
                ]
            },
            { 
                type: "MOVE",
                spriteName: "Sir Bik Bax",
                destination: "Player"
            },
            { 
                type: "SPEAK",
                spriteName: "Sir Bik Bax",
                text: [
                    "Aren't you excited about your job at Yum-Mart?",
                    "I sure am. Thanks for paying my bonus!",
                ]
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
                text: [
                    "See ya later, wage cuck!"
                ]
            },
            { 
                type: "MOVE",
                spriteName: "Sir Bik Bax",
                destination: {
                    row: "current",
                    col: -1
                }
            }
        ]
    },
    "C0_S0_E1" : {
        type: "test C0_S0_E1"
    },
    // Chapter 1, Scene 0
    "C0_S1_E0" : {
        type: "test C0_S1_E0"
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