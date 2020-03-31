const NPCs = require('./map-ui/NPCs')
const state = require('../../game-data/state')
const canvas = require('../../helpers/canvasHelpers')
const mapCtrl = require('./mapController')

const handleMapAnimations = ( ) => {
    state.currentMap.layeredSprites = []    

    NPCs.NPCController()    
    console.log('bro')    
    mapCtrl.handleMovementKeys( )
    drawSpritesInOrder()
    
    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawBubble( )
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