const globals = require("../../game-data/globals");
const { CanvasWithGrid } = require("../core/CanvasWithGrid");

class SpeechBubbleCanvas extends CanvasWithGrid {
    constructor( x, y, ctx, canvas ) {
        super( x, y, ctx );

        this.canvas = canvas;
        this.isActive = false;

        this.columns    = globals.SCREEN.MOBILE ? 12 : 24
        this.rows       = globals.SCREEN.MOBILE ? 8 : 16

        this.initGrid( this.rows, this.columns );
    }
}

module.exports = {
    SpeechBubbleCanvas
}