const movementController = require('./map-ui/movementController')
const actionController = require('./map-ui/actionController')
const state         = require('../game-data/state')
const NPCs          = require('./map-ui/NPCs')
const canvasHelpers = require('../helpers/canvasHelpers')

const startRequestingFrame = () => {
    requestAnimationFrame(animationFrameController)
}

const animationFrameController = () => {

    state.currentMap.layeredSprites = []

    NPCs.NPCController()        

    movementController.handleMovementKeys()

    actionController.handleActionButton()

    requestAnimationFrame(animationFrameController)    
    
    drawSpritesInOrder()
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

    canvasHelpers.clearEntireCanvas("FRONT")

    layeredSprites.forEach( (e) => {
        e.drawSprite()
    })
}

module.exports = {
    startRequestingFrame
}