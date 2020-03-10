const movementController = require('./map/map-ui/movementController')
const state         = require('../game-data/state')
const NPCs          = require('./map/map-ui/NPCs')
const canvasHelpers = require('../helpers/canvasHelpers')

let paused = false;

const startRequestingFrame = () => {
    startOverworldAnimation()
    animationFrameController()
}

const startBattleAnimation = ( ) => {
    state.animation.battleMode = true;
    state.animation.overworldMode = false;
    state.animation.cinematicMode = false;
}

const startOverworldAnimation = ( ) => {
    state.animation.overworldMode = true
    state.animation.battleMode = false;
    state.animation.cinematicMode = false;
}

const startCinematicAnimation = ( ) =>{
    state.animation.overworldMode = false
    state.animation.battleMode = false;
    state.animation.cinematicMode = true;
}

/**
 * Controller for all animation duties in front-context
 */
const animationFrameController = () => {
    if ( paused ) {
        return
    }
    
    if ( state.animation.overworldMode ) {
        handleOverworldAnimations()
    }
    else if ( state.animation.battleMode ) {
        handleBattleAnimations()
    }

    requestAnimationFrame(animationFrameController)
}

const handleBattleAnimations = ( ) => {
    state.currentMap.layeredSprites = []   
    if ( state.battleState.player.sprite != undefined ) {
        NPCs.handleStaticNPCAnimation( state.battleState.player )     
        state.currentMap.layeredSprites.push( state.battleState.player.sprite )           
    }
    if ( state.battleState.enemy.sprite != undefined ) {
        NPCs.handleStaticNPCAnimation( state.battleState.enemy )
        state.currentMap.layeredSprites.push( state.battleState.enemy.sprite )
    }

    drawSpritesInOrder( )
    state.battleState.textContainer.drawContainer()    
}

const handleOverworldAnimations = ( ) => {
    state.currentMap.layeredSprites = []    
    NPCs.NPCController()        
    movementController.handleMovementKeys()
    drawSpritesInOrder()
    
    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawBubble( )
    }

}

/**
 * Get Layeredsprite prop from mapstate
 * Reorganize the layered sprites array based 
 * on location of sprite within grid
 * 
 * Then organise them accordingly, top 
 * sprites first
 * 
 * This must be done to make up for the 
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
    startRequestingFrame,
    startOverworldAnimation,
    startBattleAnimation,
    startCinematicAnimation
}