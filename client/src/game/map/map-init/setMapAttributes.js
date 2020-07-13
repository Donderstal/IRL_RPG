const state         = require('../../../game-data/state')
const globals       = require('../../../game-data/globals')
const mapHelpers    = require('../../../helpers/mapHelpers')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const actionRegistry= require('./actionRegistry')
const mapObjectResources = require('../../../resources/mapObjectResources')

const Sound         = require('../../interfaces/I_Sound').Sound
const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const I_Sprite      = require('../../interfaces/I_Sprite').Sprite

const setMapAttributes = ( ) => {
    actionRegistry.initNewActionRegistry( );
    setDoors( );
    setMapObjects( );
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

    checkForBlockedRange( ) {
        if ( super.checkForBlockedRange( ) ) {
            state.mapTransition = {
                urlToNewMap: this.to, 
                oldMapName: state.currentMap.mapData.mapName
            }
            
            const sfx = new Sound( "misc/random5.wav", true )
            sfx.play()
        }
    }
}

const setMapObjects = ( ) => {
    state.currentMap.mapObjects = [ ];

    if  ( state.currentMap.mapData.mapObjects ) {
        var objectsInMap = state.currentMap.mapData.mapObjects

        for ( var i = 0; i <  objectsInMap.length; i++ ) {
            state.currentMap.mapObjects.push(
                new MapObject( objectsInMap[i] )
            )
        }   
    }
}

class MapObject extends I_Sprite {
    constructor ( mapObject ) {
        const objectResource = mapObjectResources[mapObject.type]
        const src = "/static/sprite-assets/" + objectResource.src
        const startingCell = { "row": mapObject.row , "col": mapObject.col }
        const dimensions = {
            "width": objectResource.width_blocks * globals.GRID_BLOCK_PX,
            "height": objectResource.height_blocks * globals.GRID_BLOCK_PX 
        }

        super( startingCell, src, "CELL", dimensions )

        this.widthInSheet   = objectResource.width_blocks * globals.GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = objectResource.height_blocks * globals.GRID_BLOCK_IN_SHEET_PX;
        this.hasAction  = mapObject.hasAction;

        if ( this.hasAction ) {
            this.hitbox = new MapAction( this.x + (globals.GRID_BLOCK_PX * .25), this.y + (this.height - globals.GRID_BLOCK_PX) , mapObject.action )
        }
    }

    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.sheetPosition * this.widthInSheet, 
            this.direction * this.heightInSheet, 
            this.widthInSheet, this.heightInSheet,
            this.x, this.y, this.width, this.height
        )

        this.updateSpriteBorders( )

        if ( this.hasAction ) {
            this.hitbox.checkForActionRange( );        
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
    constructor ( x, y, action, speaker = null ) {
        let radius = globals.GRID_BLOCK_PX / 2;
        super( x, y, radius )

        this.id   = actionRegistry.getNewActionId( );
        this.name = speaker

        if ( action.character ) {
            this.characer = action.character
        }
        this.type       = action.type
        this.text       = action.text
        this.sfx        = action.sfx
        this.direction  = action.direction
        this.to         = action.to
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

class BlockedArea {
    constructor(x, y, width, height) {
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;   
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

        if ( playerHitbox.x > this.x && playerHitbox.x < right ) {
            if ( playerDirection == globals.FACING_UP && playerHitbox.innerTop( ) <= bottom && playerHitbox.innerBottom( ) > bottom ) {
                inBlockedRange = true;
            }

            else if ( playerDirection == globals.FACING_DOWN && playerHitbox.outerBottom() >= this.y && playerHitbox.innerTop( ) < this.y ) {
                inBlockedRange = true;
            }
            
        }
        else if ( playerHitbox.y > this.y - playerHitbox.outerRadius && playerHitbox.y < bottom ) {
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
    BlockedArea
 }