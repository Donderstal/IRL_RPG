/**
 * The Attribute class represents one attribute of a character.
 * For example Speed, Attack or Special Defense.
 * At its core, it has a name, numerical value and a modifier.
 * When a character levels up, the attributes value is increased by the modifier.
 */

class Attribute {
    constructor( name, baseValue, modifier ) {
        this.name       = name;
        this.baseValue  = baseValue;
        this.modifier   = modifier;
    }

    get value( ) { return this.baseValue; };
    /**
     * Multiply this.baseValue by this.modifier;
     */
    onLevelUp( ) {
        this.baseValue = this.baseValue * this.modifier;
    }
}