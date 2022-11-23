import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import type { CameraFocus } from "../game/cameraFocus";
import type { BackTileGrid } from "../game/canvas/BackTileGrid";
import { getBackTilesGrid, getTileOnCanvasByCell, getTileOnCanvasByXy } from "../game/canvas/canvasGetter";
 
import type { Tile } from "../game/core/Tile";
import type { TilesheetModel } from "../models/TilesheetModel";

export const checkForNewTilesToDraw = ( cameraFocus: CameraFocus ): void => {
    const backGrid = getBackTilesGrid()
    const cameraDirections = cameraFocus.movingToDirections;
    cameraDirections.forEach( ( e: DirectionEnum ): void => {
        switch ( e ) {
            case DirectionEnum.left:
                horizontalDrawNewTiles( cameraFocus.leftBorder, cameraFocus, backGrid );
                horizontalDrawNewTiles( cameraFocus.rightBorder, cameraFocus, backGrid );
                break;
            case DirectionEnum.up:
                verticalDrawNewTiles( cameraFocus.topBorder, cameraFocus, backGrid );
                verticalDrawNewTiles( cameraFocus.downBorder, cameraFocus, backGrid );
                break;
            case DirectionEnum.right:
                horizontalDrawNewTiles( cameraFocus.leftBorder, cameraFocus, backGrid );
                horizontalDrawNewTiles( cameraFocus.rightBorder, cameraFocus, backGrid );
                break;
            case DirectionEnum.down:
                verticalDrawNewTiles( cameraFocus.topBorder, cameraFocus, backGrid );
                verticalDrawNewTiles( cameraFocus.downBorder, cameraFocus, backGrid );
                break;
        }
    } )
}

const horizontalDrawNewTiles = ( x: number, cameraFocus: CameraFocus, backGrid: BackTileGrid ): void => {
    let tiles = [];

    let tileTop = getTileOnCanvasByXy( { x: x, y: cameraFocus.topBorder }, CanvasTypeEnum.background );
    let tileBottom = getTileOnCanvasByXy( { x: x, y: cameraFocus.downBorder }, CanvasTypeEnum.background );
    if ( tileTop === undefined || tileBottom === undefined ) {
        return;
    }

    for ( var row = tileTop.row + 1; row < tileBottom.row; row++ ) {
        tiles.push( getTileOnCanvasByCell( { column: tileTop.column, row: row }, CanvasTypeEnum.background ) );
    }

    let tileTopFront = getTileOnCanvasByXy( { x: x, y: cameraFocus.topBorder }, CanvasTypeEnum.foreground );
    let tileBottomFront = getTileOnCanvasByXy( { x: x, y: cameraFocus.downBorder }, CanvasTypeEnum.foreground );
    for ( var row = tileTop.row + 1; row < tileBottom.row; row++ ) {
        tiles.push( getTileOnCanvasByCell( { column: tileTop.column, row: row }, CanvasTypeEnum.foreground ) );
    }

    filterAndDrawTiles( [...tiles, tileTop, tileBottom, tileTopFront, tileBottomFront], backGrid.sheetModel );
}

const verticalDrawNewTiles = ( y: number, cameraFocus: CameraFocus, backGrid: BackTileGrid ): void => {
    let tiles = [];

    let tileLeft = getTileOnCanvasByXy( { x: cameraFocus.leftBorder, y: y }, CanvasTypeEnum.background );
    let tileRight = getTileOnCanvasByXy( { x: cameraFocus.rightBorder, y: y }, CanvasTypeEnum.background );
    if ( tileLeft === undefined || tileRight === undefined ) {
        return;
    }

    for ( var column = tileLeft.column + 1; column < tileRight.column; column++ ) {
        tiles.push( getTileOnCanvasByCell( { column: column, row: tileLeft.row }, CanvasTypeEnum.background ) );
    }

    let tileLeftFront = getTileOnCanvasByXy( { x: cameraFocus.leftBorder, y: y }, CanvasTypeEnum.foreground );
    let tileRightFront = getTileOnCanvasByXy( { x: cameraFocus.rightBorder, y: y }, CanvasTypeEnum.foreground );
    for ( var column = tileLeft.column + 1; column < tileRight.column; column++ ) {
        tiles.push( getTileOnCanvasByCell( { column: column, row: tileLeft.row }, CanvasTypeEnum.foreground ) );
    }

    filterAndDrawTiles( [...tiles, tileLeft, tileRight, tileLeftFront, tileRightFront], backGrid.sheetModel );
}

const filterAndDrawTiles = ( tiles: Tile[], sheetModel: TilesheetModel ) => {
    tiles.filter( ( tile ) => { return !tile.drawn && tile.model.id !== null; } ).forEach( ( tile ) => {
        tile.drawTileInMap( sheetModel );
    } )
}