import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { BUBBLE_CANVAS_HEIGHT, BUBBLE_CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_PX } from "../../game-data/globals";
import type { CanvasGrid } from "../core/CanvasGrid";
import type { BackSpriteGrid } from "./BackSpriteGrid";
import type { BackTileGrid } from "./BackTileGrid";
import type { FrontTileGrid } from "./FrontTileGrid";
import type { MenuCanvas } from "./MenuCanvas";
import type { SpeechBubbleCanvas } from "./SpeechBubbleCanvas";

let backTiles: BackTileGrid;
let backSprites: BackSpriteGrid;
let frontTiles: FrontTileGrid;

let menu: MenuCanvas;
let speechBubble: SpeechBubbleCanvas;

let preRenderCanvas: OffscreenCanvas;
let preRenderContext: OffscreenCanvasRenderingContext2D;

let DOMCanvas: HTMLCanvasElement;
let DOMContext: CanvasRenderingContext2D;

export const initializeRenderCanvasesInRegistry = ( screenWidth: number, screenHeight: number ) => {
    preRenderCanvas = new OffscreenCanvas( screenWidth, screenHeight );
    preRenderContext = preRenderCanvas.getContext( "2d" );

    DOMCanvas = document.getElementById( "game-canvas" ) as HTMLCanvasElement;
    DOMCanvas.width = screenWidth;
    DOMCanvas.height = screenHeight;
    DOMContext = DOMCanvas.getContext( "2d" );
}
export const addBackTileGridToRegistry = (backTileGrid: BackTileGrid): void => {
    backTiles = backTileGrid;
}
export const addBackSpriteGridToRegistry = ( backSpriteGrid: BackSpriteGrid ): void => {
    backSprites = backSpriteGrid;
}
export const addFrontTileGridToRegistry = ( frontTileGrid: FrontTileGrid ): void => {
    frontTiles = frontTileGrid;
}
export const addMenuGridToRegistry = ( menuGrid: MenuCanvas ): void => {
    menu = menuGrid;
}
export const addSpeechBubbleGridToRegistry = ( speechBubbleGrid: SpeechBubbleCanvas ): void => {
    speechBubble = speechBubbleGrid;
}
export const getPreRenderCanvasFromRegistry = (): OffscreenCanvas => {
    return preRenderCanvas;
}
export const getPreRenderContextFromRegistry = (): OffscreenCanvasRenderingContext2D => {
    return preRenderContext;
}
export const getDOMCanvasFromRegistry = (): HTMLCanvasElement => {
    return DOMCanvas;
}
export const getDOMContextFromRegistry = (): CanvasRenderingContext2D => {
    return DOMContext;
}
export const getCanvasFromRegistry = ( type: CanvasTypeEnum ): CanvasGrid => {
    switch ( type ) {
        case CanvasTypeEnum.background:
            return backTiles;
        case CanvasTypeEnum.backSprites:
            return backSprites
        case CanvasTypeEnum.foreground:
            return frontTiles
        case CanvasTypeEnum.overview:
            return menu;
        case CanvasTypeEnum.speechBubbleCanvas:
            return speechBubble;
    }
}
export const setRegistryCanvasGridDimensions = ( type: CanvasTypeEnum, width: number, height: number ): void => {
    switch ( type ) {
        case CanvasTypeEnum.background:
            backTiles.canvas.width = width;
            backTiles.canvas.height = height;
            break;
        case CanvasTypeEnum.backSprites:
            backSprites.canvas.width = width;
            backSprites.canvas.height = height;
            break;
        case CanvasTypeEnum.foreground:
            frontTiles.canvas.width = width;
            frontTiles.canvas.height = height;
            break;
        case CanvasTypeEnum.preRender:
            preRenderCanvas.width = width;
            preRenderCanvas.height = height;
            break;
        case CanvasTypeEnum.DOM:
            DOMCanvas.width = width;
            DOMCanvas.height = height;
            break;
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}
export const clearMapFromRegistryGrid = ( type: CanvasTypeEnum ): void => {
    switch ( type ) {
        case CanvasTypeEnum.background:
            backTiles.clearMap();
            break;
        case CanvasTypeEnum.backSprites:
            backSprites.clearMap();
            break;
        case CanvasTypeEnum.foreground:
            frontTiles.clearMap();
            break;
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}
export const clearCanvasInRegistry = ( type: CanvasTypeEnum ): void => {
    switch ( type ) {
        case CanvasTypeEnum.background:
            backTiles.ctx.clearRect( 0, 0, backTiles.canvas.width, backTiles.canvas.height );
            break;
        case CanvasTypeEnum.backSprites:
            backSprites.ctx.clearRect( 0, 0, backSprites.canvas.width, backSprites.canvas.height );
            break;
        case CanvasTypeEnum.foreground:
            frontTiles.ctx.clearRect( 0, 0, frontTiles.canvas.width, frontTiles.canvas.height );
            break;
        case CanvasTypeEnum.overview:
            menu.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
            break;
        case CanvasTypeEnum.speechBubbleCanvas:
            speechBubble.ctx.clearRect( 0, 0, BUBBLE_CANVAS_WIDTH, BUBBLE_CANVAS_HEIGHT );
            break;
        case CanvasTypeEnum.preRender:
            preRenderContext.clearRect( 0, 0, preRenderCanvas.width, preRenderCanvas.height );
            break;
        case CanvasTypeEnum.DOM:
            DOMContext.clearRect( 0, 0, DOMCanvas.width, DOMCanvas.height );
            break;
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}