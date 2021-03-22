const { getUniqueId } = require("../../helpers/utilFunctions");
const { StatusEffect } = require("./StatusEffect");

/**
 * The StatusEffects is a 'wrapper' class that tracks which StatusEffect instances are currently active.
 * Each BaseEntity extension class has a StatusEffects instance. It has methods to add or remove a StatusEffect.
 */
 class StatusEffects {
    constructor( ) {
        this.activeIds = [ ];
        this.activeEffects = [ ];
    }
    /**
     * Generate a unique Id.
     * Then, instantiate a StatusEffect class with id and method parameters as arguments. 
     * @param {String} attribute 
     * @param {String} type 
     * @param {Number|String} effectValue 
     * @param {Number|String} effectDuration 
     */
    addEffect( attribute, type, effectValue, effectDuration ) {
        const id = getUniqueId( this.activeIds )
        this.activeEffects.push( new StatusEffect( id, attribute, type, effectValue, effectDuration ) )
        this.activeIds.push( id )
    }
    /**
     * Remove the StatusEffect with given id.
     * First clear the StatusEffect instance from this.activeEffects.
     * Then, remove the given id from this.activeIds.
     * @param {String} id uniqueId of the effect you wish to remove 
     */
    removeEffect( id ) {
        this.activeEffects.forEach( ( effect, index ) => {
            if ( effect.uniqueId == id ) {
                this.activeEffects.splice(index)
            }
        } );
        this.activeIds.forEach( ( idInList, index ) => {
            if ( idInList == id ) {
                this.activeIds.splice(index)
            }
        } );
    }
    /**
     * For each effect that has a limitedDuration, call this.currentTurn method
     */
    countTurn( ) {
        this.activeEffects.forEach( ( effect ) => {
            if ( effect.maxTurnDuration != "INFINITE" ) {
                effect.countTurn( );
            }
        } );
    }
    /**
     * Loop through all current effects and remove the expired ones
     */
    clearExpiredEffects( ) {
        this.activeEffects.forEach( ( effect ) => {
            if ( effect.hasExpired ) {
                this.removeEffect( effect.uniqueId )
            }
        } );
    }

    /**
     * Handle active effects to next turn
     */
    handleNextTurn( ) {
        this.countTurn( );
        this.clearExpiredEffects( );
    }
} 

module.exports = {
    StatusEffects
}