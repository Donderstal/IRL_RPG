const { ATT_HEALTH_POINTS, ATT_POWER_POINTS } = require('../../game-data/globals');
const { MOVE_TYPE_HEAL, MOVE_TYPE_SP_ATTACK } = require('../../game-data/moveGlobals');
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
    get itemsAvailableInBattle( ) { return this.activeItems.filter( ( ItemStack ) => { return ItemStack.Item.canBeUsed } ) };
    /**
     * Return true if the given String is in this.ActiveItemIDs.
     * @param {String} itemID 
     */
    hasItem( itemID ) { 
        return this.ActiveItemIDs.includes( itemID ); 
    }
    /**
     * If one of the ItemStack in this.itemList has given string as ID, return it.
     * @param {String} itemID 
     */
    getItemStackById( itemID ) {
        let ItemStack;
        this.ItemList.forEach( ( e ) => {
            if ( e.ItemTypeID == itemID ) {
                ItemStack = e;
            }
        })
        return ItemStack
    }
    /**
     * Get the ItemStack instance associated with given String.
     * Then, call the ItemStacks' equipItem method with the given Character instance as argument.
     * @param {Character} character 
     * @param {String} itemID 
     */
    equipItem( character, itemID ) {
        let ItemStack = this.getItemStackById( itemID );
        ItemStack.equipItem( character );
    }
    /**
     * Get the ItemStack instance associated with given String.
     * Then, call the ItemStacks' unequipItem method with the given Character instance as argument.
     * @param {Character} character 
     * @param {String} itemID 
     */
    unequipItem( character, itemID ) {
        let ItemStack = this.getItemStackById( itemID );
        ItemStack.unequipItem( character );
    }
    /**
     * Get the ItemStack instance associated with given String.
     * Then handle the effect associated with the item and decrement the ItemStack
     * @param {Character} character 
     * @param {String} itemID 
     */
    useItem( targetCharacter, itemID ) {
        let ItemStack = this.getItemStackById( itemID );
        let resultText;

        switch( ItemStack.Item.Type ) {
            case MOVE_TYPE_HEAL:
                ItemStack.Item.Effects.forEach( ( e ) => {
                    console.log(e)
                    if ( e[0] == ATT_HEALTH_POINTS ) {
                        let pointsHealed = targetCharacter.heal( e[1] )
                        resultText = targetCharacter.Name + " heals " + pointsHealed + " HP!";
                    }
                    else if ( e[0] == ATT_POWER_POINTS ) {
                        let pointsHealed = targetCharacter.healPP( e[1] )
                        resultText = targetCharacter.Name + " heals " + pointsHealed + " PP!";
                    }
                } )
                break;
            case MOVE_TYPE_SP_ATTACK:
                ItemStack.Item.Effects.forEach( ( e ) => {
                    console.log(e)
                    if ( e[0] == ATT_HEALTH_POINTS ) {
                        let pointsLost = targetCharacter.takeDamage( e[1] )
                        resultText = targetCharacter.Name + " loses " + pointsLost + " HP!";
                    }
                    else if ( e[0] == ATT_POWER_POINTS ) {
                        let pointsLost = targetCharacter.spendPP( e[1] )
                        resultText = targetCharacter.Name + " loses " + pointsLost + " PP!";
                    }
                } )
                break;
        }
        ItemStack.subtractItem( );
        return resultText;
    }
    /**
     * Get the ItemStack instance associated with given String.
     * Then handle the effect associated with the item and decrement the ItemStack
     * @param {Character} character 
     * @param {String} itemID 
     */
    
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
    /**
     * Initialize an empty array.
     * Loop through the given array of itemIDs.
     * If the itemID is associated with a ItemStack instance, push the ItemStacks array index to the local array.
     * Then, loop through the local array and call subtractItemFromStackAtIndex for each.
     * @param {String[]} itemIDsToRemove 
     */
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
    /**
     * Call the subtractItem method of the ItemStack instance at given index.
     * If stackedItem.Quantity is below one, remove the ItemStack and it's ID from the Inventory arrays.
     * @param {Number} itemIndex 
     */
    subtractItemFromStackAtIndex( itemIndex ) {
        let stackedItem = this.ItemList[itemIndex]
        stackedItem.subtractItem( );

        if ( stackedItem.Quantity < 1 ) {
            this.ActiveItemIDs.splice( this.ActiveItemIDs.indexOf[stackedItem.ItemTypeID], 1 );
            this.ItemList.splice( itemIndex, 1 )
        }
    }
    /**
     * Get the ID of the item in the given slot.
     * Then, call the unequip item method with the itemId and given Character as arguments
     * @param {String} slot name of an equipments slot from globals file
     * @param {Character} character character to unequip item from
     */
    unequipItemAtCharacterEquipmentSlot( slot, character ) {
        const ItemTypeId = character.getItemIdOfItemInEquipmentSlot( slot );
        if ( ItemTypeId != null ) {
            this.unequipItem( character, ItemTypeId );
        }
    }
}

module.exports = {
    Inventory
}