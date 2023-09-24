import type { IEventScript } from "./IEventScript";

export type LeaveMapEventScript = IEventScript & {
	nextMapName: string;
	doorId?: string;
}