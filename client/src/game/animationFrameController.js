const movementController = require('./map-ui/movementController')
const actionController = require('./map-ui/actionController')
const state         = require('../game-data/state')

const startRequestingFrame = () => {
    requestAnimationFrame(animationFrameController)
}

const animationFrameController = () => {

    state.currentMap.layeredSprites = []
    if(  state.currentMap.mapData.NPCs ) {
        state.currentMap.mapData.NPCs.forEach((e) => {
            state.currentMap.layeredSprites.push(e.sprite)
            e.sprite.clearSprite()
        })

    }

    movementController.handleMovementKeys()

    actionController.handleActionButton()
    drawSpritesInOrder()

    requestAnimationFrame(animationFrameController)    
}

const drawSpritesInOrder = ( ) => {
    state.currentMap.layeredSprites.sort( (a,b) => {
        (a.row > b.row) 
        ? 1 
        : ( (b.row > a.row) ? -1 : 0 )           
    })
    state.currentMap.layeredSprites.forEach( (e) => {
        e.drawSprite()
    })
}

module.exports = {
    startRequestingFrame
}