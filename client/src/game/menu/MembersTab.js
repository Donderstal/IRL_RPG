const { MenuTab } = require('../interfaces/I_MenuTab');
const { GRID_BLOCK_PX } = require('../../game-data/globals');
const globals = require('../../game-data/globals');

class MembersMenuTab extends MenuTab {
    constructor( ) {
        super( "MEMBERS", "HORI", 6 );
        this.setButtonHeight( this.height );
        this.setButtonWidth( this.width / 4 );
        this.itemSubMenuOptions = [ "MOVE", "SHOW STATUS", "SELECT FOR MAP"]
    }

    setButtons( ) {
        this.setButtonsInRow( GRID_BLOCK_PX * 2, globals.GAME.PARTY_MEMBERS );
        super.activateButtonAndSetSubMenuPosition( );
        this.activeItem = this.buttons[this.activeButton].content;
    }

    activateNextButtonInList( ) {
        super.activateNextButtonInList( )
        this.activeItem = this.buttons[this.activeButton].content
    }

    activatePreviousButtonInList( ) {
        super.activatePreviousButtonInList( )
        this.activeItem = this.buttons[this.activeButton].content
    }

    handleActionButton( ) {
        if ( !this.itemSubMenu.isActive ) {
            this.itemSubMenu.activate( );
        }
        else {
            this.itemSubMenu.deActivate( );
        }
    }
}

module.exports = { 
    MembersMenuTab
}