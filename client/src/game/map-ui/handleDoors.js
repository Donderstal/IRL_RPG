const state = require('../../game-data/state')
const soundHelper   = require('../../helpers/soundHelpers')
const soundClass    = soundHelper.soundClass

/**
 * EXPORT @function checkIfDoor
 * 
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the GamePiece class from initGamePiece.js
 * 
 * Render new map if player is passing through
 */

const checkIfDoor = ( sprite, direction ) => {
    if ( state.currentMap.borders.right < ( sprite.x - sprite.width ) && state.currentMap.mapData.neighbours.right ) {
        return state.currentMap.mapData.neighbours.right
    }

    if ( state.currentMap.borders.left > ( sprite.x + sprite.width ) && state.currentMap.mapData.neighbours.left ) {
        return state.currentMap.mapData.neighbours.left
    }

    const doors = state.currentMap.doors
    for( var i = 0; i < doors.length; i++ ) {
        const currentDoor = doors[i]
        if ( currentDoor.row === sprite.row 
            && currentDoor.col === sprite.col 
            && !currentDoor.locked 
            && direction === currentDoor.directionIn) {
            const sfx = new soundClass( "misc/random5.wav", true )
            sfx.play()
            return currentDoor.to
        }
    }

    return false
}    

module.exports = {
    checkIfDoor
}
