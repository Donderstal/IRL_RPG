const { MenuTab } = require('../interfaces/I_MenuTab')

class MembersMenuTab extends MenuTab {
    constructor( ) {
        super( "MEMBERS", "HORI", 6 );
        this.setButtonHeight( this.height );
        this.setButtonWidth( this.width / 6 );
    }
}

module.exports = { 
    MembersMenuTab
}