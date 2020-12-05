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
        this.grid       = new Grid( this.x, this.y, rows, cols, this.ctx );
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

    drawMapFromGridData( ) {
        this.grid.drawMap( this.sheetImage )
    }

    clearGrid( ) {
        this.grid.clearGrid( );
    };

    getTileAtXY( x, y ) {
        return this.grid.getTileAtXY( x, y );
    };
};