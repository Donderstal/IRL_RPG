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
        case "a":
        case "ArrowLeft":
            break;
        case "w":
        case "ArrowUp":
            break;
        case "d":
        case "ArrowRight":
            break;
        case "s":
        case "ArrowDown":
            break;
    }
}

module.exports = {
    handleMenuKeyPress
}