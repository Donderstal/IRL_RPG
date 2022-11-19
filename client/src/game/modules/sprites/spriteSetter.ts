import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";
import { getUniqueId } from "../../../helpers/utilFunctions";
import type { CanvasObjectModel } from "../../../models/CanvasObjectModel";
import { getTileOnCanvasByCell } from "../../controllers/gridCanvasController";
import { Sprite } from "../../core/Sprite";
import { initializeSpriteModules } from "../../spriteModuleHandler";
import { destroySpriteAssociatedAction } from "../actions/actionSetter";
import { destroySpriteAssociatedDoor } from "../doors/doorSetter";
import { addSpriteToRegistry, clearSpriteArraysAndDictionaries, removeSpriteFromRegistry, getSpriteIds } from "./spriteRegistry";

export const createSpriteFromCanvasObjectModel = ( model: CanvasObjectModel, canvas: CanvasTypeEnum, id: string = null ): string => {
    const spriteId = id !== null ? id : getUniqueId( getSpriteIds() );
    const tile = getTileOnCanvasByCell( { column: model.column, row: model.row }, canvas );
    const sprite = new Sprite( tile, model, spriteId );
    initializeSpriteModules( sprite, model );
    addSpriteToRegistry( sprite, canvas );
    return spriteId;
}
export const setSpriteList = ( spriteList: Sprite[] ): void => {
    spriteList.forEach( ( e ) => {
        addSpriteToRegistry( e, CanvasTypeEnum.backSprites );
    } )
}
export const removeSpriteById = ( spriteId: string ): void => {
    destroySpriteAssociatedAction( spriteId );
    destroySpriteAssociatedDoor( spriteId );
    removeSpriteFromRegistry( spriteId );
}
export const clearAllSprites = (): void => {
    clearSpriteArraysAndDictionaries()
}