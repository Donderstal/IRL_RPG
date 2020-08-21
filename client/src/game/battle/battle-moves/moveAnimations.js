module.exports = {
    "PUNCH" : [
        {
            type: "MOVE_TO",
            destination: "TARGET",
            damage: false,
            effects: false,
            targetStep: false
        },
        {
            type: "ANIM",
            animationName: "PUNCH",
            damage: true,
            effects: false,
            targetStep: "HIT"
        },
        {
            type: "MOVE_TO",
            destination: "STARTING_POS",
            damage: false,
            effects: false,
            targetStep: false
        }        
    ],
    "CHAD_RAGE" : [
        {
            type: "MOVE_TO",
            destination: "TARGET",
            damage: false,
            effects: false,
            targetStep: false
        },
        {
            type: "ANIM",
            animationName: "CHAD_RAGE",
            damage: true,
            effects: false,
            targetStep: "HIT"
        },
        {
            type: "MOVE_TO",
            destination: "STARTING_POS",
            damage: false,
            effects: false,
            targetStep: false
        }        
    ],
    "NECKBEARD_HACK" : [
        {
            type: "ANIM",
            animationName: "NECKBEARD_HACK",
            damage: true,
            effects: false,
            targetStep: "HIT"
        }        
    ]
}