const { GRID_BLOCK_PX, CANVAS_ROWS, CANVAS_COLUMNS } = require('../../game-data/globals')
const { I_Tile } = require('./I_Tile');

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
        return ( this.overflowColumns * GRID_BLOCK_PX ) / 2;
    }

    getYOffset( ) {
        return ( this.overflowRows * GRID_BLOCK_PX ) / 2;
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
        if ( x > this.x + this.cols * GRID_BLOCK_PX || y > this.y + this.rows * GRID_BLOCK_PX || x < this.x || y < this.y ) {
            return undefined;
        }
        const column = Math.ceil( ( x - this.x ) / GRID_BLOCK_PX);
        const row = Math.ceil( ( y - this.y )  / GRID_BLOCK_PX);

        return this.getTileAtCell( row, column )
    }

    getTileAtCell( row, column ) {
        const tileIndex = ( ( row * this.cols ) - ( this.cols - column ) ) - 1
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