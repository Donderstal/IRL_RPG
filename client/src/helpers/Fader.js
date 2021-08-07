const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('../game-data/globals');
const { drawRect } = require('./canvasHelpers');

class Fader {
    constructor( ) {
        this.RGB = "0, 0, 0, "
        this.A = false;
        this.fadingToBlack = false;
        this.fadingFromBlack = false;
    }

    get RGBA( ) { return "rgba( " + this.RGB + this.A + ")"; }
    get inFadingAnimation( ) { return this.fadingFromBlack || this.fadingToBlack; }

    startFadeToBlack( ) {
        this.fadingToBlack      = true;
        this.A = 0;
    }

    startFadeFromBlack( ) {
        this.fadingFromBlack    = true;
        this.A = 1;
    }

    handleFade( ) {
        drawRect( "FRONT", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, this.RGBA )

        if ( this.fadingFromBlack ) {
            this.fadeFromBlack( )
        }
        else if ( this.fadingToBlack ) {
            this.fadeToBlack( )
        } 

        this.checkForFadeEnd( )
    }

    fadeToBlack( ) {
        this.A += .05
    }

    fadeFromBlack( ) {
        this.A -= .05
    }

    checkForFadeEnd( ) {
        if ( ( this.fadingFromBlack && this.A <= 0 ) 
        || ( this.fadingToBlack && this.A >= 1 ) ) {
            this.unsetFadingAnimation( )
        }
    }

    unsetFadingAnimation( ) {
        this.fadingToBlack      = false;
        this.fadingFromBlack    = false;
    }
}

module.exports = {
    Fader
}