import type { CinematicSceneModel } from "./CinematicSceneModel";
import type { ConditionModel } from "./ConditionModel";

export type CinematicModel = {
    condition: ConditionModel,
    scenes: CinematicSceneModel[],
    sfx?: string
}