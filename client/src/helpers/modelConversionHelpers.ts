import type { SpriteFrameModel } from "../models/SpriteFrameModel"
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";
import { GRID_BLOCK_IN_SHEET_PX } from "../game-data/globals";
import type { SpriteDataModel } from "../models/SpriteDataModel";
import { isHorizontal } from "./utilFunctions";

export const getSpriteFrameForPosition = ( framePosition: { x: number, y: number }, dataModel: SpriteDataModel, direction: DirectionEnum = null ): SpriteFrameModel => {
    let width = getFrameWidth( dataModel, direction );
    let height = getFrameHeight( dataModel, direction );
    const model: SpriteFrameModel = {
        x: framePosition.x,
        y: framePosition.y,
        width: width,
        height: height,
        direction: direction
    }
    return model;
}

export const getFrameWidth = ( dataModel: SpriteDataModel, direction: DirectionEnum = null ): number => {
    if ( dataModel.dimensionalAlignment === SpriteSheetAlignmentEnum.standard || direction == null ) {
         return dataModel.widthBlocks * GRID_BLOCK_IN_SHEET_PX
    }
    else if ( dataModel.dimensionalAlignment === SpriteSheetAlignmentEnum.horiVert ) {
        if ( !isHorizontal( direction ) ) {
            return dataModel.vertWidthBlocks * GRID_BLOCK_IN_SHEET_PX
        }
        else {
            return dataModel.horiWidthBlocks * GRID_BLOCK_IN_SHEET_PX
        }
    }
}

export const getFrameHeight = ( dataModel: SpriteDataModel, direction: DirectionEnum = null ): number => {
    if ( dataModel.dimensionalAlignment === SpriteSheetAlignmentEnum.standard || direction == null ) {
        return dataModel.heightBlocks * GRID_BLOCK_IN_SHEET_PX
    }
    else if ( dataModel.dimensionalAlignment === SpriteSheetAlignmentEnum.horiVert ) {
        if ( !isHorizontal( direction ) ) {
            return dataModel.vertHeightBlocks * GRID_BLOCK_IN_SHEET_PX
        }
        else {
            return dataModel.horiHeightBlocks * GRID_BLOCK_IN_SHEET_PX
        }
    }
}