const { MenuTab } = require('../interfaces/I_MenuTab')
const uiResources = require('../../resources/uiResources')
const globals = require('../../game-data/globals')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 2 );
        this.itemSubMenuOptions = [ "USE", "EQUIP", "DISMISS"]
    }

    setButtons( ) {
        this.setButtonsInColumn( 0, globals.GAME.PLAYER_ITEMS );
        this.buttons[this.activeButton].activate( );
        this.activeItem = this.buttons[this.activeButton].content.Item
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
        this.itemSubMenu.initOptions( this.itemSubMenuOptions );
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
        if ( !this.itemSubMenu.isActive ) {
            this.itemSubMenu.activate( );
        }
        else {
            this.itemSubMenu.deActivate( );
        }
    }
}

module.exports = { 
    InventoryMenuTab
}