const moves = {
    "Influencer": [
        {
            name        : "INF A",
            desc        : "INF A description.",
            type        : "STAT_UP",
            attribute   : "CHA",
            turns       : 3,
            animation   : [ 3, 4, 5, 6, 7 ]
        },
        {
            name        : "INF B",
            desc        : "INF B description.",
            type        : "HEAL",
            attribute   : "END",
            animation   : [ 3, 4, 5, 6, 7, 6, 7, 6, 7 ]
        },
        {
            name        : "INF C",
            desc        : "INF C description.",
            type        : "ATTACK",
            attribute   : "ATH",
            animation   : [ 4, 5, 3 ]
        },
        {
            name        : "INF D",
            desc        : "INF D description.",
            type        : "SP_ATTACK",
            attribute   : "CHA",
            animation   : [ 2, 3, 2, 3, 2 ]
        }     
    ],
    "Neckbeard": [
        {
            name        : "NEC A",
            desc        : "NEC A description.",
            type        : "STAT_DOWN",
            attribute   : "MYS",
            turns       : 3,
            animation   : [ 3, 4, 5, 6, 7, 8 ]
        },
        {
            name        : "NEC B",
            desc        : "NEC B description.",
            type        : "ATR_UP",
            attribute   : "INT",
            turns       : 2,
            animation   : [ 3, 1, 3, 1, 2 ]
        },
        {
            name        : "NEC C",
            desc        : "NEC C description.",
            type        : "ATR_DOWN",
            attribute   : "WIS",
            turns       : 3,
            animation   : [ 8, 7, 6, 5, 4, 3 ]
        },
        {
            name        : "NEC D",
            desc        : "NEC D description.",
            type        : "STATUS_EFFECT",
            attribute   : 5,
            animation   : [ 1, 2, 1, 2, 1, 2 ]
        }     
    ],
    "Chad": [
        {
            name        : "CHA A",
            desc        : "CHA A description.",
            type        : "STAT_UP",
            attribute   : "CHA",
            turns       : 3
        },
        {
            name        : "CHA B",
            desc        : "CHA B description.",
            type        : "HEAL",
            attribute   : "END"
        },
        {
            name        : "CHA C",
            desc        : "CHA C description.",
            type        : "ATTACK",
            attribute   : "ATH"
        },
        {
            name        : "CHA D",
            desc        : "CHA D description.",
            type        : "SP_ATTACK",
            attribute   : "CHA"
        }        
    ],
    "Tumblr_Girl": [
        {
            name        : "TUM A",
            desc        : "TUM A description.",
            type        : "SP_ATTACK",
            attribute   : "INT"
        },
        {
            name        : "TUM B",
            desc        : "TUM B description",
            type        : "SP_ATTACK",
            attribute   : "INT"
        },
        {
            name        : "TUM C",
            desc        : "TUM C description",
            type        : "Sp Damage"
        },
        {
            name        : "TUM D",
            desc        : "TUM D description",
            type        : "Status down"
        }
    ]
}

const getMovesByClass = ( className ) => {
    var classMoves = moves[className]
    if ( classMoves.length < 5 ) {
        classMoves.push({ name: "Return", desc: "Return to main menu" })        
    }

    return classMoves
}

module.exports = {
    getMovesByClass
}