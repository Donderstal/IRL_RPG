import type { IEventDto } from "./IEventDto";

export type EnterMapEventDto = IEventDto & {
	mapName: string;
	doorId?: string;
}