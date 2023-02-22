import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { GRID_BLOCK_PX } from "../game-data/globals";
import type { CameraFocus } from "../game/cameraFocus";
import { getBackTilesGrid, getTileOnCanvasByCell } from "../game/canvas/canvasGetter";
import type { Tile } from "../game/core/Tile";
import type { TilesheetModel } from "../models/TilesheetModel";

export const drawNewTilesInCameraFocus = ( cameraFocus: CameraFocus ): void => {
    const cameraDirections = cameraFocus.movingToDirections;
    if ( cameraDirections.length < 1 ) return;

    const backGrid = getBackTilesGrid().grid;

    const gridLeft = backGrid.x;
    const gridTop = backGrid.y
    const gridRight = gridLeft + ( GRID_BLOCK_PX * backGrid.columns );
    const gridBottom = gridTop + ( GRID_BLOCK_PX * backGrid.rows );

    const leftColumnInFocus = gridLeft > cameraFocus.leftBorder ? 1 : Math.ceil( ( cameraFocus.leftBorder - gridLeft ) / GRID_BLOCK_PX );
    const topRowInFocus = gridTop > cameraFocus.topBorder ? 1 : Math.ceil( ( cameraFocus.topBorder - gridTop ) / GRID_BLOCK_PX );
    const rightColumnInFocus = gridRight < cameraFocus.rightBorder ? backGrid.columns : Math.ceil( ( cameraFocus.rightBorder - gridLeft ) / GRID_BLOCK_PX );
    const bottomRowInFocus = gridBottom < cameraFocus.downBorder ? backGrid.rows : Math.ceil( (cameraFocus.downBorder - gridTop) / GRID_BLOCK_PX );

    let tiles = [];
    cameraDirections.forEach( ( e: DirectionEnum ): void => {
        switch ( e ) {
            case DirectionEnum.left:
                tiles = [...getTileColumn( leftColumnInFocus, topRowInFocus, bottomRowInFocus ), ...tiles];
                break;
            case DirectionEnum.up:
                tiles = [...getTileRow( topRowInFocus, leftColumnInFocus, rightColumnInFocus ), ...tiles];
                break;
            case DirectionEnum.right:
                tiles = [...getTileColumn( rightColumnInFocus, topRowInFocus, bottomRowInFocus ), ...tiles];
                break;
            case DirectionEnum.down:
                tiles = [...getTileRow( bottomRowInFocus, leftColumnInFocus, rightColumnInFocus ), ...tiles];
                break;
        }
    } )

    drawUndrawnTilesToCanvas( tiles, getBackTilesGrid().sheetModel );
}

const getTileColumn = ( column, topRow, bottomRow ): Tile[] => {
    const tiles = [];
    for ( var i = topRow; i <= bottomRow; i++ ) {
        tiles.push( getTileOnCanvasByCell( { "column": column, "row": i }, CanvasTypeEnum.background ) );
        tiles.push( getTileOnCanvasByCell( { "column": column, "row": i }, CanvasTypeEnum.foreground ) );
    }
    return tiles;
}

const getTileRow = ( row, leftColumn, rightColumn ): Tile[] => {
    const tiles = [];
    for ( var i = leftColumn; i <= rightColumn; i++ ) {
        tiles.push( getTileOnCanvasByCell( { "column": i, "row": row }, CanvasTypeEnum.background ) );
        tiles.push( getTileOnCanvasByCell( { "column": i, "row": row }, CanvasTypeEnum.foreground ) );
    }
    return tiles;
}

const drawUndrawnTilesToCanvas = ( tiles: Tile[], sheetModel: TilesheetModel ) => {
    tiles.filter( ( tile ) => { return !tile.drawn && tile.model.id !== null; } ).forEach( ( tile ) => {
        tile.drawTileInMap( sheetModel );
    } )
}