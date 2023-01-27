import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";
import type { DeleteSpriteModel } from "../../../models/DeleteSpriteModel";
import type { Sprite } from "../../core/Sprite";

let backSpritesArray: Sprite[] = [];
let frontSpritesArray: Sprite[] = [];
let allSpritesArray: Sprite[] = [];
let spriteIds: string[] = [];

let spriteDeletionOptions: DeleteSpriteModel[];

export const getAllSpritesAsList = (): Sprite[] => {
    return allSpritesArray;
}
export const getBackSpritesArray = (): Sprite[] => {
    return backSpritesArray;
}
export const getFrontSpritesArray = (): Sprite[] => {
    return frontSpritesArray;
}
export const getSpriteIds = (): string[] => {
    return spriteIds;
}
export const getSpriteDeletionOptions = (): DeleteSpriteModel[] => {
    return spriteDeletionOptions;
}

export const addSpriteToRegistry = ( sprite: Sprite, canvas: CanvasTypeEnum ): void => {
    const spriteId = sprite.spriteId
    const spriteArray = canvas === CanvasTypeEnum.backSprites ? backSpritesArray : frontSpritesArray;
    spriteArray.push( sprite );
    allSpritesArray.push( sprite );
    spriteIds.push( spriteId );
}
export const removeSpriteFromRegistry = ( spriteId: string ): void => {
    spriteIds = spriteIds.filter( ( e ) => { return e !== spriteId } );
    allSpritesArray = allSpritesArray.filter( ( e ) => { return e.spriteId !== spriteId } );
    frontSpritesArray = frontSpritesArray.filter( ( e ) => { return e.spriteId !== spriteId } );
    backSpritesArray = backSpritesArray.filter( ( e ) => { return e.spriteId !== spriteId } );
}

export const addSpriteForDeletion = ( deleteSpriteOptions: DeleteSpriteModel ) => {
    spriteDeletionOptions.push( deleteSpriteOptions );
}

export const removeSpriteScheduledForDeletion = ( id: string ) => {
    spriteDeletionOptions = spriteDeletionOptions.filter( ( e ) => { return e.id !== id } );
}

export const clearSpriteArraysAndDictionaries = (): void => {
    spriteDeletionOptions = [];
    backSpritesArray = [];
    frontSpritesArray = [];
    allSpritesArray = []
    spriteIds = [];
}