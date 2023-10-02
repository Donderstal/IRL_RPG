import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";
import { deleteSpriteRelatedTrigger } from "../../../event-triggers/triggerSetter";
import { getUniqueId } from "../../../helpers/utilFunctions";
import type { CanvasObjectModel } from "../../../models/CanvasObjectModel";
import { getTileOnCanvasByCell } from "../../canvas/canvasGetter";
import { Sprite } from "../../core/Sprite";
import { addSpriteToRegistry, clearSpriteArraysAndDictionaries, removeSpriteFromRegistry, getSpriteIds } from "./spriteRegistry";

export const createSpriteFromCanvasObjectModel = ( model: CanvasObjectModel, canvas: CanvasTypeEnum, id: string = null ): Sprite => {
    const spriteId = id !== null ? id : getUniqueId( getSpriteIds() );
    const tile = getTileOnCanvasByCell( { column: model.column, row: model.row }, canvas );
    const sprite = new Sprite( tile, model, spriteId );
    addSpriteToRegistry( sprite, canvas );
    return sprite;
}
export const setSpriteList = ( spriteList: Sprite[] ): void => {
    spriteList.forEach( ( e ) => {
        addSpriteToRegistry( e, CanvasTypeEnum.backSprites );
    } )
}
export const removeSpriteById = ( spriteId: string ): void => {
    deleteSpriteRelatedTrigger( spriteId );
    removeSpriteFromRegistry( spriteId );
}
export const clearAllSprites = (): void => {
    clearSpriteArraysAndDictionaries()
}
