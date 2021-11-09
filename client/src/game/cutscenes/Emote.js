const globals               = require('../../game-data/globals');
const { drawFromImageToCanvas } = require("../../helpers/canvasHelpers");

class Emote { 
    constructor( location, src ) {
        this.x = location.x;
        this.y = location.y - globals.GRID_BLOCK_PX
        this.image = globals.PNG_DICTIONARY[src];
        console.log(this.image);
    }

    draw( ) {
        drawFromImageToCanvas( 
            "FRONT", this.image,
            0, 0, globals.GRID_BLOCK_IN_SHEET_PX, globals.GRID_BLOCK_IN_SHEET_PX,
            this.x, this.y, globals.GRID_BLOCK_IN_SHEET_PX, globals.GRID_BLOCK_IN_SHEET_PX
        ) 
    }
}

module.exports = {
    Emote
}