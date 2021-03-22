const { 
    ATT_HEALTH_POINTS, ATT_POWER_POINTS, ATT_PH_ATTACK, ATT_PH_DEFENSE,
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK
}= require('../../game-data/globals');
const { Attribute } = require('./Attribute');
const BASE_ATTRIBUTE_VALUE = 20;
/**
 * The CharacterAttributes class is a dictionary with string keys and Attribute Instances as values.
 * It represents the set of Attributes that each BaseEntity extension has, stored in the BaseAttributes property.
 * It also contains various methods for calculating the current values of Attributes, taking Equipment and status effects into account.
 */
class CharacterAttributes {
    constructor( attributeModifiers ) {
        this["INNER_" + ATT_HEALTH_POINTS] = new Attribute( ATT_HEALTH_POINTS, BASE_ATTRIBUTE_VALUE * 2, attributeModifiers[ATT_HEALTH_POINTS] );
        this["INNER_" + ATT_POWER_POINTS] = new Attribute( ATT_POWER_POINTS, BASE_ATTRIBUTE_VALUE * 2, attributeModifiers[ATT_POWER_POINTS] );

        this["INNER_" + ATT_PH_ATTACK] = new Attribute( ATT_PH_ATTACK, BASE_ATTRIBUTE_VALUE, attributeModifiers[ATT_PH_ATTACK] );
        this["INNER_" + ATT_PH_DEFENSE] = new Attribute( ATT_PH_DEFENSE, BASE_ATTRIBUTE_VALUE, attributeModifiers[ATT_PH_DEFENSE] );

        this["INNER_" + ATT_SP_ATTACK] = new Attribute( ATT_SP_ATTACK, BASE_ATTRIBUTE_VALUE, attributeModifiers[ATT_SP_ATTACK] );
        this["INNER_" + ATT_SP_DEFENSE] = new Attribute( ATT_SP_DEFENSE, BASE_ATTRIBUTE_VALUE, attributeModifiers[ATT_SP_DEFENSE] );
        
        this["INNER_" + ATT_SPEED] = new Attribute( ATT_SPEED, BASE_ATTRIBUTE_VALUE, attributeModifiers[ATT_SPEED] );
        this["INNER_" + ATT_LUCK] = new Attribute( ATT_LUCK, BASE_ATTRIBUTE_VALUE, attributeModifiers[ATT_LUCK] );

        this.list = [
            this["INNER_" + ATT_HEALTH_POINTS],
            this["INNER_" + ATT_POWER_POINTS],
            this["INNER_" + ATT_PH_ATTACK],
            this["INNER_" + ATT_PH_DEFENSE],
            this["INNER_" + ATT_SP_ATTACK],
            this["INNER_" + ATT_SP_DEFENSE],
            this["INNER_" + ATT_SPEED],
            this["INNER_" + ATT_LUCK]
        ]
    };

    get [ATT_HEALTH_POINTS]( ) { return this["INNER_" + ATT_HEALTH_POINTS].value; };
    get [ATT_POWER_POINTS]( ) { return this["INNER_" + ATT_POWER_POINTS].value; };

    get [ATT_PH_ATTACK]( ) { return this["INNER_" + ATT_PH_ATTACK].value; };
    get [ATT_PH_DEFENSE]( ) { return this["INNER_" + ATT_PH_DEFENSE].vale; };

    get [ATT_SP_ATTACK]( ) { return this["INNER_" + ATT_SP_ATTACK].value; };
    get [ATT_SP_DEFENSE]( ) { return this["INNER_" + ATT_SP_DEFENSE].value; };

    get [ATT_SPEED]( ) { return this["INNER_" + ATT_SPEED].value; };
    get [ATT_LUCK]( ) { return this["INNER_" + ATT_LUCK].value; };
    /**
     * Call the onLevelUp method for each attribute in this.list;
     */
    onLevelUp( ) {
        this.list.forEach( ( attribute ) => {
            attribute.onLevelUp( );
        });
    }
    /**
     * @returns Dictionary with Attr names as keys and their current value as value
     */
    getAttributes( ) {
        return {
            [ATT_HEALTH_POINTS]: this[ATT_HEALTH_POINTS],
            [ATT_POWER_POINTS]: this[ATT_POWER_POINTS],
            [ATT_PH_ATTACK]: this[ATT_PH_ATTACK],
            [ATT_PH_DEFENSE]: this[ATT_PH_DEFENSE],
            [ATT_SP_ATTACK]: this[ATT_SP_ATTACK],
            [ATT_SP_DEFENSE]: this[ATT_SP_DEFENSE],
            [ATT_SPEED]: this[ATT_SPEED],
            [ATT_LUCK]: this[ATT_LUCK]
        }
    }
}

module.exports = {
    CharacterAttributes
}