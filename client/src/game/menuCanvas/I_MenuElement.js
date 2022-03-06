const globals = require("../../game-data/globals");
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT } = require("../../game-data/globals");
const { BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_BOTTOM, BUBBLE_LEFT_TOP, BUBBLE_RIGHT_TOP, BUBBLE_LEFT_BOTTOM, BUBBLE_RIGHT_BOTTOM, BUBBLE_RIGHT, BUBBLE_LEFT } = require("../../game-data/textboxGlobals");
const { drawBubblePart } = require("./menuHelpers");

class I_MenuElement {
    constructor( x, y, columns, rows, rowStyles, borders = false, isActive = false ) {
        this.utilCanvas = document.getElementById( 'game-utility-canvas-menu' );
        this.utilCtx = this.utilCanvas.getContext( '2d' );
        this.utilCanvas.width = globals.CANVAS_WIDTH;
        this.utilCanvas.height = globals.CANVAS_HEIGHT;
        this.isActive = isActive;
        this.borders = borders;
        this.frameCounter = 0;
        this.frameLimit = 20;
        this.animate = false;

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
        this.utilCtx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )
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

    drawBorders( ctx ) {
        this.borders.forEach((e) => {
            let startX;
            let startY;
            let endX;
            let endY;
            switch(e) {
                case "L":
                    startX = this.x;
                    startY = this.y;
                    startX = this.x;
                    startY = this.y + this.height;                    
                    break;
                case "T":
                    startX = this.x;
                    startY = this.y;
                    startX = this.x + this.width;
                    startY = this.y;     
                    break;
                case "R":
                    startX = this.x + this.width;
                    startY = this.y;
                    startX = this.x + this.width;
                    startY = this.y + this.height;     
                    break;
                case "B":
                    startX = this.x;
                    startY = this.y + this.height;
                    startX = this.x + this.width;
                    startY = this.y + this.height;   
                    break;
            }

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        })
    }

    countFrameForAnimation( ctx ) {
        this.frameCounter++
        if ( this.frameCounter > this.frameLimit ) {
            this.frameCounter = 0;
            this.animate = !this.animate;
        }

        if ( this.animate ) {
            this.elementAnimation( ctx )
        }
    }
}

module.exports = {
    I_MenuElement
}