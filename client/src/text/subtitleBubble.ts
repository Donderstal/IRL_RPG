import { markContractAsResolved } from "../contracts/contractRegistry";
import { BUBBLE_INNER_PADDING, CANVAS_WIDTH, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE } from "../game-data/globals";
import { playEffect } from "../game/sound/sound";
import { TypeWriter } from "../helpers/TypeWriter";
import { mobileAgent } from "../helpers/screenOrientation";
import { copyBubbleToGameCanvas, drawTemplateBubbleToCanvas, writeTextLinesToCanvas } from "./sharedTextFunctions";

let subtitleBubbleCanvas: OffscreenCanvas;
let subtitleBubbleXy: { x: number, y: number };
const subtitleBubbleCanvasDimensions: { width: number, height: number } = {
    width: mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX
};
let holdAtTopFrames = 90;

// bubble specific variables
let mainTextTypeWriter: TypeWriter = null;
let contractId: string = null;
let destinationY: number = null
let bubbleY: number = null;
let textX: number = null;
let movingUp: boolean = null;
let holdForFrameCounter: number = null;

export const subtitleBubbleIsActive = (): boolean => { return mainTextTypeWriter !== null };

export const initializeSubtitleBubbleCanvas = (): void => {
    subtitleBubbleCanvas = new OffscreenCanvas( subtitleBubbleCanvasDimensions.width, subtitleBubbleCanvasDimensions.height );
    drawTemplateBubbleToCanvas( subtitleBubbleCanvas.width, subtitleBubbleCanvas.height, subtitleBubbleCanvas.getContext( "2d" ) );
    setSubtitleBubbleXy();
};

export const initSubtitleBubble = ( subtitleText: string, newContractId: string ): void => {
    playEffect( 'misc/menu-select.mp3' );

    mainTextTypeWriter = new TypeWriter( subtitleText );
    mainTextTypeWriter.displayFullText();

    contractId = newContractId;
    textX = subtitleBubbleXy.x + BUBBLE_INNER_PADDING;

    bubbleY = subtitleBubbleXy.y; //- subtitleBubbleCanvasDimensions.height;
    setMoveToY( subtitleBubbleXy.y - subtitleBubbleCanvasDimensions.height );
    movingUp = true;
    holdForFrameCounter = 0;
};
export const drawSubtitleBubble = ( context: OffscreenCanvasRenderingContext2D ): void => {
    if ( mainTextTypeWriter === null ) return;

    copyBubbleToGameCanvas( context, subtitleBubbleCanvas, { x: subtitleBubbleXy.x, y: bubbleY } );

    const textLines = mainTextTypeWriter.breakTextIntoLines(
        context, textX, bubbleY + ( LARGE_FONT_LINE_HEIGHT * 1.3 ), subtitleBubbleCanvasDimensions.width - GRID_BLOCK_PX * 2, LARGE_FONT_SIZE
    );
    writeTextLinesToCanvas( context, textLines, LARGE_FONT_SIZE );

    moveBubble();
}

const setSubtitleBubbleXy = (): void => {
    subtitleBubbleXy = {
        x: mobileAgent ? GRID_BLOCK_PX * 2 : CANVAS_WIDTH / 4,
        y: screen.height
    };
};
const dismissSubtitleBubble = (): void => {
    if ( contractId !== null ) {
        markContractAsResolved( contractId );
    }

    mainTextTypeWriter = null
    contractId = null;
    destinationY = null;
    bubbleY = null
    movingUp = null;
}
const setMoveToY = ( y: number ): void => {
    destinationY = y;
};
const moveBubble = (): void => {
    if ( movingUp ) {
        if ( bubbleY > destinationY ) {
            bubbleY = bubbleY - ( GRID_BLOCK_PX / 8 );
        }
        else {
            movingUp = false;
            setMoveToY( screen.height );
        }
    }
    else {
        if ( holdForFrameCounter < holdAtTopFrames ) {
            holdForFrameCounter++;
        }
        else if ( bubbleY < destinationY ) {
            bubbleY = bubbleY + ( GRID_BLOCK_PX / 8 );
        }
        else {
            dismissSubtitleBubble();
        }
    }
}