const movementController = require('./map-ui/movementController')
const actionController = require('./map-ui/actionController')
const state         = require('../game-data/state')

const startRequestingFrame = () => {
    requestAnimationFrame(animationFrameController)
}

const animationFrameController = () => {

    state.currentMap.layeredSprites = []
    if(  state.currentMap.mapData.NPCs ) {
        state.currentMap.mapData.NPCs.forEach( ( e ) => {
            state.currentMap.layeredSprites.push( e.sprite )
        })

    }

    movementController.handleMovementKeys()

    actionController.handleActionButton()

    requestAnimationFrame(animationFrameController)    
}

module.exports = {
    startRequestingFrame
}