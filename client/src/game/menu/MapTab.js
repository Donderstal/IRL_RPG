const { MenuTab } = require('../interfaces/I_MenuTab')

class MapMenuTab extends MenuTab {
    constructor( ) {
        super( "MAP", "VERT" )
    }
}

module.exports = { 
    MapMenuTab
}