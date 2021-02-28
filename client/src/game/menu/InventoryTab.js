const { MenuTab } = require('../interfaces/I_MenuTab')
const globals = require('../../game-data/globals')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 2 );
    }

    setButtons( ) {
        this.setButtonsInColumn( 0, globals.GAME.PLAYER_ITEMS )
    }
}

module.exports = { 
    InventoryMenuTab
}