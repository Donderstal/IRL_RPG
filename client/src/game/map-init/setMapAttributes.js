const globals       = require('../../game-data/globals')
const state         = require('../../game-data/state')
const mapHelpers    = require('../../helpers/mapHelpers')
const actionHelpers    = require('../../helpers/actionHelpers')
const soundHelper   = require('../../helpers/soundHelpers')
const soundClass    = soundHelper.soundClass

/**
 * EXPORT @function setMapEvents
 */
const setMapAttributes = ( previousMap ) => {
    setDoorsAndDetectEntryPoint( previousMap )
    setActions( )
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
    state.currentMap.doors = []
     if ( state.currentMap.mapData.doors ) {
        const mapDoors = state.currentMap.mapData.doors


        for ( var i = 0; i < mapDoors.length; i++ ) {
            const newDoor = mapDoors[i]
            
            state.currentMap.doors.push(
                actionHelpers.generateAction( 'MAP', newDoor )
            )

            if ( previousMap === newDoor.to) {
                const sfx = new soundClass( "misc/random6.wav", true )
                sfx.play()
                setSpritePositionForNewMap(newDoor)
            }
        }
    }

}

const setActions = (  ) => {
    state.currentMap.mapActions = []

    if ( state.currentMap.mapData.actions ) {
        var actionsInMap = state.currentMap.mapData.actions

        for ( var i = 0; i < actionsInMap.length; i++ ) {
            state.currentMap.mapActions.push(
                actionHelpers.generateAction( 'NPC', actionsInMap[i] )
            )
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
    setMapAttributes
 }