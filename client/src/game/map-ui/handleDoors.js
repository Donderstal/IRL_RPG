const state = require('../../game-data/state')
const mapHelpers = require('../../helpers/mapHelpers')

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

    const spriteGridLocation = mapHelpers.getCellOfXY( ( sprite.x + ( sprite.width / 2 ) ), ( sprite.y + ( sprite.height / 3 ) ) )
    for( var i = 0; i < doors.length; i++ ) {
        const currentDoor = doors[i]
        if ( currentDoor.row === spriteGridLocation.row 
            && currentDoor.col === spriteGridLocation.col 
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
