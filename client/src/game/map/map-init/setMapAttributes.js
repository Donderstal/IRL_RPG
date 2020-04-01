const state         = require('../../../game-data/state')
const actionHelpers = require('../../../helpers/actionHelpers')

const setMapAttributes = ( ) => {
    setDoorsAndDetectEntryPoint( )
    setActions( )
}

/**
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


 module.exports = {
    setMapAttributes
 }