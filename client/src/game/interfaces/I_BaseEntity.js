class BaseEntity {
    constructor( name, hitPointsModifier, attributes, level, weapon = null ) {
        // string
        this.Name = name;
        // int
        this.hitPointsModifier = hitPointsModifier;

        // int
        this.Level = level;
        // arr
        this.Attributes = attributes;
        // I_BaseItem
        this.Weapon = weapon

        this.setMaximumHitpoints( )
        // int
        this.CurrentHitpoints = this.MaximumHitpoints;        
    }

    get isLiving( ) { return this.CurrentHitpoints > 0 };
    get isDead( ) { return !this.isLiving };

    takeDamage( damagePoints ) {
        this.CurrentHitpoints -= damagePoints;
        if ( this.isDead ) {
            this.CurrentHitpoints = 0;
            this.handleDeath( );
        }   
    }

    handleDeath( ) {
        console.log(this.Name + " has died!")
    }

    setMaximumHitpoints( ) {
        this.MaximumHitpoints = Level * this.hitPointsModifier;
    }

    setExperiencePointsFromLevel( ) {
        this.ExperiencePoints = this.Level * 100;
    }

    heal( healingPoints ) {
        this.CurrentHitpoints += healingPoints;
        if ( this.CurrentHitpoints > this.MaximumHitpoints ) { 
            this.CurrentHitpoints = this.MaximumHitpoints;
        }
    }

    fullHeal( ) {
        this.CurrentHitpoints = this.MaximumHitpoints;
    }

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