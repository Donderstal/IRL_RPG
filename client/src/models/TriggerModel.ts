import type { EventChainType } from "../enumerables/EventChainType";
import type { TriggerType } from "../enumerables/TriggerType";
import type { CellPosition } from "./CellPositionModel";

export type TriggerModel = CellPosition & {
	eventId: string,
	eventChainType?: EventChainType,
	triggerType?: TriggerType,
	spriteId?: string,
}