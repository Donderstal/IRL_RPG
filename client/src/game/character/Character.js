const { BaseEntity } = require('../interfaces/I_BaseEntity')

class Character extends BaseEntity {
    constructor( name, hitPointsModifier, attributes, level, weapon = null ) { 
        super( name, hitPointsModifier, attributes, level, weapon ) 
        this.setExperiencePointsFromLevel( );
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
}

module.exports = {
    Character
}