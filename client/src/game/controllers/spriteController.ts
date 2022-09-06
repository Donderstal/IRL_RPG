import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { PLAYER_ID } from "../../game-data/interactionGlobals";
import { getUniqueId } from "../../helpers/utilFunctions";
import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
import { Sprite } from "../core/Sprite";
import { getTileOnCanvasByCell } from "./gridCanvasController";

let backSpritesDictionary: { [key in string]: Sprite } = {};
let frontSpritesDictionary: { [key in string]: Sprite } = {};
let spriteIds: string[] = [];

const getBackSpriteById = ( spriteId: string ): Sprite => {
    return backSpritesDictionary[spriteId];
}
const getFrontSpriteById = ( spriteId: string ): Sprite => {
    return frontSpritesDictionary[spriteId];
}
const spriteWithIdExists = ( spriteId: string ): boolean => {
    return spriteIds.indexOf( spriteId ) > -1;
}
export const getBackSprites = (): Sprite[] => {
    return Object.values( backSpritesDictionary );
}
export const getFrontSprites = (): Sprite[] => {
    return Object.values( frontSpritesDictionary );
}
export const getPlayer = (): Sprite => {
    return backSpritesDictionary[PLAYER_ID];
}
export const getSpriteById = ( spriteId: string ): Sprite => {
    if ( !spriteWithIdExists( spriteId ) ) return null;
    return getBackSpriteById( spriteId ) !== undefined
        ? getBackSpriteById( spriteId )
        : getFrontSpriteById( spriteId );
}

export const removeSpriteById = ( spriteId: string ): void => {
    spriteIds = spriteIds.filter( ( e ) => { return e !== spriteId } );
    delete backSpritesDictionary[spriteId];
    delete frontSpritesDictionary[spriteId];
}

export const getAllSpritesAsList = (): Sprite[] => {
    return [...Object.values( backSpritesDictionary ), ...Object.values( frontSpritesDictionary )]
}

export const clearAllSprites = (): void => {
    backSpritesDictionary = {};
    frontSpritesDictionary = {};
    spriteIds = [];
}

export const createSpriteFromCanvasObjectModel = ( model: CanvasObjectModel, canvas: CanvasTypeEnum, id: string = null ): string => {
    const spriteId = id !== null ? id : getUniqueId( spriteIds );
    const tile = getTileOnCanvasByCell( { column: model.column, row: model.row }, canvas );
    const sprite = new Sprite( tile, model, spriteId );
    canvas === CanvasTypeEnum.backSprites
        ? backSpritesDictionary[spriteId] = sprite
        : frontSpritesDictionary[spriteId] = sprite;
    spriteIds.push( spriteId );
    return spriteId;
}

export const setSpritesList = ( spriteList: Sprite[] ): void => {
    spriteList.forEach( ( e ) => {
        backSpritesDictionary[e.spriteId] = e;
        spriteIds.push( e.spriteId );
    } );
}

export const getSpriteByName = ( name: string ): Sprite => {
    let spritesWithName = getAllSpritesAsList().filter( ( e ) => {
        return e.name === name;
    } );
    if ( spritesWithName.length === 0 ) return null;
    return spritesWithName[0];
}