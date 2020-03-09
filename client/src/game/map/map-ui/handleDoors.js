const state = require('../../../game-data/state')
const Sound = require('../../interfaces/I_Sound').Sound

/**
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the MapSprite class from initMapSprite.js
 * 
 * Render new map if player is passing through
 */

const checkIfDoor = ( sprite, direction ) => {
    if (state.currentMap.mapData.outdoors ) {
        if ( state.currentMap.borders.right < ( sprite.x - sprite.width ) && state.currentMap.mapData.neighbours.right ) {
            return state.currentMap.mapData.neighbours.right
        }

        if ( state.currentMap.borders.left > ( sprite.x + sprite.width ) && state.currentMap.mapData.neighbours.left ) {
            return state.currentMap.mapData.neighbours.left
        }

    }
    
    const doors = state.currentMap.doors
    let facingDoor = false;

    for( var i = 0; i < doors.length; i++ ) {
        const currentDoor = doors[i]

        if ( direction === 'FACING_LEFT' ) {
            if ( direction == currentDoor.directionIn && currentDoor.x >= sprite.left ) {
                if ( sprite.cell.y > currentDoor.top && sprite.cell.y < currentDoor.bottom)
                facingDoor = true
            }
        }

        if ( direction === 'FACING_RIGHT' ) {
            if ( direction == currentDoor.directionIn && currentDoor.x <= sprite.right ) {
                if ( sprite.cell.y > currentDoor.top && sprite.cell.y < currentDoor.bottom)
                facingDoor = true
            }
        }

        if ( direction === 'FACING_UP' ) {
            if ( direction == currentDoor.directionIn && currentDoor.y >= sprite.y ) {
                if ( sprite.cell.x > currentDoor.left && sprite.cell.x < currentDoor.right)
                facingDoor = true
            }
        }

        if ( direction === 'FACING_DOWN' ) {
            if ( direction == currentDoor.directionIn && currentDoor.y <= sprite.bottom ) {
                if ( sprite.cell.x > currentDoor.left && sprite.cell.x < currentDoor.right)
                facingDoor = true
            }
        }

        if ( facingDoor ) {
            const sfx = new Sound( "misc/random5.wav", true )
            sfx.play()
            return currentDoor.to
        }
    }

    return facingDoor
}    



module.exports = {
    checkIfDoor
}
