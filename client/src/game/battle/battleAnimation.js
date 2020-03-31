const state     = require('../../game-data/state')
const NPCs      = require('../map/map-ui/NPCs')
const canvas    = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    let playerSprite = state.battleState.player.sprite
    let oppoSprite = state.battleState.opponent.sprite

    if ( playerSprite != undefined ) {
        if ( !playerSprite.moving ) {
            NPCs.handleStaticNPCAnimation( state.battleState.player )            
        }
        playerSprite.drawSprite()         
    }
    if ( oppoSprite != undefined ) {
        if ( !oppoSprite.moving ) {
            NPCs.handleStaticNPCAnimation( state.battleState.opponent )
        }
        oppoSprite.drawSprite() 
    }

    state.battleState.textContainer.drawContainer()    
}

module.exports = {
    handleBattleAnimations
}