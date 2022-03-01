const { DISPLAY_MODE_PORTRAIT } = require("../../game-data/globals");
const { CanvasWithGrid } = require("../core/CanvasWithGrid");

class SpeechBubbleCanvas extends CanvasWithGrid {
    constructor( x, y, ctx, canvas ) {
        super( x, y, ctx );

        this.canvas = canvas;
        this.isActive = false;

        this.columns    = DISPLAY_MODE_PORTRAIT ? 8 : 24
        this.rows       = DISPLAY_MODE_PORTRAIT ? 8 : 16

        this.initGrid( this.rows, this.columns );
    }
}

module.exports = {
    SpeechBubbleCanvas
}