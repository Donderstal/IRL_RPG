const { GRID_BLOCK_PX, CANVAS_ROWS, CANVAS_COLUMNS, OUT_LEFT, OUT_UP, OUT_RIGHT, OUT_DOWN } = require('../../game-data/globals')
const { I_Tile } = require('./I_Tile');
/**
 * The I_Grid class is a structured way of interacting with the two HTML5 Canvases that display the game.
 * It divides the canvas up in a grid of equally sized blocks, represented by an I_Tile instance.
 * These I_Tile instances are stored in the this.array property and are retrievable by array index, xy location and column-row location.
 * These tiles in turn register the presence of sprites, doors, action or blocked areas in said tile.
 * This setup is the bases of all interactivity on the game canvases.
 */
class I_Grid {
    constructor( x, y, rows, cols, ctx ) {

        this.rows = rows;
        this.cols = cols;        
        this.overflowColumns = CANVAS_COLUMNS - this.cols;
        this.overflowRows = CANVAS_ROWS - this.rows;
        this.x = this.getXOffset( );
        this.y = this.getYOffset( );
        this.array = [];
        this.ctx = ctx;

        this.initializeGrid( );
    };

    get width( ) { return this.cols * GRID_BLOCK_PX }
    get height( ) { return this.rows * GRID_BLOCK_PX }
    /**
     * Fill this.array with a number I_Tile instances  
     * Length of array is dependent on this.rows and this.cols props
     * Calculate the xy position for each new I_Tile instance
     */
    initializeGrid( ) {
        const limit = this.rows * this.cols
        let tileX = this.getXOffset( );
        let tileY = this.getYOffset( );
        let row = 1;
        let col = 1;

        for( var i = 0; i < limit; i++ ) {
            this.array.push( new I_Tile( i, tileX, tileY, this.ctx, row, col ) )

            if ( ( i + 1 ) % this.cols == 0 ) {
                tileX = this.getXOffset( );
                tileY += GRID_BLOCK_PX;
                col = 1;
                row += 1;
            } else {
                tileX += GRID_BLOCK_PX
                col += 1
            }
        };
    };

    /**
     * Get the Y offset from the top of the Canvas needed to center the grid based on this.overflowColumns
     */
    getXOffset( ) {
        return ( this.overflowColumns * GRID_BLOCK_PX ) / 2;
    }
    /**
     * Get the Y offset from the top of the Canvas needed to center the grid based on this.overflowRows
     */
    getYOffset( ) {
        return ( this.overflowRows * GRID_BLOCK_PX ) / 2;
    }

    /**
     * Start drawing a map by looping through the rows of the grid based on this.cols
     * For each row, slice the I_Tile instances in that row from this.array
     * Then call this.drawRowInMap with the row and tilesheet as argument
     * @param {Image} tileSheet - Image instance of a tilesheet
     */
    drawMap( tileSheet ) {
        for ( var i = 0; i < this.array.length; i += this.cols ) {
            let row = this.array.slice( i, i + this.cols )
            this.drawRowInMap( row, tileSheet )
        }
    }
    /**
     * For each I_Tile in the row, call I_Tile.drawTileInMap with the tilesheet as argument
     * @param {I_Tile[]} currentRow - List if I_Tile instance representing a row in the grid
     * @param {Image} tileSheet - Image instance of a tilesheet
     */
    drawRowInMap( currentRow, tileSheet ) {
        for ( var j = 0; j < this.cols; j++ ) {
            const currentTile = currentRow[j]
            currentTile.drawTileInMap( tileSheet )
        }
    }
    /**
     * Calculate row and column based on the xy input. Then call getTileAtCell with those as arguments
     * @param {Number} x position of tile on X axis in canvas
     * @param {Number} y position of tile on Y axis in canvas
     */
    getTileAtXY( x, y ) {
        const column = Math.ceil( ( x - this.x ) / GRID_BLOCK_PX);
        const row = Math.ceil( ( y - this.y )  / GRID_BLOCK_PX);
        if ( x > this.x + this.cols * GRID_BLOCK_PX || y > this.y + this.rows * GRID_BLOCK_PX || x < this.x || y < this.y ) {
            return this.getDummyTile( 
                x < this.x ? OUT_LEFT : x > this.x + this.cols * GRID_BLOCK_PX ? OUT_RIGHT : column,
                y < this.y ? OUT_UP :  y > this.y + this.rows * GRID_BLOCK_PX ? OUT_DOWN : row
            );
        }

        return this.getTileAtCell( column, row )
    }
    /**
     * Return the I_Tile instance at column-row position
     * @param {Number} column column of tile in canvas
     * @param {Number} row row position of tile in canvas
     */
    getTileAtCell( column, row ) {
        if ( column == OUT_LEFT || row == OUT_UP || column == OUT_RIGHT || row == OUT_DOWN ){
            return this.getDummyTile( column, row );
        }
        const tileIndex = ( ( row * this.cols ) - ( this.cols - column ) ) - 1;
        return this.array[tileIndex]
    }
    /**
     * Loop through the I_Tile instance in this.array
     * For each, set the tileID, representing a tile on this grids' tilehseet
     * If needed, set setting for the angle and mirrored props of the tile
     * @param {(Number|Object)[]} tileGrid 
     */
    setTileGridToArray( tileGrid ) {
        this.array.forEach( ( e, index ) => {
            if ( typeof tileGrid[index] == 'string' || typeof tileGrid[index] == 'number' ) {
                e.setTileID( tileGrid[index] );                
            }
            else {
                e.setTileID( tileGrid[index].id );     
                e.setSettings( { 'mirrored': tileGrid[index].mirrored, 'angle': tileGrid[index].angle } )
            }
        })
    }

    getDummyTile( column, row ) {
        let tile;
        if ( column == OUT_LEFT ){
            tile = new I_Tile( OUT_LEFT, -GRID_BLOCK_PX, (row - 1) * GRID_BLOCK_PX, this.ctx, row, 0 )
        }
        else if ( row == OUT_UP ) {
            tile = new I_Tile( OUT_UP, (column - 1) * GRID_BLOCK_PX, -GRID_BLOCK_PX, this.ctx, 0, column )
        }
        else if ( column == OUT_RIGHT ) {
            tile = new I_Tile( OUT_RIGHT, this.width + GRID_BLOCK_PX, (row - 1) * GRID_BLOCK_PX, this.ctx, row, this.cols + 1 )
        }
        else if ( row == OUT_DOWN ) {
            tile = new I_Tile( OUT_UP, (column - 1) * GRID_BLOCK_PX, this.height + GRID_BLOCK_PX, this.ctx, this.rows + 1, column )
        }
        tile.offScreen = true;
        return tile;
    }
}

module.exports = {
    I_Grid
}