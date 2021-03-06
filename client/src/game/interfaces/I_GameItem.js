const { getItemDataById } = require('../../resources/itemResources');
const { ITEM_CATEGORY_ARMOR, ITEM_CATEGORY_WEAPON, ITEM_CATEGORY_CONSUMABLE, ITEM_CATEGORY_USABLE, ITEM_CATEGORY_KEY } = require('../../game-data/globals');

const uiSpritesFolder = "/static/ui/"
/**
 * The GameItem class is the base class for all items in the game.
 * The ItemTypeId corresponds to an object key in the itemResources file
 * Its in-game use is dependent on the Type and Category properties.
 */
class GameItem {
    constructor( itemTypeId ) {
        this.ItemTypeId = itemTypeId;
        this.setItemData( );
        this.setImage( );
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
    /**
     * Fetch the data associated with this ItemTypeId in the itemREsources file
     * Set the properties of the itemResources object as properties of the GameItem
     */
    setItemData(  ) {
        const data = getItemDataById( this.ItemTypeId )
        this.Name = data.name;
        this.Category = data.category;
        this.Price = data.price
        this.SpriteSrc = data.png;
        this.Description = data.description;
        this.Type = data.type;
        this.Effects = data.effects;
    }
    /**
     * Load the PNG image associated with this ItemTypeId from the ui sprites folder
     */
    setImage( ) {
        this.ImageLoaded = false;
        this.Image = new Image( );
        this.Image.src = uiSpritesFolder + this.SpriteSrc + ".png";
        this.Image.onload = ( ) => {
            this.ImageLoaded = true;
        }
    }
    /**
     * ( INCOMPLETE )
     * Should perform the action associated with this item
     * @param {BaseEntity} actor 
     * @param {{BaseEntity} target 
     */
    performAction( actor, target ) {
        this.action.execute( );
    }
}

module.exports = {
    GameItem
}