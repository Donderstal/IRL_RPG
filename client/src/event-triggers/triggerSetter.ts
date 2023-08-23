import type { Sprite } from "../game/core/Sprite";
import type { Tile } from "../game/core/Tile"
import type { FrameModel } from "../models/SpriteFrameModel";
import type { TriggerModel } from "../models/TriggerModel";
import { Trigger } from "./Trigger";
import { registerTrigger } from "./triggerRegistry";

export const setTrigger = ( canvasObject: Tile | Sprite, model: TriggerModel ): void => {
    const frame = getFrameModelFromCanvasObject( canvasObject );
    const trigger = new Trigger( frame, model );
    registerTrigger( trigger );
}

const getFrameModelFromCanvasObject = ( canvasObject: Tile | Sprite ): FrameModel => {
    return {
        x: canvasObject.x, y: canvasObject.y,
        width: canvasObject.width, height: canvasObject.height
    };
}