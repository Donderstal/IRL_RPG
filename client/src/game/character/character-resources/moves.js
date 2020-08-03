const moves = {
    "influencer": [
        {
            name        : "INF A",
            desc        : "INF A description.",
            type        : "STAT_UP",
            attribute   : "CHA",
            turns       : 3,
            animation   : "PUNCH"
        },
        {
            name        : "INF B",
            desc        : "INF B description.",
            type        : "HEAL",
            attribute   : "END",
            animation   : "PUNCH"
        },
        {
            name        : "INF C",
            desc        : "INF C description.",
            type        : "ATTACK",
            attribute   : "ATH",
            animation   : "PUNCH"
        },
        {
            name        : "INF D",
            desc        : "INF D description.",
            type        : "SP_ATTACK",
            attribute   : "CHA",
            animation   : "PUNCH"
        }     
    ],
    "neckbeard": [
        {
            name        : "NEC A",
            desc        : "NEC A description.",
            type        : "STAT_DOWN",
            attribute   : "MYS",
            turns       : 3,
            animation   : "PUNCH"
        },
        {
            name        : "NEC B",
            desc        : "NEC B description.",
            type        : "ATR_UP",
            attribute   : "INT",
            turns       : 2,
            animation   : "NECKBEARD_HACK"
        },
        {
            name        : "NEC C",
            desc        : "NEC C description.",
            type        : "ATR_DOWN",
            attribute   : "WIS",
            turns       : 3,
            animation   : "NECKBEARD_HACK"
        },
        {
            name        : "NEC D",
            desc        : "NEC D description.",
            type        : "STATUS_EFFECT",
            attribute   : 5,
            animation   : "NECKBEARD_HACK"
        }     
    ],
    "chad": [
        {
            name        : "CHA A",
            desc        : "CHA A description.",
            type        : "STAT_UP",
            attribute   : "CHA",
            turns       : 3,
            animation   : "PUNCH"
        },
        {
            name        : "CHA B",
            desc        : "CHA B description.",
            type        : "HEAL",
            attribute   : "END",
            animation   : "PUNCH"
        },
        {
            name        : "CHA C",
            desc        : "CHA C description.",
            type        : "ATTACK",
            attribute   : "ATH",
            animation   : "PUNCH"
        },
        {
            name        : "CHA D",
            desc        : "CHA D description.",
            type        : "SP_ATTACK",
            attribute   : "CHA",
            animation   : "PUNCH"
        }        
    ],
    "tumblr_girl": [
        {
            name        : "TUM A",
            desc        : "TUM A description.",
            type        : "SP_ATTACK",
            attribute   : "INT",
            animation   : "PUNCH"
        },
        {
            name        : "TUM B",
            desc        : "TUM B description",
            type        : "SP_ATTACK",
            attribute   : "INT",
            animation   : "PUNCH"
        },
        {
            name        : "TUM C",
            desc        : "TUM C description",
            type        : "Sp Damage",
            animation   : "PUNCH"
        },
        {
            name        : "TUM D",
            desc        : "TUM D description",
            type        : "Status down",
            animation   : "PUNCH"
        }
    ]
}

const getMovesByClass = ( className ) => {
    var classMoves = moves[className]
    if ( classMoves.length < 5 ) {
        classMoves.push({ name: "RETURN", desc: "Return to main menu" })        
    }

    return classMoves
}

module.exports = {
    getMovesByClass
}