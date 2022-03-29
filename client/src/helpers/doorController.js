const { Door } = require("../game/map/map-classes/Door");
const { getUniqueId } = require("./utilFunctions");

let activeDoors = [];
let activeDoorIds = [];
let pendingDoorId = false
let pendingDestination = false;

const initDoorWithId = ( x, y, doorData ) => {
    const id = getUniqueId( activeDoorIds );
    const door = new Door( x, y, doorData, id );
    activeDoorIds.push( id );
    activeDoors.push( door );
    return door;
}

const resetDoors = ( ) => {
    activeDoors = [];
    activeDoorIds = [];
}

const getDoorById = ( id ) =>{
    return activeDoorIds.indexOf(id) > -1 ? activeDoors.filter(e => e.id = id)[0]: false;
}

const getActiveDoors = ( ) => {
    return activeDoors;
}

const setDoorAsPending = ( id, destination ) => {
    pendingDoorId = id;
    pendingDestination = destination
}

const unsetPendingDoor = ( ) => {
    pendingDoorId = false;
    pendingDestination = false;
}

const getPendingDoor = ( ) => {
    return {
        'id': pendingDoorId,
        'destination': pendingDestination
    };
}

module.exports = { 
    initDoorWithId,
    resetDoors,
    getDoorById,
    getActiveDoors,
    setDoorAsPending,
    unsetPendingDoor,
    getPendingDoor
}