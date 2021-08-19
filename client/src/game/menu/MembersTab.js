const { MenuTab } = require('../interfaces/I_MenuTab');
const { GRID_BLOCK_PX } = require('../../game-data/globals');
const globals = require('../../game-data/globals');
const { MENU_BUTTON_MOVE, MENU_BUTTON_SHOW_STATUS, MENU_BUTTON_SHOW_ON_MAP, MENU_BUTTON_RETURN } = require('../../game-data/uiGlobals')
/**
 * The MembersMenuTab is an overview of the party.
 * Here, the player can select which party member is displayed on the map.
 * They can also change the partys order and check the member statuses in the StatusTab
 */
class MembersMenuTab extends MenuTab {
    constructor( ) {
        super( MENU_TYPE_MEMBERS, "HORI", 6 );
        this.setButtonHeight( this.height );
        this.setButtonWidth( this.width / 4 );
        this.itemSubMenuOptions = [ MENU_BUTTON_MOVE, MENU_BUTTON_SHOW_STATUS, MENU_BUTTON_SHOW_ON_MAP, MENU_BUTTON_RETURN ]
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