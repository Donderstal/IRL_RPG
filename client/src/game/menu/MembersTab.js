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

    doActiveSubMenuOption( optionIndex = null  ) {
        switch( this.itemSubMenu.getActiveOption( optionIndex ) ) { 
            case this.itemSubMenuOptions[0]:
                this.activeOption = this.itemSubMenuOptions[0];
                break;
            case this.itemSubMenuOptions[1]:
                this.activeOption = this.itemSubMenuOptions[1];
                globals.GAME.MENU.switchTab( "RIGHT", this.activeButton )
                break;
        }
        this.itemSubMenu.deActivate()
    }
}

module.exports = { 
    MembersMenuTab
}