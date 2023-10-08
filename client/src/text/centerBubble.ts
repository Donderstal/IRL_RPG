import { markContractAsResolved } from "../contracts/contractRegistry";
import { BATTLE_FONT_SIZE, CANVAS_WIDTH, GRID_BLOCK_PX } from "../game-data/globals";
import { TypeWriter } from "../helpers/TypeWriter";
import { setFont } from "../helpers/canvasHelpers";
import { mobileAgent } from "../helpers/screenOrientation";
import { copyBubbleToGameCanvas, drawTemplateBubbleToCanvas, writeTextLinesToCanvas } from "./sharedTextFunctions";

// base variables
let centerBubbleCanvas: OffscreenCanvas;
let centerBubbleXy: { x: number, y: number };
let textX: number;
let textY: number;
const centerBubbleFrames = 300;
const centerBubbleCanvasDimensions: { width: number, height: number } = {
    width: mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX * 2
};

// bubble specific variables
let mainTextTypeWriter: TypeWriter = null;
let fullText: string = null;
let contractId: string = null;
let activeCenterBubbleFrames: number = null;

export const centerTextBubbleIsActive = (): boolean => { return mainTextTypeWriter !== null };

export const initializeCenterBubbleCanvas = (): void => {
    centerBubbleCanvas = new OffscreenCanvas( centerBubbleCanvasDimensions.width, centerBubbleCanvasDimensions.height );
    drawTemplateBubbleToCanvas( centerBubbleCanvas.width, centerBubbleCanvas.height, centerBubbleCanvas.getContext( "2d" ) );
    setCenterBubbleXy();

    setFont( BATTLE_FONT_SIZE * 2, centerBubbleCanvas.getContext( "2d" ) )
    textY = centerBubbleXy.y + ( centerBubbleCanvas.height / 2 );
    activeCenterBubbleFrames = 0;
};
export const initCenterBubble = ( text: string, newContractId: string ): void => {
    mainTextTypeWriter = new TypeWriter( text );
    fullText = text;
    contractId = newContractId;

    const textWidth = centerBubbleCanvas.getContext( "2d" ).measureText( text ).width;
    textX = centerBubbleXy.x + ( ( centerBubbleCanvasDimensions.width / 2 ) - ( textWidth / 2 ) );
};
export const drawCenterBubble = ( context: OffscreenCanvasRenderingContext2D ): void => {
    if ( mainTextTypeWriter === null ) return;

    copyBubbleToGameCanvas( context, centerBubbleCanvas, centerBubbleXy );

    if ( mainTextTypeWriter.isWriting ) {
        mainTextTypeWriter.write();
    }

    const textLines = mainTextTypeWriter.breakTextIntoLines(
        context, textX, textY, centerBubbleCanvasDimensions.width - GRID_BLOCK_PX * 2
    );
    writeTextLinesToCanvas( context, textLines, BATTLE_FONT_SIZE * 2 );

    activeCenterBubbleFrames++;
    if ( activeCenterBubbleFrames > centerBubbleFrames ) {
        dismissCenterBubble();
    }
}

const dismissCenterBubble = (): void => {
    if ( contractId !== null ) {
        markContractAsResolved( contractId );
    }
    textX = null;
    mainTextTypeWriter = null;
    fullText = null;
    contractId = null;
    activeCenterBubbleFrames = null;
};
const setCenterBubbleXy = (): void => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    centerBubbleXy = {
        x: ( speechBubbleCanvasWidth / 2 ) - ( centerBubbleCanvasDimensions.width / 2 ),
        y: ( mobileAgent ? 0 : ( GRID_BLOCK_PX * 2 ) - ( centerBubbleCanvasDimensions.height / 2 ) )
    };
}