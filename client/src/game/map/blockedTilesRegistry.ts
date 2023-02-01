import type { CellPosition } from "../../models/CellPositionModel";
import type { GridCellModel } from "../../models/GridCellModel";
import type { BackTileGrid } from "../canvas/BackTileGrid";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";

let baseCellList: GridCellModel[] = [];
let dynamicallyBlockedTiles: number[] = [];
let columnsInActiveMap: number = null;
let rowsInActiveMap: number = null

export const registerNewMap = ( backTiles: BackTileGrid ): void => {
    registerMapDimensions( backTiles.grid.columns, backTiles.grid.columns );
    registerBlockedTiles( backTiles.grid.array );
    registerMapSpecificUnblockedTiles( backTiles.unblockedCells )
}
export const registerTilesBlockedByStaticSprites = ( sprites: Sprite[] ): void => {
    sprites.forEach( ( sprite ) => {
        const tileIndexes = sprite.getTilesBlockedBySprite();
        tileIndexes.forEach( ( tileIndex ) => {
            baseCellList[tileIndex] = null;
        } );
    } )
}
export const registerTilesBlockedByDynamicSprites = ( sprites: Sprite[] ): void => {
    clearDynamicallyBlockedTiles();
    sprites.forEach( ( sprite ) => {
        const tileIndexes = sprite.getTilesBlockedBySprite();
        tileIndexes.forEach( ( tileIndex ) => {
            if ( dynamicallyBlockedTiles.indexOf( tileIndex ) < 0 ) {
                dynamicallyBlockedTiles.push( tileIndex );
            }
        } );
    } )
}
export const clearBlockedTilesRegistry = (): void => {
    baseCellList = [];
    clearDynamicallyBlockedTiles();
}
export const getBlockedCellList = (): GridCellModel[] => {
    const list = [...baseCellList];
    dynamicallyBlockedTiles.forEach( ( e ) => {
        list[e] = null;
    } )
    return list;
}
export const isTileBlocked = ( cell: GridCellModel ): boolean => {
    return baseCellList[getIndex( cell.column, cell.row )] === null;
}
export const tileIsOffMap = ( cell: GridCellModel ): boolean => {
    return cell.row < 1 || cell.row > rowsInActiveMap || cell.column < 1 || cell.column > columnsInActiveMap;
}
export const tileIsValidDestination = ( cell: GridCellModel ): boolean => {
    return !isTileBlocked( cell ) && !tileIsOffMap( cell );
}

const clearDynamicallyBlockedTiles = ( ): void => {
    dynamicallyBlockedTiles = [];
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
        e.blocked ? baseCellList.push( null ) : baseCellList.push( { column: e.column, row: e.row } );
    } )
}
const registerMapSpecificUnblockedTiles = ( cells: CellPosition[] ): void => {
    cells.forEach( ( e ) => {
        baseCellList[getIndex( e.column, e.row )] = { column: e.column, row: e.row };
    } )
}
