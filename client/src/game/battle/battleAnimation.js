const state     = require('../../game-data/state')
const NPCs      = require('../map/map-ui/NPCs')
const canvas    = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    let playerSprite = state.battleState.player.sprite
    let nonPlayerSprite = state.battleState.opponent.sprite

    if ( playerSprite != undefined ) {
        if ( !playerSprite.moving ) {
            NPCs.handleStaticNPCAnimation( state.battleState.player )            
        }
        playerSprite.drawSprite()         
    }
    if ( nonPlayerSprite != undefined ) {
        if ( !nonPlayerSprite.moving ) {
            NPCs.handleStaticNPCAnimation( state.battleState.opponent )
        }
        nonPlayerSprite.drawSprite() 
    }

    if ( state.battleState.textContainer != undefined ) {
        state.battleState.textContainer.drawContainer()    
    }

}

module.exports = {
    handleBattleAnimations
}