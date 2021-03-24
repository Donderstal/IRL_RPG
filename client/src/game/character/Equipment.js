const { 
    ITEM_CATEGORY_WEAPON, 
    ARMOR_TYPE_HEAD, ARMOR_TYPE_UPPER_BODY, 
    ARMOR_TYPE_LOWER_BODY, ARMOR_TYPE_ACCESSORY
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
        this.Weapon = null;
        this.UpperBody = null;
        this.LowerBody = null;
        this.Head = null;
        this.Accessory = null;  

        this.effects = {
            "Weapon": null,
            "UpperBody": null,
            "LowerBody": null,
            "Head": null,
            "Accessory": null
        }
    }
    /**
     * Set given item to this.Weapon
     * @param {GameItem} itemToSet 
     */
    setWeapon( itemToSet ) {
        this.Weapon = itemToSet;
        this.setEffectsForEquipment( "Weapon", itemToSet.effectsData );
    }
    /**
     * Set this.Weapon and associated this.effects prop to null
     */
    unsetWeapon( ) {
        this.Weapon = null;
        this.effects["Weapon"] = null;
    }
    /**
     * Set given item to this.UpperBody
     * @param {GameItem} itemToSet 
     */
    setUpperBody( itemToSet ) {
        this.UpperBody = itemToSet;
        this.setEffectsForEquipment( "UpperBody", itemToSet.effectsData );
    }
    /**
     * Set this.UpperBody and associated this.effects prop to null
     */
    unsetUpperBody( ) {
        this.UpperBody = null;
        this.effects["UpperBody"] = null;
    }
    /**
     * Set given item to this.LowerBody
     * @param {GameItem} itemToSet 
     */
    setLowerBody( itemToSet ) {
        this.LowerBody = itemToSet;
        this.setEffectsForEquipment( "LowerBody", itemToSet.effectsData );
    }
    /**
     * Set this.LowerBody and associated this.effects prop to null
     */
    unsetLowerBody( ) {
        this.LowerBody = null;
        this.effects["LowerBody"] = null;
    }
    /**
     * Set given item to this.Head
     * @param {GameItem} itemToSet 
     */
    setHead( itemToSet ) {
        this.Head = itemToSet;
        this.setEffectsForEquipment( "Head", itemToSet.effectsData );
    }
    /**
     * Set this.Head and associated this.effects prop to null
     */
    unsetHead( ) {
        this.Head = null;
        this.effects["Head"] = null;
    }
    /**
     * Set given item to this.Accessory
     * @param {GameItem} itemToSet 
     */
    setAccessory( itemToSet ) {
        this.Accessory = itemToSet;
        this.setEffectsForEquipment( "Accessory", itemToSet.effectsData );
    }
    /**
     * Set this.Accessory and associated this.effects prop to null
     */
    unsetAccessory( ) {
        this.Accessory = null;
        this.effects["Accessory"] = null;
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
     * Assign a StatusEffects instance to given key in this.effects.
     * Then, call the StatusEffects.addEffect method for each effect in the effectsData array.
     * @param {String} equipmentKey 
     * @param {Object} effectsData 
     */
    setEffectsForEquipment( equipmentKey, effectsData ) {
        this.effects[equipmentKey] = new StatusEffects( );
        effectsData.forEach( ( effect ) => {
            this.effects[equipmentKey].addEffect( 
                effect[ITEM_EFFECT_TYPE], effect[ITEM_EFFECT_ATTRIBUTE], effect[ITEM_EFFECT_VALUE], "INFINTE" 
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