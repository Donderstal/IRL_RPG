const { MENU_TEXTBOX_Y, MENU_GRID_COLUMNS,  MENU_TEXTBOX_ROWS, MENU_TEXTBOX_ROWSTYLES } = require("../../game-data/uiGlobals");
const { I_MenuElement } = require("./I_MenuElement")

class MenuTextBox extends I_MenuElement {
    constructor( ) {
        super( 0, MENU_TEXTBOX_Y, MENU_GRID_COLUMNS, MENU_TEXTBOX_ROWS, MENU_TEXTBOX_ROWSTYLES );
    }
}

module.exports = {
    MenuTextBox
}