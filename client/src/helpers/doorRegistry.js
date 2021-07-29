const unlockedDoors = [];

const inUnlockedDoorsRegistry = ( doorID ) => {
    return unlockedDoors.includes( doorID )
}

const addDoorToUnlockedDoorsRegistry = ( doorID ) => {
    unlockedDoors.push(doorID)
}

module.exports = { 
    inUnlockedDoorsRegistry, 
    addDoorToUnlockedDoorsRegistry 
}