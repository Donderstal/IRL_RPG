const { GameItem } = require('../interfaces/I_GameItem')

class StackedItem {
    constructor( itemTypeId ) {
        this.ItemTypeID = itemTypeId;
        this.Item = new GameItem( itemTypeId );
        this.BaseQuantity = 1;
        this.EquippedQuantity = 0;
    }

    get Quantity( ) { return this.BaseQuantity - this.EquippedQuantity; }
    get IsEmpty( ) { return this.Quantity < 1; }

    addItem( ) {
        this.Quantity += 1;
    }

    subtractItem( ) {
        this.Quantity -= 1;
    }

    equipItem( character ) {
        character.equipItem( this.Item );
        this.EquippedQuantity += 1;
    }

    unequipItem( character ) {
        character.unequipItem( this.Item );
        this.EquippedQuantity -= 1;
    }
}

module.exports = {
    StackedItem
}