import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { GRID_BLOCK_PX } from "../game-data/globals";
import type { CameraFocus } from "../game/cameraFocus";
import { getBackTilesGrid, getTileOnCanvasByCell } from "../game/canvas/canvasGetter";
 
import type { Tile } from "../game/core/Tile";
import { getSpriteById } from "../game/modules/sprites/spriteGetter";
import type { TilesheetModel } from "../models/TilesheetModel";

export const drawNewTilesInCameraFocus = ( cameraFocus: CameraFocus ): void => {
    const sprite = getSpriteById( cameraFocus.focusSpriteId );
    const backGrid = getBackTilesGrid()
    const cameraDirections = cameraFocus.movingToDirections;

    const totalColumnsInFocus = Math.ceil( cameraFocus.screenWidth / GRID_BLOCK_PX );
    const totalRowsInFocus = Math.ceil( cameraFocus.screenHeight / GRID_BLOCK_PX );

    const columnOffsetToCenter = Math.ceil( totalColumnsInFocus / 2 );
    const rowOffsetToCenter = Math.ceil( totalRowsInFocus / 2 );

    const spriteColumnMinusColumnOffset = ( sprite.column - columnOffsetToCenter );
    const spriteRowMinusRowOffset = ( sprite.row - rowOffsetToCenter );
    const spriteColumnPlusColumnOffset = ( sprite.column + columnOffsetToCenter );
    const spriteRowPlusRowOffset = ( sprite.row + rowOffsetToCenter );

    const leftColumnInFocus = spriteColumnMinusColumnOffset < 1 ? 1 : spriteColumnMinusColumnOffset;
    const topRowInFocus = spriteRowMinusRowOffset < 1 ? 1 : spriteRowMinusRowOffset;
    const rightColumnInFocus = spriteColumnPlusColumnOffset > backGrid.grid.columns ? backGrid.grid.columns : spriteColumnPlusColumnOffset;
    const downRowInFocus = spriteRowPlusRowOffset > backGrid.grid.rows ? backGrid.grid.rows : spriteRowPlusRowOffset;

    let tiles = [];

    cameraDirections.forEach( ( e: DirectionEnum ): void => {
        switch ( e ) {
            case DirectionEnum.left:
                tiles = [...getTileColumn( leftColumnInFocus, topRowInFocus, downRowInFocus ), ...tiles];
                break;
            case DirectionEnum.up:
                tiles = [...getTileRow( topRowInFocus, leftColumnInFocus, rightColumnInFocus ), ...tiles];
                break;
            case DirectionEnum.right:
                tiles = [...getTileColumn( rightColumnInFocus, topRowInFocus, downRowInFocus ), ...tiles];
                break;
            case DirectionEnum.down:
                tiles = [...getTileRow( downRowInFocus, leftColumnInFocus, rightColumnInFocus ), ...tiles];
                break;
        }
    } )

    drawUndrawnTilesToCanvas( tiles, backGrid.sheetModel );
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