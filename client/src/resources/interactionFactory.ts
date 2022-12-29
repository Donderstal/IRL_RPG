import { InteractionType } from "../enumerables/InteractionType";
import type { CinematicModel } from "../models/CinematicModel";
import type { ConditionModel } from "../models/ConditionModel";
import type { InteractionModel } from "../models/InteractionModel";

export const getDefaultTalkInteraction = ( cinematic: CinematicModel, condition: ConditionModel ): InteractionModel => {
	return {
        type: InteractionType.talk,
        sfx: "medium-text-blip.ogg",
        shouldBeRegistered: false,
        cinematic: cinematic,
        condition: condition
	}
}
export const getRegistryTalkInteraction = ( cinematic: CinematicModel, condition: ConditionModel, key: string ): InteractionModel => {
    return {
        type: InteractionType.talk,
        sfx: "medium-text-blip.ogg",
        shouldBeRegistered: true,
        registryKey: key,
        cinematic: cinematic,
        condition: condition
    }
}
export const getSaveInteraction = ( cinematic: CinematicModel, condition: ConditionModel ): InteractionModel => {
    return {
        type: InteractionType.save,
        sfx: "medium-text-blip.ogg",
        shouldBeRegistered: false,
        cinematic: cinematic,
        condition: condition
    }
}
export const getPromptLogInInteraction = ( cinematic: CinematicModel, condition: ConditionModel ): InteractionModel => {
    return {
        type: InteractionType.prompt_log_in,
        sfx: "medium-text-blip.ogg",
        shouldBeRegistered: false,
        cinematic: cinematic,
        condition: condition
    }
}
export const getElevatorInteraction = ( cinematic: CinematicModel, condition: ConditionModel ): InteractionModel => {
    return {
        type: InteractionType.elevator,
        sfx: "medium-text-blip.ogg",
        shouldBeRegistered: false,
        cinematic: cinematic,
        condition: condition
    }
}