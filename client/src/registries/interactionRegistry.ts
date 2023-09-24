import { InteractionAnswer } from "../enumerables/InteractionAnswer";
let interactionRegistry = { };

export const isInInteractionRegistry = ( key: string ): boolean => {
    return key in interactionRegistry;
};

export const isInRegistryWithValue = ( key: string, value: InteractionAnswer ): boolean => {
    if ( isInInteractionRegistry( key ) ) {
        return interactionRegistry[key] === value;
    }
    
    return false;
}

export const addEventToRegistry = ( eventKey: string, value: InteractionAnswer = InteractionAnswer.yes ): void => {
    interactionRegistry[eventKey] = value;
}

export const getRegistry = (): { [key: string]: InteractionAnswer } => {
    return interactionRegistry;
}

export const setInteractionRegistry = ( registryObject: { [key: string]: InteractionAnswer } ): void => {
    interactionRegistry = registryObject;
}