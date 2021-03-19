const { 
    ITEM_CATEGORY_WEAPON, 
    ARMOR_TYPE_HEAD, ARMOR_TYPE_UPPER_BODY, 
    ARMOR_TYPE_LOWER_BODY, ARMOR_TYPE_ACCESSORY
} = require('../../game-data/globals')
/**
 * The Equipment class tracks which GameITems are currently equipped by a character.
 * There are five different slots for a GameITem: Weapon, UpperBody, LowerBody, Head, Accessory
 */
class Equipment {
    constructor( ) {
        this.Weapon = null;
        this.UpperBody = null;
        this.LowerBody = null;
        this.Head = null;
        this.Accessory = null;
    }
    /**
     * Set given item to this.Weapon
     * @param {GameItem} itemToSet 
     */
    setWeapon( itemToSet ) {
        this.Weapon = itemToSet;
    }
    /**
     * Set this.Weapon to null
     */
    unsetWeapon( ) {
        this.Weapon = null;
    }
    /**
     * Set given item to this.UpperBody
     * @param {GameItem} itemToSet 
     */
    setUpperBody( itemToSet ) {
        this.UpperBody = itemToSet;
    }
    /**
     * Set this.UpperBody to null
     */
    unsetUpperBody( ) {
        this.UpperBody = null;
    }
    /**
     * Set given item to this.LowerBody
     * @param {GameItem} itemToSet 
     */
    setLowerBody( itemToSet ) {
        this.LowerBody = itemToSet;
    }
    /**
     * Set this.LowerBody to null
     */
    unsetLowerBody( ) {
        this.LowerBody = null;
    }
    /**
     * Set given item to this.Head
     * @param {GameItem} itemToSet 
     */
    setHead( itemToSet ) {
        this.Head = itemToSet;
    }
    /**
     * Set this.Head to null
     */
    unsetHead( ) {
        this.Head = null;
    }
    /**
     * Set given item to this.Accessory
     * @param {GameItem} itemToSet 
     */
    setAccessory( itemToSet ) {
        this.Accessory = itemToSet;
    }
    /**
     * Set this.Accessory to null
     */
    unsetAccessory( ) {
        this.Accessory = null;
    }
    /**
     * Based on the items' Category and Type props, call a method to equip it.
     * @param {GameItem} itemToSet 
     */
    equipItem( itemToSet ) {
        if ( itemToSet.Category == ITEM_CATEGORY_WEAPON ) {
            this.setWeapon( itemToSet );
        }
        else {
            switch( itemToSet.Type ) {
                case ARMOR_TYPE_HEAD:
                    this.setHead( itemToSet );
                    break;
                case ARMOR_TYPE_UPPER_BODY: 
                    this.setUpperBody( itemToSet );
                    break;
                case ARMOR_TYPE_LOWER_BODY:
                    this.setLowerBody( itemToSet );
                    break;
                case ARMOR_TYPE_ACCESSORY: 
                    this.setAccessory( itemToSet );
                    break;
            }
        }
    }
    /**
     * Based on the items' Category and Type props, call a method to unequip it.
     * @param {GameItem} itemToSet 
     */
    unequipItem( itemToSet ) {
        if ( itemToSet.Category == ITEM_CATEGORY_WEAPON ) {
            this.unsetWeapon( );
        }
        else {
            switch( itemToSet.Type ) {
                case ARMOR_TYPE_HEAD:
                    this.unsetHead( );
                    break;
                case ARMOR_TYPE_UPPER_BODY: 
                    this.unsetUpperBody( );
                    break;
                case ARMOR_TYPE_LOWER_BODY:
                    this.unsetLowerBody( );
                    break;
                case ARMOR_TYPE_ACCESSORY: 
                    this.unsetAccessory( );
                    break;
            }
        }
    }
}

module.exports = {
    Equipment
}