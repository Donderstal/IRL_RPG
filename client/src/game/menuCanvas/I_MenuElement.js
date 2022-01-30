const globals = require("../../game-data/globals");
const { GRID_BLOCK_PX } = require("../../game-data/globals");
const { BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_BOTTOM, BUBBLE_LEFT_TOP, BUBBLE_RIGHT_TOP, BUBBLE_LEFT_BOTTOM, BUBBLE_RIGHT_BOTTOM, BUBBLE_RIGHT, BUBBLE_LEFT } = require("../../game-data/textboxGlobals");
const { drawBubblePart } = require("./menuHelpers");

class I_MenuElement {
    constructor( x, y, columns, rows, rowStyles ) {
        this.utilCanvas = document.getElementById( 'game-utility-canvas-menu' );
        this.utilCtx = this.utilCanvas.getContext( '2d' );
        this.utilCanvas.width = globals.CANVAS_WIDTH;
        this.utilCanvas.height = globals.CANVAS_HEIGHT;

        this.initElement( x, y, columns, rows, rowStyles );
    }

    initElement( x, y, columns, rows, rowStyles ) {
        this.x = x;
        this.y = y;
        this.columns = columns;
        this.rows = rows;
        this.height = this.rows * GRID_BLOCK_PX;
        this.width = this.columns * GRID_BLOCK_PX
        this.rowStyles = rowStyles;
    }

    drawElement( ctx ) {
        this.utilCtx.clearRect( 0, 0, globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT );

        for( var i = 0; i < this.rows; i++ ) {
            let rowStyle = this.rowStyles[i];
            if ( rowStyle == BUBBLE_TOP ) {
                this.drawRow( BUBBLE_LEFT_TOP, BUBBLE_TOP, BUBBLE_RIGHT_TOP, i )
            }
            else if ( rowStyle == BUBBLE_MIDDLE ) {
                this.drawRow( BUBBLE_LEFT, BUBBLE_MIDDLE, BUBBLE_RIGHT, i )            
            }
            else if ( rowStyle == BUBBLE_BOTTOM ) {
                this.drawRow( BUBBLE_LEFT_BOTTOM, BUBBLE_BOTTOM, BUBBLE_RIGHT_BOTTOM, i )
            }
        }

        ctx.drawImage(
            this.utilCanvas,
            0, 0,
            GRID_BLOCK_PX * this.columns, GRID_BLOCK_PX * this.rows,
            this.x, this.y, 
            GRID_BLOCK_PX * this.columns, GRID_BLOCK_PX * this.rows
        );
    }

    drawRow( first, middle, last, rowCounter ) {
        for( var i = 0; i < this.columns; i++ ) {
            if ( i == 0 ) {
                drawBubblePart( first, { x: GRID_BLOCK_PX * i, y : rowCounter * GRID_BLOCK_PX }, this.utilCtx );
            }
            else if ( i == this.columns - 1 ) {
                drawBubblePart( last, { x: GRID_BLOCK_PX * i, y : rowCounter * GRID_BLOCK_PX }, this.utilCtx );
            }
            else {
                drawBubblePart( middle, { x: GRID_BLOCK_PX * i, y : rowCounter * GRID_BLOCK_PX }, this.utilCtx );                
            }
        }
    }
}

module.exports = {
    I_MenuElement
}