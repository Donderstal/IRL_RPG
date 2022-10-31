import { GRID_BLOCK_PX } from "../game-data/globals";
import type { TileModel } from "../models/TileModel";
import type { TilesheetModel } from "../models/TilesheetModel";

export const getTilesetXyValues = ( sheetHeightInBlocks: number ): { [key in string]: { [key in string]: { x: number, y: number }[] } } => {
    return {
        "standard": {
            "0": getSheetXyValues( false, 0, sheetHeightInBlocks ),
            "90": getSheetXyValues( false, 90, sheetHeightInBlocks ),
            "180": getSheetXyValues( false, 180, sheetHeightInBlocks ),
            "270": getSheetXyValues( false, 270, sheetHeightInBlocks )
        },
        "mirrored": {
            "0": getSheetXyValues( true, 0, sheetHeightInBlocks ),
            "90": getSheetXyValues( true, 90, sheetHeightInBlocks ),
            "180": getSheetXyValues( true, 180, sheetHeightInBlocks ),
            "270": getSheetXyValues( true, 270, sheetHeightInBlocks )
        }
    }
}
export const getTilesheetXy = ( model: TileModel, sheetModel: TilesheetModel ): { x: number, y: number } => {
    const xyValues = sheetModel.xyValues;
    const angleObject = model.mirrored ? xyValues["mirrored"] : xyValues["standard"];
    const array = angleObject[model.angle.toString()];
    return array[model.id];
}
export const getTilesheetImageForTile = ( tileModel: TileModel, sheetModel: TilesheetModel ): OffscreenCanvas => {
    const images = sheetModel.images
    const angleObject = tileModel.mirrored ? images["mirrored"] : images["standard"];
    return angleObject[tileModel.angle.toString()];
}
const getSheetXyValues = ( mirrored: boolean, angle: number, blocksHeight: number ): { x: number, y: number }[] => {
    let tileX = getStartingX( mirrored, angle, blocksHeight );
    let tileY = getStartingY( mirrored, angle, blocksHeight );

    let tilesheetXyValues = []

    for ( let i = 0; i <= ( blocksHeight * 4 ); i++ ) {
        tilesheetXyValues.push( { 'x': tileX, 'y': tileY } )
        const nextXy = getNextXy( tileX, tileY, mirrored, angle );
        tileX = nextXy.x;
        tileY = nextXy.y;
    }

    return tilesheetXyValues;
}

const getStartingX = ( mirrored: boolean, angle: number, blocksHeight: number ): number => {
    switch ( angle ) {
        case 0:
            return mirrored ? GRID_BLOCK_PX * 3 : 0;
        case 90:
            return ( blocksHeight * GRID_BLOCK_PX ) - GRID_BLOCK_PX;
        case 180:
            return mirrored ? 0 : GRID_BLOCK_PX * 3;
        case 270:
            return 0;
    }
}

const getStartingY = ( mirrored: boolean, angle: number, blocksHeight: number ): number => {
    switch ( angle ) {
        case 0:
            return 0;
        case 90:
            return mirrored ?  GRID_BLOCK_PX * 3 :0;
        case 180:
            return ( blocksHeight * GRID_BLOCK_PX ) - GRID_BLOCK_PX;
        case 270:
            return mirrored ? 0 : GRID_BLOCK_PX * 3;
    }
}

const getNextXy = ( tileX: number, tileY: number, mirrored: boolean, angle: number ): { [key in string]: number } => {
    let x;
    let y;
    if ( angle === 0 || angle === 180 ) {
        const xDecrement = ( angle == 180 && mirrored ) || ( angle == 0 && !mirrored );
        const newRow = ( xDecrement && tileX == GRID_BLOCK_PX * 3 ) || ( !xDecrement && tileX == 0 )
        x = xDecrement
            ? ( tileX + GRID_BLOCK_PX ) > ( GRID_BLOCK_PX * 3 ) ? 0 : tileX + GRID_BLOCK_PX
            : ( tileX - GRID_BLOCK_PX ) < 0 ? GRID_BLOCK_PX * 3 : tileX - GRID_BLOCK_PX;

        const yDecrement = ( angle === 180 );
        y = yDecrement
            ? ( newRow ? tileY - GRID_BLOCK_PX : tileY )
            : ( newRow ? tileY + GRID_BLOCK_PX : tileY );
    }
    if ( angle === 90 || angle === 270 ) {
        const yDecrement = ( angle == 270 && mirrored ) || ( angle == 90 && !mirrored );
        const newColumn = ( yDecrement && tileY == GRID_BLOCK_PX * 3 ) || ( !yDecrement && tileY == 0 )
        y = yDecrement
            ? ( tileY + GRID_BLOCK_PX ) > ( GRID_BLOCK_PX * 3 ) ? 0 : tileY + GRID_BLOCK_PX
            : ( tileY - GRID_BLOCK_PX ) < 0 ? GRID_BLOCK_PX * 3 : tileY - GRID_BLOCK_PX;

        const xDecrement = angle == 90;
        x = xDecrement
            ? ( newColumn ? tileX - GRID_BLOCK_PX : tileX )
            : ( newColumn ? tileX + GRID_BLOCK_PX : tileX );
    }
    return {
        "x": x,
        "y": y
    }
}