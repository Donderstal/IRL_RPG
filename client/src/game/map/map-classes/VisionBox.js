const { GRID_BLOCK_PX } = require("../../../game-data/globals");
const { getFrontgridCanvasContext } = require("../../../helpers/canvasHelpers");
const { I_Hitbox } = require("../../interfaces/I_Hitbox");

class VisionBox extends I_Hitbox {
    constructor( x, y ) {
        super( x, y, GRID_BLOCK_PX * 2 );
        this.arcColor = "black"
        this.previousArcX = false;
        this.previousArcY = false;
    }

    clearArc( ) {
        const context = getFrontgridCanvasContext();
        context.globalCompositeOperation = 'destination-out'
        context.beginPath();
        context.arc(this.x, this.y, this.outerRadius, 0, Math.PI*2, true);
        context.fill();
        context.closePath();
        context.globalCompositeOperation = 'source-over'
    }
}

module.exports = {
    VisionBox
}