import { markContractAsResolved } from "../contracts/contractRegistry";
import { BUBBLE_INNER_PADDING, CANVAS_WIDTH, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, MAX_BUBBLE_WIDTH, SMALL_FONT_LINE_HEIGHT } from "../game-data/globals";
import type { Sprite } from "../game/core/Sprite";
import { clearSpeakingEffect, playEffect } from "../game/sound/sound";
import { TypeWriter } from "../helpers/TypeWriter";
import { writeTextLine } from "../helpers/canvasHelpers";
import { mobileAgent } from "../helpers/screenOrientation";
import { copyBubbleToGameCanvas, drawTemplateBubbleToCanvas, writeTextLinesToCanvas } from "./sharedTextFunctions";

// base variables
let speechBubbleCanvas: OffscreenCanvas;
let speechBubbleXy: { x: number, y: number };
let textX: number;
let textY: number;
let headerY: number;
const speechBubbleCanvasDimensions: { width: number, height: number } = {
    width: MAX_BUBBLE_WIDTH, height: GRID_BLOCK_PX * 2
};

// bubble specific variables
let mainTextTypeWriter: TypeWriter = null;
let headerText: string = null;
let speakingSprite: Sprite = null;
let contractId: string = null;

export const speechBubbleIsActive = (): boolean => { return mainTextTypeWriter !== null };

export const initializeSpeechBubbleCanvas = (): void => {
    speechBubbleCanvas = new OffscreenCanvas( speechBubbleCanvasDimensions.width, speechBubbleCanvasDimensions.height );
    drawTemplateBubbleToCanvas( speechBubbleCanvas.width, speechBubbleCanvas.height, speechBubbleCanvas.getContext( "2d" ) );
    setStandardBubbleXy();
    textX = speechBubbleXy.x + BUBBLE_INNER_PADDING;
    textY = speechBubbleXy.y + SMALL_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT
    headerY = speechBubbleXy.y + LARGE_FONT_SIZE;
};
export const initSpeechBubble = ( text: string, header: string, speaker: Sprite, contractId: string ): void => {
    mainTextTypeWriter = new TypeWriter( text, true );
    headerText = header;
    speakingSprite = speaker;
    contractId = contractId;
};
export const handleSpeechBubbleActionButton = (): void => {
    if ( mainTextTypeWriter === null ) return;

    if ( mainTextTypeWriter.isWriting ) {
        mainTextTypeWriter.displayFullText();
        playEffect( "misc/menu-scroll-a.mp3" );
        clearSpeakingEffect()
    }
    else {
        dismissSpeechBubble();
    }
}
export const drawSpeechBubble = ( context: OffscreenCanvasRenderingContext2D ): void => {
    if ( mainTextTypeWriter === null ) return;

    copyBubbleToGameCanvas( context, speechBubbleCanvas, speechBubbleXy );
    if ( headerText !== null ) {
        writeTextLine(
            headerText, textX, headerY, LARGE_FONT_SIZE, context
        );
    }
    drawHeaderLine( context );

    if ( mainTextTypeWriter.isWriting ) {
        mainTextTypeWriter.write();
    }

    //if ( this.isSpeechBubble && this.animation !== null ) {
    //    this.animation.spriteAnimationCounter( this );
    //}

    const textLines = mainTextTypeWriter.breakTextIntoLines(
        context, textX, textY, speechBubbleCanvasDimensions.width - GRID_BLOCK_PX * 2
    );
    writeTextLinesToCanvas( context, textLines );

    //if ( this.isSpeechBubble ) {
    //    const imageWidthOnCanvas = GRID_BLOCK_PX * 2;
    //    const imageHeightOnCanvas = GRID_BLOCK_PX * 1.875;
    //    const imageXOnCanvas = ( this.imageX + ( GRID_BLOCK_PX * 2 ) ) - imageWidthOnCanvas;
    //    const imageYOnCanvas = ( this.y + this.height ) - imageHeightOnCanvas
    //    context.drawImage(
    //        this.image,
    //        this.activeFrame.x, this.activeFrame.y,
    //        this.activeFrame.width, this.activeFrame.height,
    //        imageXOnCanvas, imageYOnCanvas,
    //        imageWidthOnCanvas, imageHeightOnCanvas
    //    );
    //}
};

const setStandardBubbleXy = (): void => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    speechBubbleXy = {
        x: ( speechBubbleCanvasWidth - MAX_BUBBLE_WIDTH ) / 2,
        y: mobileAgent ? screen.height - ( GRID_BLOCK_PX * 2 ) : screen.height - ( GRID_BLOCK_PX * 3 )
    };
};
const drawHeaderLine = ( context: OffscreenCanvasRenderingContext2D ): void => {
    context.beginPath()
    context.moveTo( textX, speechBubbleXy.y + LARGE_FONT_LINE_HEIGHT );
    context.lineTo( ( textX + speechBubbleCanvasDimensions.width ) - ( textX - speechBubbleXy.x ) - ( GRID_BLOCK_PX * 2 ), speechBubbleXy.y + LARGE_FONT_LINE_HEIGHT )
    context.stroke();
};
const dismissSpeechBubble = (): void => {
    if ( mainTextTypeWriter === null ) return;

    if ( contractId !== null ) {
        markContractAsResolved( contractId );
    }
    mainTextTypeWriter = null;
    headerText = null;
    speakingSprite = null;
    contractId = null;
};