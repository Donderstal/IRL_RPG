const globals = require( '../../game-data/globals' );
const { CanvasWithGrid } = require("../core/CanvasWithGrid");
const { DISPLAY_MODE_PORTRAIT } = require( '../../game-data/globals' );
const { MenuHeader } = require('./menuHeader');
const { MenuTextBox } = require('./menuTextBox');
const { MenuBackground } = require('./MenuBackground');

class MenuCanvas extends CanvasWithGrid {
    constructor( x, y, ctx, canvas ) {
        super( x, y, ctx );

        this.canvas = canvas;
        this.isActive = false;

        this.columns    = DISPLAY_MODE_PORTRAIT ? 8 : 24
        this.rows       = DISPLAY_MODE_PORTRAIT ? 8 : 16

        this.initGrid( this.rows, this.columns );

        this.header = new MenuHeader( );
        this.textBox = new MenuTextBox( );
        this.background = new MenuBackground( );

        this.utilCanvas = document.getElementById( 'game-utility-canvas-menu' );
        this.utilCtx = this.utilCanvas.getContext( '2d' );
        this.utilCanvas.width = globals.CANVAS_WIDTH;
        this.utilCanvas.height = globals.CANVAS_HEIGHT;
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
        this.ctx.clearRect( 0, 0, globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT )
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