const state = require('../../game-data/state')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls')
const mapController = require('./mapController')

const handleMapAnimations = ( ) => {
    state.currentMap.layeredSprites = [];

    if ( state.mapTransition != null ) {
        mapController.switchMap( state.mapTransition )
        state.transitioning = true;
        state.mapTransition = null
    }

    gatherSpritesInState( )
    drawSpritesInOrder( ) 

    if ( state.playerCharacter.sprite ) {
        mapControls.handleMovementKeys( );   
         
        if ( state.currentMap.mapActions ) {     
            state.currentMap.mapActions.forEach( (action) => {
                action.checkForActionRange( );
            })
        }  
        
        if ( state.currentMap.doors ) {     
            state.currentMap.doors.forEach( (door) => {
                door.checkForBlockedRange( );
            })
        }  
    }

    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawTextBox( )
    }
}

const gatherSpritesInState = ( ) => {
    state.currentMap.layeredSprites = ( state.currentMap.layeredSprites ) ? state.currentMap.layeredSprites : []

    if ( state.currentMap.NPCs ) {
        state.currentMap.NPCs.forEach( NPC => {
            state.currentMap.layeredSprites.push( NPC )
        })  
    }  

    if ( state.currentMap.mapObjects ) {
        state.currentMap.mapObjects.forEach( mapObject => {
            state.currentMap.layeredSprites.push( mapObject )
        })  
    }  

    state.currentMap.layeredSprites.push(state.playerCharacter.sprite)           
}

const drawSpritesInOrder = ( ) => {
    let layeredSprites = state.currentMap.layeredSprites
    layeredSprites.sort( ( a, b ) => {
        if ( a.row > b.row || a.row === b.row && a.y > b.y ) {
            return 1 
        }
        else if (b.row > a.row || b.row === a.row && b.y > a.y ) {
            return -1
        }
        else {
            return 0
        }          
    })

    canvas.clearEntireCanvas("FRONT")

    layeredSprites.forEach( (e) => {
        e.drawSprite()
    })       
}

module.exports = {
    handleMapAnimations
}