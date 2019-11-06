const initCharacter = require('./characterBlueprint')
const initSkills = require('./initSkills')
const initStats = require('./initStats')
const initMoves = require('./initMoves')

class Influencer extends initCharacter.characterBlueprint {
    constructor (name, gender) {
        super(name, gender),

        this.className    = "Influencer",

        this.classFocus   = [ "STR", "CHA" ],

        this.description  = "Attractive but unintelligent, the influencer relies on their Fitness and Beauty. Well suited for a light weapons and high Charisma build.",

        this.uniqueAttack = {
            'Break the internet' : { 
                description: 'Distracts the opponent based on the Influencers Attractiveness. More effective against characters who have low Beauty, Fitness and Speech skills.' 
            }
        },

        this.traits         = this.initTraits( this.gender ),

        this.skills         = initSkills.calcSkills(this.traits),
        
        this.stats          = initStats.calcStats(this.traits),
        
        this.moves          = initMoves.initMoves(this.classFocus);
    }

    initTraits( gender ) {
        let baseTraits = initCharacter.getBaseTraits( gender )
        return {
            STR : baseTraits.STR + 2,
            END : baseTraits.END - 1,
            INT : baseTraits.INT - 2,
            AGI : baseTraits.AGI,
            CHA : baseTraits.CHA + 2,
            FIN : baseTraits.FIN - 1
        }
    }
}

class Athlete extends initCharacter.characterBlueprint {
    constructor (name, gender) {
        super(name, gender),

        this.className     = "Athlete",

        this.classFocus   = [ "STR", "AGI" ],

        this.description   = "The athlete is a class based on physical traits: Strength, Agility and Endurance. The exclusive focus on sports in their education means a severe lack in other traits, especially Finance and Intelligence",

        this.uniqueAttack  = {
            'Push it to the limit!' : { 
                description: 'Temporarily gives a strong buff to Strength and Agility. Afterwards, the Endurance of the Athlete is severly debuffed.'
            }
        },

        this.traits         = this.initTraits( this.gender ),

        this.skills         = initSkills.calcSkills(this.traits),
        
        this.stats          = initStats.calcStats(this.traits),
        
        this.moves          = initMoves.initMoves(this.classFocus);
    }

    initTraits( gender ) {
        let baseTraits = initCharacter.getBaseTraits( gender )
        return {
            STR : baseTraits.STR + 2,
            END : baseTraits.END + 2,
            INT : baseTraits.INT - 3,
            AGI : baseTraits.AGI + 2,
            CHA : baseTraits.CHA,
            FIN : baseTraits.FIN - 3
        }
    }
}

class Developer extends initCharacter.characterBlueprint {
    constructor (name, gender) {
        super(name, gender),

        this.className     = "Developer",

        this.classFocus   = [ "END", "INT" ],

        this.description   = "Skilled but unattractive, the developer likes to play it safe. High Intelligence and Endurance stats.  Might have anxious reactions to social contact or attractive people.",

        this.uniqueAttack  = {
            'Sprint review' : { 
                description: 'Greatly increases the developers Willpower, Perception and Wisdom. Has a small chance of backfiring and sharply lowering Endurance stats.' 
            }
        },

        this.traits         = this.initTraits( this.gender ),

        this.skills         = initSkills.calcSkills(this.traits),
        
        this.stats          = initStats.calcStats(this.traits),
        
        this.moves          = initMoves.initMoves(this.classFocus);
    }

    initTraits( gender ) {
        let baseTraits = initCharacter.getBaseTraits( gender )
        return {
            STR : baseTraits.STR - 2,
            END : baseTraits.END + 2,
            INT : baseTraits.INT + 3,
            AGI : baseTraits.AGI - 1,
            CHA : baseTraits.CHA - 2,
            FIN : baseTraits.FIN
        }
    }
}

class Neckbeard extends initCharacter.characterBlueprint {
    constructor (name, gender) {
        super(name, gender),

        this.className     = "Neckbeard",

        this.classFocus   = [ "INT" ],

        this.description   = "The internet neckbeard has a lot in common with the developer, but lacks their Endurance. This high-intelligence, low everything-else class is one of the most difficult to use effectively.",

        this.uniqueAttack  = {
            'Induce cringe' : { 
                description: 'Deals damage by inducing intense cringe in the opponent. Damage dealt is based on the Intelligence and Charisma traits.' 
            }
        },

        this.traits         = this.initTraits( this.gender ),

        this.skills         = initSkills.calcSkills(this.traits),
        
        this.stats          = initStats.calcStats(this.traits),
        
        this.moves          = initMoves.initMoves(this.classFocus);
    }

    initTraits( gender ) {
        let baseTraits = initCharacter.getBaseTraits( gender )
        return {
            STR : baseTraits.STR,
            END : baseTraits.END - 1,
            INT : baseTraits.INT + 3,
            AGI : baseTraits.AGI - 1,
            CHA : baseTraits.CHA - 5,
            FIN : baseTraits.FIN
        }
    }
}

const classEnumerable = {
    'influencer' : () => {
        return new Influencer
    },
    'developer' : () => {
        return new Developer
    },
    'athlete' : () => {
        return new Athlete
    },
    'neckbeard' : () => {
        return new Neckbeard
    }
}

module.exports = {
    classEnumerable
}