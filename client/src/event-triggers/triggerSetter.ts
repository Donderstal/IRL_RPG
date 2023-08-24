import type { Sprite } from "../game/core/Sprite";
import type { Tile } from "../game/core/Tile"
import type { FrameModel } from "../models/SpriteFrameModel";
import type { TriggerModel } from "../models/TriggerModel";
import { getSpriteRelatedTriggerId, registerSpriteTriggerRelation, spriteTriggerRelationExists, unregisterSpriteTriggerRelation } from "../registries/spriteTriggerRelationRegistry";
import { Trigger } from "./Trigger";
import { deregisterTrigger, registerTrigger } from "./triggerRegistry";

export const setTrigger = ( canvasObject: Tile | Sprite, model: TriggerModel ): void => {
    const frame = getFrameModelFromCanvasObject( canvasObject );
    const trigger = new Trigger( frame, model );
    const triggerId = registerTrigger( trigger );

    if ( model.spriteId !== null ) {
        registerSpriteTriggerRelation( model.spriteId, triggerId, model.eventId );
    }
}
export const deleteSpriteRelatedTrigger = ( spriteId: string ): void => {
    if ( spriteTriggerRelationExists( spriteId ) ) {
        const triggerId = getSpriteRelatedTriggerId( spriteId );
        deregisterTrigger( triggerId );
        unregisterSpriteTriggerRelation( spriteId );
    }
}
const getFrameModelFromCanvasObject = ( canvasObject: Tile | Sprite ): FrameModel => {
    return {
        x: canvasObject.x, y: canvasObject.y,
        width: canvasObject.width, height: canvasObject.height
    };
}