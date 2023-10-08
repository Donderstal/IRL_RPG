import { markContractAsResolved } from "../contracts/contractRegistry";
import { BATTLE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } from "../game-data/globals";
import { clearSpeakingEffect, playEffect } from "../game/sound/sound";
import { setFont } from "../helpers/canvasHelpers";
import { TypeWriter } from "../helpers/TypeWriter";
import { writeTextLinesToCanvas } from "./sharedTextFunctions";

let screentextCanvas: OffscreenCanvas = null;
let mainTextTypeWriter: TypeWriter = null;
let activeTextIsTitle: boolean = null;
let maxPhraseWidth: number = null;
let contractId: string = null;

let textX: number = null;
let textY: number = null;
let fontSize: number = null;

export const screenTextIsActive = (): boolean => { return mainTextTypeWriter !== null };

export const initializeScreenTextCanvas = ( width: number, height: number ): void => {
    screentextCanvas = new OffscreenCanvas( width, height );
};
export const initScreenText = ( text: string, isTitle: boolean, maxWidth: number, contractId: string ): void => {
    mainTextTypeWriter = new TypeWriter( text );
    activeTextIsTitle = isTitle;
    maxPhraseWidth = maxWidth;
    contractId = contractId;

    fontSize = activeTextIsTitle ? BATTLE_FONT_SIZE * 2 : LARGE_FONT_SIZE;
    determineStartXy( text );
};
export const drawScreenText = ( context: OffscreenCanvasRenderingContext2D ): void => {
    if ( mainTextTypeWriter === null ) return;

    if ( mainTextTypeWriter.isWriting ) {
        mainTextTypeWriter.write();
    }

    const textLines = mainTextTypeWriter.breakTextIntoLines(
        context, textX, textY, maxPhraseWidth, fontSize
    );
    writeTextLinesToCanvas( context, textLines, fontSize );
};
export const handleScreenTextActionButton = (): void => {
    if ( mainTextTypeWriter === null ) return;

    if ( mainTextTypeWriter.isWriting ) {
        mainTextTypeWriter.displayFullText();
        playEffect( "misc/menu-scroll-a.mp3" );
        clearSpeakingEffect()
    }
    else {
        dismissScreenText();
    }
};

const determineStartXy = ( text: string ): void => {
    const ctx = screentextCanvas.getContext( "2d" )
    setFont( fontSize, ctx );

    const textHeight = Math.ceil( ctx.measureText( text ).width / maxPhraseWidth ) * ( activeTextIsTitle ? BATTLE_FONT_LINE_HEIGHT * 2 : LARGE_FONT_LINE_HEIGHT );
    const textWidth = ctx.measureText( text ).width > maxPhraseWidth ? maxPhraseWidth : ctx.measureText( text ).width
    textX = ( CANVAS_WIDTH - textWidth ) / 2 ;
    textY = ( CANVAS_HEIGHT - textHeight ) / 2;
};
const dismissScreenText = (): void => {
    if ( contractId !== null ) {
        markContractAsResolved( contractId );
    }
    mainTextTypeWriter = null;
    activeTextIsTitle = null;
    maxPhraseWidth = null;
    contractId = null;
};