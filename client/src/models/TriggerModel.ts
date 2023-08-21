import type { TriggerType } from "../enumerables/TriggerType";
import type { CellPosition } from "./CellPositionModel";

export type TriggerModel = CellPosition & {
	triggerType: TriggerType,
	eventId: string,
	spriteId?: string
}