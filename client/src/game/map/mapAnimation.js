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
    if ( state.currentMap.borders && state.playerCharacter.sprite ) {
        mapControls.handleMovementKeys( );
        gatherSpritesInState( )
        drawSpritesInOrder()     
        if ( state.currentMap.mapActions ) {     
            state.currentMap.mapActions.forEach( (action) => {
                //action.draw(action.x,action.y);
                action.checkForActionRange( );
            })
        }  
        
        if ( state.currentMap.doors ) {     
            state.currentMap.doors.forEach( (door) => {
                //door.draw(door.x, door.y);
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