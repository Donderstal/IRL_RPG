import { PLAYER_ID } from "../../../game-data/interactionGlobals";
import type { Sprite } from "../../core/Sprite";
import { getAllSpritesAsList, getBackSpritesArray, getFrontSpritesArray, getSpriteIds } from "./spriteRegistry";

export const getPlayer = (): Sprite => {
    return getSpriteById( PLAYER_ID );
}
export const getSpriteById = ( spriteId: string ): Sprite => {
    if ( !spriteWithIdExists( spriteId ) ) return null;
    return getBackSpriteById( spriteId ) !== undefined
        ? getBackSpriteById( spriteId )
        : getFrontSpriteById( spriteId );
}
export const getSpriteByName = ( name: string ): Sprite => {
    let spritesWithName = getAllSpritesAsList().filter( ( e ) => {
        return e.name === name;
    } );
    return spritesWithName[0];
}
export const getAllActiveSprites = (): Sprite[] => {
    return getAllSpritesAsList();
}
export const getBackSprites = (): Sprite[] => {
    return getBackSpritesArray();
}
export const getFrontSprites = (): Sprite[] => {
    return getFrontSpritesArray();
}

const spriteWithIdExists = ( id: string ) => {
    const spriteIds = getSpriteIds();
    return spriteIds.indexOf( id ) > -1;
}
const getBackSpriteById = ( spriteId: string ): Sprite => {
    const backSprites = getBackSpritesArray();
    return backSprites.filter( ( e ) => { return e.spriteId === spriteId; } )[0];
}
const getFrontSpriteById = ( spriteId: string ): Sprite => {
    const frontSprites = getFrontSpritesArray();
    return frontSprites.filter( ( e ) => { return e.spriteId === spriteId; } )[0];
}
