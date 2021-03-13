const { I_Grid } = require('./I_Grid');
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base I_CanvasWithGrid class
 * I_CanvasWithGrid contains core functionalities for interacting with the canvas context based on a grid system.
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
     * Instantiatie an Image Instance and call callback on it when it loads
     * @param {String} src - Location of image on server staring from root folder
     * @param {Function} callback - Callback to call after loading the image
     */
    loadImageWithCallback( src, callback ) {
        this.sheetImage = new Image();
        this.sheetImage.src = src;

        this.sheetImage.onload = ( ) => { 
            const boundCallback = callback.bind(this);
            boundCallback( );
        };
    }
    /**
     * Call I_Grid.clearGrid( ) to unset the active grid
     */
    clearGrid( ) {
        this.grid.clearGrid( );
    };
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
     * @param {Number} row position of tile on Y axis in canvas
     */
    getTileAtCell( column, row ) {
        return this.grid.getTileAtCell( column, row );
    };
};

module.exports = {
    I_CanvasWithGrid
}