import type { InteractionType } from "../enumerables/InteractionType";
import type { CinematicSceneModel } from "./CinematicSceneModel";
import type { ConditionModel } from "./ConditionModel";

export type CinematicModel = {
    type: InteractionType,
    condition: ConditionModel,
    scenes: CinematicSceneModel[],
    sfx?: string
}