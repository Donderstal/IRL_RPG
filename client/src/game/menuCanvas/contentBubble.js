const { GRID_BLOCK_PX } = require("../../game-data/globals");
const { I_MenuElement } = require("./I_MenuElement");

class ContentBubble extends I_MenuElement {
    constructor( startCol, startRow, cols, rows ) {
        super( (startCol - 1) * GRID_BLOCK_PX, (startRow - 1) * GRID_BLOCK_PX, cols, rows, "STANDARD" )
    }
}

module.exports = {
    ContentBubble
}