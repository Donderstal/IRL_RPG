const { MenuTab } = require('../interfaces/I_MenuTab')
const globals = require('../../game-data/globals')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 2 );
        this.itemSubMenuOptions = [ "USE", "EQUIP", "DISMISS"]
        this.activeOption;
    }
    
    setButtons( ) {
        this.setButtonsInColumn( 0, globals.GAME.PLAYER_ITEMS );
        super.activateButtonAndSetSubMenuPosition( )
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

    handleActionButton( ) {
        if ( !this.itemSubMenu.isActive && !this.modal ) {
            this.itemSubMenu.activate( );
        }
        else if ( this.itemSubMenu.isActive && !this.modal ) {
            this.doActiveSubMenuOption( );
        }
        else if ( this.modal ) {
            this.doActiveModalOption( );
        }
    }

    doActiveModalOption( ) {
        alert( this.activeItem.Name, this.modal.activeButton.text )
        this.unsetModal( );
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
            "Throw away a" + this.activeItem.Name + "? This action can not be reversed!",
            this.activeOption
        )
    }
}

module.exports = { 
    InventoryMenuTab
}