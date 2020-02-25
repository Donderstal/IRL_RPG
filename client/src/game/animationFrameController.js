const movementController = require('./map-ui/movementController')
const state         = require('../game-data/state')
const NPCs          = require('./map-ui/NPCs')
const canvasHelpers = require('../helpers/canvasHelpers')

const startRequestingFrame = () => {
    requestAnimationFrame(animationFrameController)
}

/**
 * @function animationFrameController
 * 
 * Controller for all animation duties in front-context
 */
const animationFrameController = () => {
    state.currentMap.layeredSprites = []    
    NPCs.NPCController()        
    movementController.handleMovementKeys()
    drawSpritesInOrder()
    
    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawBubble( )
    }

    requestAnimationFrame(animationFrameController)
}

/**
 * @function drawSpritesInOrder
 * 
 * Get Layeredsprite prop from mapstate
 * Reorganize the layered sprites array based...
 * on location of sprite within grid
 * 
 * Then organise them accordingly, top...
 * sprites first
 * 
 * This must be done to make up for the...
 * lack of depth in HTMLCanvas
 */
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

    canvasHelpers.clearEntireCanvas("FRONT")

    layeredSprites.forEach( (e) => {
        e.drawSprite()
    })        

}

module.exports = {
    startRequestingFrame
}