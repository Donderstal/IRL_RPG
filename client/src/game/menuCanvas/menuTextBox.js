const { GRID_BLOCK_PX } = require("../../game-data/globals")
const { BUBBLE_TOP, BUBBLE_MIDDLE } = require("../../game-data/textboxGlobals")
const { I_MenuElement } = require("./I_MenuElement")

class MenuTextBox extends I_MenuElement {
    constructor( ) {
        super( 0, 13 * GRID_BLOCK_PX, 24, 3, [ BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_MIDDLE ] )
    }
}

module.exports = {
    MenuTextBox
}