const { BaseEntity } = require('../interfaces/I_BaseEntity')
const { Equipment } = require('./Equipment')

class Character extends BaseEntity {
    constructor( name, hitPointsModifier, attributes, level, weapon = null ) { 
        super( name, hitPointsModifier, attributes, level, weapon ) 
        this.setExperiencePointsFromLevel( );
        this.Equipment = new Equipment( );
        console.log(this)
    }
    
    addExperience( experiencePoints ) {
        this.Experience += experiencePoints;
        this.levelUpIfNeeded( );
    }

    levelUpIfNeeded( ) {
        let oldLevel = this.Level;
        this.Level = ( ExperiencePoints / 100 );
        if ( this.Level != oldLevel ) {
            this.MaximumHitpoints = this.setMaximumHitpoints( )
            this.onLevelUp( );
        }
    }

    onLevelUp( ) {
        console.log(this.Name + " is now level " + this.Level)
    }

    unequipItem( itemToUnequip ) {
        this.Equipment.unequipItem( itemToUnequip );
    }

    equipItem( itemToEquip ) {
        this.Equipment.equipItem( itemToEquip );
    }
}

module.exports = {
    Character
}