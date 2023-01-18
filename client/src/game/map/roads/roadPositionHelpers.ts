import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";
import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { RoadAlignmentEnum } from "../../../enumerables/RoadAlignmentEnum";
import type { CellPosition } from "../../../models/CellPositionModel";
import type { RoadModel } from "../../../models/RoadModel";
import { getTileOnCanvasByCell } from "../../canvas/canvasGetter";
import type { Tile } from "../../core/Tile";

const horiCarSpriteWidthInBlocks = 4;
const carSpriteHeightInBlocks = 3;

const getCellOnSpriteGrid = ( column: number, row: number ): CellPosition => {
    return getTileOnCanvasByCell( { column: column, row: row }, CanvasTypeEnum.backSprites )
}

export const getRoadStartTileList = ( model: RoadModel ): Tile[] => {
    const tiles = [];
    if ( model.alignment === RoadAlignmentEnum.horizontal ) {
        const startColumn = model.primaryColumn;
        const topRow = model.secondaryRow;
        const bottomRow = model.primaryRow;

        if ( model.direction === DirectionEnum.left ) {
            for ( var i = startColumn; i > ( startColumn - horiCarSpriteWidthInBlocks ); i-- ) {
                tiles.push( getCellOnSpriteGrid( i, topRow ) );
                tiles.push( getCellOnSpriteGrid( i, bottomRow ) );
            }
        }
        else {
            for ( var i = startColumn; i < ( startColumn + horiCarSpriteWidthInBlocks ); i++ ) {
                tiles.push( getCellOnSpriteGrid( i, topRow ) );
                tiles.push( getCellOnSpriteGrid( i, bottomRow ) );
            }
        }
    }
    else {
        const startRow = model.primaryRow;
        const leftColumn = model.primaryColumn;
        const rightColumn = model.secondaryColumn;

        if ( model.direction === DirectionEnum.up ) {
            for ( var i = startRow; i > ( startRow - carSpriteHeightInBlocks ); i-- ) {
                tiles.push( getCellOnSpriteGrid( leftColumn, i ) );
                tiles.push( getCellOnSpriteGrid( rightColumn, i ) );
            }
        }
        else {
            for ( var i = startRow; i < ( startRow + carSpriteHeightInBlocks ); i++ ) {
                tiles.push( getCellOnSpriteGrid( leftColumn, i ) );
                tiles.push( getCellOnSpriteGrid( rightColumn, i ) );
            }
        }
    }
    return tiles;
}

export const getRoadEndTileList = ( model: RoadModel ) => {
    const tiles = [];
    if ( model.alignment === RoadAlignmentEnum.horizontal ) {
        const endColumn = model.secondaryColumn;
        const topRow = model.secondaryRow;
        const bottomRow = model.primaryRow;

        if ( model.direction === DirectionEnum.right ) {
            for ( var i = endColumn; i > ( endColumn - horiCarSpriteWidthInBlocks ); i-- ) {
                tiles.push( getCellOnSpriteGrid( i, topRow ) );
                tiles.push( getCellOnSpriteGrid( i, bottomRow ) );
            }
        }
        else {
            for ( var i = endColumn; i < ( endColumn + horiCarSpriteWidthInBlocks ); i++ ) {
                tiles.push( getCellOnSpriteGrid( i, topRow ) );
                tiles.push( getCellOnSpriteGrid( i, bottomRow ) );
            }
        }
    }
    else {
        const endRow = model.secondaryRow;
        const leftColumn = model.primaryColumn;
        const rightColumn = model.secondaryColumn;

        if ( model.direction === DirectionEnum.down ) {
            for ( var i = endRow; i > ( endRow - carSpriteHeightInBlocks ); i-- ) {
                tiles.push( getCellOnSpriteGrid( leftColumn, i ) );
                tiles.push( getCellOnSpriteGrid( rightColumn, i ) );
            }
        }
        else {
            for ( var i = endRow; i < ( endRow + carSpriteHeightInBlocks ); i++ ) {
                tiles.push( getCellOnSpriteGrid( leftColumn, i ) );
                tiles.push( getCellOnSpriteGrid( rightColumn, i ) );
            }
        }
    }
    return tiles;
}