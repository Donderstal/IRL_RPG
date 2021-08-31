const { GameItem } = require('../interfaces/I_GameItem')
/**
 * A StackedItem class represents a stack of a GameItem in an Inventory instance
 * This class tracks how many of the GameItem are equipped or in the inventory
 */
class StackedItem {
    constructor( itemTypeId ) {
        this.ItemTypeId = itemTypeId;
        this.Item = new GameItem( itemTypeId );
        this.BaseQuantity = 1;
        this.EquippedQuantity = 0;
        this.PendingForUsageQuantity = 0;
        this.Name = this.Item.Name;
        this.Description = this.Item.Description;
        this.Category   = this.Item.Category;
        this.Price      = this.Item.Price
        this.SpriteSrc  = this.Item.SpriteSrc;
        this.Description= this.Item.Description;
        this.Type       = this.Item.Type;
        this.Effects    = this.Item.Effects;
        this.Image      = this.Item.Image;
    }

    get Quantity( ) { return this.BaseQuantity - (this.EquippedQuantity + this.PendingForUsageQuantity); }
    get IsEmpty( ) { return this.Quantity < 1; }

    get canBeEquipped( ) { return this.Item.canBeEquipped ;  };
    get canBeUsed( ) { return this.Item.canBeUsed; };
    get canBeUsedOutsideBattle( ) { return this.Item.canBeUsedOutsideBattle; }
    get isKey( ) { return this.Item.isKey; };
    /**
     * Increment BaseQuantity by one to indicate a GameItem is added to the stack
     */
    addItem( ) {
        this.BaseQuantity += 1;
    }
    /**
     * Decrement BaseQuantity by one to indicate a GameItem is subtracted from the stack
     */
    subtractItem( ) {
        this.BaseQuantity -= 1;
    }

    addPendingForUsage( ) {
        this.PendingForUsageQuantity += 1;
    }
    subtractPendingForUsage( ) {
        this.PendingForUsageQuantity -= 1;
    }

    resetPendingAmount( ) {
        this.PendingForUsageQuantity = 0;
    }

    /**
     * Call the equipItem method of given character, with this.Item as argument.
     * Then, increment this.EquippedQuantity by one.
     * @param {Character} character Character instance to equip the item to
     */
    equipItem( character ) {
        character.equipItem( this.Item );
        this.EquippedQuantity += 1;
    }
    /**
     * Call the unequipItem method of given character, with this.Item as argument.
     * Then, decrement this.EquippedQuantity by one.
     * @param {Character} character Character instance to unequip the item from
     */
    unequipItem( character ) {
        character.unequipItem( this.Item );
        this.EquippedQuantity -= 1;
    }
}

module.exports = {
    StackedItem
}