const { MenuTab } = require('../interfaces/I_MenuTab')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI" )
    }
}

module.exports = { 
    InventoryMenuTab
}