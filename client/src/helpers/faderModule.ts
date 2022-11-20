import globals from "../game-data/globals";
import { playMusic } from "../game/sound/sound";
import { drawRect } from "./canvasHelpers";

const RGB = "0, 0, 0, ";

let faderCanvas: OffscreenCanvas = null;
let fadingToBlack = false;
let fadingFromBlack = false;
let holdBlackScreen = false;
let fadeInAndOut = false;
let A = null;

export const getRGBA = (): string => { return "rgba( " + RGB + A + ")"; };
export const inFadingAnimation = (): boolean => { return fadingFromBlack || fadingToBlack || holdBlackScreen; };
export const fadedOut = (): boolean => { return !fadingToBlack && holdBlackScreen; };

export const setFaderCanvas = ( width : number, height: number ): void => {
    faderCanvas = new OffscreenCanvas( width, height );
};
export const startFadeToBlack = ( fadeBack = false ): void => {
    fadeInAndOut = fadeBack
    fadingToBlack = true;
    A = 0;
};
export const startFadeFromBlack = (): void => {
    fadingFromBlack = true;
    A = 1;
};
export const handleFadeAnimation = (): void => {
    faderCanvas.getContext( '2d' ).clearRect( 0, 0, screen.width, screen.height )
    drawRect( faderCanvas, 0, 0, screen.width, screen.height, getRGBA() )

    if( fadingFromBlack ) {
        fadeFromBlack()
    }
    else if ( fadingToBlack ) {
        fadeToBlack()
    }

    checkForFadeEnd()
}
export const getFaderCanvas = (): OffscreenCanvas => {
    return faderCanvas;
}

const fadeToBlack = (): void => {
    A += .0250
};
const fadeFromBlack = (): void => {
    A -= .0250
};
const holdBlackMode = (): void => {
    holdBlackScreen = true;
}
const checkForFadeEnd = (): void => {
    if( fadingFromBlack && A <= 0 ) {
        unsetFadingAnimation();
        playMusic();
    }
    else if ( fadingToBlack && A >= 1 && fadeInAndOut ) {
        unsetFadingAnimation();
        startFadeFromBlack();
    }
    else if ( fadingToBlack && A >= 1 ) {
        unsetFadingAnimation();
        holdBlackMode();
    }
}
const unsetFadingAnimation = (): void => {
    holdBlackScreen = false;
    fadingToBlack = false;
    fadingFromBlack = false;
    fadeInAndOut = false;
}
