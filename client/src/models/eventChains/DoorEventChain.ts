import type { DoorInteractionType } from "../../enumerables/DoorInteractionType";
import type { IEventChain } from "./IEventChain";

export type DoorEventChain = IEventChain & {
    mapA: string;
    mapB: string;
    doorId: string;
    lockedBy?: string;
    doorInteractionType?: DoorInteractionType;
    initialMap?: string;
}