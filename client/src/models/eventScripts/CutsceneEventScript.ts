import type { CutsceneModel } from "../cutscenes/CutsceneModel";
import type { IEventScript } from "./IEventScript";

export type CutsceneEventScript = IEventScript & {
    cutscene: CutsceneModel;
    shouldBeRegistered: boolean;
    registryKey?: string
    sfx?: string,
}