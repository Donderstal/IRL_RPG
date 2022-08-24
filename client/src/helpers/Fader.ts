import globals from '../game-data/globals';
import { drawRect } from './canvasHelpers';

export class Fader {
    RGB: string;
    A: number;
    fadingToBlack: boolean;
    fadingFromBlack: boolean;
    fadeInAndOut: boolean;
    holdBlackScreen: boolean;
    constructor( ) {
        this.RGB = "0, 0, 0, "
        this.A = null;
        this.fadingToBlack = false;
        this.fadingFromBlack = false;
        this.holdBlackScreen = false;
    }

    get RGBA( ): string { return "rgba( " + this.RGB + this.A + ")"; }
    get inFadingAnimation(): boolean { return this.fadingFromBlack || this.fadingToBlack || this.holdBlackScreen; }

    startFadeToBlack( fadeInAndOut = false ): void {
        this.fadeInAndOut       = fadeInAndOut
        this.fadingToBlack      = true;
        this.A = 0;
    }

    startFadeFromBlack(): void {
        this.fadingFromBlack    = true;
        this.A = 1;
    }

    handleFade(): void {
        const canvas = ( document.getElementById( 'game-fader-canvas' ) as HTMLCanvasElement );
        canvas.getContext('2d').clearRect( 0, 0, screen.width, screen.height )
        drawRect( canvas, 0, 0, screen.width, screen.height, this.RGBA )

        if ( this.fadingFromBlack ) {
            this.fadeFromBlack( )
        }
        else if ( this.fadingToBlack ) {
            this.fadeToBlack( )
        } 

        this.checkForFadeEnd( )
    }

    fadeToBlack(): void {
        this.A += .0250
    }

    fadeFromBlack(): void {
        this.A -= .0250
    }
    
    holdBlackMode(): void {
        this.holdBlackScreen = true;
    }

    checkForFadeEnd(): void {
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

    unsetFadingAnimation(): void {
        this.holdBlackScreen    = false;
        this.fadingToBlack      = false;
        this.fadingFromBlack    = false;
        this.fadeInAndOut       = false;
    }
}