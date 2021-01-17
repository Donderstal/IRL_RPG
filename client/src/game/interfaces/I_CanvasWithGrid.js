const { I_Grid } = require('./I_Grid');

class I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    };

    setDimensions( ) {
        this.width = width;
        this.height = height;
    };

    initGrid( rows, cols ) {
        this.grid       = new I_Grid( this.x, this.y, rows, cols, this.ctx );
    };

    setTileGrid( gridToSet ) {
        this.grid.setTileGridToArray( gridToSet )
    }

    loadImageWithCallback( src, callback ) {
        this.sheetImage = new Image();
        this.sheetImage.src = src;

        this.sheetImage.onload = ( ) => { 
            const boundCallback = callback.bind(this);
            boundCallback( );
        };
    }

    clearGrid( ) {
        this.grid.clearGrid( );
    };

    getTileAtIndex( index ) {
        return this.grid.array[index];
    }

    getTileAtXY( x, y ) {
        return this.grid.getTileAtXY( x, y );
    };

    getTileAtCell( column, row ) {
        return this.grid.getTileAtCell( column, row );
    };
};

module.exports = {
    I_CanvasWithGrid
}