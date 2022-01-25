let interactionRegistry = { };

const isInRegistry = ( key ) => {
    return key in interactionRegistry;
};

const isInRegistryWithValue = ( key, value ) => {
    if ( isInRegistry( key ) ) {
        return interactionRegistry[key] == value;
    }
    
    return false;
}

const addEventToRegistry = ( eventKey, value = true ) => {
    interactionRegistry[eventKey] = value;
}

const getRegistry = ( ) => {
    return interactionRegistry;
}

const setInteractionRegistry = ( registryObject ) => {
    interactionRegistry = registryObject;
}

module.exports = {
    isInRegistry,
    isInRegistryWithValue,
    addEventToRegistry,
    getRegistry,
    setInteractionRegistry
}