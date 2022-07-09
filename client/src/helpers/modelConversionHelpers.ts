import type { CharacterModel } from "../models/CharacterModel";
import type { MapObjectModel } from "../models/MapObjectModel";
import { mapObjectSpriteModels } from "../resources/mapObjectResources";
import { characterSpriteModels } from "../resources/classProfileResources";
import type { CharacterSpriteModel } from "../models/CharacterSpriteModel";
import type { MapObjectSpriteModel } from "../models/MapObjectSpriteModel";
import type { ImageModel } from "../models/ImageModel";
import type { SpriteFrameModel } from "../models/SpriteFrameModel"
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";
import { GRID_BLOCK_IN_SHEET_PX, MAP_SPRITE_HEIGHT_IN_SHEET, MAP_SPRITE_WIDTH_IN_SHEET } from "../game-data/globals";
import { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";

export const getImageModelForCharacter = ( character: CharacterModel ): ImageModel => {
    return getCharacterImageModelFromSpriteModel(
        characterSpriteModels.filter( ( e: CharacterSpriteModel ) => { return character.sprite == e.src } )[0]
    );
}

export const getImageModelForObject = ( mapObject: MapObjectModel ): ImageModel => {
    return getMapObjectImageModelFromSpriteModel(
        mapObjectSpriteModels.filter( ( e: MapObjectSpriteModel ) => { return mapObject.type == e.key } )[0]
    );
}

export const getCharacterModelFromSpriteModel = ( characterSprite: CharacterSpriteModel ): CharacterModel => {
    const model: CharacterModel = {
        sprite: characterSprite.src,
        animation_type: AnimationTypeEnum.semiIdle,
        direction: DirectionEnum.down,
        row: 0,
        column: 0
    }
    return model;
}

export const getMapObjectModelFromSpriteModel = ( mapObjectSprite: MapObjectSpriteModel ): MapObjectModel => {
    const model: MapObjectModel = {
        type: mapObjectSprite.key,
        direction: DirectionEnum.down,
        row: 0,
        column: 0
    }
    return model;
}

export const getCharacterImageModelFromSpriteModel = ( characterSprite: CharacterSpriteModel ): ImageModel => {
    const image: ImageModel = {
        image: new Image(),
        dataObject: characterSprite
    }
    image.image.src = "/png-files/sprites/" + characterSprite.src;
    return image;
}

export const getMapObjectImageModelFromSpriteModel = ( mapObjectSprite: MapObjectSpriteModel ): ImageModel => {
    const image: ImageModel = {
        image: new Image(),
        dataObject: mapObjectSprite
    }
    image.image.src = "/png-files/sprite-assets/" + mapObjectSprite.src;
    return image;
}

export const getSpriteFrame = ( imageModel: ImageModel, direction: DirectionEnum ): SpriteFrameModel => {
    if ( ( imageModel.dataObject as CharacterSpriteModel ).hasOwnProperty( "className" ) ) {
        return getCharacterSpriteFrame( direction );
    }
    else {
        if ( ( imageModel.dataObject as MapObjectSpriteModel ).dimensionalAlignment === SpriteSheetAlignmentEnum.horiVert ) {
            return getVariableSizeObjectSpriteFrame( imageModel.dataObject as MapObjectSpriteModel, direction );
        }
        else {
            return getStandardObjectSpriteFrame( imageModel.dataObject as MapObjectSpriteModel, direction );
        }
    }
}

const getCharacterSpriteFrame = ( direction: DirectionEnum ): SpriteFrameModel => {
    const frame: SpriteFrameModel = {
        x: 0, y: MAP_SPRITE_HEIGHT_IN_SHEET * direction,
        width: MAP_SPRITE_WIDTH_IN_SHEET, height: MAP_SPRITE_HEIGHT_IN_SHEET,
        direction: direction
    }
    return frame;
}

const getStandardObjectSpriteFrame = ( mapObjectModel: MapObjectSpriteModel, direction: DirectionEnum ): SpriteFrameModel => {
    const frame: SpriteFrameModel = {
        x: 0, y: 0,
        width: mapObjectModel.widthBlocks * GRID_BLOCK_IN_SHEET_PX, height: mapObjectModel.heightBlocks * GRID_BLOCK_IN_SHEET_PX,
        direction: direction
    }
    return frame;
}

const getVariableSizeObjectSpriteFrame = ( mapObjectModel: MapObjectSpriteModel, direction: DirectionEnum ): SpriteFrameModel => {
    const widthInSheet = ( ( direction == DirectionEnum.down || direction == DirectionEnum.up ) ? mapObjectModel.vertWidthBlocks : mapObjectModel.horiWidthBlocks ) * GRID_BLOCK_IN_SHEET_PX;
    const heightInSheet = ( ( direction == DirectionEnum.down || direction == DirectionEnum.up ) ? mapObjectModel.vertHeightBlocks : mapObjectModel.horiHeightBlocks ) * GRID_BLOCK_IN_SHEET_PX;
    const frames: { x: number, y: number }[] = mapObjectModel.movementFrames[direction];
    const frame: SpriteFrameModel = {
        x: frames[0].x, y: frames[0].y,
        width: widthInSheet, height: heightInSheet,
        direction: direction
    }
    return frame;
}