import { ConditionType } from "../enumerables/ConditionTypeEnum";
import type { ConditionModel } from "../models/ConditionModel";

export const getDefaultCondition = ( ): ConditionModel => {
    const condition: ConditionModel = {
        type: ConditionType.default
    }
    return condition;
}
export const getInteractionRegisteredCondition = ( key: string ): ConditionModel => {
    const condition: ConditionModel = {
        type: ConditionType.interactionRegistered,
        value: key
    }
    return condition;
}
export const getInteractionNotRegisteredCondition = ( key: string ): ConditionModel => {
    const condition: ConditionModel = {
        type: ConditionType.interactionNotRegistered,
        value: key
    }
    return condition;
}
export const getNoRegisteredInInteractionCondition = ( key: string ): ConditionModel => {
    const condition: ConditionModel = {
        type: ConditionType.noRegisteredInInteraction,
        value: key
    }
    return condition;
}
export const getYesRegisteredInInteractionCondition = ( key: string ): ConditionModel => {
    const condition: ConditionModel = {
        type: ConditionType.yesRegisteredInInteraction,
        value: key
    }
    return condition;
}
export const getLoggedInCondition = (): ConditionModel => {
    const condition: ConditionModel = {
        type: ConditionType.loggedIn
    }
    return condition;
}
export const getNotLoggedInCondition = (): ConditionModel => {
    const condition: ConditionModel = {
        type: ConditionType.notLoggedIn
    }
    return condition;
}