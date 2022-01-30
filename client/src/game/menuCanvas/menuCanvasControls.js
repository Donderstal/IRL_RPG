const globals = require("../../game-data/globals")

/**
 * Call the correct funtionality depending on the pressed key
 * @param {Event} event browser event bubbled from pressed key
 */
 const handleMenuKeyPress = ( event ) => {
    const MENU = globals.GAME.MENU;
    switch ( event.key ) {
        case "q" : 
            MENU.switchTab( "LEFT" )
            break;
        case "e" :
            MENU.switchTab( "RIGHT" )
            break;
    }
}

module.exports = {
    handleMenuKeyPress
}