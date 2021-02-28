const { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE, GRID_BLOCK_PX } = require('../../game-data/globals');
const { writeTextLine } = require('../../helpers/canvasHelpers');

class MenuTab {
    constructor( tabName, alignment ) {
        this.tabName = tabName;
        this.alignment = alignment;
        this.height = CANVAS_HEIGHT - ( GRID_BLOCK_PX * 4 );
        this.margin = GRID_BLOCK_PX * .25;
    }

    draw( ) {
        writeTextLine( this.tabName, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
    }
}

module.exports = { 
    MenuTab
}