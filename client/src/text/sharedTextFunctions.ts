import { getUiImage } from "../assets/ui";
import { GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_PX, LARGE_FONT_SIZE } from "../game-data/globals";
import { BUBBLE_BOTTOM, BUBBLE_LEFT, BUBBLE_LEFT_BOTTOM, BUBBLE_LEFT_TOP, BUBBLE_MIDDLE, BUBBLE_RIGHT, BUBBLE_RIGHT_BOTTOM, BUBBLE_RIGHT_TOP, BUBBLE_TOP } from "../game-data/textboxGlobals";
import { writeTextLine } from "../helpers/canvasHelpers";
import type { PhraseModel } from "../models/cutscenes/PhraseModel";

export const drawTemplateBubbleToCanvas = ( width: number, height: number, context: OffscreenCanvasRenderingContext2D ): void => {
    const columns = width / GRID_BLOCK_PX;
    const rows = height / GRID_BLOCK_PX;

    for ( let row = 1; row <= rows; row++ ) {
        for ( let column = 1; column <= columns; column++ ) {
            let spriteKey = getBubblePart( column, row, columns, rows );
            let x = ( GRID_BLOCK_PX * column ) - GRID_BLOCK_PX;
            let y = ( GRID_BLOCK_PX * row ) - GRID_BLOCK_PX;
            drawBubblePart( spriteKey, x, y, context );
        }
    };
};
export const copyBubbleToGameCanvas = ( gameCanvasContext: OffscreenCanvasRenderingContext2D, bubbleCanvas: OffscreenCanvas, xy: { x: number, y: number } ): void => {
    gameCanvasContext.drawImage(
        bubbleCanvas,
        xy.x,
        xy.y
    );
};
export const writeTextLinesToCanvas = ( activeContext: OffscreenCanvasRenderingContext2D, textLines: PhraseModel[], fontSize: number = LARGE_FONT_SIZE ): void => {
    textLines.forEach( ( phrase ) => {
        writeTextLine( phrase.phrase, phrase.x, phrase.y, fontSize, activeContext, phrase.color );
    } )
};

const drawBubblePart = ( pngKey: string, x: number, y: number, context: OffscreenCanvasRenderingContext2D ): void => {
    context.drawImage(
        getUiImage( pngKey ),
        0, 0,
        GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
        x, y,
        GRID_BLOCK_PX, GRID_BLOCK_PX
    );
}
const getBubblePart = ( column: number, row: number, columns: number, rows: number ): string => {
    if ( column === 1 && row === 1 ) {
        return BUBBLE_LEFT_TOP;
    }
    else if ( column === columns && row === 1 ) {
        return BUBBLE_RIGHT_TOP;
    }
    else if ( row === 1 ) {
        return BUBBLE_TOP
    }
    else if ( column === 1 && row !== 1 && row !== rows ) {
        return BUBBLE_LEFT;
    }
    else if ( column === columns && row !== 1 && row !== rows ) {
        return BUBBLE_RIGHT;
    }
    else if ( row !== 1 && row !== rows ) {
        return BUBBLE_MIDDLE;
    }
    else if ( column === 1 && row === rows ) {
        return BUBBLE_LEFT_BOTTOM;
    }
    else if ( column === columns && row === rows ) {
        return BUBBLE_RIGHT_BOTTOM;
    }
    else if ( row === rows ) {
        return BUBBLE_BOTTOM
    }
};