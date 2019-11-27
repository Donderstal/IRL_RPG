const movementController = require('./map-ui/movementController')

const startRequestingFrame = () => {
    requestAnimationFrame(animationFrameController)
}

const animationFrameController = () => {

    movementController.handleMovementKeys()

    requestAnimationFrame(animationFrameController)    
}

module.exports = {
    startRequestingFrame
}