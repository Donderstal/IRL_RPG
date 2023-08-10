import type { EventType } from "../enumerables/EventType"
import type { TriggerType } from "../enumerables/TriggerType";

export type TriggerEvent = {
    type: EventType;
    trigger: TriggerType;
    model: any;
    id: string | null;
}