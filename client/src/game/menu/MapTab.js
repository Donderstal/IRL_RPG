const { MenuTab } = require('../interfaces/I_MenuTab')

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