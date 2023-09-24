import type { EventConditionPair } from "./EventConditionPair";
import type { IEventChain } from "./IEventChain";

export type CutsceneEventChain = IEventChain & {
    triggerableCutscenes: EventConditionPair[];
}