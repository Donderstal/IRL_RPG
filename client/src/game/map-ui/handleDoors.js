const state = require('../../game-data/state')

/**
 * EXPORT @function checkIfDoor
 * 
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the GamePiece class from initGamePiece.js
 * 
 * Render new map if player is passing through
 */

const checkIfDoor = ( sprite, direction ) => {
    const doors = state.currentMap.doors
    for( var i = 0; i < doors.length; i++ ) {
        const currentDoor = doors[i]
        if ( currentDoor.row === sprite.row 
            && currentDoor.col === sprite.col 
            && !currentDoor.locked 
            && direction === currentDoor.directionIn) {

            return currentDoor.to
        }
    }

    return false
}    

module.exports = {
    checkIfDoor
}
