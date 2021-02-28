const { MenuTab } = require('../interfaces/I_MenuTab')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 2 );
    }
}

module.exports = { 
    InventoryMenuTab
}