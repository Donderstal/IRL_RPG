const chapterEvents = [
    // Chapter 0
    [
        // C 0, Scene 0
        [
            {
                mapName: "my-neighbourhood/A1",
                trigger: "ON_ENTER",
                passScene: false,
                scriptId: "C0_S0_E0"
            },
            {
                mapName: "my-neighbourhood/A2",
                trigger: "ON_ENTER",
                passScene: true,
                scriptId: "C0_S0_E1"
            }  
        ],
        // C 0, Scene 1
        [
            {
                mapName: "my-neighbourhood/A3",
                trigger: "ON_LEAVE",
                passScene: true,
                scriptId: "C0_S1_E0"
            }
        ],
        // C 0, Scene 2
        [
            {
                mapName: "my-neighbourhood/A4",
                trigger: "ON_POSITION",
                position: {
                    "col": 12,
                    "direction": "FACING_RIGHT"
                },
                passScene: true,
                scriptId: "C0_S2_E0"
            }
        ],
        // C 0, Scene 3
        [ 
            {
                mapName: "my-neighbourhood/A4/yum-mart",
                trigger: "ON_ENTER",
                passScene: false,
                scriptId: "C0_S3_E0"
            }
        ]         
    ]
]

module.exports = {
    chapterEvents
}