import type { IEventDto } from "./IEventDto";

export type ElevatorEventDto = IEventDto & {
	floors: { [key in string]: string };
}