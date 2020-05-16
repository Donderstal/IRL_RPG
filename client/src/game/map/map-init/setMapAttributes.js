const state         = require('../../../game-data/state')
const actionHelpers = require('../../../helpers/actionHelpers')
const globals       = require('../../../game-data/globals')
const mapHelpers    = require('../../../helpers/mapHelpers')
const actionRegistry= require('./actionRegistry')

const I_Hitbox = require('../../interfaces/I_Hitbox').I_Hitbox

const setMapAttributes = ( ) => {
    actionRegistry.initNewActionRegistry( );
    setDoors( );
    setActions( );
}

/**
  * Get doors in current map from mapData json in state
  * Loop over them, calc their xy values
  * Push them to doors array in currentMap
  */
 const setDoors = () => {
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
            let actionXy = mapHelpers.getXYOfCell( actionsInMap[i].row, actionsInMap[i].col )

            state.currentMap.mapActions.push(
                new MapAction( actionXy.x, actionXy.y, actionsInMap[i] )
            )
        }        
    }
}

class MapAction extends I_Hitbox {
    constructor ( x, y, action ) {
        let radius = globals.GRID_BLOCK_PX / 2;
        super( x, y, radius )

        this.id     = actionRegistry.getNewActionId( );
        if ( action.name ) {
            this.name = action.name
        }
        if ( action.character ) {
            this.characer = action.character
        }
        this.type       = action.type
        this.text       = action.text
        this.sfx        = action.sfx
        this.direction  = action.direction
        
    }

    checkForActionRange( ) {
        if ( super.checkForActionRange( ) ) {
            actionRegistry.setActionAsAvailable( this );
        }
        else if ( state.currentMap.availableAction != null && state.currentMap.availableAction != undefined ) {
            actionRegistry.clearAvailableAction( this.id )
        }
    }
}


 module.exports = {
    setMapAttributes,
    MapAction
 }