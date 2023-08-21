import type { EventType } from "../enumerables/EventType";
import type { CellPosition } from "./CellPositionModel";

export type TriggerModel = CellPosition & {
	eventType: EventType,
	eventId: string,
	spriteId?: string
}