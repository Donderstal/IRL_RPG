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
    const canvas = document.getElementById( 'game-menu-canvas' ) as HTMLCanvasElement;
    const xy = canvas.getBoundingClientRect();
    canvas.width = mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH;
    canvas.height = mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_HEIGHT;
    menu = new MenuCanvas( xy.x, xy.y, canvas, CanvasTypeEnum.overview );
    menu.canvas.style.position = 'fixed';
    menu.canvas.style.top = "0";
}

const instantiateSpeechBubbleCanvas = () => {
    const canvas = document.getElementById( 'game-bubble-canvas' ) as HTMLCanvasElement;
    const xy = canvas.getBoundingClientRect();
    canvas.width = BUBBLE_CANVAS_WIDTH;
    canvas.height = BUBBLE_CANVAS_HEIGHT;
    speechBubble = new SpeechBubbleCanvas( xy.x, xy.y, canvas, CanvasTypeEnum.speechBubbleCanvas )
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