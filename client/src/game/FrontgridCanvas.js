const { CanvasWithGrid } = require("./core/CanvasWithGrid");
const globals = require('../game-data/globals')

class FrontgridCanvas extends CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.hasFrontGrid = false;
    }   

    setFrontgridData( mapData ) {
        if ( mapData.frontGrid ) {
            this.hasFrontGrid = true;
            this.setTileGrid( mapData.frontGrid );
        }
    }

    drawMapFromGridData( image ) {
        super.drawMapFromGridData( image )
        globals.GAME.PLAYER.visionbox.clearArc( );
    }
}

module.exports = { 
    FrontgridCanvas
}