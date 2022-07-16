import type { GameItem } from './GameItem';
import { StackedItem } from './StackedItem';
/**
 * An instance of the Inventory class is given to each Party instance in the game.
 * The Inventory class contains an array of StackedItem instances and an array of itemIDs.
 * It also contains several methods for adding or removing items to the Inventory or a characters' equipment
 */
export class Inventory {
    ItemList: StackedItem[];
    ActiveItemIDs: string[];
    constructor( ) {
        this.ItemList = [];
        this.ActiveItemIDs = [];
    }
    get activeItems( ) { return this.ItemList.filter( ( Item ) => { return Item.Quantity > 0 } ) };

    hasItem( itemID: string ): boolean { 
        return this.ActiveItemIDs.includes( itemID ); 
    }

    getItemStackById( itemID: string ): StackedItem {
        let ItemStack: StackedItem;
        this.ItemList.forEach( ( e ) => {
            if ( e.ItemTypeId === itemID ) {
                ItemStack = e;
            }
        })
        return ItemStack
    }

    getItemInStack( itemID: string ): GameItem {
        const stack = this.getItemStackById( itemID )
        return stack.Item;
    }

    equipNewItemToCharacter( character, itemID: string ): void {
        try {
            this.unequipItem( character );
            this.equipItem( character, itemID );            
        }
        catch( ex ) {
            console.log(ex)
        }
    }

    equipItem( character, itemID: string ): void {
        if ( itemID == character.EquippedItemId ) {
            return;
        }
        let ItemStack = this.getItemStackById( itemID );
        if ( ItemStack && ItemStack.Quantity > 0 ) {
            character.equipItem( itemID );
            ItemStack.equipItem( );               
        } 
    }

    unequipItem( character ): void {
        if ( character.equippedItem ) {
            let id = character.EquippedItemId;
            let ItemStack = this.getItemStackById( id );
            character.unequipItem( );
            ItemStack.unequipItem( );
        }
    }

    addItemsToInnerListByID( newItemIDs: string[] ): void {
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

    removeItemsFromInnerListByID( itemIDsToRemove: string[] ): void {
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

    subtractItemFromStackAtIndex( itemId: string ): void {
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