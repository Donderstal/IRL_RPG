const { MenuTab } = require('../interfaces/I_MenuTab')

class StatusMenuTab extends MenuTab {
    constructor( ) {
        super( "STATUS", "VERT" )
    }
}

module.exports = { 
    StatusMenuTab
}