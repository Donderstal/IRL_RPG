const movementController = require('./map-ui/movementController')
const actionController = require('./map-ui/actionController')

const startRequestingFrame = () => {
    requestAnimationFrame(animationFrameController)
}

const animationFrameController = () => {

    movementController.handleMovementKeys()

    actionController.handleActionButton()

    requestAnimationFrame(animationFrameController)    
}

module.exports = {
    startRequestingFrame
}