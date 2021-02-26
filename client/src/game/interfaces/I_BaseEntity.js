class BaseEntity {
    constructor( name, maxHitpoints, attributes, level, weapon = null ) {
        // string
        this.Name = name;
        // int
        this.MaximumHitpoints = maxHitpoints;
        // int
        this.CurrentHitpoints = this.MaximumHitpoints;
        // int
        this.Level = level;
        // arr
        this.Attributes = attributes;
        // I_BaseItem
        this.Weapon = weapon
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