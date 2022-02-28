const { getItemDataById } = require('../../resources/itemResources');
const { ITEM_CATEGORY_KEY, ITEM_CATEGORY_WEARABLE } = require('../../game-data/globals');
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
        this.SpriteSrc  = data.png;
        this.Description= data.description;
        this.Image      = globals.PNG_DICTIONARY[uiSpritesFolder + this.SpriteSrc + ".png"];
    }
    get canBeEquipped( ) { 
        return this.Category == ITEM_CATEGORY_WEARABLE; 
    };
    get isKey( ) {
        return this.Category == ITEM_CATEGORY_KEY;
    };
}

module.exports = {
    GameItem
}