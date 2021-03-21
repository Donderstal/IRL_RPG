const { 
    MODI_VERY_LOW, MODI_LOW, MODI_STANDARD, MODI_HIGH, MODI_VERY_HIGH
}= require('../../game-data/globals');

const MODIFIER_VALUES = {};
MODIFIER_VALUES[MODI_VERY_LOW] = 1.03;
MODIFIER_VALUES[MODI_LOW] = 1.04;
MODIFIER_VALUES[MODI_STANDARD] = 1.05;
MODIFIER_VALUES[MODI_HIGH] = 1.06;
MODIFIER_VALUES[MODI_VERY_HIGH] = 1.07
/**
 * The Attribute class represents one attribute of a character.
 * For example Speed, Attack or Special Defense.
 * At its core, it has a name, numerical value and a modifier.
 * When a character levels up, the attributes value is increased by the modifier.
 */
class Attribute {
    constructor( name, baseValue, modifierType ) {
        this.name       = name;
        this.baseValue  = baseValue;
        this.modifier   = MODIFIER_VALUES[modifierType];
    }

    get value( ) { return this.baseValue; };
    /**
     * Multiply this.baseValue by this.modifier;
     */
    onLevelUp( ) {
        this.baseValue = this.baseValue * this.modifier;
    }
}

module.exports = {
    Attribute
}