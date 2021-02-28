const { MenuTab } = require('../interfaces/I_MenuTab')

class GameMenuTab extends MenuTab {
    constructor( ) {
        super( "GAME", "VERT", 8 )
        this.setButtonHeight( this.height / 8 );
        this.setButtonWidth( this.width / 3 );
    }
}

module.exports = { 
    GameMenuTab
}