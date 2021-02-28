const { MenuTab } = require('../interfaces/I_MenuTab')

class StatusMenuTab extends MenuTab {
    constructor( ) {
        super( "STATUS", "VERT", 6 )
        this.setButtonHeight( this.height / 6 );
        this.setButtonWidth( this.width / 3 );
    }
}

module.exports = { 
    StatusMenuTab
}