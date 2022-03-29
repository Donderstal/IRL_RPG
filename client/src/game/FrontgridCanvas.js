const { CanvasWithGrid } = require("./core/CanvasWithGrid");
const globals = require('../game-data/globals');
const { Tile } = require("./core/Tile");

class FrontgridCanvas extends CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.hasFrontGrid = false;
        this.lastTileList = false;
    }   

    setFrontgridData( mapData ) {
        if ( mapData.frontGrid ) {
            this.hasFrontGrid = true;
            this.setTileGrid( mapData.frontGrid );
            this.drawMapFromGridData( this.sheetImage );
        }
    }

    drawMapFromGridData( image ) {
        super.drawMapFromGridData( image )
        globals.GAME.PLAYER.visionbox.clearArc( );
    }

    drawTilesAndClearArc( tiles ) {
        if ( this.lastTileList ) {
            this.lastTileList.forEach( (e) => {
                e.drawTileInMap( this.sheetImage )
            })            
        }
        this.lastTileList = tiles;
        globals.GAME.PLAYER.visionbox.clearArc( );
    }

    clearMap( ) {
        this.grid = [];
        this.hasFrontGrid = false;
        this.lastTileList = false;
    }
}

module.exports = { 
    FrontgridCanvas
}