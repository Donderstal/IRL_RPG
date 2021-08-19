const { MenuTab } = require('../interfaces/I_MenuTab')
const { CANVAS_WIDTH } = require('../../game-data/globals');
const { MENU_TYPE_GAME } = require('../../game-data/uiGlobals');

const buttonList = [
    { title: "SAVE GAME", description: "Save your game"} ,
    { title: "LOAD GAME", description: "Load from a savegame"},
    { title: "OPTIONS", description: "Change various settings to your liking"},
    { title: "DONATE $$$", description: "Donate to our patreon please!!"},
    { title: "QUIT TO MAIN MENU", description: "Quit this game and return to the main menu"},
    { title: "SAVE & QUIT", description: "Save your game and return to the main menu."}
]
/**
 * The GameMenuTab is a menu for general utilities, 
 * like saving a game or adjusting options
 */
class GameMenuTab extends MenuTab {
    constructor( ) {
        super( MENU_TYPE_GAME, "VERT", 8 )
        this.setButtonHeight( this.height / 8 );
        this.setButtonWidth( this.width / 3 );
    }

    setButtons( ) {
        this.setButtonsInColumn( CANVAS_WIDTH / 3, buttonList )
        this.buttons[this.activeButton].activate( );
    }
}

module.exports = { 
    GameMenuTab
}