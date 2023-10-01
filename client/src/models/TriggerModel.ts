import type { EventChainType } from "../enumerables/EventChainType";
import type { TriggerType } from "../enumerables/TriggerType";
import type { GridCellModel } from "./GridCellModel";

export type TriggerModel = GridCellModel & {
	eventId: string,
	eventChainType?: EventChainType,
	triggerType?: TriggerType,
	spriteId?: string,
}