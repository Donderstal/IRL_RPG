const { DISPLAY_MODE_PORTRAIT, GRID_BLOCK_PX } = require("../../game-data/globals");
const { drawBubblePart } = require("./menuHelpers");
const { 
    BUBBLE_MIDDLE, BUBBLE_RIGHT_BOTTOM, BUBBLE_LEFT_BOTTOM, BUBBLE_BOTTOM, BUBBLE_LEFT, BUBBLE_RIGHT 
} = require('../../game-data/textboxGlobals');

class MenuBackground {
    constructor( columns, rows ) {
        this.startingRow = DISPLAY_MODE_PORTRAIT ? 2 : 3;
        this.startingCol = 1;

        this.columns    = columns;
        this.rows       = rows;
    }

    draw( tileArray, ctx ) {
        tileArray.forEach(e => this.drawBackgroundPart(e, ctx))  
    }

    drawBackgroundPart( tile, ctx ) {
        if ( DISPLAY_MODE_PORTRAIT ) {
            tile.x = ( tile.col * GRID_BLOCK_PX ) - GRID_BLOCK_PX;
            tile.y = ( tile.row * GRID_BLOCK_PX ) - GRID_BLOCK_PX
        }
        
        if ( tile.row == this.startingRow && tile.col == this.startingCol ) {
            drawBubblePart( BUBBLE_LEFT, tile, ctx )     
        }
        else if ( tile.row == this.startingRow && tile.col == this.columns ) {
            drawBubblePart( BUBBLE_RIGHT, tile, ctx )
        }
        else if ( tile.row == this.rows && tile.col == this.startingCol ) {
            drawBubblePart( BUBBLE_LEFT_BOTTOM, tile, ctx )
        }
        else if ( tile.row == this.rows && tile.col == this.columns ) {
            drawBubblePart( BUBBLE_RIGHT_BOTTOM, tile, ctx )
        }
        else if ( tile.row == this.startingRow ) {
            drawBubblePart( BUBBLE_MIDDLE, tile, ctx )
        }
        else if ( tile.row == this.rows ) {
            drawBubblePart( BUBBLE_BOTTOM, tile, ctx )
        }
        else if ( tile.col == this.startingCol && tile.row > this.startingRow) {
            drawBubblePart( BUBBLE_LEFT, tile, ctx )                
        }
        else if ( tile.col == this.columns && tile.row > this.startingRow ) {
            drawBubblePart( BUBBLE_RIGHT, tile, ctx )
        }
        else if ( tile.row > this.startingRow ){
            drawBubblePart( BUBBLE_MIDDLE, tile, ctx )
        }  
    }
}

module.exports = {
    MenuBackground
}