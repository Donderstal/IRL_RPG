import type { TriggerType } from "../../enumerables/TriggerType"
import type { ConditionModel } from "../ConditionModel"
import type { IEventDto } from "./IEventDto"

export type EventConditionPair = {
    event: IEventDto,
    condition: ConditionModel,
    triggerType: TriggerType
}