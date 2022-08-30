import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../game-data/globals";
import type { GridCellModel } from "../../models/GridCellModel";
import { BackSpritesCanvas } from "../canvas/BackSpritesCanvas";
import { BackTilesCanvas } from "../canvas/BackTilesCanvas";
import { FrontTilesCanvas } from "../canvas/FrontTilesCanvas";
import type { CanvasWithGrid } from "../core/CanvasWithGrid";

let backTiles: BackTilesCanvas;
let backSprites: BackSpritesCanvas;
let frontTiles: FrontTilesCanvas;

export const instantiateGridCanvases = () => {
    const baseCanvas = document.getElementById( 'game-background-canvas' );
    const xy = baseCanvas.getBoundingClientRect();

    backTiles = new BackTilesCanvas( xy.x, xy.y, document.getElementById( 'game-background-canvas' ) as HTMLCanvasElement, CanvasTypeEnum.background );
    backTiles.canvas.width = CANVAS_WIDTH;
    backTiles.canvas.height = CANVAS_HEIGHT;

    backSprites = new BackSpritesCanvas( xy.x, xy.y, document.getElementById( 'game-front-canvas' ) as HTMLCanvasElement, CanvasTypeEnum.backSprites );
    backSprites.canvas.width = CANVAS_WIDTH;
    backSprites.canvas.height = CANVAS_HEIGHT;

    frontTiles = new FrontTilesCanvas( xy.x, xy.y, document.getElementById( 'game-front-grid-canvas' ) as HTMLCanvasElement, CanvasTypeEnum.foreground );
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
export const getCanvasWithType = ( type: CanvasTypeEnum ): CanvasWithGrid => {
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
            backTiles.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
            break;
        case CanvasTypeEnum.backSprites:
            backSprites.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
            break;
        case CanvasTypeEnum.foreground:
            frontTiles.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
            break;
        default:
            console.log( `Canvastype ${type} not recognized` );
    }
}