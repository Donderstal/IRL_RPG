const globals = require( '../../game-data/globals' );
const { I_CanvasWithGrid } = require("../interfaces/I_CanvasWithGrid");
const { 
    GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX
} = require( '../../game-data/globals' );
const { 
    BUBBLE_MIDDLE, BUBBLE_LEFT_TOP, BUBBLE_RIGHT_TOP, BUBBLE_RIGHT_BOTTOM, BUBBLE_LEFT_BOTTOM, BUBBLE_TOP, BUBBLE_BOTTOM, BUBBLE_LEFT, BUBBLE_RIGHT 
} = require('../../game-data/textboxGlobals');
const { MenuHeader } = require('./menuHeader');
const { MenuTextBox } = require('./menuTextBox');

class MenuCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx, canvas ) {
        super( x, y, ctx );

        this.canvas = canvas;
        this.isActive = false;
        
        this.initGrid( 16, 24 );

        this.header = new MenuHeader( );
        this.textBox = new MenuTextBox( );

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
        this.drawBackground( 3 );
        this.header.draw( this.ctx );
        this.textBox.drawElement( this.ctx );
    }

    drawContentBubble( col, row ) {
        this.utilCtx.clearRect( 0, 0, globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT )

        this.drawBubblePart( BUBBLE_LEFT_TOP, { x: 0, y: 0 }, this.utilCtx );
        for( var i = 1; i < 3; i++ ) {
            this.drawBubblePart( BUBBLE_TOP, { x: i * GRID_BLOCK_PX, y: 0 }, this.utilCtx ); 
        }
        this.drawBubblePart( BUBBLE_RIGHT_TOP, { x: 3 * GRID_BLOCK_PX, y: 0 }, this.utilCtx );
        
        this.drawBubblePart( BUBBLE_LEFT_BOTTOM, { x: 0, y: GRID_BLOCK_PX }, this.utilCtx );
        for( var i = 1; i < 3; i++ ) {
            this.drawBubblePart( BUBBLE_BOTTOM, { x: i * GRID_BLOCK_PX, y: GRID_BLOCK_PX }, this.utilCtx ); 
        }
        this.drawBubblePart( BUBBLE_RIGHT_BOTTOM, { x: 3 * GRID_BLOCK_PX, y: GRID_BLOCK_PX }, this.utilCtx );

        this.ctx.drawImage(
            this.utilCanvas,
            0, 0,
            GRID_BLOCK_PX * 4, GRID_BLOCK_PX * 2,
            (col * GRID_BLOCK_PX) - GRID_BLOCK_PX, (row * GRID_BLOCK_PX) - GRID_BLOCK_PX, 
            GRID_BLOCK_PX * 4, GRID_BLOCK_PX * 2
        );
    }

    drawBackground( startingRow ) {
        this.grid.array.forEach((tile)=>{
            if ( tile.row == startingRow && tile.col == 1 ) {
                this.drawBubblePart( BUBBLE_LEFT, tile, this.ctx )     
            }
            else if ( tile.row == startingRow && tile.col == 24 ) {
                this.drawBubblePart( BUBBLE_RIGHT, tile, this.ctx )
            }
            else if ( tile.row == 16 && tile.col == 1 ) {
                this.drawBubblePart( BUBBLE_LEFT_BOTTOM, tile, this.ctx )
            }
            else if ( tile.row == 16 && tile.col == 24 ) {
                this.drawBubblePart( BUBBLE_RIGHT_BOTTOM, tile, this.ctx )
            }
            else if ( tile.row == startingRow ) {
                this.drawBubblePart( BUBBLE_MIDDLE, tile, this.ctx )
            }
            else if ( tile.row == 16 ) {
                this.drawBubblePart( BUBBLE_BOTTOM, tile, this.ctx )
            }
            else if ( tile.col == 1 && tile.row > startingRow) {
                this.drawBubblePart( BUBBLE_LEFT, tile, this.ctx )                
            }
            else if ( tile.col == 24 && tile.row > startingRow ) {
                this.drawBubblePart( BUBBLE_RIGHT, tile, this.ctx )
            }
            else if ( tile.row > startingRow ){
                this.drawBubblePart( BUBBLE_MIDDLE, tile, this.ctx )
            }
        })
    }

    drawBubblePart( name, tile, ctx ) {
        let pngs = globals.PNG_DICTIONARY;
        ctx.drawImage(
            pngs[name],
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            tile.x, tile.y, 
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    switchTab( direction ) {
        direction == "LEFT" ? this.header.activatePrevious( ) : this.header.activateNext( );
    }
}

module.exports = {
    MenuCanvas
}