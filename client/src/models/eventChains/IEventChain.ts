import type { EventChainType } from "../../enumerables/EventChainType";
import type { TriggerType } from "../../enumerables/TriggerType";

export type IEventChain = {
    eventChainType: EventChainType,
    triggerId?: string,
    triggerType?: TriggerType
}