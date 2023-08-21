import type { CinematicModel } from "../CinematicModel";
import type { IEventDto } from "./IEventDto";

export type CutsceneEventDto = IEventDto & {
    cutscene: CinematicModel;
    shouldBeRegistered: boolean;
    registryKey?: string
    sfx?: string,
}