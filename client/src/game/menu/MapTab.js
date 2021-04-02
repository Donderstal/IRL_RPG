const { MenuTab } = require('../interfaces/I_MenuTab')
/**
 * In the MapMenuTab, the player can see their current location in the world
 */
class MapMenuTab extends MenuTab {
    constructor( ) {
        super( "MAP", "VERT", 1 );
        this.setButtonHeight( this.height / 6 );
        this.setButtonWidth( this.width / 3 );
    }
}

module.exports = { 
    MapMenuTab
}