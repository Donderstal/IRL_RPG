const { getItemDataById } = require('../../resources/itemResources');
const { ITEM_CATEGORY_ARMOR, ITEM_CATEGORY_WEAPON, ITEM_CATEGORY_CONSUMABLE, ITEM_CATEGORY_USABLE, ITEM_CATEGORY_KEY } = require('../../game-data/globals');
const globals = require('../../game-data/globals');

const uiSpritesFolder = "/static/ui/"
/**
 * The GameItem class is the base class for all items in the game.
 * The ItemTypeId corresponds to an object key in the itemResources file
 * Its in-game use is dependent on the Type and Category properties.
 */
class GameItem {
    constructor( itemTypeId ) {
        const data = getItemDataById( itemTypeId )

        this.ItemTypeId = itemTypeId;
        this.Name       = data.name;
        this.Category   = data.category;
        this.Price      = data.price
        this.SpriteSrc  = data.png;
        this.Description= data.description;
        this.Type       = data.type;
        this.Effects    = data.effects;
        this.Image      = globals.PNG_DICTIONARY[uiSpritesFolder + this.SpriteSrc + ".png"];
    }
    get canBeEquipped( ) { 
        return this.Category == ITEM_CATEGORY_ARMOR || this.Category == ITEM_CATEGORY_WEAPON; 
    };
    get canBeUsed( ) { 
        return this.Category == ITEM_CATEGORY_CONSUMABLE || this.Category == ITEM_CATEGORY_USABLE; 
    };
    get canBeUsedOutsideBattle( ) {
        return this.Category == ITEM_CATEGORY_CONSUMABLE; 
    }
    get isKey( ) {
        return this.Category == ITEM_CATEGORY_KEY;
    };
}

module.exports = {
    GameItem
}