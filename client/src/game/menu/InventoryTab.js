const { MenuTab } = require('../interfaces/I_MenuTab')
const globals = require('../../game-data/globals')
const { MENU_BUTTON_REMOVE_FROM,  MENU_BUTTON_CONFIRM_TRANS, MENU_BUTTON_EQUIP, MENU_BUTTON_RETURN, MENU_TYPE_SELL, MENU_TYPE_INVENTORY, MENU_BUTTON_DISCARD, MENU_BUTTON_USE } = require('../../game-data/uiGlobals');
const { INTERACTION_YES } = require('../../game-data/interactionGlobals');
/**
 * In the inventorytab, the player can interact with all their items.
 * Items can be equipped, used or discarded.
 */
class InventoryMenuTab extends MenuTab {
    constructor( inShopMenu = false, inBuyingScreen = false ) {
        super( inShopMenu ? inBuyingScreen ? MENU_TYPE_SELL : MENU_TYPE_SELL  : MENU_TYPE_INVENTORY, "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 3 );
        this.itemSubMenuOptions = inShopMenu ? [ MENU_BUTTON_REMOVE_FROM,  MENU_BUTTON_CONFIRM_TRANS ] : [ MENU_BUTTON_USE, MENU_BUTTON_EQUIP, MENU_BUTTON_DISCARD, MENU_BUTTON_RETURN ]
        this.inventorySource = inShopMenu && !inBuyingScreen ? globals.GAME.activeAction.inventory : globals.GAME.PLAYER_INVENTORY;
        this.activeOption;
    }

    get activeItems( ) { return this.inventorySource.activeItems; }
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
  
        if ( this.activeButton >= this.activeItems.length ) {
            this.activeButton = this.activeItems.length - 1;
        }
        if ( this.activeItems.length > 10 ) {
            const firstTen = this.activeItems.slice( 0, 10 )
            const secondTen = this.activeItems.slice( 10 )
            this.setButtonsInColumn( globals.GRID_BLOCK_PX, firstTen, false );
            this.setButtonsInColumn( ( globals.CANVAS_WIDTH / 2 ) + globals.GRID_BLOCK_PX, secondTen );
        }
        else {
            this.setButtonsInColumn( 0, this.activeItems );
        }

        super.activateButtonAndSetSubMenuPosition( );
        this.activateButton( );
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
            optionsToDisable.push( MENU_BUTTON_EQUIP );
        }
        if ( !this.activeItem.canBeUsed ) {
            optionsToDisable.push( MENU_BUTTON_USE );
        }        
        this.itemSubMenu.disableOptions( optionsToDisable );
    }
    /**
     * Depending on the value of this.activeOption, call associated functionalities.
     * Then, call unsetModal and setButtons
     */
    doActiveModalOption( ) {
        if ( this.activeOption == MENU_BUTTON_USE && this.modal.activeButton.item != undefined ) {
            const selectedCharacter = globals.GAME.PARTY_MEMBERS[this.modal.activeButton.item.index];
            globals.GAME.PLAYER_INVENTORY.useItem( selectedCharacter, this.activeItem.ItemTypeId );
        }
        if ( this.activeOption == MENU_BUTTON_EQUIP && this.modal.activeButton.item != undefined ) {
            const selectedCharacter = globals.GAME.PARTY_MEMBERS[this.modal.activeButton.item.index];
            const itemToUnequip = selectedCharacter.Equipment.returnItemAtSlotOfGivenItem( this.activeItem );
            if ( itemToUnequip ) {
                globals.GAME.PLAYER_INVENTORY.unequipItem( selectedCharacter, itemToUnequip.ItemTypeId );                
            }
            globals.GAME.PLAYER_INVENTORY.equipItem( selectedCharacter, this.activeItem.ItemTypeId );
        }
        if ( this.activeOption == MENU_BUTTON_DISCARD && this.modal.activeButton.text == INTERACTION_YES ) {
            globals.GAME.PLAYER_INVENTORY.removeItemsFromInnerListByID( [ this.activeItem.ItemTypeId ] )
        }
        this.unsetModal( );
        this.setButtons( );
    }

    doCurrentSubMenuAction( ) {
        switch( this.activeOption ) {
            case MENU_BUTTON_USE:
                this.setModal( "Who should use a " + this.activeItem.Name + "?", this.activeOption );
                break;
            case MENU_BUTTON_EQUIP:
                this.setModal( "Who should equip a " + this.activeItem.Name + "?", this.activeOption );
                break;
            case MENU_BUTTON_DISCARD:
                this.setModal( "Throw away a" + this.activeItem.Name + "? This action can not be reversed!", this.activeOption );
                break;
        }
        MENU_BUTTON_USE
    }
}

module.exports = { 
    InventoryMenuTab
}