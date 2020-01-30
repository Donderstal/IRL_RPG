const globals = require('../../game-data/globals')
const state = require('../../game-data/state')
const mapHelpers = require('../../helpers/mapHelpers')
const soundHelper   = require('../../helpers/soundHelpers')
const soundClass    = soundHelper.soundClass

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
            const newDoor = mapDoors[i]
            const doorXy = mapHelpers.getXYOfCell( newDoor.row, newDoor.col )

            switch ( newDoor.directionIn ) {
                case ( 'FACING_DOWN' || 'FACING_UP' ) :
                    newDoor.y = doorXy.y + globals.GRID_BLOCK_PX
                    newDoor.left = doorXy.x
                    newDoor.right = doorXy.x + globals.GRID_BLOCK_PX
                    break
                case ( 'FACING_LEFT' ) :
                    newDoor.x = doorXy.x
                    newDoor.top = doorXy.y
                    newDoor.bottom = doorXy.y + globals.GRID_BLOCK_PX
                    break
                case ( 'FACING_RIGHT' ) :
                    newDoor.x = doorXy.x + globals.GRID_BLOCK_PX
                    newDoor.top = doorXy.y
                    newDoor.bottom = doorXy.y + globals.GRID_BLOCK_PX
                    break
            }            

            state.currentMap.doors.push(
                {...newDoor}
            )

            if ( previousMap === newDoor.to) {
                const sfx = new soundClass( "misc/random6.wav", true )
                sfx.play()
                setSpritePositionForNewMap(newDoor)
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