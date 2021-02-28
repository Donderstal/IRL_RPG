const { MenuTab } = require('../interfaces/I_MenuTab');
const { GRID_BLOCK_PX } = require('../../game-data/globals');
const globals = require('../../game-data/globals');

class MembersMenuTab extends MenuTab {
    constructor( ) {
        super( "MEMBERS", "HORI", 6 );
        this.setButtonHeight( this.height );
        this.setButtonWidth( this.width / 4 );
    }

    setButtons( ) {
        this.setButtonsInRow( GRID_BLOCK_PX * 2, globals.GAME.PARTY_MEMBERS )
    }
}

module.exports = { 
    MembersMenuTab
}