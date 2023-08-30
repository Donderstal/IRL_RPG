import type { EventType } from "../enumerables/EventType";
import type { TriggerType } from "../enumerables/TriggerType";
import type { CellPosition } from "./CellPositionModel";

export type TriggerModel = CellPosition & {
	eventType: EventType,
	eventId: string,
	spriteId?: string,
	triggeredBy?: TriggerType;
}