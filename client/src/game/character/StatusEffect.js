const { EFFECT_TYPE_DEBUFF, EFFECT_TYPE_BUFF } = require("../../game-data/globals");

/**
 * A StatusEffect instance represents a single effect to a single Character Attribute.
 * It could decrease or increase a Attribute value. Or have some other effect, like paralysis.
 * It can be used to represent a temporary (de)buff, a state like paralysis or the effect of a piece of equipment.
 */
class StatusEffect {
    constructor( id, attributeKey, effectType, effectValue, effectDuration ) {
        this.uniqueId = id;
        this.attributeEffected = attributeKey;
        // "BUFF" | "DEBUFF" | "TURN_BASED" | "ON_ATTACK" | "ON_DEFEND"
        this.type = effectType;

        this.effectValue = effectValue;
        this.maxTurnDuration = effectDuration;
        if ( effectDuration != "INFINITE" ) {
            this.currentTurn = 1;
        }
    }

    get hasExpired( ) { return this.currentTurn >= this.maxTurnDuration && this.maxTurnDuration != "INFINITE"; };
    /**
     * Increment this.currentTurn
     */
    countTurn( ) {
        this.currentTurn++;
    }
    /**
     * Add or subtract this.effectValue to this.attributeEffected in given dictionary
     * @param {Object<String, Number>} attributeDictionary 
     */
    applyStatUpOrDown( attributeDictionary ) {
        if ( this.type == EFFECT_TYPE_BUFF ) {
            attributeDictionary[this.attributeEffected] += this.effectValue;
        }
        else if ( this.type == EFFECT_TYPE_DEBUFF ) {
            attributeDictionary[this.attributeEffected] -= this.effectValue;
        }
        return attributeDictionary;
    }
}

module.exports = {
    StatusEffect
}