import { markContractAsResolved } from "../contracts/contractRegistry";
import { BUBBLE_INNER_PADDING, CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, SMALL_FONT_LINE_HEIGHT } from "../game-data/globals";
import { writeTextLine } from "../helpers/canvasHelpers";
import { mobileAgent } from "../helpers/screenOrientation";
import { isInArray } from "../helpers/utilFunctions";
import { copyBubbleToGameCanvas, drawTemplateBubbleToCanvas } from "./sharedTextFunctions";

let multiSelectBubbleCanvas: OffscreenCanvas;
let multiSelectBubbleXy: { x: number, y: number };
let textX: number = null;
let textY: number = null;
let headerY: number = null
const multiselectBubbleCanvasDimensions: { width: number, height: number } = {
    width: GRID_BLOCK_PX * 4, height: GRID_BLOCK_PX * 8
};

// bubble specific variables
let options: string[] = null;
let finalOptionIndex: number;
let disabledOptionIndexes: number[] = null;
let headerText: string = null;
let activeOptionIndex: number = null;
let contractId: string = null;

export const multiSelectBubbleIsActive = (): boolean => { return options !== null };

export const initializeMultiSelectBubbleCanvas = (): void => {
    multiSelectBubbleCanvas = new OffscreenCanvas( multiselectBubbleCanvasDimensions.width, multiselectBubbleCanvasDimensions.height );
    drawTemplateBubbleToCanvas( multiSelectBubbleCanvas.width, multiSelectBubbleCanvas.height, multiSelectBubbleCanvas.getContext( "2d" ) );
    setMultiSelectBubbleXy();

    textX = multiSelectBubbleXy.x + BUBBLE_INNER_PADDING;
    textY = multiSelectBubbleXy.y + SMALL_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT;
    headerY = multiSelectBubbleXy.y + LARGE_FONT_SIZE;
};
export const initMultiSelectBubble = ( selectionOptions: string[], disabledOptions: string[], text: string, newContractId: string ): void => {
    options = selectionOptions
    headerText = text;
    disabledOptionIndexes = disabledOptions.map( ( e ) => { return options.indexOf(e) } );
    contractId = newContractId;
    finalOptionIndex = options.length - 1;
    activeOptionIndex = -1;

    scrollThroughMultiSelectOptions( false );
};
export const scrollThroughMultiSelectOptions = ( scrollUp: boolean ): void => {
    if ( options === null ) return;

    let foundNewOptionIndex = false;
    let currentIndex = activeOptionIndex;

    while ( !foundNewOptionIndex ) {
        currentIndex = scrollUp ? currentIndex - 1 : currentIndex + 1;

        if ( scrollUp && currentIndex < 0 ) {
            currentIndex = finalOptionIndex;
        }

        if ( !scrollUp && currentIndex > finalOptionIndex ) {
            currentIndex = 0;
        }

        if ( !isInArray( disabledOptionIndexes, currentIndex ) ) {
            activeOptionIndex = currentIndex;
            foundNewOptionIndex = true;
        }
    }
};
export const drawMultiSelectBubble = ( context: OffscreenCanvasRenderingContext2D ): void => {
    if ( options === null ) return;

    copyBubbleToGameCanvas( context, multiSelectBubbleCanvas, multiSelectBubbleXy );

    if ( headerText !== null ) {
        writeTextLine(
            headerText, textX, headerY, LARGE_FONT_SIZE, context
        );
    }

    let yCounter = textY;
    options.forEach( ( e, index ) => {
        const color = !isInArray( disabledOptionIndexes, index ) ? "black" : "lightgrey";
        writeTextLine( e, textX, yCounter, LARGE_FONT_SIZE, context, color );
        yCounter += LARGE_FONT_LINE_HEIGHT;
    } )
};
export const selectActiveMultiSelectOption = (): void => {
    if ( options === null ) return;
    // select option
    dismissMultiSelectBubble();
}
const dismissMultiSelectBubble = (): void => {
    if ( contractId !== null ) {
        markContractAsResolved( contractId );
    }
    options = null;
    finalOptionIndex = null;
    disabledOptionIndexes = null;
    headerText = null;
    activeOptionIndex = null;
    contractId = null;
};

const setMultiSelectBubbleXy = (): void => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    const speechBubbleCanvasHeight = mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_HEIGHT;
    multiSelectBubbleXy = {
        x: ( speechBubbleCanvasWidth / 2 ) - ( multiselectBubbleCanvasDimensions.width / 2 ),
        y: ( speechBubbleCanvasHeight / 2 ) - ( multiselectBubbleCanvasDimensions.height / 2 )
    };
}