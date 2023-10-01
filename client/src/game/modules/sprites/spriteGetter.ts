import { PLAYER_ID } from "../../../game-data/interactionGlobals";
import { isInArray } from "../../../helpers/utilFunctions";
import type { Sprite } from "../../core/Sprite";
import { getAllSpritesAsList, getBackSpritesArray, getDynamicCollisionSprites, getFrontSpritesArray, getSpriteIds, getStaticCollisionSprites } from "./spriteRegistry";

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
export const getStaticSprites = (): Sprite[] => {
    return getStaticCollisionSprites();
}
export const getDynamicSprites = (): Sprite[] => {
    return getDynamicCollisionSprites();
}

const spriteWithIdExists = ( id: string ) => {
    return isInArray( getSpriteIds(), id )
}
const getBackSpriteById = ( spriteId: string ): Sprite => {
    const backSprites = getBackSpritesArray();
    return backSprites.filter( ( e ) => { return e.spriteId === spriteId; } )[0];
}
const getFrontSpriteById = ( spriteId: string ): Sprite => {
    const frontSprites = getFrontSpritesArray();
    return frontSprites.filter( ( e ) => { return e.spriteId === spriteId; } )[0];
}
