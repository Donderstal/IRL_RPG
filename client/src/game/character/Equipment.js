const { 
    ITEM_CATEGORY_WEAPON, 
    ARMOR_TYPE_HEAD, ARMOR_TYPE_UPPER_BODY, 
    ARMOR_TYPE_LOWER_BODY, ARMOR_TYPE_ACCESSORY
} = require('../../game-data/globals')

class Equipment {
    constructor( ) {
        this.Weapon = null;
        this.UpperBody = null;
        this.LowerBody = null;
        this.Head = null;
        this.Accessory = null;
    }

    setWeapon( itemToSet ) {
        this.Weapon = itemToSet;
    }

    unsetWeapon( ) {
        this.Weapon = null;
    }

    setUpperBody( itemToSet ) {
        this.Shirt = itemToSet;
    }

    unsetUpperBody( ) {
        this.Shirt = null;
    }

    setLowerBody( itemToSet ) {
        this.Shirt = itemToSet;
    }

    unsetLowerBody( ) {
        this.Shirt = null;
    }

    setHead( itemToSet ) {
        this.Head = itemToSet;
    }

    unsetHead( ) {
        this.Head = null;
    }

    setAccessory( itemToSet ) {
        this.Accessory = itemToSet;
    }

    unsetAccessory( ) {
        this.Accessory = null;
    }

    setItem( itemToSet ) {
        if ( itemToSet.Category == ITEM_CATEGORY_WEAPON ) {
            this.setWeapon( itemToSet );
        }
        else {
            switch( itemToSet.Category ) {
                case ARMOR_TYPE_HEAD:
                    this.setHead( itemToSet );
                    break;
                case ARMOR_TYPE_UPPER_BODY: 
                    this.setUpperBody( itemToSet );
                    break;
                case ARMOR_TYPE_LOWER_BODY:
                    this.setLowerBody( itemToSet );
                    break;
                case ARMOR_TYPE_ACCESSORY: 
                    this.setAccessory( itemToSet );
                    break;
            }
        }
    }
}

module.exports = {
    Equipment
}