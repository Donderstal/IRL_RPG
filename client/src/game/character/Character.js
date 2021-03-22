const { BaseEntity } = require('../interfaces/I_BaseEntity')
const { Equipment } = require('./Equipment')

/**
 * ( INCOMPLETE )
 * The BaseEntity class is the base for all entities in the game that can do battle.
 * To do battle, they need equipment, experience, stats, etc.
 */
class Character extends BaseEntity {
    constructor( name, className, level ) { 
        super( name, className, level ) 
        this.setExperiencePointsFromLevel( );
        this.Equipment = new Equipment( );
        console.log(this)
    }
    
    addExperience( experiencePoints ) {
        this.Experience += experiencePoints;
        this.levelUpIfNeeded( );
    }
    /**
     * Check the amount of this.Experience. If this is higher than the currentlevel allows, level up and call onLevelUp.
     */
    levelUpIfNeeded( ) {
        let oldLevel = this.Level;
        this.Level = ( this.Experience / 100 );
        if ( this.Level != oldLevel ) {
            this.MaximumHitpoints = this.setMaximumHitpoints( )
            this.onLevelUp( );
        }
    }
    /**
     * call this characters' Attributes.levelUpStatsToGivenLeven method.
     * Then, call setHitAndPowerPointsToMax to restoure HP and PP to new max amounts.
     */
    onLevelUp( ) {
        this.Attributes.levelUpStatsToGivenLevel( this.Level );
        this.setHitAndPowerPointsToMax( )
    }
    /**
     * Call unequipItem method of this.Equipment with itemToUnequip as argument
     * @param {GameItem} itemToUnequip 
     */
    unequipItem( itemToUnequip ) {
        this.Equipment.unequipItem( itemToUnequip );
    }
    /**
     * Call equipItem method of this.Equipment with itemToEquip as argument
     * @param {GameItem} itemToUnequip 
     */
    equipItem( itemToEquip ) {
        this.Equipment.equipItem( itemToEquip );
    }
}

module.exports = {
    Character
}