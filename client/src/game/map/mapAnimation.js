const NPCs = require('./map-ui/NPCs')
const state = require('../../game-data/state')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls')
const mapController = require('./mapController')

const handleMapAnimations = ( ) => {
    if ( state.mapTransition != null ) {
        mapController.switchMap( state.mapTransition )
        state.transitioning = true;
        state.mapTransition = null
    }

    if (state.currentMap.borders) {
        state.currentMap.layeredSprites = []            
        NPCs.NPCController()    
        mapControls.handleMovementKeys( )
        drawSpritesInOrder()                    
    }
    
    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawTextBox( )
    }
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