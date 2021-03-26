const { CharacterAttributes } = require("../character/CharacterAttributes");
const { StatusEffects } = require('../character/StatusEffects')
const { getAttributeModifierByClass } = require('../../resources/classProfileResources');
const { ATT_HEALTH_POINTS, ATT_POWER_POINTS } = require("../../game-data/globals");
/**
 * The BaseEntity is the common interface of all in-game characters and monsters who can battle
 */
class BaseEntity {
    constructor( name, className, level ) {

        this.Name = name;
        this.ClassName = className;
        this.Level = level;

        this.Attributes = new CharacterAttributes( getAttributeModifierByClass( className ), this.Level );
        this.StatusEffects  = new StatusEffects( );

        this.setHitAndPowerPointsToMax( ) 
    }

    get maxHP( ) { return this.Attributes[ATT_HEALTH_POINTS]; }
    get maxPP( ) { return this.Attributes[ATT_POWER_POINTS]; }

    get isLiving( ) { return this.CurrentHitpoints >= 0 };
    get isDead( ) { return !this.isLiving };

    get activeAttributeValues( ) { return this.getActiveAttributes( ) }
    /**
     * Get a copied-by-value dictionary from the Attributes instance in this character.
     * Then, apply the status effects to the Attribute dictionary and return it.
     */
    getActiveAttributes( ) {
        let attributes = this.Attributes.getAttributes( );
        attributes = this.StatusEffects.applyStatusEffectsToAttributes( attributes );
        return attributes;
    }
    /**
     * Assign a value to this.CurrentHitpoints and this.CurrentPowerpoints based on 
     */
    setHitAndPowerPointsToMax( ) {
        this.CurrentHitpoints = this.maxHP;
        this.CurrentPowerpoints = this.maxPP;  
    }
    /**
     * Subtract the given damage from the CurrentHitPoints prop. Call handleDeath if necessary
     * @param {Number} damagePoints point of damage to receive
     */
    takeDamage( damagePoints ) {
        this.CurrentHitpoints -= damagePoints;
        if ( this.isDead ) {
            this.CurrentHitpoints = 0;
            this.handleDeath( );
        }   
    }
    /**
     * Subtract given PP from this.CurrentPowerPoints
     * @param {Number} ppToSpend 
     */
    spendPP( ppToSpend ) {
        this.CurrentPowerpoints -= ppToSpend;
    } 
    /**
     * Add the given amount of points to the CurrentHitPoints prop up to maxHP
     * @param {Number} healingPoints hitpoints to heal
     */
    heal( healingPoints ) {
        this.CurrentHitpoints += healingPoints;
        if ( this.CurrentHitpoints > this.maxHP ) { 
            this.fullHeal( )
        }
    }
    /**
     * Add the given amount of points to the CurrentPowerpoints prop up to maxPP
     * @param {Number} ppToHeal 
     */
    healPP( ppToHeal ) {
        this.CurrentPowerpoints += ppToHeal;
        if ( this.CurrentPowerpoints > this.maxPP ) { 
            this.fullHealPP( )
        }
    }
    /**
     * Assign the value of the maxHP prop to CurrentHitPoints
     */
    fullHeal( ) {
        this.CurrentHitpoints = this.maxHP;
    }
    /**
     * Assign the value of maxPP to currentPowerPoints
     */
    fullHealPP( ) {
        this.CurrentPowerpoints = this.maxPP;
    }
    /**
     * (INCOMPLETE)
     * Use the currently equipped I_Item in weapon prop
     */
    useWeapon( ) {
        if ( this.weapon = null ) {
            console.log(this.Name + " attacks with their fists!")
        }
        else {
            console.log(this.weapon)
        }
    }
        /**
     * (INCOMPLETE)
     * Handle the BaseEntity death
     */
    handleDeath( ) {
        console.log(this.Name + " has died!")
    }

    /**
     * Set the ExperiencePoints prop based on the current level
     */
    setExperiencePointsFromLevel( ) {
        this.Experience = this.Level * 100;
    }
}

module.exports = {
    BaseEntity
}