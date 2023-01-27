import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";
import { getUniqueId } from "../../../helpers/utilFunctions";
import type { CanvasObjectModel } from "../../../models/CanvasObjectModel";
import type { DeleteSpriteModel } from "../../../models/DeleteSpriteModel";
import { getTileOnCanvasByCell } from "../../canvas/canvasGetter";
import { Sprite } from "../../core/Sprite";
import { destroySpriteAssociatedAction } from "../actions/actionSetter";
import { destroySpriteAssociatedDoor } from "../doors/doorSetter";
import { addSpriteToRegistry, clearSpriteArraysAndDictionaries, removeSpriteFromRegistry, getSpriteIds, removeSpriteScheduledForDeletion, addSpriteForDeletion } from "./spriteRegistry";

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
export const scheduleSpriteForDeletion = ( spriteId: string, force: boolean, deleteWhenNotVisible: boolean = false) => {
    const model: DeleteSpriteModel = {
        id: spriteId,
        force: force,
        deleteWhenInvisible: deleteWhenNotVisible,
        attempts: 0
    };
    addSpriteForDeletion( model );
}
export const removeSpriteById = ( spriteId: string, wasScheduled: true ): void => {
    destroySpriteAssociatedAction( spriteId );
    destroySpriteAssociatedDoor( spriteId );
    removeSpriteFromRegistry( spriteId );
    if ( wasScheduled ) removeSpriteScheduledForDeletion( spriteId );
}
export const clearAllSprites = (): void => {
    clearSpriteArraysAndDictionaries()
}
