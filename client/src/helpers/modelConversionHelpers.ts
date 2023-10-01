import type { FrameModel } from "../models/SpriteFrameModel"
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";
import { GRID_BLOCK_IN_SHEET_PX } from "../game-data/globals";
import type { SpriteDataModel } from "../models/SpriteDataModel";
import { isHorizontal } from "./utilFunctions";

export const getSpriteFrameForPosition = ( framePosition: { x: number, y: number }, dataModel: SpriteDataModel, direction: DirectionEnum = null ): FrameModel => {
    let width = getFrameWidth( dataModel, direction );
    let height = getFrameHeight( dataModel, direction );
    const model: FrameModel = {
        x: framePosition.x,
        y: framePosition.y,
        width: width,
        height: height,
        direction: direction
    }
    return model;
}

const getFrameWidth = ( dataModel: SpriteDataModel, direction: DirectionEnum = null ): number => {
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
const getFrameHeight = ( dataModel: SpriteDataModel, direction: DirectionEnum = null ): number => {
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