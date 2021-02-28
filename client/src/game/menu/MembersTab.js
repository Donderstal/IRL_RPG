const { MenuTab } = require('../interfaces/I_MenuTab')

class MembersMenuTab extends MenuTab {
    constructor( ) {
        super( "MEMBERS", "HORI" )
    }
}

module.exports = { 
    MembersMenuTab
}