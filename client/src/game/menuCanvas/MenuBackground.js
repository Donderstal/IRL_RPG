const globals = require("../../game-data/globals");
const { GRID_BLOCK_PX } = require("../../game-data/globals");
const { drawBubblePart } = require("./menuHelpers");
const { 
    BUBBLE_MIDDLE, BUBBLE_RIGHT_BOTTOM, BUBBLE_LEFT_BOTTOM, BUBBLE_BOTTOM, BUBBLE_LEFT, BUBBLE_RIGHT 
} = require('../../game-data/textboxGlobals');
const { MENU_GRID_COLUMNS, MENU_GRID_ROWS } = require("../../game-data/uiGlobals");

class MenuBackground {
    constructor( ) {
        this.startingRow = globals.SCREEN.MOBILE ? 2 : 3;
        this.startingCol = 1;
    }

    draw( tileArray, ctx ) {
        tileArray.forEach(e => this.drawBackgroundPart(e, ctx))  
    }

    drawBackgroundPart( tile, ctx ) {
        if ( globals.SCREEN.MOBILE ) {
            tile.x = ( tile.col * GRID_BLOCK_PX ) - GRID_BLOCK_PX;
            tile.y = ( tile.row * GRID_BLOCK_PX ) - GRID_BLOCK_PX
        }
        
        if ( tile.row == this.startingRow && tile.col == this.startingCol ) {
            drawBubblePart( BUBBLE_LEFT, tile, ctx )     
        }
        else if ( tile.row == this.startingRow && tile.col == MENU_GRID_COLUMNS ) {
            drawBubblePart( BUBBLE_RIGHT, tile, ctx )
        }
        else if ( tile.row == MENU_GRID_ROWS && tile.col == this.startingCol ) {
            drawBubblePart( BUBBLE_LEFT_BOTTOM, tile, ctx )
        }
        else if ( tile.row == MENU_GRID_ROWS && tile.col == MENU_GRID_COLUMNS ) {
            drawBubblePart( BUBBLE_RIGHT_BOTTOM, tile, ctx )
        }
        else if ( tile.row == this.startingRow ) {
            drawBubblePart( BUBBLE_MIDDLE, tile, ctx )
        }
        else if ( tile.row == MENU_GRID_ROWS ) {
            drawBubblePart( BUBBLE_BOTTOM, tile, ctx )
        }
        else if ( tile.col == this.startingCol && tile.row > this.startingRow) {
            drawBubblePart( BUBBLE_LEFT, tile, ctx )                
        }
        else if ( tile.col == MENU_GRID_COLUMNS && tile.row > this.startingRow ) {
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