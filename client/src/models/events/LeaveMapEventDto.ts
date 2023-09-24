import type { IEventDto } from "./IEventDto";

export type LeaveMapEventDto = IEventDto & {
	nextMapName: string;
	doorId?: string;
}