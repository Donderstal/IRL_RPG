import type { IEventDto } from "./IEventDto";

export type DoorEventDto = IEventDto & {
    mapA: string;
    mapB: string;
    doorId: string;
}