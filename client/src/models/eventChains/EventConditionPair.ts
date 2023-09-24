import type { TriggerType } from "../../enumerables/TriggerType"
import type { ConditionModel } from "../ConditionModel"
import type { IEventScript } from "../eventScripts/IEventScript"

export type EventConditionPair = {
    event: IEventScript,
    condition: ConditionModel,
    triggerType: TriggerType
}