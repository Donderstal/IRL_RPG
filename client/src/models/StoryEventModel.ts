import type { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import type { CellPosition } from "./CellPositionModel";
import type { InteractionModel } from "./InteractionModel";

export type StoryEventModel = {
    id: string,
    trigger: CinematicTrigger,
    mapName: string,
    interaction: InteractionModel,

    name?: string,
    position?: CellPosition
}