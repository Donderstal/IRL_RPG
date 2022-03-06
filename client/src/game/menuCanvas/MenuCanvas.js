const { CanvasWithGrid } = require("../core/CanvasWithGrid");
const { MenuHeader } = require('./menuHeader');
const { MenuTextBox } = require('./menuTextBox');
const { MenuBackground } = require('./MenuBackground');
const { 
    MENU_GRID_ROWS, MENU_GRID_COLUMNS, 
    MENU_TAB_PARTY, MENU_TAB_INVENTORY, MENU_TYPE_MAP, MENU_TYPE_GAME 
} = require('../../game-data/uiGlobals');
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require("../../game-data/globals");

class MenuCanvas extends CanvasWithGrid {
    constructor( x, y, ctx, canvas ) {
        super( x, y, ctx );

        this.canvas = canvas;
        this.isActive = false;

        this.initGrid( MENU_GRID_ROWS, MENU_GRID_COLUMNS );

        this.header = new MenuHeader( );
        this.textBox = new MenuTextBox( );
        this.background = new MenuBackground( );
    }   

    get activeTab( ) { 
        switch( this.header.activeIndex ) {
            case 0:
                return MENU_TAB_PARTY;
            case 1:
                return MENU_TAB_INVENTORY;
            case 2:
                return MENU_TYPE_MAP;
            case 3:
                return MENU_TYPE_GAME;
        }
    }
    show( ) {
        this.isActive = true;
        this.canvas.style.visibility = 'visible';
    }

    hide( ) {
        this.isActive = false;
        this.canvas.style.visibility = 'hidden';
    }

    draw( ) {
        this.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )
        this.background.draw( this.grid.array, this.ctx )
        this.header.draw( this.ctx );
        this.textBox.drawElement( this.ctx );
    }

    switchTab( direction ) {
        direction == "LEFT" ? this.header.activatePrevious( ) : this.header.activateNext( );
    }
}

module.exports = {
    MenuCanvas
}