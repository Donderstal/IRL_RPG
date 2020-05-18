const state         = require('../../../game-data/state')
const globals       = require('../../../game-data/globals')
const mapHelpers    = require('../../../helpers/mapHelpers')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const actionRegistry= require('./actionRegistry')

const Sound         = require('../../interfaces/I_Sound').Sound
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
        this.arcColor       = "#FFFFFF";

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
        this.arcColor   = "#FF0000";
        
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

class BlockedTile extends I_Hitbox {
    constructor( x, y ) {
        super( x, y, globals.GRID_BLOCK_PX / 2 )
        this.arcColor = "#000000";
    }

    checkForBlockedRange( ) {
        this.draw(this.x, this.y)
        if ( super.checkForBlockedRange( ) ) {
            return true;
        }
        return false;
    }
}

class BlockedArea {
    constructor(x, y, width, height) {
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;   
        this.draw( )  
    }

    draw( ) {
        let backCtx = canvasHelpers.getBackCanvasContext()
        backCtx.rect(this.x, this.y, this.width, this.height);
        setTimeout( ( ) => {
            backCtx.stroke();
        }, globals.BATTLE_INTRO_ANIM_MS)
    }

    checkForBlockedRange( ) {
        let playerDirection = state.playerCharacter.sprite.direction
        let playerHitbox    = state.playerCharacter.sprite.hitbox
        let inBlockedRange = false;
        
        const right = this.x + this.width;
        const bottom = this.y + this.height

        if ( playerHitbox.innerLeft( ) > this.x && playerHitbox.innerRight() < right ) {
            if ( playerDirection == globals.FACING_UP && playerHitbox.innerTop( ) <= bottom && playerHitbox.innerBottom( ) > bottom ) {
                inBlockedRange = true;
            }

            else if ( playerDirection == globals.FACING_DOWN && playerHitbox.outerBottom() >= this.y && playerHitbox.innerTop( ) < this.y ) {
                inBlockedRange = true;
            }
            
        }
        else if ( playerHitbox.innerTop( ) > this.y && playerHitbox.innerBottom() < bottom ) {
            if ( playerDirection == globals.FACING_LEFT && playerHitbox.innerLeft( ) <= right && playerHitbox.innerRight( ) > right ) {
                inBlockedRange = true;
            }

            else if ( playerDirection == globals.FACING_RIGHT && playerHitbox.innerRight() >= this.x && playerHitbox.innerLeft( ) < this.x ) {
                inBlockedRange = true;
            }

        }

        return inBlockedRange
    }
}


 module.exports = {
    setMapAttributes,
    MapAction,
    BlockedTile,
    BlockedArea
 }