import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { BUBBLE_CANVAS_HEIGHT, BUBBLE_CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_PX } from "../../game-data/globals";
import { mobileAgent } from "../../helpers/screenOrientation";
import { MenuCanvas } from "../canvas/MenuCanvas";
import { SpeechBubbleCanvas } from "../canvas/SpeechBubbleCanvas";

let menu: MenuCanvas;
let speechBubble: SpeechBubbleCanvas;

export const instantiateUICanvases = () => {
    instantiateMenuCanvas();
    instantiateSpeechBubbleCanvas();
}

export const getMenuCanvas = () => {
    return menu;
}

export const getSpeechBubbleCanvas = () => {
    return speechBubble;
}

const instantiateMenuCanvas = () => {
    const width = mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH;
    const height = mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_HEIGHT;
    menu = new MenuCanvas( 0, 0, new OffscreenCanvas( width, height ), CanvasTypeEnum.overview );
}

const instantiateSpeechBubbleCanvas = () => {
    speechBubble = new SpeechBubbleCanvas( 0, 0, new OffscreenCanvas( BUBBLE_CANVAS_WIDTH, BUBBLE_CANVAS_HEIGHT ), CanvasTypeEnum.speechBubbleCanvas )
}

export const drawUIToCanvas = ( ctx: OffscreenCanvasRenderingContext2D, canvasWidth: number, canvasHeight: number ) => {
    ctx.drawImage( menu.canvas, ( canvasWidth - menu.canvas.width ) / 2, ( canvasHeight - menu.canvas.height ) );
    ctx.drawImage( speechBubble.canvas, ( canvasWidth - speechBubble.canvas.width ) / 2, ( canvasHeight - speechBubble.canvas.height ) );
}

export const clearUICanvases = () => {
    clearUtilityCanvasOfType( CanvasTypeEnum.overview );
    clearUtilityCanvasOfType( CanvasTypeEnum.speechBubbleCanvas );
}

export const clearUtilityCanvasOfType = ( type: CanvasTypeEnum ): void => {
    switch ( type ) {
        case CanvasTypeEnum.overview:
            menu.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
            break;
        case CanvasTypeEnum.speechBubbleCanvas:
            speechBubble.ctx.clearRect( 0, 0, BUBBLE_CANVAS_WIDTH, BUBBLE_CANVAS_HEIGHT );
            break;
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}