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
        this.UpperBody = itemToSet;
    }

    unsetUpperBody( ) {
        this.UpperBody = null;
    }

    setLowerBody( itemToSet ) {
        this.LowerBody = itemToSet;
    }

    unsetLowerBody( ) {
        this.LowerBody = null;
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

    equipItem( itemToSet ) {
        if ( itemToSet.Category == ITEM_CATEGORY_WEAPON ) {
            this.setWeapon( itemToSet );
        }
        else {
            switch( itemToSet.Type ) {
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

    unequipItem( itemToSet ) {
        if ( itemToSet.Category == ITEM_CATEGORY_WEAPON ) {
            this.unsetWeapon( itemToSet );
        }
        else {
            switch( itemToSet.Type ) {
                case ARMOR_TYPE_HEAD:
                    this.unsetHead( itemToSet );
                    break;
                case ARMOR_TYPE_UPPER_BODY: 
                    this.unsetUpperBody( itemToSet );
                    break;
                case ARMOR_TYPE_LOWER_BODY:
                    this.unsetLowerBody( itemToSet );
                    break;
                case ARMOR_TYPE_ACCESSORY: 
                    this.unsetAccessory( itemToSet );
                    break;
            }
        }
    }
}

module.exports = {
    Equipment
}