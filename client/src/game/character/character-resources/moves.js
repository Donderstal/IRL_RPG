const moves = {
    "Influencer": [
        {
            name        : "INF A",
            desc        : "INF A description.",
            damage_type : "STAT_UP"
        },
        {
            name        : "INF B",
            desc        : "INF B description.",
            damage_type : "HEAL"
        },
        {
            name        : "INF C",
            desc        : "INF C description.",
            damage_type : "ATTACK"
        },
        {
            name        : "INF D",
            desc        : "INF D description.",
            damage_type : "SP_ATTACK"
        }     
    ],
    "Neckbeard": [
        {
            name        : "NEC A",
            desc        : "NEC A description.",
            damage_type : "STAT_DOWN"
        },
        {
            name        : "NEC B",
            desc        : "NEC B description.",
            damage_type : "ATTR_UP"
        },
        {
            name        : "NEC C",
            desc        : "NEC C description.",
            damage_type : "ATTR_DOWN"
        },
        {
            name        : "INF D",
            desc        : "INF D description.",
            damage_type : "STATUS_EFFECT"
        }     
    ],
    "Chad": [
        {
            name        : "Protein powder",
            desc        : "Boost your attack for the next two turns with some tasty Banana flavord protein shakes.",
            damage_type : "Status up"
        },
        {
            name        : "Roid rage",
            desc        : "Sometimes I just get so angry!! Angry attack with varying effects",
            damage_type : "Attack"
        },
        {
            name        : "Skip leg day",
            desc        : "Punch twice next turn, with a boost to Attack. Your Defense will decrease afterwards",
            damage_type : "Attack"
        },
        {
            name        : "Steal girlfriend",
            desc        : "Break your opponents heart by seducing their special ladyfriend.",
            damage_type : "Status down"
        }     
    ],
    "Tumblr_Girl": [
        {
            name        : "Rally twitter crowd",
            desc        : "Expose your opponents microaggressions and mobilize support online.",
            damage_type : "Sp Damage"
        },
        {
            name        : "Hairspray",
            desc        : "How much hairspray can a person possibly need? Let's find out and cause Sp. Damage.",
            damage_type : "Sp Damage"
        },
        {
            name        : "Weird poetry",
            desc        : "Confuse your opponent with an intersectional autoethnography in rhyme",
            damage_type : "Sp Damage"
        },
        {
            name        : "Edgy commentary",
            desc        : "DESTROY the bigots using LOGIC and FACTS and decrease your opponents Sp Defense.",
            damage_type : "Status down"
        }
    ]
}

const getMovesByClass = ( className ) => {
    var classMoves = moves[className]
    classMoves.push({ name: "Return", desc: "Return to main menu" })
    return classMoves
}

module.exports = {
    getMovesByClass
}