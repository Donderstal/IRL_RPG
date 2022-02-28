const { getItemDataById } = require('../../resources/itemResources')
const { getClassSprite } = require('../../resources/classProfileResources');
const globals = require('../../game-data/globals')

class Character {
    constructor( name, className ) { 
        this.Name = name;
        this.ClassName = className;
        this.Sprite = globals.PNG_DICTIONARY[getClassSprite( className )]; 
        this.EquippedItemId = false;
    }

    get equippedItem() { return this.EquippedItemId ? getItemDataById(this.EquippedItemId) : this.EquippedItemId }

    unequipItem( ) {
        this.EquippedItemId = false;
    }

    equipItem( itemToEquip ) {
        this.EquippedItemId = itemToEquip;
    }
}

module.exports = {
    Character
}