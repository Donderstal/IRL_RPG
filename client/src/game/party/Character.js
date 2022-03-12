const { getItemDataById } = require('../../resources/itemResources')
const { getClassProfile } = require('../../resources/classProfileResources');
const globals = require('../../game-data/globals')

class Character {
    constructor( name, className, id ) { 
        this.classProfile = getClassProfile( className );

        this.Id = id;
        this.Name = name;
        this.EquippedItemId = false;

        this.ClassName  = this.classProfile.className;
        this.Sprite     = globals.PNG_DICTIONARY[this.classProfile.png]; 
        this.Sfx        = globals.AUDIO_DICTIONARY[this.classProfile.sfx];
        this.Skill      = this.classProfile.skill;
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