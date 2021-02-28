const { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE } = require('../game-data/globals');
const { writeTextLine } = require('../../helpers/canvasHelpers');

class MenuTab {
    constructor( tabName, alignment ) {
        this.tabName = tabName;
        this.alignment = alignment;
    }

    draw( ) {
        writeTextLine( this.tabName, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
    }
}

module.exports = { 
    MenuTab
}