import type { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import type { CinematicModel } from "./CinematicModel";

export type StoryEventModel = {
    trigger: CinematicTrigger[],
    mapName: string,
    cinematic: CinematicModel
}