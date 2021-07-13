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
    }
    get activeAttributeValues( ) { return this.getActiveAttributes( ) }

    getExperienceValue( ) {
        return this.Level * 2;
    }
    /**
     * Get a copied-by-value dictionary from the Attributes instance in this character.
     * Then, 
     */
    getActiveAttributes( ) {
        let attributes = super.getActiveAttributes( );
        return this.Equipment.applyEquipmentEffectsToAttributes( attributes );
    }
    /**
     * Return super.getActiveAttributes to bypass the characters' equipment values
     */
    getAttributesBeforeEquipment( ) {
        return super.getActiveAttributes( );
    }
    /**
     * Add given experience points to this.Experience and call this.levelUpIfNeeded.
     * @param {Number} experiencePoints 
     */
    addExperience( experiencePoints ) {
        this.Experience += experiencePoints;
        return this.levelUpIfNeeded( );
    }
    /**
     * Check the amount of this.Experience. If this is higher than the currentlevel allows, level up and call onLevelUp.
     */
    levelUpIfNeeded( ) {
        let oldLevel = this.Level;
        this.Level = Math.floor( this.Experience / 100 );
        if ( this.Level != oldLevel ) {
            this.onLevelUp( );
            return true;
        }

        return false;
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
    /**
     * Call this.unequip with the Id of the item at given slot
     * @param {String} slotName string corresponding to a prop name of the Equipment class
     */
    getItemIdOfItemInEquipmentSlot( slotName ) {
        if ( this.Equipment[slotName] != null ) {
            return this.Equipment[slotName].ItemTypeId;
        }
    }
}

module.exports = {
    Character
}