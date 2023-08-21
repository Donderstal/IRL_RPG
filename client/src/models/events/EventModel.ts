import type { EventType } from "../../enumerables/EventType";
import type { EventConditionPair } from "./EventConditionPair";

export type EventModel = {
    eventType: EventType,
    triggerId?: string,
    triggerableEvents: EventConditionPair[];
}