import type { InteractionType } from "../enumerables/InteractionType"
import type { CinematicModel } from "./CinematicModel";

export type InteractionModel = {
    type: InteractionType,
    sfx: string,
    cinematic: CinematicModel;
    shouldBeRegistered: boolean;
    registryKey?: string
}