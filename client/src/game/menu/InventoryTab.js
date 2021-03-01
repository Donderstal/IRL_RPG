const { MenuTab } = require('../interfaces/I_MenuTab')
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
    }

    activateNextButtonInList( ) {
        super.activateNextButtonInList( )
        this.description = this.buttons[this.activeButton].content.Item.Description;
    }

    activatePreviousButtonInList( ) {
        super.activatePreviousButtonInList( )
        this.description = this.buttons[this.activeButton].content.Item.Description;
    }
}

module.exports = { 
    InventoryMenuTab
}