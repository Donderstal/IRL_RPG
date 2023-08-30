import type { EventType } from "../../enumerables/EventType";
import type { TriggerType } from "../../enumerables/TriggerType";
import type { EventConditionPair } from "./EventConditionPair";

export type EventModel = {
    eventType: EventType,
    triggerableEvents: EventConditionPair[];

    triggerId?: string,
    triggerType?: TriggerType,
    selectedEventIndex?: number
}