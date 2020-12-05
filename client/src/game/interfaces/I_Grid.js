const { GRID_BLOCK_PX, CANVAS_ROWS, CANVAS_COLUMNS } = require('../../game-data/globals')
const { I_Tile } = require('./I_Tile');

class I_Grid {
    constructor( x, y, rows, cols, ctx ) {
        this.x = x;
        this.y = y;
        this.rows = rows;
        this.cols = cols;
        this.array = [];
        this.ctx = ctx;

        this.initializeGrid( );
    };
    
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

    getXOffset( ) {
        const overflowColumns = CANVAS_COLUMNS - this.cols;
        return ( overflowColumns * GRID_BLOCK_PX ) / 2;
    }

    getYOffset( ) {
        const overflowRows = CANVAS_ROWS - this.rows;
        return ( overflowRows * GRID_BLOCK_PX ) / 2;
    }

    clearGrid( ) {
        this.grid = [];
    }

    drawMap( tileSheet ) {
        for ( var i = 0; i < this.array.length; i += this.cols ) {
            let row = this.array.slice( i, i + this.cols )
            this.drawRowInMap( row, tileSheet )
        }
    }

    drawRowInMap( currentRow, tileSheet ) {
        for ( var j = 0; j < this.cols; j++ ) {
            const currentTile = currentRow[j]
            currentTile.drawTileInMap( tileSheet )
        }
    }

    getTileAtXY( x, y ) {
        const column = Math.floor(event.offsetX / GRID_BLOCK_PX);
        const row = Math.floor(event.offsetY / GRID_BLOCK_PX);

        const tileIndex = (row * this.cols) + column;

        return this.array[tileIndex]
    }

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
}

module.exports = {
    I_Grid
}