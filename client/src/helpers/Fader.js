const globals = require('../game-data/globals');
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('../game-data/globals');
const { drawRect } = require('./canvasHelpers');

class Fader {
    constructor( ) {
        this.RGB = "0, 0, 0, "
        this.A = false;
        this.fadingToBlack = false;
        this.fadingFromBlack = false;
        this.holdBlackScreen = false;
    }

    get RGBA( ) { return "rgba( " + this.RGB + this.A + ")"; }
    get inFadingAnimation( ) { return this.fadingFromBlack || this.fadingToBlack || this.holdBlackScreen; }

    startFadeToBlack( fadeInAndOut = false ) {
        this.fadeInAndOut       = fadeInAndOut
        this.fadingToBlack      = true;
        this.A = 0;
    }

    startFadeFromBlack( ) {
        this.fadingFromBlack    = true;
        this.A = 1;
    }

    handleFade( ) {
        document.getElementById('game-fader-canvas').getContext('2d').clearRect( 0, 0, window.innerWidth, window.innerHeight )
        drawRect( "FADER", 0, 0, window.innerWidth, window.innerHeight, this.RGBA )

        if ( this.fadingFromBlack ) {
            this.fadeFromBlack( )
        }
        else if ( this.fadingToBlack ) {
            this.fadeToBlack( )
        } 

        this.checkForFadeEnd( )
    }

    fadeToBlack( ) {
        this.A += .0250
    }

    fadeFromBlack( ) {
        this.A -= .0250
    }
    
    holdBlackMode( ) {
        this.holdBlackScreen = true;
    }

    checkForFadeEnd( ) {
        if ( this.fadingFromBlack && this.A <= 0 ) {
            this.unsetFadingAnimation( );
            globals.GAME.sound.playMusic( );
        }
        else if ( this.fadingToBlack && this.A >= 1 && this.fadeInAndOut ) {
            this.unsetFadingAnimation( );
            this.startFadeFromBlack( );      
        }
        else if ( this.fadingToBlack && this.A >= 1 ) {
            this.unsetFadingAnimation( );
            this.holdBlackMode( );
        }
    }

    unsetFadingAnimation( ) {
        this.holdBlackScreen    = false;
        this.fadingToBlack      = false;
        this.fadingFromBlack    = false;
        this.fadeInAndOut       = false;
    }
}

module.exports = {
    Fader
}