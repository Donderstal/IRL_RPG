const { CharacterAttributes } = require("../character/CharacterAttributes");

const { getAttributeModifierByClass } = require('../../resources/classProfileResources')
/**
 * The BaseEntity is the common interface of all in-game characters and monsters who can battle
 */
class BaseEntity {
    constructor( name, className, level ) {
        // string
        this.Name = name;
        // int
        this.Attributes = new CharacterAttributes( getAttributeModifierByClass( className ) );
        // int
        this.Level = level;

        this.setMaximumHitpoints( )
        // int
        this.CurrentHitpoints = this.MaximumHitpoints;        
    }

    get isLiving( ) { return this.CurrentHitpoints >= 0 };
    get isDead( ) { return !this.isLiving };

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
     * (INCOMPLETE)
     * Handle the BaseEntity death
     */
    handleDeath( ) {
        console.log(this.Name + " has died!")
    }

    /**
     * Set the MaximumHitpoints prop base on the Level and hitPointsModifier props
     */
    setMaximumHitpoints( ) {
        this.MaximumHitpoints = this.Level * this.hitPointsModifier;
    }

    /**
     * Set the ExperiencePoints prop based on the current level
     */
    setExperiencePointsFromLevel( ) {
        this.ExperiencePoints = this.Level * 100;
    }
    /**
     * Add the given amount of points to the CurrentHitPoints prop up to MaximumHitpoints
     * @param {Number} healingPoints hitpoints to heal
     */
    heal( healingPoints ) {
        this.CurrentHitpoints += healingPoints;
        if ( this.CurrentHitpoints > this.MaximumHitpoints ) { 
            this.CurrentHitpoints = this.MaximumHitpoints;
        }
    }
    /**
     * Assign the value of the MaximumHitpoints prop to CurrentHitPoints
     */
    fullHeal( ) {
        this.CurrentHitpoints = this.MaximumHitpoints;
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
}

module.exports = {
    BaseEntity
}