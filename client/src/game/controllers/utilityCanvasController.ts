import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_PX } from "../../game-data/globals";
import { mobileAgent } from "../../helpers/screenOrientation";
import { MenuCanvas } from "../canvas/MenuCanvas";
import { SpeechBubbleCanvas } from "../canvas/SpeechBubbleCanvas";

let menu: MenuCanvas;
let speechBubble: SpeechBubbleCanvas;

export const instantiateUICanvases = () => {
    instantiateMenuCanvas();
    if ( mobileAgent ) {
        instantiateSpeechBubbleCanvas();
    }
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
    if ( mobileAgent ) {
        menu.canvas.style.position = 'fixed';
        menu.canvas.style.top = "0";
    }
}

const instantiateSpeechBubbleCanvas = () => {
    const canvas = document.getElementById( 'game-bubble-canvas' ) as HTMLCanvasElement;
    const xy = canvas.getBoundingClientRect();
    canvas.width = GRID_BLOCK_PX * 12;
    canvas.height = GRID_BLOCK_PX * 8;
    speechBubble = new SpeechBubbleCanvas( xy.x, xy.y, canvas, CanvasTypeEnum.overview )
}