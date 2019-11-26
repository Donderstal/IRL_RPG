const state = require('../../game-data/state')
const mapHelpers = require('../../helpers/mapHelpers')
const initMap = require('../map-init/initMap')
const controls = require('./controls')
const movement = require('./movement')
const canvasHelpers = require('../../helpers/canvasHelpers')

let newMap;
let oldMap;


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
        if ( currentDoor.row === spriteGridLocation.row && currentDoor.col === spriteGridLocation.col 
            && !currentDoor.locked && direction === currentDoor.directionIn) {

            newMap = currentDoor.to 
            oldMap = state.currentMap.mapData.mapName

            return true
        }
    }
}

const getNewMap = ( ) => {
    
    canvasHelpers.clearBothCanvases()
    canvasHelpers.getLoadingScreen()

    initMap.fetchMapJsonWithCallback( newMap, oldMap )   
}    

module.exports = {
    checkIfDoor,
    getNewMap
}
