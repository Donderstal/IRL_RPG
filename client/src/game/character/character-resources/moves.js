const moves = {
    "influencer": [
        {
            name        : "Sic",
            desc        : "Quis autem vel eum iure.",
            type        : "STAT_UP",
            attribute   : "APPEARANCE",
            turns       : 3,
            animation   : "PUNCH",
            moveTo      : true,
            factor      : 20,
        },
        {
            name        : "Lorem ipsum",
            desc        : "ipsum lorem totam rem.",
            type        : "HEAL",
            attribute   : "CHARISMA",
            animation   : "CHAD_RAGE",
            moveTo      : true,
            factor      : 20,
        },
        {
            name        : "Totam",
            desc        : "totam rem aperiam!",
            type        : "ATTACK",
            attribute   : "APPEARANCE",
            animation   : "PUNCH",
            factor      : 10,
            moveTo      : false
        },
        {
            name        : "occaecat",
            desc        : "Excepteur sint occaecat cupidatat",
            type        : "ATTACK",
            attribute   : "SOCIALISATION",
            animation   : "CHAD_RAGE",
            moveTo      : false,
            factor      : 5
        }     
    ],
    "neckbeard": [
        {
            name        : "Lorem",
            desc        : "Duis aute irure dolor in reprehenderit.",
            type        : "STAT_DOWN",
            attribute   : "SELF_AWARENESS",
            turns       : 3,
            animation   : "PUNCH",
            moveTo      : true,
            factor      : 5
        },
        {
            name        : "ipsum",
            desc        : "Bibendum at varius vel pharetra!",
            type        : "ATR_UP",
            attribute   : "WILLPOWER",
            turns       : 2,
            animation   : "NECKBEARD_HACK",
            factor      : 10,
            moveTo      : false
        },
        {
            name        : "dolor sit amet",
            desc        : "Duis aute irure dolor.",
            type        : "ATR_DOWN",
            attribute   : "INTELLIGENCE",
            turns       : 3,
            animation   : "NECKBEARD_HACK",
            factor      : 20,
            moveTo      : false
        },
        {
            name        : "consectetur",
            desc        : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
            type        : "STATUS_EFFECT",
            attribute   : "INTELLIGENCE",
            animation   : "NECKBEARD_HACK",
            factor      : 20,
            moveTo      : false
        }     
    ],
    "chad": [
        {
            name        : "Mattis",
            desc        : "tempor incididunt ut labore et dolore magna.",
            type        : "STAT_UP",
            attribute   : "STRENGTH",
            turns       : 3,
            animation   : "PUNCH",
            moveTo      : true,           
            factor      : 35
        },
        {
            name        : "Neque sodales",
            desc        : "Tellus cras adipiscing enim eu turpis.",
            type        : "HEAL",
            attribute   : "ENDURANCE",
            animation   : "CHAD_RAGE",
            moveTo      : true,
            factor      : 10
        },
        {
            name        : "Pellentesque",
            desc        : "CHA C description.",
            type        : "ATTACK",
            attribute   : "STRENGTH",
            animation   : "CHAD_RAGE",
            moveTo      : true,
            factor      : 5
        },
        {
            name        : "Risus at",
            desc        : "voluptatem accusantium doloremque.",
            type        : "SP_ATTACK",
            attribute   : "AGILITY",
            animation   : "PUNCH", 
            moveTo      : true,          
            factor      : 20
        }        
    ],
    "tumblr_girl": [
        {
            name        : "TUM A",
            desc        : "TUM A description.",
            type        : "SP_ATTACK",
            attribute   : "WILLPOWER",
            animation   : "PUNCH", 
            moveTo      : true,          
            factor      : 20
        },
        {
            name        : "TUM B",
            desc        : "TUM B description",
            type        : "SP_ATTACK",
            attribute   : "SELF_AWARENESS",
            animation   : "PUNCH", 
            moveTo      : true,          
            factor      : 5
        },
        {
            name        : "TUM C",
            desc        : "TUM C description",
            type        : "Sp Damage",
            attribute   : "INTELLIGENCE", 
            animation   : "CHAD_RAGE", 
            moveTo      : true,          
            factor      : 50
        },
        {
            name        : "TUM D",
            desc        : "TUM D description",
            type        : "Status down",
            attribute   : "WILLPOWER",
            animation   : "PUNCH", 
            moveTo      : true,          
            factor      : 20
        }
    ]
}

const getMovesByClass = ( className ) => {
    return moves[className]
}

module.exports = {
    getMovesByClass
}