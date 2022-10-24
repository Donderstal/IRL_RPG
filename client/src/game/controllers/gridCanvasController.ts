import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_PX } from "../../game-data/globals";
import type { GridCellModel } from "../../models/GridCellModel";
import { cameraFocus } from "../cameraFocus";
import { BackSpriteGrid } from "../canvas/BackSpriteGrid";
import { BackTileGrid } from "../canvas/BackTileGrid";
import { FrontTileGrid } from "../canvas/FrontTileGrid";
import type { CanvasGrid } from "../core/CanvasGrid";
import type { Tile } from "../core/Tile";

let backTiles: BackTileGrid;
let backSprites: BackSpriteGrid;
let frontTiles: FrontTileGrid;

export let preRenderCanvas: OffscreenCanvas;
export let preRenderContext: OffscreenCanvasRenderingContext2D;

export let DOMCanvas: HTMLCanvasElement;
export let DOMContext: ImageBitmapRenderingContext;

export const instantiateGridCanvases = () => {
    backTiles = new BackTileGrid( 0, 0, new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT ), CanvasTypeEnum.background );
    backSprites = new BackSpriteGrid( 0, 0, new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT ), CanvasTypeEnum.backSprites );
    frontTiles = new FrontTileGrid( 0, 0, new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT ), CanvasTypeEnum.foreground );

    preRenderCanvas = new OffscreenCanvas( cameraFocus.screenWidth, cameraFocus.screenHeight );
    preRenderContext = preRenderCanvas.getContext( "2d" );

    DOMCanvas = document.getElementById( "game-canvas" ) as HTMLCanvasElement;
    DOMCanvas.width = cameraFocus.screenWidth;
    DOMCanvas.height = cameraFocus.screenHeight;
    DOMContext = DOMCanvas.getContext( "bitmaprenderer" );
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
export const setDOMCanvasDimensions = () => {
    preRenderCanvas.width = cameraFocus.screenWidth;
    preRenderCanvas.height = cameraFocus.screenHeight;
    DOMCanvas.width = cameraFocus.screenWidth;
    DOMCanvas.height = cameraFocus.screenHeight;
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
export const checkForNewTilesToDraw = (): void => {
    const cameraDirections = cameraFocus.movingToDirections;
    cameraDirections.forEach( ( e: DirectionEnum ): void => {
        switch ( e ) {
            case DirectionEnum.left:
                horizontalDrawNewTiles( cameraFocus.leftBorder );
                horizontalDrawNewTiles( cameraFocus.rightBorder );
                break;
            case DirectionEnum.up:
                verticalDrawNewTiles( cameraFocus.topBorder );
                verticalDrawNewTiles( cameraFocus.downBorder );
                break;
            case DirectionEnum.right:
                horizontalDrawNewTiles( cameraFocus.leftBorder );
                horizontalDrawNewTiles( cameraFocus.rightBorder );
                break;
            case DirectionEnum.down:
                verticalDrawNewTiles( cameraFocus.topBorder );
                verticalDrawNewTiles( cameraFocus.downBorder );
                break;
        }
    } )
}

export const horizontalDrawNewTiles = ( x: number ): void => {
    let tiles = [];
    let tileTop = getTileOnCanvasByXy( { x: x, y: cameraFocus.topBorder }, CanvasTypeEnum.background );
    let tileBottom = getTileOnCanvasByXy( { x: x, y: cameraFocus.downBorder }, CanvasTypeEnum.background );
    for ( var row = tileTop.row + 1; row < tileBottom.row; row++ ) {
        tiles.push( getTileOnCanvasByCell( { column: tileTop.column, row: row }, CanvasTypeEnum.background ) );
    }

    let tileTopFront = getTileOnCanvasByXy( { x: x, y: cameraFocus.topBorder }, CanvasTypeEnum.foreground );
    let tileBottomFront = getTileOnCanvasByXy( { x: x, y: cameraFocus.downBorder }, CanvasTypeEnum.foreground );
    for ( var row = tileTop.row + 1; row < tileBottom.row; row++ ) {
        tiles.push( getTileOnCanvasByCell( { column: tileTop.column, row: row }, CanvasTypeEnum.foreground ) );
    }

    filterAndDrawTiles( [...tiles, tileTop, tileBottom, tileTopFront, tileBottomFront]);
}

export const verticalDrawNewTiles = ( y: number ): void => {
    let tiles = [];

    let tileLeft = getTileOnCanvasByXy( { x: cameraFocus.leftBorder, y: y }, CanvasTypeEnum.background );
    let tileRight = getTileOnCanvasByXy( { x: cameraFocus.rightBorder, y: y }, CanvasTypeEnum.background );
    for ( var column = tileLeft.column + 1; column < tileRight.column; column++ ) {
        tiles.push( getTileOnCanvasByCell( { column: column, row: tileLeft.row }, CanvasTypeEnum.background ) );
    }

    let tileLeftFront = getTileOnCanvasByXy( { x: cameraFocus.leftBorder, y: y }, CanvasTypeEnum.foreground );
    let tileRightFront = getTileOnCanvasByXy( { x: cameraFocus.rightBorder, y: y }, CanvasTypeEnum.foreground );
    for ( var column = tileLeft.column + 1; column < tileRight.column; column++ ) {
        tiles.push( getTileOnCanvasByCell( { column: column, row: tileLeft.row }, CanvasTypeEnum.foreground ) );
    }

    filterAndDrawTiles([...tiles, tileLeft, tileRight, tileLeftFront, tileRightFront]);
}

const filterAndDrawTiles = ( tiles ) => {
    tiles.filter( ( tile: Tile ) => { return !tile.drawn && tile.model.id !== null; } ).forEach( ( tile: Tile ) => {
        tile.drawTileInMap( backTiles.sheetModel.image );
    } )
}