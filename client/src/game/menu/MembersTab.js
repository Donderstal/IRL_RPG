const { MenuTab } = require('../interfaces/I_MenuTab');
const { GRID_BLOCK_PX } = require('../../game-data/globals');
const globals = require('../../game-data/globals');
/**
 * The MembersMenuTab is an overview of the party.
 * Here, the player can select which party member is displayed on the map.
 * They can also change the partys order and check the member statuses in the StatusTab
 */
class MembersMenuTab extends MenuTab {
    constructor( ) {
        super( "MEMBERS", "HORI", 6 );
        this.setButtonHeight( this.height );
        this.setButtonWidth( this.width / 4 );
        this.itemSubMenuOptions = [ "MOVE", "SHOW STATUS", "SHOW ON MAP", "RETURN" ]
    }
    /**
     * Set buttons in a row with the player party members as content.
     * Then, activate the submenu
     */
    setButtons( ) {
        this.setButtonsInRow( GRID_BLOCK_PX * 2, globals.GAME.PARTY_MEMBERS );
        super.activateButtonAndSetSubMenuPosition( );
    }
}

module.exports = { 
    MembersMenuTab
}