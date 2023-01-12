import { getUiImage } from "../assets/ui";
import { TextBubbleType } from "../enumerables/TextBubbleType";
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_PX, MAX_BUBBLE_WIDTH } from "../game-data/globals";
import { BUBBLE_BOTTOM, BUBBLE_LEFT, BUBBLE_LEFT_BOTTOM, BUBBLE_LEFT_TOP, BUBBLE_MIDDLE, BUBBLE_RIGHT, BUBBLE_RIGHT_BOTTOM, BUBBLE_RIGHT_TOP, BUBBLE_TOP } from "../game-data/textboxGlobals";
import { mobileAgent } from "./screenOrientation";

export let speechBubbleCanvas: OffscreenCanvas;
export let centerBubbleCanvas: OffscreenCanvas;
export let subtitleBubbleCanvas: OffscreenCanvas;
export let elevatorBubbleCanvas: OffscreenCanvas;

const speechBubbleCanvasDimensions = { width: MAX_BUBBLE_WIDTH, height: GRID_BLOCK_PX * 2 };
const centerBubbleCanvasDimensions = { width: mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX * 2 };
const subtitleBubbleCanvasDimensions = { width: mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX };
const elevatorBubbleCanvasDimensions = { width: GRID_BLOCK_PX * 4, height: GRID_BLOCK_PX * 8 };

export const initializeBubbleCanvases = (): void => {
    initializeSpeechBubbleCanvas();
    initializeCenterBubbleCanvas();
    initializeSubtitleBubbleCanvas();
    initializeElevatorBubbleCanvas();
}

const initializeSpeechBubbleCanvas = (): void => {
    speechBubbleCanvas = new OffscreenCanvas( speechBubbleCanvasDimensions.width, speechBubbleCanvasDimensions.height ); 
    drawTemplateBubbleToCanvas( speechBubbleCanvas.width, speechBubbleCanvas.height, speechBubbleCanvas.getContext( "2d" ) );
}

const initializeCenterBubbleCanvas = (): void => {
    centerBubbleCanvas = new OffscreenCanvas( centerBubbleCanvasDimensions.width, centerBubbleCanvasDimensions.height );
    drawTemplateBubbleToCanvas( centerBubbleCanvas.width, centerBubbleCanvas.height, centerBubbleCanvas.getContext( "2d" ) );
}

const initializeSubtitleBubbleCanvas = (): void => {
    subtitleBubbleCanvas = new OffscreenCanvas( subtitleBubbleCanvasDimensions.width, subtitleBubbleCanvasDimensions.height );
    drawTemplateBubbleToCanvas( subtitleBubbleCanvas.width, subtitleBubbleCanvas.height, subtitleBubbleCanvas.getContext( "2d" ) );
}

const initializeElevatorBubbleCanvas = (): void => {
    elevatorBubbleCanvas = new OffscreenCanvas( elevatorBubbleCanvasDimensions.width, elevatorBubbleCanvasDimensions.height );
    drawTemplateBubbleToCanvas( elevatorBubbleCanvas.width, elevatorBubbleCanvas.height, elevatorBubbleCanvas.getContext( "2d" ) );
}

const drawTemplateBubbleToCanvas = (width: number, height: number, context: OffscreenCanvasRenderingContext2D): void => {
    const columns = width / GRID_BLOCK_PX;
    const rows = height / GRID_BLOCK_PX;

    for ( let row = 1; row <= rows; row++ ) {
        for ( let column = 1; column <= columns; column++ ) {
            let spriteKey = getBubblePart( column, row, columns, rows );
            let x = ( GRID_BLOCK_PX * column ) - GRID_BLOCK_PX;
            let y = ( GRID_BLOCK_PX * row ) - GRID_BLOCK_PX;
            drawBubblePart( spriteKey, x, y, context );
        }
    }
}

const drawBubblePart = ( pngKey: string, x: number, y: number, context: OffscreenCanvasRenderingContext2D ): void => {
    context.drawImage(
        getUiImage(pngKey),
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
}

const getStandardBubbleXy = ( ): { x: number, y: number } => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    return {
        x: ( speechBubbleCanvasWidth - MAX_BUBBLE_WIDTH ) / 2,
        y: mobileAgent ? screen.height - ( GRID_BLOCK_PX * 2 ) : screen.height - ( GRID_BLOCK_PX * 3 ) 
    };
}
const getSubtitleBubbleXy = ( ): { x: number, y: number } => {
    return {
        x: mobileAgent ? GRID_BLOCK_PX * 2 : CANVAS_WIDTH / 4,
        y: screen.height
    };
}
const getCenterBubbleXy = ( ): { x: number, y: number } => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    return {
        x: ( speechBubbleCanvasWidth / 2 ) - ( centerBubbleCanvasDimensions.width / 2 ),
        y: ( mobileAgent ? 0 : ( GRID_BLOCK_PX * 2 ) - ( centerBubbleCanvasDimensions.height / 2 ) ) 
    };
}
const getElevatorBubbleXy = (): { x: number, y: number } => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    const speechBubbleCanvasHeight = mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_HEIGHT;
    return {
        x: ( speechBubbleCanvasWidth / 2 ) - ( elevatorBubbleCanvasDimensions.width / 2 ),
        y: ( speechBubbleCanvasHeight / 2 ) - ( elevatorBubbleCanvasDimensions.height / 2 )
    };
}

export const getSpeechBubbleTemplateCanvas = ( type: TextBubbleType ) => {
    switch ( type ) {
        case TextBubbleType.Speak:
        case TextBubbleType.SpeakYesNo:
            return speechBubbleCanvas;
        case TextBubbleType.Center:
            return centerBubbleCanvas;
        case TextBubbleType.Subtitle:
            return subtitleBubbleCanvas;
        case TextBubbleType.Elevator:
            return elevatorBubbleCanvas;
    }
}

export const getSpeechBubbleDimensions = ( type: TextBubbleType ) => {
    switch ( type ) {
        case TextBubbleType.Speak:
        case TextBubbleType.SpeakYesNo:
            return speechBubbleCanvasDimensions;
        case TextBubbleType.Center:
            return centerBubbleCanvasDimensions;
        case TextBubbleType.Subtitle:
            return subtitleBubbleCanvasDimensions;
        case TextBubbleType.Elevator:
            return elevatorBubbleCanvasDimensions;
    }
}

export const getSpeechBubbleXy = ( type: TextBubbleType ) => {
    switch ( type ) {
        case TextBubbleType.Speak:
        case TextBubbleType.SpeakYesNo:
            return getStandardBubbleXy();
        case TextBubbleType.Center:
            return getCenterBubbleXy();
        case TextBubbleType.Subtitle:
            return getSubtitleBubbleXy();
        case TextBubbleType.Elevator:
            return getElevatorBubbleXy();
    }
}