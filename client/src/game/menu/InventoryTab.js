const { MenuTab } = require('../interfaces/I_MenuTab')
const globals = require('../../game-data/globals')
/**
 * In the inventorytab, the player can interact with all their items.
 * Items can be equipped, used or discarded.
 */
class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 3 );
        this.itemSubMenuOptions = [ "USE", "EQUIP", "DISCARD", "RETURN" ]
        this.activeOption;
    }
    /**
     * Deactivate the activeButton if necessary.
     * Then get the array of activeItems for inventory and pass it to setButtonsInColumn.
     * Finally, activate the item subMenu and check for disabled options.
     */
    setButtons( ) {
        if ( this.buttons[this.activeButton] != undefined ) {
            this.buttons[this.activeButton].deActivate( );
            this.buttons = [];            
        }

        const activeItems = globals.GAME.PLAYER_INVENTORY.activeItems;        
        if ( this.activeButton >= activeItems.length ) {
            this.activeButton = activeItems.length - 1;
        }
        if ( activeItems.length > 10 ) {
            const firstTen = activeItems.slice( 0, 10 )
            const secondTen = activeItems.slice( 10 )
            this.setButtonsInColumn( globals.GRID_BLOCK_PX, firstTen, false );
            this.setButtonsInColumn( ( globals.CANVAS_WIDTH / 2 ) + globals.GRID_BLOCK_PX, secondTen );
        }
        else {
            this.setButtonsInColumn( 0, activeItems );
        }

        super.activateButtonAndSetSubMenuPosition( );
        this.setDisabledOptionsForItem( );
    }
    /**
     * Call the super of this method.
     * Then, call setDisabledOptionsForItem
     */
     activateButton( buttonType ) {
        super.activateButton( buttonType )
        this.setDisabledOptionsForItem( );
    }
    /**
     * Depending on the Category prop of this.activeItem, decide which options to disable
     */
    setDisabledOptionsForItem( ) {
        let optionsToDisable = [];
        if ( !this.activeItem.canBeEquipped ) {
            optionsToDisable.push( "EQUIP" );
        }
        if ( !this.activeItem.canBeUsed ) {
            optionsToDisable.push( "USE" );
        }        
        this.itemSubMenu.disableOptions( optionsToDisable );
    }
    /**
     * Depending on the value of this.activeOption, call associated functionalities.
     * Then, call unsetModal and setButtons
     */
    doActiveModalOption( ) {
        if ( this.activeOption == "EQUIP" && this.modal.activeButton.item != undefined ) {
            const selectedCharacter = globals.GAME.PARTY_MEMBERS[this.modal.activeButton.item.index];
            const itemToUnequip = selectedCharacter.Equipment.returnItemAtSlotOfGivenItem( this.activeItem );
            if ( itemToUnequip ) {
                globals.GAME.PLAYER_INVENTORY.unequipItem( selectedCharacter, itemToUnequip.ItemTypeId );                
            }
            globals.GAME.PLAYER_INVENTORY.equipItem( selectedCharacter, this.activeItem.ItemTypeId );
        }
        if ( this.activeOption == "DISCARD" && this.modal.activeButton.text == "YES" ) {
            globals.GAME.PLAYER_INVENTORY.removeItemsFromInnerListByID( [ this.activeItem.ItemTypeId ] )
        }
        this.unsetModal( );
        this.setButtons( );
    }
}

module.exports = { 
    InventoryMenuTab
}