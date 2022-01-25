let unlockedDoors = [];

const inUnlockedDoorsRegistry = ( doorID ) => {
    return unlockedDoors.includes( doorID )
}

const addDoorToUnlockedDoorsRegistry = ( doorID ) => {
    unlockedDoors.push(doorID)
}

const getUnlockedDoorsRegistry = ( ) => {
    return unlockedDoors
}

const setUnlockedDoorsRegistry = ( doorList ) => {
    unlockedDoors = doorList
}

module.exports = { 
    inUnlockedDoorsRegistry, 
    addDoorToUnlockedDoorsRegistry,
    getUnlockedDoorsRegistry,
    setUnlockedDoorsRegistry
}