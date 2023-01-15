import { LARGE_FONT_LINE_HEIGHT, MAX_BUBBLE_TEXT_WIDTH } from "../game-data/globals";
import { TypeWriter } from "./TypeWriter";

let textCanvas: OffscreenCanvas = null;
let textContext: OffscreenCanvasRenderingContext2D = null;
let typeWriter: TypeWriter = null;
let maxPhraseWidth: number = null;
let textStartingX: number = null;
let textStartingY: number = null;

export const screenTextIsActive = (): boolean => { return typeWriter !== null; }
export const screenTextIsWriting = (): boolean => { return typeWriter.isWriting; }

const clearTextCanvas = (): void => {
    textContext.clearRect( 0, 0, textCanvas.width, textCanvas.height );
}
const writeTypeWriterTextToCanvas = (): void => {
    const text = typeWriter.breakTextIntoLines( textContext, textStartingX, textStartingY, maxPhraseWidth );
    text.forEach( ( phrase ) => { writeTextLineToCanvas( phrase.phrase, phrase.x, phrase.y ); })
}
const writeTextLineToCanvas = ( text: string, x: number, y: number ): void => {
    textContext.fillStyle = "white";
    textContext.fillText( text, x, y );
}
const displayFullTypeWriterText = (): void => {
    typeWriter.displayFullText()
}
const unsetScreenTextFromCanvas = (): void => {
    typeWriter = null;
}

export const setScreenTextCanvas = ( width: number, height: number ): void => {
    textCanvas = new OffscreenCanvas( width, height );
    textContext = textCanvas.getContext( "2d" );
};
export const handleScreenText = (): void => {
    clearTextCanvas();
    typeWriter.write();
    writeTypeWriterTextToCanvas();
};
export const setScreenTextToCanvas = ( text: string, maxWidth: number = MAX_BUBBLE_TEXT_WIDTH ): void => {
    typeWriter = new TypeWriter( text );
    maxPhraseWidth = maxWidth

    const textHeight = Math.ceil( textContext.measureText( text ).width / maxWidth ) * LARGE_FONT_LINE_HEIGHT;
    textStartingX = (textCanvas.width - maxWidth) / 2
    textStartingY = (textCanvas.height - textHeight) / 2
}
export const getScreenTextCanvas = (): OffscreenCanvas => {
    return textCanvas;
}
export const handleScreenTextActionButton = (): void => {
    if ( screenTextIsWriting() ) {
        displayFullTypeWriterText();
    }
    else {
        unsetScreenTextFromCanvas();
    }
}