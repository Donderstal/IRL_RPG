const { GRID_BLOCK_PX, FACING_LEFT, FACING_RIGHT, FACING_DOWN, FACING_UP } = require('../../game-data/globals');
const { I_Grid } = require('./I_Grid');
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base I_CanvasWithGrid class and contain an I_Grid instance with an array of I_Tile instances
 * I_CanvasWithGrid contains core functionalities for interacting with the canvas context based on a I_Grid instance.
 * These include locating and returning a tile from the grid and instantiating a new grid.
 */
class I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    };
    /**
     * Instantiate a I_Grid with the given number of rows and columns and set it to the this.grid prop
     * @param {Number} rows 
     * @param {Number} cols 
     */
    initGrid( rows, cols ) {
        this.grid       = new I_Grid( this.x, this.y, rows, cols, this.ctx );
    };
    /**
     * Call I_Grid.setTileGridArray() to set the given list of tile indexes to the grid
     * @param {*} tileIndexArray - Array of tile indexes representing a map
     */
    setTileGrid( tileIndexArray ) {
        this.grid.setTileGridToArray( tileIndexArray )
    }
    /**
     * Return the I_Tile instance at index
     * @param {Number} index array index of the tile in the grid array
     */
    getTileAtIndex( index ) {
        return this.grid.array[index];
    }
    /**
     * Return the I_Tile instance at xy position
     * @param {Number} x position of tile on X axis in canvas
     * @param {Number} y position of tile on Y axis in canvas
     */
    getTileAtXY( x, y ) {
        return this.grid.getTileAtXY( x, y );
    };
    /**
     * Return the I_Tile instance at column-row position
     * @param {Number} column column of tile in canvas
     * @param {Number} row row position of tile on canvas
     */
    getTileAtCell( column, row ) {
        if ( column < 1 ) {
            return { "x": -GRID_BLOCK_PX, "y": row * GRID_BLOCK_PX, "col": column, "row": row, isOffscreen: true, direction: FACING_LEFT }
        }
        else if ( row < 1 ) {
            return { "x": column * GRID_BLOCK_PX, "y": -(GRID_BLOCK_PX * 2), "col": column, "row": row, isOffscreen: true, direction: FACING_DOWN }
        }
        else if ( column > this.grid.cols ) {
            return { "x": this.grid.width + GRID_BLOCK_PX, "y": row * GRID_BLOCK_PX, "col": column, "row": row, isOffscreen: true, direction: FACING_RIGHT }
        }
        else if ( row > this.grid.rows ) { 
            return { "x": column * GRID_BLOCK_PX, "y": this.grid.height + GRID_BLOCK_PX, "col": column, "row": row, isOffscreen: true, direction: FACING_UP }
        }

        return this.grid.getTileAtCell( column, row );
    };
        /**
     * Instantiate a I_Grid with the given number of rows and columns and set it to the this.grid prop
     * @param {Number} rows 
     * @param {Number} cols 
     */
    initBattleGrid( rows, cols ) {
        this.battleGrid       = new I_Grid( this.x, this.y, rows, cols, this.ctx );
    };
    /**
     * Set the battlegrid to null
     */
    clearBattleMap( ) {
        this.battleGrid = null;
    }
};

module.exports = {
    I_CanvasWithGrid
}