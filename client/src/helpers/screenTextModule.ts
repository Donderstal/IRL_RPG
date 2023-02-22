import { BATTLE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, MAX_BUBBLE_TEXT_WIDTH } from "../game-data/globals";
import { clearSpeakingEffect, playEffect, playSpeakingEffect } from "../game/sound/sound";
import { setFont } from "./canvasHelpers";
import { TypeWriter } from "./TypeWriter";

let textCanvas: OffscreenCanvas = null;
let textContext: OffscreenCanvasRenderingContext2D = null;
let typeWriter: TypeWriter = null;
let maxPhraseWidth: number = null;
let textStartingX: number = null;
let textStartingY: number = null;
let activeTextIsTitle: boolean = false;

export const screenTextIsActive = (): boolean => { return typeWriter !== null; }
export const screenTextIsWriting = (): boolean => { return typeWriter.isWriting; }

const clearTextCanvas = (): void => {
    textContext.clearRect( 0, 0, textCanvas.width, textCanvas.height );
}
const writeTypeWriterTextToCanvas = (): void => {
    const text = typeWriter.breakTextIntoLines( textContext, textStartingX, textStartingY, maxPhraseWidth, activeTextIsTitle ? BATTLE_FONT_SIZE * 2 : LARGE_FONT_SIZE );
    text.forEach( ( phrase ) => { writeTextLineToCanvas( phrase.phrase, phrase.x, phrase.y ); })
}
const writeTextLineToCanvas = ( text: string, x: number, y: number ): void => {
    setFont( activeTextIsTitle ? BATTLE_FONT_SIZE * 2 : LARGE_FONT_SIZE, textContext );
    textContext.fillStyle = "white";
    textContext.fillText( text, x, y );
}
const displayFullTypeWriterText = (): void => {
    typeWriter.displayFullText()
}
const unsetScreenTextFromCanvas = (): void => {
    typeWriter = null;
    clearTextCanvas();
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
export const setScreenTextToCanvas = ( text: string, title: boolean, maxWidth: number = MAX_BUBBLE_TEXT_WIDTH ): void => {
    activeTextIsTitle = title
    typeWriter = new TypeWriter( text );
    playSpeakingEffect("lowblip.ogg")
    maxPhraseWidth = maxWidth

    setFont( activeTextIsTitle ? BATTLE_FONT_SIZE * 2 : LARGE_FONT_SIZE, textContext );

    const textHeight = Math.ceil( textContext.measureText( text ).width / maxWidth ) * ( activeTextIsTitle ? BATTLE_FONT_LINE_HEIGHT * 2 : LARGE_FONT_LINE_HEIGHT );
    const textWidth = textContext.measureText( text ).width > maxWidth ? maxWidth : textContext.measureText( text ).width
    textStartingX = ( textCanvas.width - textWidth ) / 2
    textStartingY = (textCanvas.height - textHeight) / 2
}
export const getScreenTextCanvas = (): OffscreenCanvas => {
    return textCanvas;
}
export const handleScreenTextActionButton = (): void => {
    if ( screenTextIsWriting() ) {
        displayFullTypeWriterText();
        playEffect( "misc/menu-scroll-a.mp3" );
        clearSpeakingEffect()
    }
    else {
        unsetScreenTextFromCanvas();
    }
}