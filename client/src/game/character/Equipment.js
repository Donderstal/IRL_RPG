const { 
    ITEM_CATEGORY_WEAPON, 
    ARMOR_TYPE_HEAD, ARMOR_TYPE_UPPER_BODY, 
    ARMOR_TYPE_LOWER_BODY, ARMOR_TYPE_ACCESSORY,
    EQUIPMENT_KEY_WEAPON, EQUIPMENT_KEY_UPPERBODY,
    EQUIPMENT_KEY_LOWERBODY, EQUIPMENT_KEY_HEAD,
    EQUIPMENT_KEY_ACCESSORY
} = require('../../game-data/globals')

const { StatusEffects } = require('./StatusEffects');

const ITEM_EFFECT_TYPE = 0;
const ITEM_EFFECT_ATTRIBUTE = 1;
const ITEM_EFFECT_VALUE = 2;
/**
 * The Equipment class tracks which GameITems are currently equipped by a character.
 * There are five different slots for a GameITem: Weapon, UpperBody, LowerBody, Head, Accessory
 */
class Equipment {
    constructor( ) {
        this[EQUIPMENT_KEY_WEAPON] = null;
        this[EQUIPMENT_KEY_UPPERBODY] = null;
        this[EQUIPMENT_KEY_LOWERBODY] = null;
        this[EQUIPMENT_KEY_HEAD] = null;
        this[EQUIPMENT_KEY_ACCESSORY] = null;  

        this.effects = {
            [EQUIPMENT_KEY_WEAPON]: null,
            [EQUIPMENT_KEY_UPPERBODY]: null,
            [EQUIPMENT_KEY_LOWERBODY]: null,
            [EQUIPMENT_KEY_HEAD]: null,
            [EQUIPMENT_KEY_ACCESSORY]: null
        }
    }
    /**
     * Set given item to this.Weapon
     * @param {GameItem} itemToSet 
     */
    setWeapon( itemToSet ) {
        this[EQUIPMENT_KEY_WEAPON] = itemToSet;
        this.setEffectsForEquipment( EQUIPMENT_KEY_WEAPON, itemToSet.Effects );
    }
    /**
     * Set this.Weapon and associated this.effects prop to null
     */
    unsetWeapon( ) {
        this[EQUIPMENT_KEY_WEAPON] = null;
        this.effects[EQUIPMENT_KEY_WEAPON] = null;
    }
    /**
     * Set given item to this.UpperBody
     * @param {GameItem} itemToSet 
     */
    setUpperBody( itemToSet ) {
        this[EQUIPMENT_KEY_UPPERBODY] = itemToSet;
        this.setEffectsForEquipment( EQUIPMENT_KEY_UPPERBODY, itemToSet.Effects );
    }
    /**
     * Set this.UpperBody and associated this.effects prop to null
     */
    unsetUpperBody( ) {
        this[EQUIPMENT_KEY_UPPERBODY] = null;
        this.effects[EQUIPMENT_KEY_UPPERBODY] = null;
    }
    /**
     * Set given item to this.LowerBody
     * @param {GameItem} itemToSet 
     */
    setLowerBody( itemToSet ) {
        this[EQUIPMENT_KEY_LOWERBODY] = itemToSet;
        this.setEffectsForEquipment( EQUIPMENT_KEY_LOWERBODY, itemToSet.Effects );
    }
    /**
     * Set this.LowerBody and associated this.effects prop to null
     */
    unsetLowerBody( ) {
        this[EQUIPMENT_KEY_LOWERBODY] = null;
        this.effects[EQUIPMENT_KEY_LOWERBODY] = null;
    }
    /**
     * Set given item to this.Head
     * @param {GameItem} itemToSet 
     */
    setHead( itemToSet ) {
        this[EQUIPMENT_KEY_HEAD] = itemToSet;
        this.setEffectsForEquipment( EQUIPMENT_KEY_HEAD, itemToSet.Effects );
    }
    /**
     * Set this.Head and associated this.effects prop to null
     */
    unsetHead( ) {
        this[EQUIPMENT_KEY_HEAD] = null;
        this.effects[EQUIPMENT_KEY_HEAD] = null;
    }
    /**
     * Set given item to this.Accessory
     * @param {GameItem} itemToSet 
     */
    setAccessory( itemToSet ) {
        this[EQUIPMENT_KEY_ACCESSORY] = itemToSet;
        this.setEffectsForEquipment( EQUIPMENT_KEY_ACCESSORY, itemToSet.Effects );
    }
    /**
     * Set this.Accessory and associated this.effects prop to null
     */
    unsetAccessory( ) {
        this[EQUIPMENT_KEY_ACCESSORY] = null;
        this.effects[EQUIPMENT_KEY_ACCESSORY] = null;
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
     * 
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
    /**
     * Based on the items' Category and Type props, call a method to unequip it.
     * @param {GameItem} itemToSet 
     * 
     */
    returnItemAtSlotOfGivenItem( itemToSet ) {
        if ( itemToSet.Category == ITEM_CATEGORY_WEAPON ) {
            return this[EQUIPMENT_KEY_WEAPON];
        }
        else {
            switch( itemToSet.Type ) {
                case ARMOR_TYPE_HEAD:
                    return this[EQUIPMENT_KEY_HEAD];
                case ARMOR_TYPE_UPPER_BODY: 
                    return this[EQUIPMENT_KEY_UPPERBODY];
                case ARMOR_TYPE_LOWER_BODY:
                    return this[EQUIPMENT_KEY_LOWERBODY];
                case ARMOR_TYPE_ACCESSORY: 
                    return this[EQUIPMENT_KEY_ACCESSORY];  
            }
        }
        return false;
    }
    /**
     * Assign a StatusEffects instance to given key in this.effects.
     * Then, call the StatusEffects.addEffect method for each effect in the effectsData array.
     * @param {String} equipmentKey 
     * @param {Object} effectsData 
     */
    setEffectsForEquipment( equipmentKey, effectsData ) {
        this.effects[equipmentKey] = new StatusEffects( );
        effectsData.forEach( ( effect ) => {
            this.effects[equipmentKey].addEffect( 
               effect[ITEM_EFFECT_ATTRIBUTE], effect[ITEM_EFFECT_TYPE], effect[ITEM_EFFECT_VALUE], "INFINTE" 
            );
        })
    }
    /**
     * For each key in this.effects that is not null, apply the StatusEffects in that key to given attributeDictionary and return it
     * @param {Object} attributeDictionary 
     */
    applyEquipmentEffectsToAttributes( attributeDictionary ) {
        Object.keys( this.effects ).forEach( ( key ) => {
            if ( this.effects[key] != null ) {
                attributeDictionary = this.effects[key].applyStatusEffectsToAttributes( attributeDictionary )
            }
        });
        return attributeDictionary;
    }
}

module.exports = {
    Equipment
}