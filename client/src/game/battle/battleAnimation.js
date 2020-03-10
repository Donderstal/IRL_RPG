const state = require('../../game-data/state')
const NPCs = require('../map/map-ui/NPCs')
const canvas = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    if ( state.battleState.player.sprite != undefined ) {
        NPCs.handleStaticNPCAnimation( state.battleState.player )     
        state.battleState.player.sprite.drawSprite()         
    }
    if ( state.battleState.opponent.sprite != undefined ) {
        NPCs.handleStaticNPCAnimation( state.battleState.opponent )
        state.battleState.opponent.sprite.drawSprite() 
    }

    state.battleState.textContainer.drawContainer()    
}

module.exports = {
    handleBattleAnimations
}