const movementController = require('./map-ui/movementController')
const actionController = require('./map-ui/actionController')
const state         = require('../game-data/state')

const startRequestingFrame = () => {
    requestAnimationFrame(animationFrameController)
}

const animationFrameController = () => {

    movementController.handleMovementKeys()

    actionController.handleActionButton()

    if (state.currentMap.mapData.NPCs) {
        state.currentMap.mapData.NPCs.forEach( (e) => {
            if ( e.type === "generic" ) {
                e.sprite.drawSprite()
            }
            else if ( e.type === "dynamic" ) {
                console.log('hoe dan')
            }
        })       
    }


    requestAnimationFrame(animationFrameController)    
}

module.exports = {
    startRequestingFrame
}