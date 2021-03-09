const { MenuTab } = require('../interfaces/I_MenuTab')
const uiResources = require('../../resources/uiResources')
const globals = require('../../game-data/globals')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 2 );
    }

    setButtons( ) {
        this.setButtonsInColumn( 0, globals.GAME.PLAYER_ITEMS );
        this.buttons[this.activeButton].activate( );
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
        if ( !this.modal ) {
            this.setModal( "Do you want to equip " + this.activeItem.Name + " ?", uiResources["DIALOG_OPTIONS_YES_OR_NO"] )
        }
        else {
            this.modal.handleActionButton( );
            this.modal = false;
        }
    }
}

module.exports = { 
    InventoryMenuTab
}