const { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE, GRID_BLOCK_PX } = require('../../game-data/globals');
const { writeTextLine } = require('../../helpers/canvasHelpers');

class MenuTab {
    constructor( tabName, alignment, maxButtons ) {
        this.tabName = tabName;
        this.alignment = alignment;
        this.height = CANVAS_HEIGHT - ( GRID_BLOCK_PX * 4 );
        this.width = CANVAS_WIDTH;
        this.margin = GRID_BLOCK_PX * .25;
        this.activeButton = 0;
        this.buttons = [];

        this.maxButtons;
    }

    draw( ) {
        writeTextLine( this.tabName, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
    }

    setButtonHeight( height ) {
        this.buttonHeight = height;
    }

    setButtonWidth( width ) {
        this.buttonWidth = width;
    }
}

class MenuButton { 
    constructor( x, y, width, height, type, content ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.content = content;

        this.isActive = false;        
        this.activeButtonColor = "#00FF9E";
        this.standardButtonColor = "#D82BBA";
    }

    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, this.isActive ? this.activeButtonColor : this.standardButtonColor )
    }
}

module.exports = { 
    MenuTab
}