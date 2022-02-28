const { StackedItem } = require('./StackedItem');
/**
 * An instance of the Inventory class is given to each Party instance in the game.
 * The Inventory class contains an array of StackedItem instances and an array of itemIDs.
 * It also contains several methods for adding or removing items to the Inventory or a characters' equipment
 */
class Inventory {
    constructor( ) {
        this.ItemList = [];
        this.ActiveItemIDs = [];
    }
    get activeItems( ) { return this.ItemList.filter( ( Item ) => { return Item.Quantity > 0 } ) };
    /**
     * Return true if the given String is in this.ActiveItemIDs.
     * @param {String} itemID 
     */
    hasItem( itemID ) { 
        return this.ActiveItemIDs.includes( itemID ); 
    }
    /**
     * If one of the ItemStacks in this.itemList has given string as ItemTypeID, return it.
     * @param {String} itemID 
     */
    getItemStackById( itemID ) {
        let ItemStack = false;
        this.ItemList.forEach( ( e ) => {
            if ( e.ItemTypeId == itemID ) {
                ItemStack = e;
            }
        })
        return ItemStack
    }
    /**
     * Get the Item instance associated to an ItemStack
     * @param {string} itemID 
     */
    getItemInStack( itemID ) {
        const stack = this.getItemStackById( itemID )
        return stack ? stack.Item : stack;
    }
    /**
     * Check if given itemID is already equipped to character
     * If another item is equipped to character, enquip it
     * Equip item associated width given id to character
     * @param {Character} character 
     * @param {String} itemID 
     */
    equipNewItemToCharacter( character, itemID ) {
        try {
            this.unequipItem( character );
            this.equipItem( character, itemID );            
        }
        catch( ex ) {
            console.log(ex)
        }
    }
    /**
     * Get the ItemStack instance associated with given String.
     * Then, call the equip methods of Character and ItemStack
     * @param {Character} character 
     * @param {String} itemID 
     */
    equipItem( character, itemID ) {
        if ( itemID == character.EquippedItemId ) {
            return;
        }
        let ItemStack = this.getItemStackById( itemID );
        if ( ItemStack && ItemStack.Quantity > 0 ) {
            character.equipItem( itemID );
            ItemStack.equipItem( );               
        } 
    }
    /**
     * Get the ItemStack instance associated with given String.
     * Then, call the unequip methods of Character and ItemStack
     * @param {Character} character 
     * @param {String} itemID 
     */
    unequipItem( character ) {
        if ( character.equippedItem ) {
            let id = character.EquippedItemId;
            let ItemStack = this.getItemStackById( id );
            character.unequipItem( );
            ItemStack.unequipItem( id );
        }
    }
    /**
     * Loop through the given array of itemIDs.
     * If a itemID is alreay in this.ActiveItemIDs, call the addItem method from the associated ItemStack.
     * If not present, push a new StackedItem instance to this.ItemList and add the ID to this.ActiveItemIDs
     * @param {String[]} newItemIDs 
     */
    addItemsToInnerListByID( newItemIDs ) {
        newItemIDs.forEach( ( itemID ) => {
            if ( this.hasItem( itemID ) ) {
                this.ItemList.forEach( ( stackedItem ) => {
                    if ( stackedItem.ItemTypeId == itemID ) {
                        stackedItem.addItem( )
                    }   
                })
            }
            else {
                this.ItemList.push( new StackedItem( itemID ) )
                this.ActiveItemIDs.push( itemID );
            }
        });
    }
    /**
     * Loop through the given array of itemIDs.
     * If the itemID is associated with a ItemStack instance, push the ItemStacks array index to item index array.
     * Then, loop through the item index array and call subtractItemFromStackAtIndex for each.
     * @param {String[]} itemIDsToRemove 
     */
    removeItemsFromInnerListByID( itemIDsToRemove ) {
        itemIDsToRemove.forEach( ( itemId ) => {
            if ( this.hasItem( itemId ) ) {
                this.ItemList.forEach( ( stackedItem ) => {
                    if ( stackedItem.ItemTypeId == itemId ) {
                        this.subtractItemFromStackAtIndex( itemId )
                    }   
                })
            }
        } ) 
    }
    /**
     * Call the subtractItem method of the ItemStack instance with given id.
     * If stackedItem.Quantity is below one, remove the ItemStack and its ID from the Inventory arrays.
     * @param {Number} itemIndex 
     */
    subtractItemFromStackAtIndex( itemId ) {
        let stackedItem = this.getItemStackById( itemId );
        if ( stackedItem.Quantity != 0 ) {
            stackedItem.subtractItem( );            
        }

        if ( stackedItem.Quantity < 1 && stackedItem.EquippedQuantity == 0 ) {
            this.ActiveItemIDs = this.ActiveItemIDs.filter((item)=>{ return item != itemId });
            this.ItemList = this.ItemList.filter((item)=>{ return item.ItemTypeId != itemId });
        }
    }
}

module.exports = {
    Inventory
}