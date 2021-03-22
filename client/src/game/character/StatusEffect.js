/**
 * A StatusEffect instance represents a single effect to a single Character Attribute.
 * It could decrease or increase a Attribute value. Or have some other effect, like paralysis.
 * It can be used to represent a temporary (de)buff, a state like paralysis or the effect of a piece of equipment.
 */

 class StatusEffect {
    constructor( attributeKey, effectType, effectValue, effectDuration ) {
        this.attributeEffected = attributeKey;
        // "BUFF" | "DEBUFF" | "TURN_BASED" | "ON_ATTACK" | "ON_DEFEND"
        this.type = effectType;

        this.effectValue = effectValue;
        this.maxTurnDuration = effectDuration;
        if ( effectDuration != "INFINITE" ) {
            this.currentTurn = 1;
        }
    }

    get hasExpired( ) { return this.currentTurn >= this.maxTurnDuration; };

    countTurn( ) {
        this.currentTurn++;
    }

    applyStatUpOrDown( attributeDictionary ) {
        if ( this.type == "BUFF" ) {
            attributeDictionary[this.attributeEffected] += this.effectValue;
        }
        else if ( this.type == "DEBUFF" ) {
            attributeDictionary[this.attributeEffected] -= this.effectValue;
        }
        return attributeDictionary;
    }
 }