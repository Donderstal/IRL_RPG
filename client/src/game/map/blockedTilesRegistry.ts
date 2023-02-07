import type { CellPosition } from "../../models/CellPositionModel";
import type { GridCellModel } from "../../models/GridCellModel";
import type { BackTileGrid } from "../canvas/BackTileGrid";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";

let baseCellStateList: GridCellModel[] = [];
let activeCellStateList: GridCellModel[] = []

let dynamicallyBlockedTileIndexes: number[] = [];
let columnsInActiveMap: number = null;
let rowsInActiveMap: number = null

export const registerNewMap = ( backTiles: BackTileGrid ): void => {
    registerMapDimensions( backTiles.grid.columns, backTiles.grid.rows );
    registerBlockedTiles( backTiles.grid.array );
    registerMapSpecificUnblockedTiles( backTiles.unblockedCells )
}
export const registerTilesBlockedByStaticSprites = ( sprites: Sprite[] ): void => {
    sprites.forEach( ( sprite ) => {
        const tileIndexes = sprite.getTilesBlockedBySprite();
        tileIndexes.forEach( ( tileIndex ) => {
            baseCellStateList[tileIndex] = null;
        } );
    } )
}
export const registerTilesBlockedByDynamicSprites = ( sprites: Sprite[] ): void => {
    clearDynamicallyBlockedTiles();
    sprites.forEach( ( sprite ) => {
        const tileIndexes = sprite.getTilesBlockedBySprite();
        tileIndexes.forEach( ( tileIndex ) => {
            if ( dynamicallyBlockedTileIndexes.indexOf( tileIndex ) < 0 ) {
                dynamicallyBlockedTileIndexes.push( tileIndex );
            }
        } );
    } )

    activeCellStateList = [...baseCellStateList];
    dynamicallyBlockedTileIndexes.forEach( ( e ) => {
        activeCellStateList[e] = null;
    } )
}
export const clearBlockedTilesRegistry = (): void => {
    baseCellStateList = [];
    clearDynamicallyBlockedTiles();
}
export const getBlockedCellList = (): GridCellModel[] => {
    return activeCellStateList;
}
export const isTileBlocked = ( cell: GridCellModel ): boolean => {
    const cellList = getBlockedCellList();
    const index = getIndex( cell.column, cell.row );
    const cellInList = cellList[index]
    return cellInList === null || cellInList === undefined;
}
export const tileIsOffMap = ( cell: GridCellModel ): boolean => {
    return cell.row < 1 || cell.row > rowsInActiveMap || cell.column < 1 || cell.column > columnsInActiveMap;
}
export const tileIsValidDestination = ( cell: GridCellModel ): boolean => {
    return !isTileBlocked( cell ) && !tileIsOffMap( cell );
}
export const getDynamicallyBlockedTileIndexes = (): number[] => {
    return dynamicallyBlockedTileIndexes;
}
export const getBaseCellList = (): GridCellModel[] => {
    return baseCellStateList;
}

const clearDynamicallyBlockedTiles = ( ): void => {
    dynamicallyBlockedTileIndexes = [];
    activeCellStateList = [];
}
const getIndex = ( column: number, row: number): number => {
    return ( ( row * columnsInActiveMap ) - ( columnsInActiveMap - column ) ) - 1
}
const registerMapDimensions = ( columns: number, rows: number ): void => {
    columnsInActiveMap = columns;
    rowsInActiveMap = rows;
}
const registerBlockedTiles = ( tiles: Tile[] ): void => {
    tiles.forEach( ( e ) => {
        e.blocked ? baseCellStateList.push( null ) : baseCellStateList.push( { column: e.column, row: e.row } );
    } )
}
const registerMapSpecificUnblockedTiles = ( cells: CellPosition[] ): void => {
    cells.forEach( ( e ) => {
        baseCellStateList[getIndex( e.column, e.row )] = { column: e.column, row: e.row };
    } )
}
