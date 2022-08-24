import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { GRID_BLOCK_IN_SHEET_PX, SHEET_XY_VALUES } from "../../game-data/globals";
import type { Tile } from "../core/Tile";

let backUtility: HTMLCanvasElement;
let frontUtility: HTMLCanvasElement;

export const instantiateUtilityCanvases = () => {
    backUtility = setUtilityCanvas( 'game-utility-canvas-back' );
    frontUtility = setUtilityCanvas( 'game-utility-canvas-front' );
}

const setUtilityCanvas = ( id: string ): HTMLCanvasElement => {
    let canvas = document.getElementById( id ) as HTMLCanvasElement;
    canvas.width = GRID_BLOCK_IN_SHEET_PX;
    canvas.height = GRID_BLOCK_IN_SHEET_PX;
    return canvas
}

export const getUtilityCanvas = ( type: CanvasTypeEnum ): HTMLCanvasElement => {
    const canvas = type === CanvasTypeEnum.background ? backUtility : frontUtility;
    return canvas;
}

export const getUtilityContext = ( type: CanvasTypeEnum ): CanvasRenderingContext2D => {
    const canvas = getUtilityCanvas( type );
    return canvas.getContext("2d")
}

export const drawTileToUtilityCanvas = ( tile: Tile, tilesheet: HTMLImageElement, canvasType: CanvasTypeEnum ): void => {
    const tileXyInSheet = SHEET_XY_VALUES[tile.model.id]
    const ctx = getUtilityContext( canvasType );
    ctx.clearRect( 0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX )
    tile.model.mirrored ? ctx.setTransform( -1, 0, 0, 1, GRID_BLOCK_IN_SHEET_PX, 0 ) : ctx.setTransform( 1, 0, 0, 1, 0, 0 );
    switch ( tile.model.angle ) {
        case 0:
            ctx.drawImage(
                tilesheet,
                tileXyInSheet.x, tileXyInSheet.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            break;
        case 90:
            ctx.translate( 0 + GRID_BLOCK_IN_SHEET_PX, 0 );
            ctx.rotate( 90 * ( Math.PI / 180 ) );
            ctx.drawImage(
                tilesheet,
                tileXyInSheet.x, tileXyInSheet.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            ctx.rotate( -( 90 * ( Math.PI / 180 ) ) )
            ctx.setTransform( 1, 0, 0, 1, 0, 0 );
            break;
        case 180:
            ctx.translate( 0 + GRID_BLOCK_IN_SHEET_PX, 0 + GRID_BLOCK_IN_SHEET_PX );
            ctx.rotate( Math.PI );
            ctx.drawImage(
                tilesheet,
                tileXyInSheet.x, tileXyInSheet.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            ctx.rotate( -Math.PI )
            ctx.setTransform( 1, 0, 0, 1, 0, 0 );
            break;
        case 270:
            ctx.translate( 0, 0 + GRID_BLOCK_IN_SHEET_PX );
            ctx.rotate( 270 * ( Math.PI / 180 ) )
            ctx.drawImage(
                tilesheet,
                tileXyInSheet.x, tileXyInSheet.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX
            );
            ctx.rotate( -( 270 * ( Math.PI / 180 ) ) )
            ctx.setTransform( 1, 0, 0, 1, 0, 0 );
            break;
        default:
            alert( 'Error in flipping tile. Call the police!' )
    }
}