import type { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import type { InteractionModel } from "./InteractionModel";

export type StoryEventModel = {
    trigger: CinematicTrigger,
    mapName: string,
    interaction: InteractionModel
}