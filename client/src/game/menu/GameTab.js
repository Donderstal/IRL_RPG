const { MenuTab } = require('../interfaces/I_MenuTab')
const { CANVAS_WIDTH } = require('../../game-data/globals')

const buttonList = [
    { title: "SAVE GAME", description: "Save your game"} ,
    { title: "LOAD GAME", description: "Load from a savegame"},
    { title: "OPTIONS", description: "Change various settings to your liking"},
    { title: "DONATE $$$", description: "Donate to our patreon please!!"},
    { title: "QUIT TO MAIN MENU", description: "Quit this game and return to the main menu"},
    { title: "SAVE & QUIT", description: "Save your game and return to the main menu."}
]

class GameMenuTab extends MenuTab {
    constructor( ) {
        super( "GAME", "VERT", 8 )
        this.setButtonHeight( this.height / 8 );
        this.setButtonWidth( this.width / 3 );
    }

    setButtons( ) {
        this.setButtonsInColumn( CANVAS_WIDTH / 3, buttonList )
    }
}

module.exports = { 
    GameMenuTab
}