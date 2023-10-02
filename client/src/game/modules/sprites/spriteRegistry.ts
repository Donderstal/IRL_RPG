import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";
import type { Sprite } from "../../core/Sprite";

let backSpritesArray: Sprite[] = [];
let frontSpritesArray: Sprite[] = [];
let allSpritesArray: Sprite[] = [];

let spriteIds: string[] = [];
let nonCollisionSprites: Sprite[] = [];
let staticCollisionSprites: Sprite[] = [];
let dynamicCollisionSprites: Sprite[] = [];

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
export const getStaticCollisionSprites = (): Sprite[] => {
    return staticCollisionSprites;
}
export const getDynamicCollisionSprites = (): Sprite[] => {
    return dynamicCollisionSprites;
}

export const addSpriteToRegistry = ( sprite: Sprite, canvas: CanvasTypeEnum ): void => {
    const spriteId = sprite.spriteId
    const spriteArray = canvas === CanvasTypeEnum.backSprites ? backSpritesArray : frontSpritesArray;
    spriteArray.push( sprite );
    allSpritesArray.push( sprite );
    spriteIds.push( spriteId );
    determineSpriteCategory( sprite );
}
export const removeSpriteFromRegistry = ( spriteId: string ): void => {
    spriteIds = spriteIds.filter( ( e ) => { return e !== spriteId } );
    allSpritesArray = allSpritesArray.filter( ( e ) => { return e.spriteId !== spriteId } );
    frontSpritesArray = frontSpritesArray.filter( ( e ) => { return e.spriteId !== spriteId } );
    backSpritesArray = backSpritesArray.filter( ( e ) => { return e.spriteId !== spriteId } );
    clearSpriteFromCategories( spriteId );
}
export const clearSpriteArraysAndDictionaries = (): void => {
    backSpritesArray = [];
    frontSpritesArray = [];
    allSpritesArray = []
    spriteIds = [];
    clearSpriteCategories();
}

const determineSpriteCategory = ( sprite: Sprite ): void => {
    if ( sprite.model.onBackground || sprite.model.notGrounded ) {
        nonCollisionSprites.push( sprite );
    }
    else if ( sprite.model.isCharacter || sprite.model.isCar ) {
        dynamicCollisionSprites.push( sprite );
    }
    else {
        staticCollisionSprites.push( sprite );
    }
}
const clearSpriteFromCategories = ( spriteId: string ): void => {
    nonCollisionSprites = nonCollisionSprites.filter( ( e ) => { return e.spriteId !== spriteId } );
    staticCollisionSprites = staticCollisionSprites.filter( ( e ) => { return e.spriteId !== spriteId } );
    dynamicCollisionSprites = dynamicCollisionSprites.filter( ( e ) => { return e.spriteId !== spriteId } );
}
const clearSpriteCategories = (): void => {
    nonCollisionSprites = [];
    staticCollisionSprites = [];
    dynamicCollisionSprites = [];
}