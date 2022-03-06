const { GRID_BLOCK_PX, DISPLAY_MODE_PORTRAIT } = require("../../game-data/globals")
const { BUBBLE_TOP, BUBBLE_MIDDLE } = require("../../game-data/textboxGlobals")
const { I_MenuElement } = require("./I_MenuElement")

class MenuTextBox extends I_MenuElement {
    constructor( ) {
        DISPLAY_MODE_PORTRAIT
            ? super( 0, 6 * GRID_BLOCK_PX, 8, 2, [ BUBBLE_TOP, BUBBLE_MIDDLE ] )
            : super( 0, 13 * GRID_BLOCK_PX, 24, 3, [ BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_MIDDLE ] )
    }
}

module.exports = {
    MenuTextBox
}