const { MenuTab } = require('../interfaces/I_MenuTab')

class GameMenuTab extends MenuTab {
    constructor( ) {
        super( "GAME", "VERT" )
    }
}

module.exports = { 
    GameMenuTab
}