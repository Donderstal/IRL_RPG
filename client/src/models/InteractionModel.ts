import type { InteractionType } from "../enumerables/InteractionType"
import type { CinematicModel } from "./CinematicModel";
import type { ConditionModel } from "./ConditionModel";

export type InteractionModel = {
    type: InteractionType,
    sfx: string,
    cinematic: CinematicModel;
    condition: ConditionModel;
    shouldBeRegistered: boolean;
    registryKey?: string
}