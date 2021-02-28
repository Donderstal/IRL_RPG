const { GameItem } = require('../interfaces/I_GameItem')

class StackedItem {
    constructor( itemTypeId ) {
        this.ItemTypeID = itemTypeId;
        this.Item = new GameItem( itemTypeId );
        this.Quantity = 1;
    }

    get Item( ) { return this.Item }
    get IsEmpty( ) { return this.Quantity < 1 }

    addItem( ) {
        this.Quantity += 1;
    }

    subtractItem( ) {
        this.Quantity -= 1;
    }
}

module.exports = {
    StackedItem
}