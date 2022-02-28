const { BaseEntity } = require('../interfaces/I_BaseEntity')
const { getItemDataById } = require('../../resources/itemResources')

/**
 * ( INCOMPLETE )
 * The BaseEntity class is the base for all entities in the game that can do battle.
 * To do battle, they need equipment, experience, stats, etc.
 */
class Character extends BaseEntity {
    constructor( name, className, level ) { 
        super( name, className, level ) 
        this.setExperiencePointsFromLevel( );
        this.EquippedItemId = false;
    }

    get equippedItem() { return this.EquippedItemId ? getItemDataById(this.EquippedItemId) : this.EquippedItemId }
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
    unequipItem( ) {
        this.EquippedItemId = false;
    }
    /**
     * Call equipItem method of this.Equipment with itemToEquip as argument
     * @param {GameItem} itemToUnequip 
     */
    equipItem( itemToEquip ) {
        this.EquippedItemId = itemToEquip;
    }
}

module.exports = {
    Character
}