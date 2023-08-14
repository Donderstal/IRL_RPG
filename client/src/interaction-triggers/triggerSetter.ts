import type { Tile } from "../game/core/Tile"
import type { DoorModel } from "../models/DoorModel";
import type { ElevatorModel } from "../models/ElevatorModel";
import type { InteractionModel } from "../models/InteractionModel";
import type { FrameModel } from "../models/SpriteFrameModel";
import { CutsceneTrigger } from "./CutsceneTrigger";
import { DoorTrigger } from "./DoorTrigger";
import { ElevatorTrigger } from "./ElevatorTrigger";
import { SavePointTrigger } from "./SavePointTrigger"
import { registerTrigger } from "./triggerRegistry";

export const setSavePointTrigger = ( tile: Tile ): void => {
    const frame = getFrameModelFromTile( tile );
    const trigger = new SavePointTrigger( frame );
    registerTrigger( trigger );
}

export const setDoorTrigger = ( tile: Tile, doorModel: DoorModel, doorId: string ): void => {
    const frame = getFrameModelFromTile( tile );
    const trigger = new DoorTrigger( frame, doorModel, doorId );
    registerTrigger( trigger );
}

export const setElevatorTrigger = ( tile: Tile, model: ElevatorModel ): void => {
    const frame = getFrameModelFromTile( tile );
    const trigger = new ElevatorTrigger( frame, model );
    registerTrigger( trigger );
}

export const setCutsceneTrigger = ( tile: Tile, models: InteractionModel[], spriteId: string = null ): void => {
    const frame = getFrameModelFromTile( tile );
    const trigger = new CutsceneTrigger( frame, models, spriteId );
    registerTrigger( trigger );
}

const getFrameModelFromTile = ( tile: Tile ): FrameModel => {
    return {
        x: tile.x, y: tile.y,
        width: tile.width, height: tile.height
    };
}