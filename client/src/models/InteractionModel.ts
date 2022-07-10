import type { InteractionType } from "../enumerables/InteractionType"
import type { CinematicSceneModel } from "./CinematicSceneModel"

export type InteractionModel = {
    type: InteractionType,
    sfx: string,
    scenes: CinematicSceneModel[];
    shouldBeRegistered: boolean;
    registryKey?: string
}