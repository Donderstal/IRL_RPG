const interactionRegistry = { };

const isInRegistry = ( key ) => {
    return key in interactionRegistry;
};

const addEventToRegistry = ( eventKey, value = true ) => {
    interactionRegistry[eventKey] = value;
}

module.exports = {
    isInRegistry,
    addEventToRegistry
}