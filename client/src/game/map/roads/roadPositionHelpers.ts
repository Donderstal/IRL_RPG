import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";
import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import type { GridCellModel } from "../../../models/GridCellModel";
import { getTileOnCanvasByCell } from "../../canvas/canvasGetter";
import type { Tile } from "../../core/Tile";
import type { Road } from "./Road";

const horiCarSpriteWidthInBlocks = 4;
const carSpriteHeightInBlocks = 3;

const getCellOnSpriteGrid = ( column: number, row: number ): GridCellModel => {
    return getTileOnCanvasByCell( { column: column, row: row }, CanvasTypeEnum.backSprites )
}

export const getHorizontalRoadStartTileList = ( startColumn: number, topRow: number, bottomRow: number, direction: DirectionEnum ): Tile[] => {
    const tiles = [];
    if ( direction === DirectionEnum.left ) {
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
    return tiles;
}
export const getVerticalRoadStartTileList = ( startRow: number, leftColumn: number, rightColumn: number, direction: DirectionEnum ): Tile[] => {
    const tiles = [];
    if ( direction === DirectionEnum.up ) {
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
    return tiles;
}
export const getHorizontalRoadEndTileList = ( endColumn: number, topRow: number, bottomRow: number, direction: DirectionEnum ): Tile[] => {
    const tiles = [];
    if ( direction === DirectionEnum.right ) {
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
    return tiles;
}
export const getVerticalRoadEndTileList = ( endRow: number, leftColumn: number, rightColumn: number, direction: DirectionEnum ): Tile[] => {
    const tiles = [];
    if ( direction === DirectionEnum.down ) {
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
    return tiles;
}

export const hasTurnFromIntersectingRoad = ( baseRoad: Road, intersectingRoad: Road ): boolean => {
    let baseRoadEndsAtIntersection;
    let intersectingRoadStartsAtIntersection;

    if ( baseRoad.isHorizontal ) {
        baseRoadEndsAtIntersection = ( baseRoad.model.secondaryColumn === intersectingRoad.model.primaryColumn ) || ( baseRoad.model.secondaryColumn === intersectingRoad.model.secondaryColumn );
        intersectingRoadStartsAtIntersection = ( baseRoad.model.primaryRow === intersectingRoad.model.primaryRow ) || ( baseRoad.model.secondaryRow === intersectingRoad.model.primaryRow );
    }
    else {
        baseRoadEndsAtIntersection = ( baseRoad.model.secondaryRow === intersectingRoad.model.primaryRow ) || ( baseRoad.model.secondaryRow === intersectingRoad.model.secondaryRow );
        intersectingRoadStartsAtIntersection = ( baseRoad.model.primaryColumn === intersectingRoad.model.primaryColumn ) || ( baseRoad.model.secondaryColumn === intersectingRoad.model.primaryColumn );
    }

    return !baseRoadEndsAtIntersection && !intersectingRoadStartsAtIntersection;
}

export const hasTurnToIntersectingRoad = ( baseRoad: Road, intersectingRoad: Road ): boolean => {
    let baseRoadStartsAtIntersection;
    let intersectingRoadEndsAtIntersection;

    if ( baseRoad.isHorizontal ) {
        baseRoadStartsAtIntersection = ( baseRoad.model.primaryColumn === intersectingRoad.model.primaryColumn ) || ( baseRoad.model.primaryColumn === intersectingRoad.model.secondaryColumn );
        intersectingRoadEndsAtIntersection = ( baseRoad.model.primaryRow === intersectingRoad.model.secondaryRow ) || ( baseRoad.model.secondaryRow === intersectingRoad.model.secondaryRow );
    }
    else {
        baseRoadStartsAtIntersection = ( baseRoad.model.primaryRow === intersectingRoad.model.primaryRow ) || ( baseRoad.model.primaryRow === intersectingRoad.model.secondaryRow );
        intersectingRoadEndsAtIntersection = ( baseRoad.model.secondaryColumn === intersectingRoad.model.secondaryColumn ) || ( baseRoad.model.primaryColumn === intersectingRoad.model.secondaryColumn );
    }

    return !baseRoadStartsAtIntersection && !intersectingRoadEndsAtIntersection;
}