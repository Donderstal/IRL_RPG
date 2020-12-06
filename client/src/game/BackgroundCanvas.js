const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { BACKGROUND_CANVAS, UTILITY_CANVAS, GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX } = require('../game-data/globals')

class BackgroundCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        console.log("initializing map!")
    };

    setMapName( mapName ) {
        this.mapName = mapName;
    }

    clearGrid( ) {
        super.clearGrid( );
        this.ctx.clearRect( 0, 0, BACKGROUND_CANVAS.width, BACKGROUND_CANVAS.height )
        this.grid.initializeGrid( );
    }

    setNeighbourhood( neighbourhood ) {
        this.neighbourhood = neighbourhood
    }

    drawTileAtXY( x, y ) {
        const tile = super.getTileAtXY( x, y );
        tile.setTileID( tile.index )
        tile.setSettings( tile.settings );
        this.ctx.drawImage( 
            UTILITY_CANVAS, 
            0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX, 
            tile.x, tile.y, GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }
    
    drawMapFromGridData( ) {
        this.grid.drawMap( this.sheetImage )
    }
};

module.exports = { 
    BackgroundCanvas
}