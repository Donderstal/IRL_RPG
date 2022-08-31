import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../game-data/globals";
import type { GridCellModel } from "../../models/GridCellModel";
import { BackSpriteGrid } from "../canvas/BackSpriteGrid";
import { BackTileGrid } from "../canvas/BackTileGrid";
import { FrontTileGrid } from "../canvas/FrontTileGrid";
import type { CanvasGrid } from "../core/CanvasGrid";

let backTiles: BackTileGrid;
let backSprites: BackSpriteGrid;
let frontTiles: FrontTileGrid;

export const instantiateGridCanvases = () => {
    const baseCanvas = document.getElementById( 'game-background-canvas' );
    const xy = baseCanvas.getBoundingClientRect();

    backTiles = new BackTileGrid( xy.x, xy.y, document.getElementById( 'game-background-canvas' ) as HTMLCanvasElement, CanvasTypeEnum.background );
    backTiles.canvas.width = CANVAS_WIDTH;
    backTiles.canvas.height = CANVAS_HEIGHT;

    backSprites = new BackSpriteGrid( xy.x, xy.y, document.getElementById( 'game-front-canvas' ) as HTMLCanvasElement, CanvasTypeEnum.backSprites );
    backSprites.canvas.width = CANVAS_WIDTH;
    backSprites.canvas.height = CANVAS_HEIGHT;

    frontTiles = new FrontTileGrid( xy.x, xy.y, document.getElementById( 'game-front-grid-canvas' ) as HTMLCanvasElement, CanvasTypeEnum.foreground );
    frontTiles.canvas.width = CANVAS_WIDTH;
    frontTiles.canvas.height = CANVAS_HEIGHT;
}

export const getTileOnCanvasByIndex = ( index: number, canvasType: CanvasTypeEnum ) => {
    const canvas = getCanvasWithType( canvasType );
    return canvas.getTileAtIndex( index );
};
export const getTileOnCanvasByCell = ( cell: GridCellModel, canvasType: CanvasTypeEnum ) => {
    const canvas = getCanvasWithType( canvasType );
    return canvas.getTileAtCell( cell.column, cell.row );
};
export const getTileOnCanvasByXy = ( xy: { x: number, y: number }, canvasType: CanvasTypeEnum ) => {
    const canvas = getCanvasWithType( canvasType );
    return canvas.getTileAtXY( xy.x, xy.y );
};
export const getCanvasWithType = ( type: CanvasTypeEnum ): CanvasGrid => {
    switch ( type ) {
        case CanvasTypeEnum.background:
            return backTiles;
        case CanvasTypeEnum.backSprites:
            return backSprites;
        case CanvasTypeEnum.foreground:
            return frontTiles;
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}
export const clearGrids = (): void => {
    clearGridOfType( CanvasTypeEnum.background );
    clearGridOfType( CanvasTypeEnum.backSprites );
    clearGridOfType( CanvasTypeEnum.foreground );
}
export const clearGridCanvases = (): void => {
    clearGridCanvasOfType( CanvasTypeEnum.background );
    clearGridCanvasOfType( CanvasTypeEnum.backSprites );
    clearGridCanvasOfType( CanvasTypeEnum.foreground );
}
export const setCanvasesDimensions = ( width: number, height: number ): void => {
    setCanvasDimensions( CanvasTypeEnum.background, width, height );
    setCanvasDimensions( CanvasTypeEnum.backSprites, width, height );
    setCanvasDimensions( CanvasTypeEnum.foreground, width, height );
}
const setCanvasDimensions = ( type: CanvasTypeEnum, width: number, height: number ): void => {
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
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}
export const clearGridOfType = ( type: CanvasTypeEnum ): void => {
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
export const clearGridCanvasOfType = ( type: CanvasTypeEnum ): void => {
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
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}