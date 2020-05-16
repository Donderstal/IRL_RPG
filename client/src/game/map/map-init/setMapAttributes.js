const state         = require('../../../game-data/state')
const Sound         = require('../../interfaces/I_Sound').Sound
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
            let doorXy = mapHelpers.getXYOfCell( newDoor.row, newDoor.col )
            if ( newDoor.directionIn == 'FACING_UP' ) {
                state.currentMap.doors.push(
                    new Door( 
                        doorXy.x + globals.GRID_BLOCK_PX / 2, 
                        doorXy.y, 
                        newDoor
                    )
                )
            }
            if ( newDoor.directionIn == 'FACING_RIGHT' ) {
                state.currentMap.doors.push(
                    new Door( 
                        doorXy.x + globals.GRID_BLOCK_PX, 
                        doorXy.y + globals.GRID_BLOCK_PX / 2, 
                        newDoor
                    )
                )                
            }
            if ( newDoor.directionIn == 'FACING_DOWN' ) {
                state.currentMap.doors.push(
                    new Door( 
                        doorXy.x + globals.GRID_BLOCK_PX / 2, 
                        doorXy.y + globals.GRID_BLOCK_PX, 
                        newDoor
                    )
                )
            }           
            if ( newDoor.directionIn == 'FACING_LEFT' ) {
                state.currentMap.doors.push(
                    new Door( 
                        doorXy.x, 
                        doorXy.y + globals.GRID_BLOCK_PX / 2, 
                        newDoor
                    )
                )
            }          
        }
    }

}

class Door extends I_Hitbox {
    constructor( x, y, door ) {
        const radius = globals.GRID_BLOCK_PX;
        super( x, y, radius)
        this.to             = door.to;
        this.directionIn    = door.directionIn
        this.directionOut   = door.directionOut
        this.locked         = door.locked
    }

    checkForActionRange( ) {
        if ( super.checkForActionRange( ) ) {
            state.mapTransition = {
                urlToNewMap: this.to, 
                oldMapName: state.currentMap.mapData.mapName
            }
            const sfx = new Sound( "misc/random5.wav", true )
            sfx.play()
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
                new MapAction( actionXy.x + globals.GRID_BLOCK_PX / 2, actionXy.y + globals.GRID_BLOCK_PX / 2, actionsInMap[i] )
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