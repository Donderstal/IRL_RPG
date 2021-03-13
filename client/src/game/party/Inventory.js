const { StackedItem } = require('./StackedItem');

class Inventory {
    constructor( ) {
        this.ItemList = [];
        this.ActiveItemIDs = [];
    }

    hasItem( itemID ) { 
        return this.ActiveItemIDs.includes( itemID ); 
    }

    getItemStackById(  itemID) {
        let ItemStack;
        this.ItemList.forEach( ( e ) => {
            if ( e.ItemTypeID == itemID ) {
                ItemStack = e;
            }
        })
        return ItemStack
    }

    equipItem( character, itemID ) {
        let ItemStack = this.getItemStackById( itemID );
        ItemStack.equipItem( character );
    }

    unequipItem( character, itemID ) {
        let ItemStack = this.getItemStackById( itemID );
        ItemStack.unequipItem( character );
    }

    addItemsToInnerListByID( newItemIDs ) {
        newItemIDs.forEach( ( itemID ) => {
            if ( this.hasItem( itemID ) ) {
                this.ItemList.forEach( ( stackedItem ) => {
                    if ( stackedItem.ItemTypeID == itemID ) {
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

    removeItemsFromInnerListByID( itemIDsToRemove ) {
        let itemsToRemoveIndexes = [];

        itemIDsToRemove.forEach( ( itemID ) => {
            if ( this.hasItem( itemID ) ) {
                this.ItemList.forEach( ( stackedItem, index ) => {
                    if ( stackedItem.ItemTypeID == itemID ) {
                        itemsToRemoveIndexes.push( index )
                    }   
                })
            }
        } ) 

        itemsToRemoveIndexes.forEach( ( itemIndex ) => {
            this.subtractItemFromStackAtIndex( itemIndex )
        } )
    }

    subtractItemFromStackAtIndex( itemIndex ) {
        let stackedItem = this.ItemList[itemIndex]
        stackedItem.subtractItem( );

        if ( stackedItem.Quantity < 1 ) {
            this.ActiveItemIDs.splice( this.ActiveItemIDs.indexOf[stackedItem.ItemTypeID], 1 );
            this.ItemList.splice( itemIndex, 1 )
        }
    }
}

module.exports = {
    Inventory
}