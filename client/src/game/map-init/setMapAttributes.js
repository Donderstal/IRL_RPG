const globals = require('../../game-data/globals')
const state = require('../../game-data/state')
const mapHelpers = require('../../helpers/mapHelpers')

/**
 * EXPORT @function setMapEvents
 */
const setMapEvents = ( ) => {
    state.currentMap.events = []
}


/**
  * EXPORT @function setDoorsAndDetectEntryPoint
  * 
  * @param {string} previousMap - string representing relative path to previous map
  * 
  * Get doors in current map from mapData json in state
  * Loop over them, calc their xy values
  * Push them to doors array in currentMap
  * If player entered from a door, call setSpritePositionForNewMap
  */
 const setDoorsAndDetectEntryPoint = ( previousMap ) => {
     if ( state.currentMap.mapData.doors ) {
        state.currentMap.doors = []
        const mapDoors = state.currentMap.mapData.doors

        for ( var i = 0; i < mapDoors.length; i++ ) {

            const door = mapDoors[i]
            const doorXy = mapHelpers.getXYOfCell( door.row, door.col )
            door.x = doorXy.x
            door.y = doorXy.y
            state.currentMap.doors.push(
                {...door}
            )

            if ( previousMap === door.to) {
                setSpritePositionForNewMap(door)
            }

        }
     }

}

/**
 * @function setSpritePositionForNewMap
 * 
 * @param {object} previousMap - door where the player is entering map
 * 
 * Adjust character grid position to position of door
 * Set character direction to door direction
 */

 const setSpritePositionForNewMap = (door) => {
    state.playerCharacter.sprite.setCell( { 'row': door.row, 'col': door.col } )
    state.playerCharacter.sprite.direction = globals[door.directionOut]
 }

 module.exports = {
    setDoorsAndDetectEntryPoint
 }