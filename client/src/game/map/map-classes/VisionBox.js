const { GRID_BLOCK_PX } = require("../../../game-data/globals");
const { getFrontgridCanvasContext } = require("../../../helpers/canvasHelpers");
const { Hitbox } = require("../../core/Hitbox");

class VisionBox extends Hitbox {
    constructor( x, y ) {
        super( x, y, GRID_BLOCK_PX * 2 );
        this.arcColor = "black"
        this.previousArcX = false;
        this.previousArcY = false;
    }

    get radiusWithMargin() { return this.radius }

    clearArc( ) {
        const context = getFrontgridCanvasContext();
        context.globalCompositeOperation = 'destination-out'
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        context.globalAlpha = 0.7;
        context.fill();
        context.globalAlpha = 1;
        context.closePath();
        context.globalCompositeOperation = 'source-over'
    }

    getFrontGridTilesInArc( frontGrid ) {
        const tilesInRangeArray = [];
        for( var x = this.x - this.radius; x <= this.x + this.radius; x += GRID_BLOCK_PX ) {
            for( var y = this.y - this.radius; y <= this.y + this.radius; y += GRID_BLOCK_PX ) {
                const tile = frontGrid.getTileAtXY( x, y );
                if ( !tile.isEmpty ) {
                    tilesInRangeArray.push(tile);
                }
            }
        }
        return tilesInRangeArray;
    }
}

module.exports = {
    VisionBox
}