const randomNameGen = require('../../helpers/randomNameGen')
const mathHelpers = require('../../helpers/mathHelpers')

class characterBlueprint {
    constructor(name, gender) {
        this.name = name || randomNameGen.getRandomName(),
        this.gender = gender || mathHelpers.getRandomGender(),
        this.level = 1,
        this.experience = 0

        this.receiveDamage = (damage) => {
            damage -= this.stats.Defense
            damage = damage < 0 ? 0 : damage
            this.stats.Health -= damage
        }

        this.receiveManaDamage = (damage) => {
            damage -= this.stats.Defense
            damage = damage < 0 ? 0 : damage
            this.stats.Mana -= damage
        }
    
        this.changeStats = (stat, num) => {
    
        }
    
        this.changeSkills = () => {
            
        }
    
        this.changeTraits = () => {
            
        }
    
    }
}

module.exports = {
    characterBlueprint,

    getBaseTraits : ( gender )=>  {
        const charGender = gender || 0
    
        const baseTraits = {
            STR : 5,
            END : 5,
            INT : 5,
            AGI : 5,
            CHA : 5,
            FIN : 5,
        }
    
        if ( charGender === 'Female' ) {
            baseTraits.STR - 1
            baseTraits.AGI + 1
            return baseTraits
        }
    
        if ( charGender === 'Male' ) {
            baseTraits.STR + 1
            baseTraits.AGI - 1
            return baseTraits
        }
    
        return baseTraits
    }
}