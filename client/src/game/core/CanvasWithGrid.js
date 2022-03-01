const { GRID_BLOCK_PX, FACING_LEFT, FACING_RIGHT, FACING_DOWN, FACING_UP } = require('../../game-data/globals');
const { Grid } = require('./Grid');
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base CanvasWithGrid class and contain an Grid instance with an array of Tile instances
 * CanvasWithGrid contains core functionalities for interacting with the canvas context based on a Grid instance.
 * These include locating and returning a tile from the grid and instantiating a new grid.
 */
class CanvasWithGrid {
    constructor( x, y, ctx ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    };
    /**
     * Instantiate a Grid with the given number of rows and columns and set it to the this.grid prop
     * @param {Number} rows 
     * @param {Number} cols 
     */
    initGrid( rows, cols ) {
        this.grid       = new Grid( this.x, this.y, rows, cols, this.ctx );
    };
    /**
     * Call Grid.setTileGridArray() to set the given list of tile indexes to the grid
     * @param {*} tileIndexArray - Array of tile indexes representing a map
     */
    setTileGrid( tileIndexArray ) {
        this.grid.setTileGridToArray( tileIndexArray )
    }
    /**
     * Return the Tile instance at index
     * @param {Number} index array index of the tile in the grid array
     */
    getTileAtIndex( index ) {
        return this.grid.array[index];
    }
    /**
     * Return the Tile instance at xy position
     * @param {Number} x position of tile on X axis in canvas
     * @param {Number} y position of tile on Y axis in canvas
     */
    getTileAtXY( x, y ) {
        return this.grid.getTileAtXY( x, y );
    };
    /**
     * Return the Tile instance at column-row position
     * @param {Number} column column of tile in canvas
     * @param {Number} row row position of tile on canvas
     */
    getTileAtCell( column, row ) {
        if ( column < 1 ) {
            return { "x": -GRID_BLOCK_PX, "y": (row * GRID_BLOCK_PX) - GRID_BLOCK_PX, "col": column, "row": row, direction: FACING_LEFT }
        }
        else if ( row < 1 ) {
            return { "x": (column * GRID_BLOCK_PX) - GRID_BLOCK_PX, "y": -(GRID_BLOCK_PX * 2), "col": column, "row": row, direction: FACING_UP }
        }
        else if ( column > this.grid.cols ) {
            return { "x": this.grid.width + GRID_BLOCK_PX, "y": (row * GRID_BLOCK_PX) - GRID_BLOCK_PX, "col": column, "row": row, direction: FACING_RIGHT }
        }
        else if ( row > this.grid.rows ) { 
            return { "x": (column * GRID_BLOCK_PX) - GRID_BLOCK_PX, "y": this.grid.height + (GRID_BLOCK_PX * 2), "col": column, "row": row, direction: FACING_DOWN }
        }

        return this.grid.getTileAtCell( column, row );
    };
        /**
     * Instantiate a Grid with the given number of rows and columns and set it to the this.grid prop
     * @param {Number} rows 
     * @param {Number} cols 
     */
    initBattleGrid( rows, cols ) {
        this.battleGrid       = new Grid( this.x, this.y, rows, cols, this.ctx );
    };
    /**
     * Set the battlegrid to null
     */
    clearBattleMap( ) {
        this.battleGrid = null;
    }
    drawMapFromGridData( image ) {
        this.sheetImage = image;
        this.grid.drawMap( this.sheetImage );
    }    
};

module.exports = {
    CanvasWithGrid
}