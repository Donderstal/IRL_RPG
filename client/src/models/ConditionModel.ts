import type { ConditionType } from "../enumerables/ConditionTypeEnum";

export type ConditionModel = {
    type: ConditionType,
    value?: string
}