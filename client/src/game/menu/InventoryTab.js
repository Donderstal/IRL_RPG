const { MenuTab } = require('../interfaces/I_MenuTab')
const globals = require('../../game-data/globals')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 2 );
        this.itemSubMenuOptions = [ "USE", "EQUIP", "DISCARD"]
        this.activeOption;
    }

    setButtons( ) {
        const activeItems = globals.GAME.PLAYER_ITEMS.filter( ( Item ) => { return Item.Quantity > 0 } )
        if ( this.buttons[this.activeButton] != undefined ) {
            this.buttons[this.activeButton].deActivate( );
            this.buttons = [];            
        }
        if ( this.activeButton >= activeItems.length ) {
            this.activeButton = activeItems.length - 1;
        }
        this.setButtonsInColumn( 0, activeItems );

        super.activateButtonAndSetSubMenuPosition( );
        this.buttons.forEach( ( button, index ) => {
            button.updateContent( activeItems[index] )
        })

        this.activeItem = this.buttons[this.activeButton].content.Item
    }

    activateNextButtonInList( ) {
        super.activateNextButtonInList( )
        this.activeItem = this.buttons[this.activeButton].content.Item
        this.description = this.activeItem.Description;
    }

    activatePreviousButtonInList( ) {
        super.activatePreviousButtonInList( )
        this.activeItem = this.buttons[this.activeButton].content.Item
        this.description = this.activeItem.Description;
    }

    doActiveModalOption( ) {
        if ( this.activeOption == "USE" && this.modal.activeButton.item != undefined  ) {
            console.log('use!')
        }
        if ( this.activeOption == "EQUIP" && this.modal.activeButton.text == "YES" ) {
            console.log('equip[')
        }
        if ( this.activeOption == "DISCARD" && this.modal.activeButton.text == "YES" ) {
            globals.GAME.PLAYER_INVENTORY.removeItemsFromInnerListByID( [ this.activeItem.ItemTypeId ] )
        }
        this.unsetModal( );
        this.setButtons( );
    }

    doActiveSubMenuOption( optionIndex = null ) {
        const option = this.itemSubMenu.getActiveOption( optionIndex );

        switch( option ) {
            case this.itemSubMenuOptions[0]: //USE
                this.selectCharacterForItem( );
                break;
            case this.itemSubMenuOptions[1]: //EQUIP
                this.selectCharacterForEquipment( );
                break;
            case this.itemSubMenuOptions[2]: //DISMISS
                this.dismissItem( );
                break;
            default :
                console.log( option );
                break;
        }

        this.itemSubMenu.deActivate( );
    }

    selectCharacterForItem( ) {
        this.activeOption = this.itemSubMenuOptions[0];
        this.setModal(
            "Who should use a " + this.activeItem.Name + "?",
            this.activeOption
        )
    }

    selectCharacterForEquipment( ) {
        this.activeOption = this.itemSubMenuOptions[1];
        this.setModal(
            "Who should equip a " + this.activeItem.Name + "?",
            this.activeOption
        )
    }

    dismissItem( ) {
        this.activeOption = this.itemSubMenuOptions[2];
        this.setModal(
            "Throw away a " + this.activeItem.Name + "? This action can not be reversed!",
            this.activeOption
        )
    }
}

module.exports = { 
    InventoryMenuTab
}