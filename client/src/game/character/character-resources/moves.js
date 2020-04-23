const moves = {
    "Influencer": [
        {
            name        : "Get sponsorship",
            desc        : "Get sponsored by a company attempting to hide their human rights abuses.",
            damage_type : "Status up"
        },
        {
            name        : "Twitter block",
            desc        : "Punish your opponent by blocking them on twitter and reducing their Sp. Attack.",
            damage_type : "Status up"
        },
        {
            name        : "Call fuckboy",
            desc        : "Check if one of your Chad fuckboys can beat your opponents up.",
            damage_type : "Attack"
        },
        {
            name        : "Fitgirl workout",
            desc        : "Do a #workout to increase your attack.",
            damage_type : "Status up"
        }     
    ],
    "Neckbeard": [
        {
            name        : "Doxx opponent",
            desc        : "Share your opponents personal information with some weird anons on 4Chan.",
            damage_type : "Sp Damage"
        },
        {
            name        : "Dorito farts",
            desc        : "Everything that goes in must come back out again.",
            damage_type : "Sp Damage"
        },
        {
            name        : "Induce cringe",
            desc        : "Discuss one of your interests, like My Little Pony fanfics",
            damage_type : "Sp Damage"
        },
        {
            name        : "Edgy commentary",
            desc        : "DESTROY the libtards using LOGIC and FACTS and decrease your opponents Sp Defense.",
            damage_type : "Status down"
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