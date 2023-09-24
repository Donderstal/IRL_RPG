import type { IEventChain } from "./IEventChain";

export type ElevatorEventChain = IEventChain & {
    floors: { [key in string]: string }
}