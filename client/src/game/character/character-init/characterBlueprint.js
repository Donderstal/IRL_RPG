const randomNameGen = require('../../../helpers/randomNameGen')
const mathHelpers = require('../../../helpers/mathHelpers')
const initStats = require('./initStats')
const initMoves = require('./initMoves')

const state = require('../../../game-data/state')
const Sound = require('../../interfaces/I_Sound').Sound

class CharacterBlueprint {
    constructor( name, className ) {
        this.name           = name,
        this.gender         = ( className == "Influencer" || className == "Tumblr girl" ) ? "F" : "M",
        this.className      = className,
        
        this.level          = 1,
        this.experience     = 0

        this.traits         = initTraits( this.className, this.gender )
        this.stats          = initStats.calcStats(this.traits),
        this.moves          = initMoves.initMoves(this.classFocus);
    }

    receiveDamage(damage) {
        damage -= this.stats.Defense
        if ( damage > 0 ) {
            const sfx = new Sound( "misc/random6.wav", true )
            sfx.play()
            state.battleState.currentMoveDamage = damage
            this.stats.Health -= damage     
            if ( this.stats.Health < 0 ) {
                this.stats.Health = 0
            }            
        }
    }

    receiveSpDamage(damage) {
        damage -= this.stats.Defense
        if ( damage > 0 ) {
            state.battleState.currentMoveDamage = damage
            this.stats.Health -= damage                
        }
    }

    changeStats (stat, num) {

    }

    changeTraits () {
        
    }

    setLevel ( level ) {
        this.level = level
    }
}

const initTraits = ( className, gender ) => {
    let rawTraits = getRawTraits( gender )

    if ( className == "Influencer" ) {
        return {
            STR : rawTraits.STR + 2,
            END : rawTraits.END - 1,
            INT : rawTraits.INT - 2,
            AGI : rawTraits.AGI,
            CHA : rawTraits.CHA + 2,
            FIN : rawTraits.FIN - 1
        }
    }
    if ( className == "Chad" ) {
        return {
            STR : rawTraits.STR + 2,
            END : rawTraits.END + 2,
            INT : rawTraits.INT - 3,
            AGI : rawTraits.AGI + 2,
            CHA : rawTraits.CHA,
            FIN : rawTraits.FIN - 3
        }
    }
    if ( className == "Tumblr_Girl" ) {
        return {
            STR : rawTraits.STR - 2,
            END : rawTraits.END + 2,
            INT : rawTraits.INT + 3,
            AGI : rawTraits.AGI - 1,
            CHA : rawTraits.CHA - 2,
            FIN : rawTraits.FIN
        }
    }
    if ( className == "Neckbeard" ) {
        return {
            STR : rawTraits.STR,
            END : rawTraits.END - 1,
            INT : rawTraits.INT + 3,
            AGI : rawTraits.AGI - 1,
            CHA : rawTraits.CHA - 5,
            FIN : rawTraits.FIN
        }
    }
}

const getRawTraits = ( gender ) => {
    let rawTraits = {
        STR : 5, END : 5, INT : 5,
        AGI : 5, CHA : 5, FIN : 5,
    }

    if ( gender === 'Female' ) {
        rawTraits.STR - 1
        rawTraits.AGI + 1
    }
    if ( gender === 'Male' ) {
        rawTraits.STR + 1
        rawTraits.AGI - 1
    }

    return rawTraits
}

module.exports = {
    CharacterBlueprint
}